//TODO - prevent empty box from being entered
//TODO - handle garbage entries (note: they return status=SUCCESS, but data is an empty array)


// City Search:
var $serachText = $("#city-serach");
var $searchButton = $("#search-button");
//api key
//c50cfa9857ec1e54321df1ab3b472201
var apiKey = 'c50cfa9857ec1e54321df1ab3b472201'

function fetchWeatherMain(cityName){
  
    //NOTE: this can be more specific, but we are only returning the top result
    var geoApiURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=1&appid="+apiKey

    $.ajax({
        method:'GET',
        url:geoApiURL,
    }).then(function(data){
        if(data.length){
            // console.log(data);
            buttonFactory(data[0].name);
            $("#city-name").text(data[0].name);
            fetchWeatherData(data[0].lat,data[0].lon);
        }else{
            alert("No city '"+cityName+"' was found")
        }
    },function(obj,status,error){
        console.log("failure");
        console.log(obj);
        console.log(status);
        console.log(error);
    })
}

function fetchWeatherData(lat,lon){

    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly,alerts&units=imperial&appid="+apiKey

    $.ajax({
        method:'GET',
        url:apiURL,
    }).then(function(data){
        console.log(data);

        //Current weather
        var currentWeather = data.current

        $("#temp-span").text(currentWeather.temp)
        $("#humidity-span").text(currentWeather.humidity)
        $("#wind-span").text(currentWeather.wind_speed)
        $("#uv-span").text(currentWeather.uvi)

        //future forecast - 5 days only
        for(var i=0;i<5;i++){
            getForecastCard(data.daily[i])
        }
    },function(obj,status,error){
        console.log("failure");
        console.log(obj);
        console.log(status);
        console.log(error);
    })
}

function getForecastCard(daily){

// <div class="card weather-card" >
// <div class="card-header"><p>1/24/2021</p></div>
// <img src="" class="card-img-top" alt="">
// <ul class="list-group list-group-flush">
//     <li class="list-group-item fs-6">Temp:</li>
//     <li class="list-group-item">Humidity:</li>
// </ul>
// </div>

var date =new Date(daily.dt*1000)

var card = $("<div class='card weather-card'>");
var header = $("<div class='card-header'><p>"+date.toLocaleDateString("en-US")+"</p></div>")
var image = $("<img src='' class='card-img-top' alt=''>")

}

function buttonFactory(buttonVal){
    //check if button already exists
    if(!$("[data-city-name="+buttonVal+"]").length){

        newButton = $("<button>");
        newButton.attr("data-city-name",buttonVal);
        newButton.text(buttonVal);

        //layout elements
        newRow = $("<div class='row'>");
        newCol = $("<div class='col-sm-12'>");

        newCol.append(newButton);
        newRow.append(newCol);
        $(".search-log").append(newRow)
    }
}

$("#search-button").on("click",function(event){
    event.preventDefault()
    var cityName = $("#city-serach").val()
    $("#city-serach").val("") //empty the search text box
    if(cityName){ //prevent empty string
        fetchWeatherMain(cityName)
    }
});

$(".search-log").on("click","button",function(){
    fetchWeatherMain($(this).data("city-name"));
})