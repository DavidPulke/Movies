let main = document.querySelector(".movies");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGEwN2QxNjAzNzI4OTBiMDNlNGYzMmFlM2Q2NWQ0YiIsIm5iZiI6MTcyNDcwNDg1Mi42MzY5MjQsInN1YiI6IjY2Y2NlNWRlMTAwMjNhOWUyMTNlZGRjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K8LoaahiEElB9tmXCN2hNbbIzTf2F89AoBgt39biztM'
    }
};

async function movieApi() {
    try {
        let response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options);
        let data = await response.json();
        showData(data.results);
    } catch (error) {
        alert("Something went wrong");
    }
}

function showData(movies) {
    movies.forEach(movie => {
        let movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h1>${movie.title}</h1>
                <p>Rating: ${movie.vote_average.toFixed(1)}/10</p>
            </div>
        `;
        movieCard.onclick = () => {
            window.location.href = `./html/movie-detail.html?id=${movie.id}`;
        };
        main.appendChild(movieCard);
    });
}

movieApi();
