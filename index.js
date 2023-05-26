var searchBtn = document.getElementById('search-btn');
var currentTemp = document.getElementById('current-forecast-temp');
var currentWind = document.getElementById('current-forecast-wind');
var currentHum = document.getElementById('current-forecast-hum');
var weekly = document.getElementById('5-day');
var previousSearch = document.getElementById('previous-search');
var cityName = document.getElementById('search-input')


function getApi() {
    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName.value + '&limit=3&units=imperial&appid=61b1a371ad3841eac980339ee6ae116f';
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
                    currentTemp.textContent = "It's °" + data2.main.temp + " F in " + data2.name + ", " + country + " right now.";
                    currentWind.textContent = "Wind: " + data2.wind.speed + " MPH";
                    currentHum.textContent = "Humidity: " + data2.main.humidity + " %";
                })
            fetch(dataURL2)
                .then(function(response3){
                    return response3.json();
                })
                .then(function(data3){
                    console.log(data3);
                    //need to create a new div for each day forecasted with <p> elements that print the info pulled from the arrays - noon starts at object[3] and updates in 3 hour blocks so every [8] objects is 24 hours
                    //seperate functions and call them inside of the click even function so it reads cleaner
                    var foreCard = document.querySelectorAll('.forecast-card');
                    var foreIndex = 0;
                    //clears previous data
                    for (var j = 0; j < foreCard.length; j++){
                        while (foreCard[j].hasChildNodes()){
                            foreCard[j].removeChild(foreCard[j].firstChild);
                    }}
                    for (var i = 3; i < 35; i++) {
                        var forcTemp = document.createElement('p');
                        var forcWind = document.createElement('p');
                        var forcHum = document.createElement('p');
                        if (i === 3 || i === 11 || i === 19 || i === 27 || i === 35){  
                            forcTemp.textContent = "°" + data3.list[i].main.temp + "F";
                            forcWind.textContent = "Wind: " + data3.list[i].wind.speed + " MPH";
                            forcHum.textContent = "Humidity: " + data3.list[i].main.humidity + "%";
                            foreCard[foreIndex].append(forcTemp);
                            //foreCard[foreIndex].innerHTML += '<br>';
                            foreCard[foreIndex].append(forcWind);
                            foreCard[foreIndex].append(forcHum);
                            foreIndex++;
                            //avoids a nested for loop
                            //having a very difficult time formatting this appended text - can't get it to align as rows in a box for each section


                        // weekly.child[i].append(forcTemp);
                        // weekly.append(forcWind);
                        // weekly.append(forcHum);
                        //weekly.setAttribute("p",'.forecast-card');
                    }}    

                })
        //getLast();
        });  
}

//need to add local storage set and get capabilty as well as a place to print those values as a button that activates the getAPI()

function getLast() {
    var listSearch = document.createElement('li');
    var lastItem = JSON.parse(localStorage.getItem('cityname'));
    for (var i = 0; i < lastItem; i++) {
        listSearch.textContent = localStorage.cityname[i].value;
        previousSearch.appendChild(listSearch); 
    }
}

searchBtn.addEventListener('click', getApi);