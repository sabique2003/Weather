async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = `ba1efae0c1b61f1056a19d3d5fa43cf8`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }

    function displayWeather(data) {
        const weatherResult = document.getElementById('weather-result');
        weatherResult.classList.remove('show');

        setTimeout(() => {
            const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
            weatherResult.innerHTML = `
                <div class="card mt-4">
                    <div class="card-body">
                        <h2 class="card-title">Weather in ${data.name}</h2>
                        <p class="card-text">Temperature: ${data.main.temp} ℃</p>
                        <p class="card-text">Weather: ${data.weather[0].description}</p>
                        <p class="card-text">Humidity: ${data.main.humidity} %</p>
                        <p class="card-text">Wind Speed: ${data.wind.speed} m/s</p>
                        <p class="card-text">Pressure: ${data.main.pressure} hPa</p>
                        <p class="card-text">Visibility: ${data.visibility / 1000} km</p>
                        <p class="card-text">Sunrise: ${sunriseTime}</p>
                        <p class="card-text">Sunset: ${sunsetTime}</p>
                    </div>
                </div>
            `;
            weatherResult.classList.add('show');
        }, 50);
    }
}
