# D3 Examples

This project is an exercise in using D3 V4 and ES2016 to create charts. A working demo is available [here](). It uses data from the National Centers for Environmental Information report on US Annual Average Temperature and Anomaly, 1880-2015 (vs. 1901-2000 Average).

The app consists of four charts, that users can switch between by clicking the buttons at the top. Since the focus was on D3, I didn't worry about responsive design in this version, although I may tweak the app for mobile viewing on a later version.

## Summary of Charts

### Line Chart
This is a simple line chart graphing the average temperatures for every year available. 

### Bar Graph
This chart finds an average temperature for each decade covered in the data. The original version had one bar per year, but the chart became to crowded. I also chose to start the y-axis at a value other than zero, just to show more variation in the bar height. Under normal circumstances I wouldn't do this since it overstates the differences.

### Histogram
A histogram of all the temperatures. I thought is was interesting that it approximated a normal distribution.

### Distance from Mean
This chart shows how far the average temperature of each decade. The chart is constructed to show both positive and negative values as well as conditional fill coloring.