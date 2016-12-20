// Converts year and temp to int and float
function parseYear(year, data) {
    const temp = parseFloat(data[year].value, 10);
    // Each year in the data set ends in 12. This removes it.
    const currentYear = parseInt(year.slice(0, -2), 10);
    const parsedData = { year: currentYear, temp: temp };
    return parsedData;
}

// Creates and array of objects containing the temp and year
function parseData(response) {
    const data = response.data;
    const years = Object.keys(data);
    const dataArray = [];    
    let dataObj = {};
    years.forEach(year => {
        dataObj = parseYear(year, data);
        dataArray.push(dataObj);
    });
    return dataArray;
}

// Averages the temps over a each decade.
function groupByDecade(data) {
    let currentDecade;
    let decadeTotal = 0;
    let decadeYears = [];
    const decadeObjects = [];

    data.forEach((item, i) => {
        if (i === 0 ) {
            currentDecade = Math.floor(item.year / 10) * 10;
        } else if (item.year % 10 === 0) {
            decadeObjects.push({ year: currentDecade,
                                 temp: (decadeTotal / decadeYears.length)});
            currentDecade = item.year;
            decadeTotal = 0;
            decadeYears = [];
        }
        decadeTotal += item.temp;
        decadeYears.push(item.year);

        if (i === (data.length - 1)) {
            decadeObjects.push({ year: currentDecade,
                                 temp: (decadeTotal / decadeYears.length)});
        }
    });
    return decadeObjects;
}

// Returns an array of just temperatures.
function tempArray(data) {
    return data.map(obj => obj.temp);
}

/* Returns an object containing the mean of all temperatures and an array of objects
 * consisting of the year, temp, and delta (distance from the mean)
*/
function distanceFromMean(data) {
    const dataMean = d3.mean(data, d => d.temp);
    let distance;
    const dataArray = data.map(d => {
        distance = d.temp - dataMean
        return Object.assign({},  d, {delta: distance})
    })
    return { mean: dataMean, data: [...dataArray]};
}