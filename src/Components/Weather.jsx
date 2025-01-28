import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'  
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import drizzle_night_icon from '../assets/drizzle_night.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import sun_rain_icon from '../assets/sun_rain.png'
import wind_icon from '../assets/wind.png'
import moon_icon from '../assets/moon.png'
import storm_icon from '../assets/storm.png'
import thunder_rain_night_icon from '../assets/thunder_rain_night.png'
import heavy_rain_night_icon from '../assets/heavy_rain_night.png'
import cloudy_night_icon from '../assets/cloudy_night.png'
import mist_icon from '../assets/mist.png'

import { use } from 'react'
const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {

    "01d": clear_icon,
    "01n": moon_icon,
    "02d": cloud_icon,
    "02n": cloudy_night_icon,
    "03d": cloud_icon,
    "03n": cloudy_night_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": sun_rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": storm_icon,
    "11n": thunder_rain_night_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon
  }

  const search = async (city) => {

    if(!city) return alert("Please enter city name");
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
        return;
      }
      
      console.log("API icon:", data.weather[0].icon);       
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temp: Math.floor(data.main.temp),
        Location: data.name,
        icon: icon,
      });

    } catch (error) {
      setWeatherData(false);
      console.log("error to fatch data");
    }
  }

  useEffect(() => {
    search("kolkata");
  }, [])


  return (
    <div className='weather'>
      <div className="search-bar">
      <input ref={inputRef} type="text" placeholder='Search' />
      <img src={search_icon} alt="search icon" onClick={() => search(inputRef.current.value)} />
      </div>
      {weatherData?<>
      <img src={weatherData.icon} className='weather-icon' alt="weather Icon" />
      <p className='temperature'>{weatherData.temp}°C</p>
      <p className='location'>{weatherData.Location}</p>
      <div className='weather-details'>
        <div className='column'>
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='column'>
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.wind}</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>
      </>:<></>}
    </div>
  )
}

export default Weather
