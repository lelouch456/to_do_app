import axios from 'axios';

// Using the OpenWeatherMap API - you'll need to get your own API key
const API_KEY = '02bbdf7cb95dd683f0a72393e650f75e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    return {
      temperature: response.data.main.temp,
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      location: response.data.name
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
