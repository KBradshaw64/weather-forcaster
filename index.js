var searchBtn = document.getElementById('search-btn');
var currentTemp = document.getElementById('current-forecast-temp');
var currentWind = document.getElementById('current-forecast-wind');
var currentHum = document.getElementById('current-forecast-hum');
var weekly = document.getElementById('5-day');
var previousSearch = document.getElementById('previous-search');



function getApi() {
    var cityName = document.getElementById('search-input')
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName.value + '&limit=3&units=imperial&appid=61b1a371ad3841eac980339ee6ae116f';
    var listSearch = document.createElement('li');
    localStorage.setItem("cityName", cityName.value);
    for (var i = 0; i < localStorage.cityName.length; i++)
        listSearch.textContent = localStorage.cityName[i].value;
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
                //i cant find where it would be printing the future forecasts with console.log(data2)
        });
    localStorage.getItem('cityName')
    previousSearch.appendChild(listSearch);    
}

searchBtn.addEventListener('click', getApi);