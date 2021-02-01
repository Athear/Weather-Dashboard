# Weather-Dashboard

A quick 6-day reference for simple weather. Polls the OpenWeatherMap API for a given city and returns the forecast for this moment, plus daily average for each of the next 5 days.

This was built as a project for handling multiple API calls and dynamically generating content from the results. Portions of the return are stashed in local storage to avoid over calling the API.



## Usage

Enter a city name in the search box and click search or enter. If a city is found matching your entry the weather will populate.

This implementation does not support multiple cities of the same name, and will collect data only for the first city of a given name. Due to how the API calls are structured, it will prioritize North American cities.

![weather-dashboard](.\assets\images\weather-dashboard.png)



## Credits

Utilizes [OpenWeather API](https://openweathermap.org/)



## Links

[Source repository](https://github.com/Athear/Weather-Dashboard)

[Live link](https://athear.github.io/Weather-Dashboard/)