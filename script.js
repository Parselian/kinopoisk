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
                bornDate = item.first_air_date || item.release_date;

            inner += `<div class="col-12">
                        ${nameItem}
                        <span style="font-weight: bold"> (${bornDate})</span>
                     </div>`;    
            console.log(bornDate);
        });

        movie.innerHTML = inner;

        console.log(output);
    });
}
