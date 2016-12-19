"use strict";

function drawLineChart(data) {
    var svg = d3.select("svg.line-chart");
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    var parseTime = d3.timeParse("%Y");

    var timeStampedData = data.map(function (data) {
        return { year: parseTime(data.year), temp: data.temp };
    });

    var x = d3.scaleTime().rangeRound([0, width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var line = d3.line().curve(d3.curveCardinal).x(function (d) {
        return x(d.year);
    }).y(function (d) {
        return y(d.temp);
    });

    x.domain(d3.extent(timeStampedData, function (d) {
        return d.year;
    }));
    y.domain(d3.extent(timeStampedData, function (d) {
        return d.temp;
    }));

    g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0, " + height + ")").call(d3.axisBottom(x));

    g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y)).append("text").attr("fill", "#000").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em").text("Temp");

    g.append("path").datum(timeStampedData).attr("class", "line").attr("d", line);
}

function drawBarChart(data) {
    var svg = d3.select("svg.bar-chart");
    var margin = { top: 20, right: 20, bottom: 50, left: 40 };
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    x.domain(data.map(function (d) {
        return d.year;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d.temp;
    })]);

    g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0, " + height + ")").call(d3.axisBottom(x));

    g.append("g").attr("class", "axis axis--y bar-chart-axis").call(d3.axisLeft(y).ticks(10).tickSize(-width).tickFormat(d3.format(""))).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em").attr("text-anchor", "end").text("Temp");

    g.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function (d) {
        return x(d.year);
    }).attr("y", function (d) {
        return y(d.temp);
    }).attr("width", x.bandwidth()).attr("height", function (d) {
        return height - y(d.temp);
    });
}

function drawHistogram(data) {
    console.log(data);
    var formatCount = d3.format(",.2f");

    var svg = d3.select("svg.hist");
    var margin = { top: 30, right: 30, bottom: 30, left: 30 };
    var width = +svg.attr("width") - margin.left - margin.right;
    var height = +svg.attr("height") - margin.top - margin.bottom;
    var g = svg.append("g").attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

    var x = d3.scaleLinear().rangeRound([0, width]).domain([d3.min(data) - 0.5, d3.max(data) + 0.5]);

    var histogram = d3.histogram().domain(x.domain()).thresholds(x.ticks(10));

    var bins = histogram(data);

    var y = d3.scaleLinear().domain([0, d3.max(bins, function (d) {
        return d.length;
    })]).range([height, 0]);

    var bar = g.selectAll(".bar").data(bins).enter().append("g").attr("class", "bar").attr("transform", function (d) {
        return "translate(" + x(d.x0) + ", " + y(d.length) + ")";
    });

    bar.append("rect").attr("x", 1).attr("width", x(bins[0].x1) - x(bins[0].x0) + 3).attr("height", function (d) {
        return height - y(d.length);
    });

    bar.append("text").attr("dy", ".75em").attr("y", 6).attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2).attr("text-anchor", "middle").text(function (d) {
        return formatCount(d.length);
    });

    g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0, " + height + ")").call(d3.axisBottom(x));

    console.log(bins);
}
function parseYear(year, data) {
    var temp = parseFloat(data[year].value, 10);
    var currentYear = parseInt(year.slice(0, -2), 10);
    var parsedData = { year: currentYear, temp: temp };
    return parsedData;
}

function parseData(response) {
    var data = response.data;
    var years = Object.keys(data);
    var dataArray = [];
    var dataObj = {};
    years.forEach(function (year) {
        dataObj = parseYear(year, data);
        dataArray.push(dataObj);
    });
    return dataArray;
}

function groupByDecade(data) {
    var currentDecade = void 0;
    var decadeTotal = 0;
    var decadeYears = [];
    var decadeObjects = [];

    data.forEach(function (item, i) {
        if (i === 0) {
            currentDecade = Math.floor(item.year / 10) * 10;
        } else if (item.year % 10 === 0) {
            decadeObjects.push({ year: currentDecade,
                temp: decadeTotal / decadeYears.length });
            currentDecade = item.year;
            decadeTotal = 0;
            decadeYears = [];
        }
        decadeTotal += item.temp;
        decadeYears.push(item.year);

        if (i === data.length - 1) {
            decadeObjects.push({ year: currentDecade,
                temp: decadeTotal / decadeYears.length });
        }
    });
    return decadeObjects;
}

function tempArray(data) {
    return data.map(function (obj) {
        return obj.temp;
    });
}

// US Annual Average Temperature and Anomaly, 1880-2015 (vs. 1901-2000 Average)
var tempUrl = 'https://www.ncdc.noaa.gov/cag/time-series/us/110/00/tavg/ytd/12/1895-2016.json?base_prd=true&begbaseyear=1901&endbaseyear=2000';

fetch(tempUrl).then(function (blob) {
    return blob.json();
}).then(function (response) {
    console.log(response);
    var dataArray = parseData(response);
    var groupedByDecade = groupByDecade(dataArray);
    var justTemps = tempArray(dataArray);

    drawLineChart(dataArray);
    drawBarChart(groupedByDecade);
    drawHistogram(justTemps);
});