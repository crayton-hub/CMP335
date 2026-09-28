async function getWeather() {

    // Get the city the user typed
    let city = document.getElementById("city").value;

    // Get weather from WeatherAPI
    let response = await fetch(
        "https://api.weatherapi.com/v1/forecast.json"
        + "?key=c41ca4e41dda4c30bb621532262809"
        + "&q=" + city
        + "&days=7"
    );
    // Turn the response into JSON
    let weatherData = await response.json();
    console.log(weatherData);

    // Show current weather
    document.getElementById("currentWeather").innerHTML = `
        <h2>${weatherData.location.name}</h2>
        <div class="weather-icon">
            <img src="https:${weatherData.current.condition.icon}">
        </div>
        <h3>
            ${weatherData.current.temp_f}°F
        </h3>
        <p>
            ${weatherData.current.condition.text}
        </p>
    `;
    // Get the forecast area
    let forecast = document.getElementById("forecast");
    // Clear old forecast
    forecast.innerHTML = "";
    // Loop through the 7 days and get the date, condition icon, condition, high and low for each day
    for (let i = 0; i < 7; i++) {
        forecast.innerHTML += `
            <div class="col-md">
                <div class="forecast-card">
                    <h5>
                        ${weatherData.forecast.forecastday[i].date}
                    </h5>
                    <img
                        src="https:${weatherData.forecast.forecastday[i].day.condition.icon}"
                        class="forecast-icon"
                    >
                    <p>
                        ${weatherData.forecast.forecastday[i].day.condition.text}
                    </p>
                    <p>
                        High:
                        ${weatherData.forecast.forecastday[i].day.maxtemp_f}°F
                    </p>
                    <p>
                        Low:
                        ${weatherData.forecast.forecastday[i].day.mintemp_f}°F
                    </p>
                </div>
            </div>
        `;
    }
}