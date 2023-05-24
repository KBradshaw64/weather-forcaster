var searchBtn = document.getElementById('search-btn');


function getApi() {
    var cityName = document.getElementById('search-input')
    var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName.textContent + '&limit=3&units=imperial&appid=61b1a371ad3841eac980339ee6ae116f';

    fetch(requestUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            var cityCast = document.getElementById('current-forecast')
            var fiveDay = document.getElementById('5-day')
            cityCast.textContent = data.list.main.temp

        });
}

searchBtn.addEventListener('click', getApi);