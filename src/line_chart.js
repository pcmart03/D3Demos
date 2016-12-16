function drawLineChart(data) {
    const svg = d3.select("svg.line-chart");
    const margin = {top: 20, right: 20, bottom: 30, left:50 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const g = svg.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    const parseTime = d3.timeParse("%Y");

    const timeStampedData = data.map(data => {
        return { year: parseTime(data.year), temp: data.temp };
    });

    const x = d3.scaleTime().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const line = d3.line()
        .curve(d3.curveCardinal)
        .x((d) => x(d.year))
        .y((d) => y(d.temp));

    x.domain(d3.extent(timeStampedData, (d) => d.year));
    y.domain(d3.extent(timeStampedData, (d) => d.temp));

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
     .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .text("Temp");

    g.append("path")
        .datum(timeStampedData)
        .attr("class", "line")
        .attr("d", line);
}
