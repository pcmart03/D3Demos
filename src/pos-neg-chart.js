function drawPosNeg(data) {
    const svg = d3.select("svg.pos-neg");
    const margin = {
        top: 10,
        right: 10,
        bottom: 20,
        left: 30
    };

    const mean = data.mean;
    const temps = data.data;
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;

    const y = d3.scaleLinear()
        .range([height, 0]);

    const x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);

    const center = d3.scaleLinear()
        .range([0, width]);


    const xAxis = d3.axisBottom(x).ticks(10);
    const yAxis = d3.axisLeft(y).ticks(10);
    const centerLine = d3.axisTop(center).ticks(0);

    x.domain(temps.map(d => d.year));
    y.domain(d3.extent(temps, d => d.delta));

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    g.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    g.append("g")
        .attr("class", "centerLine")
        .attr("transform", `translate(0, ${y(0)})`)
        .call(centerLine);

    g.selectAll(".bar")
        .data(temps)
        .enter().append("rect")
        .attr("class", d => `bar ${d.delta >= 0 ? 'positive' : 'negative'}`)
        .attr("x", d => x(d.year))
        .attr("y", d => {
            if (d.delta >= 0) {
                return y(d.delta);
            } else {
                return y(0);
            }
        })
        .attr("width", x.bandwidth())
        .attr("height", d => Math.abs(y(d.delta) - y(0)));


}
