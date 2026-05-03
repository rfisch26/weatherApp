var tomtomURL = "https://api.tomtom.com/search/2/search/";
var openWeatherMapURL = "https://api.openweathermap.org/data/2.5/forecast?";
var fuzzyLocation = "";
var latitude = "";
var longitude = "";
var mapData = {};
var weatherData = {};
var db = {};
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getFuzzySearch() {
    fuzzyLocation = $("#fuzzySearch").val().replaceAll(" ", "%20");
    getLatLong();
}

function getLatLong() {
    $.ajax({
        url: tomtomURL + fuzzyLocation + '.json?minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&relatedPois=all&key=do3TBJmPHzdl0v5REk2ACWaPzYM5EN25',
        method: "GET"
    }).done(function(data) {
        latitude = data.results[0].position.lat;
        longitude = data.results[0].position.lon;
        mapData = JSON.stringify(data);
        getWeatherData();
    }).fail(function(error) {
        console.log("error", error.statusText);
    });
}

function getWeatherData() {
    $.ajax({
        url: openWeatherMapURL + 'lat=' + latitude + '&lon=' + longitude + '&appid=46b875a0bca3b1ae8aa37c06d9d3fe02&units=imperial',
        method: "GET"
    }).done(function(data) {
        var indices = [0, 8, 16, 24, 32];
        indices.forEach(function(idx, i) {
            var suffix = i === 0 ? "" : (i + 1);
            var date = data.list[idx].dt_txt;
            var dayOfWeek = weekday[new Date(date).getDay()];
            var high = data.list[idx].main.temp_max;
            var low = data.list[idx].main.temp_min;
            var forecast = data.list[idx].weather[0].description;
            var visibility = data.list[idx].visibility;
            var humidity = data.list[idx].main.humidity;
            var icon = "https://openweathermap.org/img/wn/" + data.list[idx].weather[0].icon + "@2x.png";

            $("#icon" + suffix).attr("src", icon);
            $("#date" + suffix).text(date);
            $("#dayOfWeek" + suffix).text(dayOfWeek);
            $("#high" + suffix).text(high);
            $("#low" + suffix).text(low);
            $("#forecast" + suffix).text(forecast);
            $("#visibility" + suffix).text(visibility);
            $("#humidity" + suffix).text(humidity);
        });

        weatherData = JSON.stringify(data);
        addData();
    }).fail(function(error) {
        console.log("error", error.statusText);
    });
}

function addData() {
    $.ajax({
        url: 'http://localhost:8080/final.php?',
        method: 'POST',
        data: {
            method: "setWeather",
            location: fuzzyLocation.replaceAll("%20", " "),
            MapJson: mapData,
            WeatherJson: weatherData
        }
    }).done(function(data) {
        console.log("done");
    }).fail(function(error) {
        console.log("error", error.statusText);
    });
}

function displayHistory() {
    var dateHistory = $("#day").val();
    var numRequests = parseInt($("#numRequests").val());
    $("#history").empty();
    $.ajax({
        url: 'http://localhost:8080/final.php?method=getWeather&dateTime=' + dateHistory,
        method: 'GET',
        dataType: 'json'
    }).done(function(data) {
        db = data;
        for (var i = 0; i < numRequests; i++) {
            var dt = data.result[i].DateTime;
            var loc = data.result[i].Location;
            $("#history").append("<tr id='tr" + i + "'>");
            $("#tr" + i).append("<th><input type='button' value='Show Full History' id='displayFull" + i + "' onclick='displayFullHistory(" + i + ")'></th>");
            $("#tr" + i).append("<th>" + dt + "</th>");
            $("#tr" + i).append("<th>" + loc + "</th>");
        }
    }).fail(function(error) {
        console.log("error", error.statusText);
    });
}

function displayFullHistory(i) {
    $("#displayFull" + i).prop("disabled", true);
    var map = JSON.parse(db.result[i].MapJson);
    var weather = JSON.parse(db.result[i].WeatherJson);

    $("#tr" + i).append("<th>" + map.results[0].position.lat + "</th>");
    $("#tr" + i).append("<th>" + map.results[0].position.lon + "</th>");

    var indices = [0, 8, 16, 24, 32];
    var weatherHTML = "";
    indices.forEach(function(idx, d) {
        var day = d + 1;
        weatherHTML += "<img src='https://openweathermap.org/img/wn/" + weather.list[idx].weather[0].icon + "@2x.png'><br>";
        weatherHTML += "Day " + day + " High: " + weather.list[idx].main.temp_max + "&deg; F<br>";
        weatherHTML += "Day " + day + " Low: " + weather.list[idx].main.temp_min + "&deg; F<br>";
        weatherHTML += "Day " + day + " Forecast: " + weather.list[idx].weather[0].description + "<br>";
        weatherHTML += "Day " + day + " Visibility: " + weather.list[idx].visibility + "m<br>";
        weatherHTML += "Day " + day + " Humidity: " + weather.list[idx].main.humidity + "%<br><br>";
    });
    $("#tr" + i).append("<th>" + weatherHTML + "</th>");
}