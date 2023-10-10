import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = (city) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b8a347ca6c0ad1bbc6c5e27544423f10`).then((response) => {
          setWeather(response.data);
          console.log("checking weather data",response.data)
          setLoading(false);
          resolve('Weather data fetched successfully');
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
          reject('Error fetching weather data');
        });
    });
  };

  const handleSearch = () => {
    if (city.trim() === '') {
      setError('City cannot be empty');
    } else {
      setError(null);
      fetchWeather(city)
        .then((message) => {
          console.log(message);
        })
        .catch((errorMessage) => {
          console.error(errorMessage);
        });
    }
  };

  return (
    <div className="App">
      <h1>Weather Forecast</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p className="loading">Loading weather data...</p>
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          {weather && (
            <div className="weather">
              <h2>Weather in {weather.name}, {weather.sys.country}</h2>
              <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
              <p>Weather: {weather.weather[0].description}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
