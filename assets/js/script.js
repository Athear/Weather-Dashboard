//TODO - prevent empty box from being entered
//TODO - handle garbage entries (note: they return status=SUCCESS, but data is an empty array)


// City Search:
var $serachText = $("#city-serach");
var $searchButton = $("#search-button");
//api key
//c50cfa9857ec1e54321df1ab3b472201
var apiKey = 'c50cfa9857ec1e54321df1ab3b472201'

function fetchWeatherMain(cityName){
    console.log(cityName);
    
    //NOTE: this can be more specific, but we are only returning the top result
    var geoApiURL = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=1&appid="+apiKey

    $.ajax({
        method:'GET',
        url:geoApiURL,
    }).then(function(data){
        if(data.length){
            console.log("success");
            console.log(data);
            buttonFactory(cityName);
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

fetchWeatherData(lat,lon){

    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude={part}&appid="+apiKey

    $.ajax({
        method:'GET',
        url:apiURL,
    }).then(function(data){
        console.log(data);
    },function(obj,status,error){
        console.log("failure");
        console.log(obj);
        console.log(status);
        console.log(error);
    })
}



function buttonFactory(buttonVal){
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