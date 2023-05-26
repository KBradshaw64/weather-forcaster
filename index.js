var searchBtn = document.getElementById('search-btn');
var currentTemp = document.getElementById('current-forecast-temp');
var currentWind = document.getElementById('current-forecast-wind');
var currentHum = document.getElementById('current-forecast-hum');
var weekly = document.getElementById('5-day');
var previousSearch = document.getElementById('previous-search');
var cityName = document.getElementById('search-input')


function getApi() {
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName.value + '&limit=3&units=imperial&appid=61b1a371ad3841eac980339ee6ae116f';
    //local storage is not working correctly - I'm not sure if it being stored in the wrong place or called in the wrong place or both 
    localStorage.setItem("cityname", JSON.stringify(cityName.value));
    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var dataURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&appid=61b1a371ad3841eac980339ee6ae116f';
            var country = data[0].state
            var dataURL2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&appid=61b1a371ad3841eac980339ee6ae116f'
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
            fetch(dataURL2)
                .then(function(response3){
                    return response3.json();
                })
                .then(function(data3){
                    console.log(data3);
                    //need to create a new div for each day forecasted with <p> elements that print the info pulled from the arrays - noon starts at object[3] and updates in 3 hour blocks so every [8] objects is 24 hours
                    // for (i = 3; i < 35; i+8)
                        // weekly.appendChild('div')
                        // weekly.children.setAttribute('.forecast-card')


                })
        getLast();
        });  
}

function getLast() {
    var listSearch = document.createElement('li');
    var lastItem = JSON.parse(localStorage.getItem('cityname'));
    for (var i = 0; i < lastItem; i++)
        listSearch.textContent = localStorage.cityname[i].value;
        previousSearch.appendChild(listSearch); 
}

searchBtn.addEventListener('click', getApi);