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
  const [searchTerm, setSearchTerm] = useState('/Dublin%20City')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [savedWeather, setSavedWeather] = useState([]);
  const [savedForecast, setSavedForecast] = useState([]);
  const [currentState, setCurrentState] = useState(0);
  

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
  const handleSave = (weather,forecast) => {
      if(!savedWeather.includes(weather)&&!savedForecast.includes(forecast)){
          setSavedWeather((prev) =>[...prev,weather]);
          setSavedForecast((prev)=>[...prev,forecast]);
          alert("saved!!");
      }
      else{
          alert("already saved")
       }
  };
  const handleSwitch = () => {
       setCurrentState(currentState === 0 ? 1 : 0);
  };

  const handleRemove =(weather,forecast) => {
      const newWeather = savedWeather.filter((data1)=>data1!==weather);
      const newForecast = savedForecast.filter((data2)=>data2!==forecast);
      setSavedWeather(newWeather);
      setSavedForecast(newForecast)
   }


  return (
    <Container
      sx={{
        maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
        width: '100%',
        height: '100%',
        margin: '0 auto',
        padding: { xs: '5rem 0 3rem', sm: '1rem 0 3rem' },
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
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth:'22vw', marginLeft: '10px'}}>
      <button onClick={() => handleSwitch()}>{currentState===0?("Favorites"):("Back")}</button>
      {currentState===0 && (
        <button onClick={() => handleSave(todayWeather,todayForecast)}
              style={{
                padding: '10px',
                marginTop: '10px',
              }}
      >SAVE</button>
      )}
    </div>
    <Header />
    {currentState === 0 && (
    <>
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
   </>
   )}
   {currentState === 1 && (
    <>
        {savedWeather.map((info, index) => (
        <div key={index} style={{
                               backgroundColor:'rgba(190, 216, 232, .5)',
                               position: 'relative',
                               marginBottom: '20px',
                               borderRadius: '10px solid black' , // Apply border to the first element
                               padding:  '10px' , // Add padding to the first element
                             }}>
           <TodayWeatherDetails data={info} forecastList={savedForecast[index]}/>

           <button className = "removeButton"
           onClick={() => handleRemove(info,savedForecast[index])}
           style={{
                 position: 'absolute',
                 top: '40px',
                 right: '10px',
                 padding: '10px',
               }}
           >REMOVE</button>
        </div>
        ))}
    </>
    )}
    </Container>
  );
}

export default App
