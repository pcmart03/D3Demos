function drawBarChart(data) {
    const svg = d3.select("svg.bar-chart");
    const margin = {top: 20, right: 20, bottom: 50, left:40}
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);
 
    x.domain(data.map(d => d.year));
    y.domain([0, d3.max(data, d => d.temp)]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y bar-chart-axis")
        .call(d3.axisLeft(y)
                .ticks(10)
                .tickSize(-width)
                .tickFormat(d3.format("")))
     .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Temp")

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.year))
            .attr("y", d => y(d.temp))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.temp));
}
