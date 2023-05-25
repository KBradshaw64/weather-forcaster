var searchBtn = document.getElementById('search-btn');
var currentTemp = document.getElementById('current-forecast-temp');
var currentWind = document.getElementById('current-forecast-wind');
var currentHum = document.getElementById('current-forecast-hum');
var weekly = document.getElementById('5-day');


function getApi() {
    var cityName = document.getElementById('search-input')
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName.value + '&limit=3&units=imperial&appid=61b1a371ad3841eac980339ee6ae116f';

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var dataURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&appid=61b1a371ad3841eac980339ee6ae116f';
            var country = data[0].state
            fetch(dataURL)
                .then(function(response2){
                    return response2.json();
                })
                .then(function(data2){
                    console.log(data2);
                    currentTemp.textContent = "It's °" + data2.main.temp + " in " + data2.name + ", " + country + " right now."
                    currentWind.textContent = "Wind: " + data2.wind.speed + " MPH"
                    currentHum.textContent = "Humidity: " + data2.main.humidity + " %"
                })
        });
}

searchBtn.addEventListener('click', getApi);