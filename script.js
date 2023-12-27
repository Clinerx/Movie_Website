// * This API is for movie cards
const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
// * This one is for showing the picture
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
// * This API is for searching movies
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
// * getting variables inside HTML
const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");

// * initially get fav movies
getMovies(APIURL);

/* This function is to get or fetch a data from
 the API that has been provided
*/
async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

// * This funtion is to show the rate of each movie
function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

// * This function is after cliking enter it will go to the related movie
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});
