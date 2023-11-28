import axios from 'axios';

const API_BASE_URL = 'https://weather-service-zv7n.onrender.com/api/v1/weather';
const API_FORECAST_URL = 'https://weather-service-zv7n.onrender.com/api/v1/weather/forecast';

const apiService = {
  getWeatherNow(endpoint) {
    return axios.get(`${API_BASE_URL}${endpoint}`);
  },
  getWeatherForecast(endpoint) {
    return axios.get(`${API_FORECAST_URL}${endpoint}`);
  },
  post(endpoint, data) {
    return axios.post(`${API_BASE_URL}${endpoint}`, data);
  },
  // ... you can add other methods like put, delete, etc.
};

export default apiService;
