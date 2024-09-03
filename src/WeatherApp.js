import React, { useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    if (city) {
      try {
        const currentWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5796abbde9106b7da4febfae8c44c232&units=metric`
        );
        const weatherData = await currentWeatherResponse.json();
        setWeather(weatherData);

        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=5796abbde9106b7da4febfae8c44c232&units=metric`
        );
        const forecastData = await forecastResponse.json();
        setForecast(forecastData);
      } catch (error) {
        console.error('Error fetching the weather data:', error);
      }
    }
  };

  // const handleGetLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(async (position) => {
  //       const { latitude, longitude } = position.coords;
  //       try {
  //         const response = await fetch(
  //           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_API_KEY&units=metric`
  //         );
  //         const data = await response.json();
  //         setWeather(data);
  //       } catch (error) {
  //         console.error('Error fetching the weather data:', error);
  //       }
  //     });
  //   } else {
  //     alert('Geolocation is not supported by this browser.');
  //   }
  // };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Get Weather</button>
      {/* <button onClick={handleGetLocation}>Get Weather for My Location</button> */}

      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather-icon"
          />
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}

      {forecast && (
        <div style={{ marginTop: '20px' }}>
          <h3>5-Day Forecast</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {forecast.list
              .filter((item, index) => index % 8 === 0)
              .map((item, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
                  <p>{item.main.temp}°C</p>
                  <p>{item.weather[0].description}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
