// movie-details.js
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGEwN2QxNjAzNzI4OTBiMDNlNGYzMmFlM2Q2NWQ0YiIsIm5iZiI6MTcyNDcwNDg1Mi42MzY5MjQsInN1YiI6IjY2Y2NlNWRlMTAwMjNhOWUyMTNlZGRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K8LoaahiEElB9tmXCN2hNbbIzTf2F89AoBgt39biztM'
    }
};


document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");

    if (movieId) {
        fetchMovieDetails(movieId);
    } else {
        alert("Movie ID not found!");
    }
});

async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
        const movieData = await response.json();
        displayMovieDetails(movieData);
    } catch (error) {
        console.error("Error fetching movie details:", error);
        alert("Something went wrong while fetching the movie details.");
    }
}

function displayMovieDetails(movie) {
    const movieTitle = document.querySelector("#title");
    const movieOverview = document.querySelector("#overview");
    const movieRating = document.querySelector("#rating");
    const moviePoster = document.querySelector("#poster");

    movieTitle.textContent = movie.title;
    movieOverview.textContent = movie.overview;
    movieRating.textContent = ` ${movie.vote_average.toFixed(1)}/10`;
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    if (movie.vote_average.toFixed(1) < 7.7 && movie.vote_average.toFixed(1) > 5) {
        movieRating.style.color = "#ff7300"
        movieRating.innerHTML += " &nbsp; Mid"
        moviePoster.style.boxShadow = "0 0 20px #ff7300"
    } else if (movie.vote_average.toFixed(1) < 5) {
        movieRating.style.color = "red"
        movieRating.innerHTML += " &nbsp; Low"
        moviePoster.style.boxShadow = "0 0 20px red"
    } else {
        movieRating.style.color = "#4eff37"
        movieRating.innerHTML += " &nbsp; High"
        moviePoster.style.boxShadow = "0 0 20px #4eff37"
    }
}
