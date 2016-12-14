const apiUrl = 'https://www.ncdc.noaa.gov/cag/time-series/us/110/00/tavg/ytd/12/1895-2016.json?base_prd=true&begbaseyear=1901&endbaseyear=2000';
const dataArray = [];

fetch(apiUrl)
    .then(blob => blob.json())
    .then(response => {
        parseData(response);
        console.log(dataArray);
    });

function parseYear(year, data) {
    const temp = data[year].value;
    const currentYear = year.slice(0, -2);
    const parsedData = {year: parseInt(currentYear), temp: parseInt(temp)};
    return parsedData;
}

function parseData(response) {
    const data = response.data;
    const years = Object.keys(data);
    let dataObj = {};
    years.forEach(year => {
        dataObj = parseYear(year, data);
        dataArray.push(dataObj);
    });
}