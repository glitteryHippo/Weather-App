import React, { useState } from 'react';
import { SliderLineGraph } from '../components/Graph';
import Box from '@mui/material/Box';

export function Weather() {
  const apiKey = "b0544ad392306ace6987e52f8afbd4f9";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  const [[time, setTime], [max, setMax], [min, setMin], [avg, setAvg], [precipitationSum, setPrecipitationSum], [rainSum, setRainSum], [snowfallSum, setSnowfallSum], [precipitationHrs, setPrecipitationHrs], [windSpeed, setWindSpeed], [uv, setUv]] = [useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([]), useState([])];

  const [icon, setIcon] = useState("");
  
  const getWeather = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`).then(
        response => response.json()
      ).then(
        data => {
          setWeatherData(data);
          setIcon(`src/images/${data.weather[0].icon}@2x.png`);
          setCity("");
          
          fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`).then(
            response => response.json()
          ).then(
            geoData => {
              let startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
              let endDate = new Date();                
              endDate.setDate(endDate.getDate() - 1);
              
              const params = {
                latitude: geoData[0].lat,
                longitude: geoData[0].lon,
                start_date: startDate.toISOString().slice(0,10), 
                end_date: endDate.toISOString().slice(0,10), // two day delay in api
                daily: ["temperature_2m_max", "temperature_2m_min", "temperature_2m_mean", "precipitation_sum", "rain_sum", "snowfall_sum", "precipitation_hours", "wind_speed_10m_max","uv_index_max"],
                timezone: "America/Los_Angeles"
              };
              

              fetch(`https://archive-api.open-meteo.com/v1/archive?latitude=${params.latitude}&longitude=${params.longitude}&start_date=${params.start_date}&end_date=${params.end_date}&daily=${params.daily.join(',')}&timezone=${params.timezone}&temperature_unit=fahrenheit&wind_speed_unit=ms&precipitation_unit=inch`).then(
                response => response.json()
              ).then(
                archiveData => {
                  
                  setTime(archiveData.daily.time);
                  setMax(archiveData.daily.temperature_2m_max);
                  setMin(archiveData.daily.temperature_2m_min);
                  setAvg(archiveData.daily.temperature_2m_mean);
                  setPrecipitationSum(archiveData.daily.precipitation_sum);
                  setRainSum(archiveData.daily.rain_sum);
                  setSnowfallSum(archiveData.daily.snowfall_sum);
                  setPrecipitationHrs(archiveData.daily.precipitation_hours);
                  setWindSpeed(archiveData.daily.wind_speed_10m_max);
                  setUv(archiveData.daily.uv_index_max);

                }
              );
            }
          );
        }
      );
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter City..."
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />
      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p>Welcome to weather app! Enter a city to get the weather.</p>
        </div>
      ) : (
        <div>
          <h1 style={{textAlign: 'center', padding: 35}}>City: {weatherData.name}</h1>
          <Box sx={{ display: 'inline-flex'}}>
            <div>
              <table className='table' cellspace='0'>
                <tbody>
                  <tr><td>{Math.round(weatherData.main.temp)}°F</td></tr>
                  <tr><td style={{backgroundImage: `url(${icon})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>{weatherData.weather[0].description}</td></tr>
                  <tr><td>{weatherData.wind.speed}m/s</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <SliderLineGraph 
                time={time}
                max={max}
                min={min}
                avg={avg}
                precipitationSum={precipitationSum}
                rainSum={rainSum}
                snowfallSum={snowfallSum}
                precipitationHrs={precipitationHrs}
                windSpeed={windSpeed}
                uv={uv}
                />
            </div>
          </Box>
        </div>
      )}
      {weatherData.cod === "404" ? (
        <p>City not found.</p>
      ) : (
        <></>
      )}
    </div>
  );
}
