var tomtomURL="https://api.tomtom.com/search/2/search/";
var openWeatherMapURL="https://api.openweathermap.org/data/2.5/forecast?";
var fuzzyLocation = "";
var latitude = "";
var longitude = "";
var date = "";
var dayOfWeek = "";
var high = "";
var low = "";
var forecast = "";
var visibility = "";
var humidity = "";
var icon = "";
var date2 = "";
var dayOfWeek2 = "";
var high2 = "";
var low2 = "";
var forecast2 = "";
var visibility2 = "";
var humidity2 = "";
var icon2 = "";
var date3 = "";
var dayOfWeek3 = "";
var high3 = "";
var low3 = "";
var forecast3 = "";
var visibility3 = "";
var humidity3 = "";
var icon3 = "";
var date4 = "";
var dayOfWeek4 = "";
var high4 = "";
var low4 = "";
var forecast4 = "";
var visibility4 = "";
var humidity4 = "";
var icon4 = "";
var date5 = "";
var dayOfWeek5 = "";
var high5 = "";
var low5 = "";
var forecast5 = "";
var visibility5 = "";
var humidity5 = "";
var icon5 = "";
var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var mapData = {};
var weatherData = {};
var loc = "";
var dateHistory = "";
var numRequests = "";
var displayData = "";
var dt = {};
var fullData = {};
var day1Icon = "";

function getFuzzySearch() {
	fuzzyLocation = $("#fuzzySearch").val();
	fuzzyLocation = fuzzyLocation.replaceAll(" ", "%20");
	getLatLong();
}

