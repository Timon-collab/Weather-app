const apiKey = "7e969878729d4cde84c1b035abd2eab7"; // Your new API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            console.log("Weather Data:", data);
        } else {
            console.error("Error:", data.message);
            alert("City not found! Please enter a valid city.");
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("Unable to fetch weather data.");
    }
}

getWeather("Delhi"); // Test with a sample city
