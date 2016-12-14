'use strict';

var apiUrl = 'https://www.ncdc.noaa.gov/cag/time-series/us/110/00/tavg/ytd/12/1895-2016.json?base_prd=true&begbaseyear=1901&endbaseyear=2000';
var dataArray = [];

fetch(apiUrl).then(function (blob) {
    return blob.json();
}).then(function (response) {
    parseData(response);
    console.log(dataArray);
});

function parseYear(year, data) {
    var temp = data[year].value;
    var currentYear = year.slice(0, -2);
    var parsedData = { year: parseInt(currentYear), temp: parseInt(temp) };
    return parsedData;
}

function parseData(response) {
    var data = response.data;
    var years = Object.keys(data);
    var dataObj = {};
    years.forEach(function (year) {
        dataObj = parseYear(year, data);
        dataArray.push(dataObj);
    });
}