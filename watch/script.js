document.addEventListener('DOMContentLoaded', () => {
    loadMovies();
    document.getElementById('search-button').addEventListener('click', searchMovies);
});

const API = 'https://yts.mx/api/v2/list_movies.json?quality=3D';

async function loadMovies() {
    try {
        const response = await fetch(API);
        const data = await response.json();
        const movies = data.data.movies;
        displayMovies(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        document.getElementById('movie-container').innerHTML = '<p>Error loading movies. Please try again later.</p>';
    }
}

function displayMovies(movies) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = movies.map(movie => `
        <div class="movie">
            <img src="${movie.medium_cover_image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.year}</p>
            <a href="${movie.url}" class="watch-button" target="_blank">Watch</a>
        </div>
    `).join('');
}

async function searchMovies() {
    const query = document.getElementById('search-input').value;
    try {
        const response = await fetch(`${API}&query_term=${query}`);
        const data = await response.json();
        const movies = data.data.movies;
        displayMovies(movies);
    } catch (error) {
        console.error('Error searching movies:', error);
        document.getElementById('movie-container').innerHTML = '<p>Error searching movies. Please try again later.</p>';
    }
}
