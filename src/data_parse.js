function parseYear(year, data) {
    const temp = parseFloat(data[year].value, 10);
    const currentYear = parseInt(year.slice(0, -2), 10);
    const parsedData = { year: currentYear, temp: temp };
    return parsedData;
}

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

function tempArray(data) {
    return data.map(obj => obj.temp);
}
