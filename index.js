var searchBtn = document.getElementById('search-btn');


function getApi() {
    var requestUrl = 'https://api.openweathermap.org';

    fetch(requestUrl)
        console.log(requestUrl)
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(data){
            console.log(data);
        });
}

searchBtn.addEventListener('click', getApi);