async function fetchWeatherData(latitude, longitude) {
    const apiKey = 'fa657c45188491929e6277300fb09a16'; // Replace with your weather API key
    const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      document.getElementById('temp').textContent = `${data.current.temperature} °C`;
      document.getElementById('desc').textContent = data.current.weather_descriptions[0];
      document.getElementById('city').textContent = `City: ${data.location.name}`;
      document.getElementById('humid').textContent = `${data.current.humidity} %`;
      document.getElementById('wind_speed').textContent = `${data.current.wind_speed} km/h`;
  
      updateWeatherImage(data.current.weather_descriptions[0]);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  function updateWeatherImage(description) {
    let imageUrl;
  
    switch (description) {
      case 'Partly Cloudy':
        imageUrl = '../public/images/partly_cloudy.png';
        break;
      case 'Misty':
        imageUrl = '../public/images/misty.png';
        break;
      case 'Clear':
        imageUrl = '../public/images/clear.png';
        break;
      case 'Sunny':
        imageUrl = '../public/images/sunny.png';
        break;
      case 'Overcast':
        imageUrl = '../public/images/clouds.png';
        break;
      case 'Rain':
        imageUrl = '../public/images/rain.png';
        break;
      case 'Snow':
        imageUrl = '../public/images/snow.png';
        break;
      default:
        imageUrl = '../public/images/weather.png';
        break;
    }
  
    document.querySelector('.weather img').src = imageUrl;
  }
  
  function displayLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    document.getElementById('latitude').textContent = latitude;
    document.getElementById('longitude').textContent = longitude;
  
    // Fetch weather data using latitude and longitude
    fetchWeatherData(latitude, longitude);
  }