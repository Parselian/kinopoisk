const searchForm = document.querySelector('#search-form'),
      movie = document.querySelector('#movies');

function apiSearch(e) {
    e.preventDefault();
    
    const searchText = document.querySelector('#search-text').value,
    server = 'https://api.themoviedb.org/3/search/multi?api_key=4972f9604512b405b07549b264ab48d8&language=ru-RU&query=' + searchText;
    requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
    const request = new XMLHttpRequest();

    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4) return;

        if(request.status !== 200) {
            console.log('error:' + request.status);
            return;
        }

        const output = JSON.parse(request.responseText);

        let inner = '';

        output.results.forEach(function (item) {
            let nameItem = item.name || item.title,
                releaseDate = item.first_air_date || item.release_date,
                poster = item.poster_path,
                overview = item.overview;
            
            if(overview.length > 140) {
                let her = overview.slice(0,141);
                overview = her + '...';
            }

            inner += `<div class="col-xs-12 col-sm-8 col-md-6 film">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${poster}">
                        
                        <div class="description">
                            <div class="title">${nameItem}</div>

                            <div class="release-date"> дата выхода: (${releaseDate})</div>

                            <p class="overview">${overview}</p>
                        </div>
                     </div>`;    
            console.log(poster.value);
        });

        movie.innerHTML = inner;

        console.log(output);
    });
}
