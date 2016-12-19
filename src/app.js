// US Annual Average Temperature and Anomaly, 1880-2015 (vs. 1901-2000 Average)
const tempUrl = 'https://www.ncdc.noaa.gov/cag/time-series/us/110/00/tavg/ytd/12/1895-2016.json?base_prd=true&begbaseyear=1901&endbaseyear=2000';

fetch(tempUrl)
    .then(blob => blob.json())
    .then(response => {
        console.log(response);
        const dataArray = parseData(response);
        const groupedByDecade = groupByDecade(dataArray);
        const justTemps = tempArray(dataArray);

        drawLineChart(dataArray);
        drawBarChart(groupedByDecade);
        drawHistogram(justTemps);
    });
