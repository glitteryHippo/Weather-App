import React, { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Slider from '@mui/material/Slider';

export function SliderLineGraph(props) {
  const [xRange, setXRange] = useState([132, 232]);

  const handleSliderChange = (event, newValue) => {
    setXRange(newValue);
  }
  
  return (
    <div>
      <LineChart
        slotProps={{
          loadingOverlay: { message: 'Data should be available soon.' },
          noDataOverlay: { message: 'Select some data to display.' },
          legend: {
            padding: {
              bottom: 25,
            }
          }
        }}
        xAxis={[{ scaleType: 'point', data: props.time.slice(xRange[0], xRange[1] + 1) }]}
        series={[
          {data: props.max.slice(xRange[0], xRange[1] + 1), label: "max temp (°F)", showMark: false, color: '#1abc9c'},
          {data: props.min.slice(xRange[0], xRange[1] + 1), label: "min temp (°F)", showMark: false, color: '#e67e22'},
          {data: props.avg.slice(xRange[0], xRange[1] + 1), label: "mean temp (°F)", showMark: false, color: '#228ae6'},
          {data: props.precipitationSum.slice(xRange[0], xRange[1] + 1), label: "precipitation sum (in)", showMark: false, color: '#e74c3c'},
          {data: props.rainSum.slice(xRange[0], xRange[1] + 1), label: "rain sum (mm)", showMark: false, color: '#2ecc71'},
          {data: props.snowfallSum.slice(xRange[0], xRange[1] + 1), label: "snowfall sum (cm)", showMark: false, color: '#f9c8e2'},
          {data: props.precipitationHrs.slice(xRange[0], xRange[1] + 1), label: "precipitation hrs", showMark: false, color: '#34495e'},
          {data: props.windSpeed.slice(xRange[0], xRange[1] + 1), label: "wind speed (m/s)", showMark: false, color: '#f1c40f'},
          {data: props.uv.slice(xRange[0], xRange[1] + 1), label: "uv (index)", showMark: false, color: '#9b59b6'},
        ]}
        width={800}
        height={350}
      />
      <Slider 
        value={xRange}
        onChange={handleSliderChange}
        min={0}
        max={props.time.length - 1}
        valueLabelDisplay="auto"
        sx={{ width: 700, mt: 4 }}
        defaultValue={[0, 360]}
      />
    </div>
  );
}
