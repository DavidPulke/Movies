const API = 'https://yts.mx/api/v2/movie_details.json';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    if (movieId) {
        loadMovie(movieId);
    } else {
        document.getElementById('video-player').src = '';
        document.getElementById('movie-title').textContent = 'Movie not found';
        document.getElementById('movie-description').textContent = 'Please provide a valid movie ID.';
    }
});

async function loadMovie(movieId) {
    try {
        const response = await fetch(`${API}?movie_id=${movieId}`);
        const data = await response.json();
        const movie = data.data.movie;
        if (movie) {
            document.getElementById('video-player').src = movie.url ? movie.url : '';
            document.getElementById('movie-title').textContent = movie.title;
            document.getElementById('movie-description').textContent = movie.description_full;
        } else {
            document.getElementById('video-player').src = '';
            document.getElementById('movie-title').textContent = 'Movie not found';
            document.getElementById('movie-description').textContent = 'The movie you are looking for does not exist.';
        }
    } catch (error) {
        console.error('Error fetching movie:', error);
        document.getElementById('video-player').src = '';
        document.getElementById('movie-title').textContent = 'Error';
        document.getElementById('movie-description').textContent = 'Something went wrong. Please try again later.';
    }
}