function getLatLong() {
	a=$.ajax({
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
	a=$.ajax({
		url: openWeatherMapURL + 'lat=' + latitude + '&lon=' + longitude + '&appid=' + '46b875a0bca3b1ae8aa37c06d9d3fe02&units=imperial',
		method: "GET"
	}).done(function(data) {
		date = data.list[0].dt_txt;
		let obj = new Date(date);
		let number = obj.getDay();
		dayOfWeek = weekday[number];
		high = data.list[0].main.temp_max;
		low = data.list[0].main.temp_min;
		forecast = data.list[0].weather[0].description;
		visibility = data.list[0].visibility;
		humidity = data.list[0].main.humidity;
		icon = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";
		$("#icon").attr("src", icon);
		$("#date").text(date);
		$("#dayOfWeek").text(dayOfWeek);
		$("#high").text(high);
		$("#low").text(low);
		$("#forecast").text(forecast);
		$("#visibility").text(visibility);
		$("#humidity").text(humidity);

		date2 = data.list[8].dt_txt;
		let obj2 = new Date(date2);
                let number2 = obj2.getDay();
		dayOfWeek2 = weekday[number2];
		high2 = data.list[8].main.temp_max;
                low2 = data.list[8].main.temp_min;
                forecast2 = data.list[8].weather[0].description;
                visibility2 = data.list[8].visibility;
                humidity2 = data.list[8].main.humidity;
		icon2 = "https://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + "@2x.png";
		$("#icon2").attr("src", icon2);
                $("#date2").text(date2);
                $("#dayOfWeek2").text(dayOfWeek2);
                $("#high2").text(high2);
                $("#low2").text(low2);
                $("#forecast2").text(forecast2);
                $("#visibility2").text(visibility2);
                $("#humidity2").text(humidity2);

		date3 = data.list[16].dt_txt;
		let obj3 = new Date(date3);
                let number3 = obj3.getDay();
                dayOfWeek3 = weekday[number3];
                high3 = data.list[16].main.temp_max;
                low3 = data.list[16].main.temp_min;
                forecast3 = data.list[16].weather[0].description;
                visibility3 = data.list[16].visibility;
                humidity3 = data.list[16].main.humidity;
		icon3 = "https://openweathermap.org/img/wn/" + data.list[16].weather[0].icon + "@2x.png";
		$("#icon3").attr("src", icon3);
                $("#date3").text(date3);
                $("#dayOfWeek3").text(dayOfWeek3);
                $("#high3").text(high3);
                $("#low3").text(low3);
                $("#forecast3").text(forecast3);
                $("#visibility3").text(visibility3);
                $("#humidity3").text(humidity3);

		date4 = data.list[24].dt_txt;
		let obj4 = new Date(date4);
                let number4 = obj4.getDay();
                dayOfWeek4 = weekday[number4];
                high4 = data.list[24].main.temp_max;
                low4 = data.list[24].main.temp_min;
                forecast4 = data.list[24].weather[0].description;
                visibility4 = data.list[24].visibility;
                humidity4 = data.list[24].main.humidity;
		icon4 = "https://openweathermap.org/img/wn/" + data.list[24].weather[0].icon + "@2x.png";
		$("#icon4").attr("src", icon4);
                $("#date4").text(date4);
                $("#dayOfWeek4").text(dayOfWeek4);
                $("#high4").text(high4);
                $("#low4").text(low4);
                $("#forecast4").text(forecast4);
                $("#visibility4").text(visibility4);
                $("#humidity4").text(humidity4);

		date5 = data.list[32].dt_txt;
		let obj5 = new Date(date5);
                let number5 = obj5.getDay();
                dayOfWeek5 = weekday[number5];
                high5 = data.list[32].main.temp_max;
                low5 = data.list[32].main.temp_min;
                forecast5 = data.list[32].weather[0].description;
                visibility5 = data.list[32].visibility;
                humidity5 = data.list[32].main.humidity;
		icon5 = "https://openweathermap.org/img/wn/" + data.list[32].weather[0].icon + "@2x.png";
		$("#icon5").attr("src", icon5);
                $("#date5").text(date5);
                $("#dayOfWeek5").text(dayOfWeek5);
                $("#high5").text(high5);
                $("#low5").text(low5);
                $("#forecast5").text(forecast5);
                $("#visibility5").text(visibility5);
                $("#humidity5").text(humidity5);
		
		weatherData = JSON.stringify(data);
		addData();
	}).fail(function(error) {
		console.log("error", error.statusText);
	});
}

function addData() {
	a=$.ajax({
		url: 'http://localhost:8080/final.php?',
		method: 'POST',
		data: {
			method:"setWeather",
			location:fuzzyLocation.replaceAll("%20", " "),
			MapJson:mapData,
			WeatherJson:weatherData
		}
	}).done(function(data) {
		console.log("done");
	}).fail(function(error) {
		console.log("error", error.statusText);
	});
}

function displayHistory() {
	dateHistory = $("#day").val();
	numRequests = $("#numRequests").val();
	a=$.ajax({
		url: 'http://localhost:8080/final.php?method=getWeather&dateTime=' + dateHistory,
		method: 'GET',
		dataType: 'json'
	}).done(function(data) {
		db = JSON.parse(JSON.stringify(data));
                for (let i=0; i<numRequests; i++) {
                        dt = JSON.parse(JSON.stringify(data.result[i].DateTime));
			loc = JSON.parse(JSON.stringify(db.result[i].Location));			$("#history").append("<tr id='tr" + i + "'>");
			$("#tr" + i).append("<th> <input type='button' value='Show Full History' id='displayFull" + i + "' + onclick='displayFullHistory("+i+")'></th>");
        		$("#tr" + i).append("<th>" + dt + "</th>");
        		$("#tr" + i).append("<th>" + loc + "</th>");	
		}
	}).fail(function(error) {
		console.log("error", error.statusText);
	});		
}

function displayFullHistory(i) {
	mapData = JSON.parse(JSON.parse(JSON.stringify(db.result[i].MapJson)));
        weatherData = JSON.parse(JSON.parse(JSON.stringify(db.result[i].WeatherJson)));
	$("#tr" + i).append("<th>" + mapData.results[0].position.lat + "</th>");
	$("#tr" + i).append("<th>" + mapData.results[0].position.lon + "</th>");		
	$("#tr" + i).append("<th>" + "<img src=https://openweathermap.org/img/wn/" + weatherData.list[0].weather[0].icon + "@2x.png>" + "<br>Day 1 High: " + weatherData.list[0].main.temp_max + "&deg; F<br>Day 1 Low: " + weatherData.list[0].main.temp_min + "&deg; F<br>Day 1 Forecast: " + weatherData.list[0].weather[0].description + "<br>Day 1 Visibility: " + weatherData.list[0].visibility + "m<br>Day 1 Humidity: " + weatherData.list[0].main.humidity + "%<br><br><img src=https://openweathermap.org/img/wn/" + weatherData.list[8].weather[0].icon + "@2x.png>" + "<br>Day 2 High: " + weatherData.list[8].main.temp_max + "&deg; F<br>Day 2 Low: " + weatherData.list[8].main.temp_min + "&deg; F<br>Day 2 Forecast: " + weatherData.list[8].weather[0].description + "<br>Day 2 Visibility: " + weatherData.list[8].visibility + "m<br>Day 2 Humidity: " + weatherData.list[8].main.humidity + "%<br><br><img src=https://openweathermap.org/img/wn/" + weatherData.list[16].weather[0].icon + "@2x.png>" + "<br>Day 3 High: " + weatherData.list[16].main.temp_max + "&deg; F<br>Day 3 Low: " + weatherData.list[16].main.temp_min + "&deg; F<br>Day 3 Forecast: " + weatherData.list[16].weather[0].description + "<br>Day 3 Visibility: " + weatherData.list[16].visibility + "m<br>Day 3 Humidity: " + weatherData.list[16].main.humidity + "%<br><br><img src=https://openweathermap.org/img/wn/" + weatherData.list[24].weather[0].icon + "@2x.png>" + "<br>Day 4 High: " + weatherData.list[24].main.temp_max + "&deg; F<br>Day 4 Low: " + weatherData.list[24].main.temp_min + "&deg; F<br>Day 4 Forecast: " + weatherData.list[24].weather[0].description + "<br>Day 4 Visibility: " + weatherData.list[24].visibility + "m<br>Day 4 Humidity: " + weatherData.list[24].main.humidity + "%<br><br><img src=https://openweathermap.org/img/wn/" + weatherData.list[32].weather[0].icon + "@2x.png>" + "<br>Day 5 High: " + weatherData.list[32].main.temp_max + "&deg; F<br>Day 5 Low: " + weatherData.list[32].main.temp_min + "&deg; F<br>Day 5 Forecast: " + weatherData.list[32].weather[0].description + "<br>Day 5 Visibility: " + weatherData.list[32].visibility + "m<br>Day 5 Humidity: " + weatherData.list[32].main.humidity + "%</th>");
}
