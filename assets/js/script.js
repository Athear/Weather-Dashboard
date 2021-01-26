

// City Search:
var $serachText = $("#city-serach");
var $searchButton = $("#search-button");


function fetchWeather(cityName){
    console.log(cityName);
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
    buttonFactory(cityName)
    fetchWeather(cityName)
});

$(".search-log").on("click","button",function(){
    fetchWeather($(this).data("city-name"));
})