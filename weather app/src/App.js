
import React, { useState } from 'react'
import './App.css'

function App() {
  const apiKey = '708c215b314bb16def3d133b6596d0b2'
  const [weatherData, setWeatherData] = useState({})
  const [city, setCity] = useState('')

  const getWeather = (event) => {
    if (event.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data)
          setCity('')
        })
    }
  
  }  

  return (
    <div className='container'>
      <input 
        className='input' 
        placeholder='Enter City...' 
        value={city}
        onChange={e => setCity(e.target.value)}
        onKeyPress={getWeather}
      />
      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p>Welcome to the weather app! Enter a city to get the weather.</p>
        </div>
      ) : (
        <div className='weather-data'>
          <p className='city'>{weatherData.name}</p>
          <p className='temp'>{Math.round(weatherData.main.temp)}°C</p>
          <p className='weather'>{weatherData.weather[0].main}</p>
        </div>
      )}

      {weatherData.cod === '404' && (
        <p>City not found.</p>
      )}
    </div>
  )
}

export default App
