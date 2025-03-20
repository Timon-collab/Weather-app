const apiKey = "7e969878729d4cde84c1b035abd2eab7"; // Your API key

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherInfo = document.getElementById("weatherInfo");

    if (city === "") {
        weatherInfo.innerHTML = `<p class="error">❌ Please enter a city name.</p>`;
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === "404") {
            weatherInfo.innerHTML = `<p class="error">❌ City not found. Please enter a valid city.</p>`;
            return;
        }

        if (data.cod === "401") {
            weatherInfo.innerHTML = `<p class="error">❌ Invalid API Key. Please check your key.</p>`;
            return;
        }

        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p class="error">❌ Failed to fetch weather data. Try again later.</p>`;
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById("weatherInfo");
    
    const city = data.name;
    const country = data.sys.country;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherInfo.innerHTML = `
        <h2>${city}, ${country}</h2>
        <img src="${icon}" alt="Weather Icon">
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Condition:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
}
