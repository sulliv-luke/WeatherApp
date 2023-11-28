import { React, useState, useEffect } from 'react'
import './App.css'
import './mode.css'
import './navbar.css'
import apiService from './api/apiService'
import SearchBar from './SearchBar'
import DarkMode from './DarkMode'
import { Box, Container, Typography, Grid } from '@mui/material';
import Header from './components/Header'
import TodayWeatherDetails from './components/TodayWeather/TodayWeather'
import Navbar from './navbar'
import LoadingBox from './components/Reusable/LoadingBox'


function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}


function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('/Dublin')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    // Fetch current weather
    setIsLoading(true);
    apiService.getWeatherNow(searchTerm)
      .then(response => {
        setTodayWeather(response.data);
          // Fetch 5-day weather forecast
        apiService.getWeatherForecast(searchTerm)
        .then(response => {
         setFiveDayForecast(response.data);

          // Check if response.data and response.data.list are defined
          if (response.data && response.data.list) {
            // Process the forecast data to get today's forecasts
            const forecasts = response.data.list;
            const today = new Date().toISOString().split('T')[0];

            const todayForecasts = forecasts.filter(forecast => {
              return forecast.dt_txt.startsWith(today);
            });

        setTodayForecast(todayForecasts);
      }
      setIsLoading(false);
    })
    .catch(error => {
      setError(error);
      console.error('There was an error fetching 5-day forecast!', error);
    });
      })
      .catch(error => {
        setError(error);
        console.error('There was an error fetching current weather!', error);
      });
      }, [searchTerm]);
  

  const handleSearch = (newSearchTerm) => {
    setSearchTerm("/" + newSearchTerm)
  };

  const handleDarkModeToggle = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.body.classList.toggle('dark-mode', newMode)
    document.body.classList.toggle('light-mode', !newMode)
  };


  return (
    <Container
      sx={{
        maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
        width: '100%',
        height: '100%',
        margin: '0 auto',
        padding: '1rem 0 3rem',
        marginBottom: '1rem',
        borderRadius: {
          xs: 'none',
          sm: '0 0 1rem 1rem',
        },
        boxShadow: {
          xs: 'none',
          sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
        },
      }}
    >
    <Navbar isDarkMode={isDarkMode}/>
    <Header />
    <SearchBar onSearch={handleSearch} isDarkMode={isDarkMode}/>
    <Box
      xs={12}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        minHeight: '500px',
      }}
    >
      <div className="App">
        <div className="main-stuff">
          <DarkMode isDarkMode={isDarkMode} onToggle={handleDarkModeToggle} />
          {isLoading ? (
              <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                minHeight: '500px',
              }}
            >
              <LoadingBox value="1">
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{
                    fontSize: { xs: '10px', sm: '12px' },
                    color: 'rgba(255, 255, 255, .8)',
                    lineHeight: 1,
                    fontFamily: 'Poppins',
                  }}
                >
                  Loading...
                </Typography>
              </LoadingBox>
            </Box>
          ) : (
            todayWeather ? (
              <>
                <Grid item xs={12} md={todayWeather ? 6 : 12}>
                  <Grid item xs={12}>
                    <TodayWeatherDetails data={todayWeather} forecastList={todayForecast} />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                 
                </Grid>
              </>
            ) : (
              <p>Search for the weather in various different cities around the world!</p>
            )
          )}

          {error && <p>Error: {error.message}</p>}
        </div>
      </div>
    </Box>
    </Container>
  );
}

export default App
