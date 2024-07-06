import { animateRecentMovies, animateMovieDetails, animateHeroLogo } from './animation.js';
// API key for OMDB
const apiKey = 'YOUR_API_KEY';

// Get references to HTML elements
const searchInput = document.getElementById('movieTitle');
const suggestionsDiv = document.getElementById('autocompleteSuggestions');
const loadingDiv = document.getElementById('loading');
const movieInfoDiv = document.getElementById('movieInfo');
const recentMoviesList = document.getElementById('recentMoviesList');

// Timeout variable for debouncing
let timeout = null;

// Event listener to fetch recent movies when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  fetchRecentMovies();
  animateHeroLogo()
});
// index.js


// Event listener for search input field
searchInput.addEventListener('input', () => {
  clearTimeout(timeout);
  const query = searchInput.value.trim();

  // Fetch movies if the query length is more than 2 characters
  if (query.length > 2) {
    timeout = setTimeout(() => {
      fetchMovies(query);
    }, 300); // Debounce the input to avoid excessive API calls
  } else {
    suggestionsDiv.innerHTML = '';
  }
});

// Event listener for form submission
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const movieTitle = searchInput.value;
  fetchMovieDetails(movieTitle);
});

// Function to fetch movies based on user input
function fetchMovies(query) {
  fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      suggestionsDiv.innerHTML = '';
      if (data.Response === "True") {
        // Iterate over the search results and create suggestions
        data.Search.forEach(movie => {
          const suggestion = document.createElement('div');
          suggestion.classList.add('suggestion');
          suggestion.innerHTML = ` 
            <strong>${movie.Title}</strong> (${movie.Year})<br>
            <em>${movie.Type}</em>
          `;

          // Add click event to fetch and display detailed information
          suggestion.addEventListener('click', () => {
            searchInput.value = movie.Title;
            suggestionsDiv.innerHTML = '';
            fetchMovieDetails(movie.imdbID);
          });

          suggestionsDiv.appendChild(suggestion);
        });
      }
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
}

// Function to fetch and display movie details
function fetchMovieDetails(imdbID) {
  loadingDiv.style.display = 'block';
  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      loadingDiv.style.display = 'none';
      if (data.Response === "True") {
        const movieDetails = {
          title: data.Title,
          plot: data.Plot,
          director: data.Director,
          released: data.Released,
          poster: data.Poster
        };

        // Save to localStorage
        localStorage.setItem('movieDetails', JSON.stringify(movieDetails));

        displayMovieDetails(movieDetails);
        animateMovieDetails(); // Call animation function here
      } else {
        movieInfoDiv.innerHTML = `<p>Movie not found!</p>`;
      }
    })
    .catch(error => {
      loadingDiv.style.display = 'none';
      console.error('Error:', error);
      movieInfoDiv.innerHTML = `<p>Something went wrong!</p>`;
    });
}

function displayMovieDetails(data) {
  // Update background image
  const backgroundElement = document.getElementById('movieInfoSectionBackground');
  backgroundElement.style.backgroundImage = `url(${data.poster})`;

  // Update movie details
  movieInfoDiv.innerHTML = ` <div id="movieInfoContainer">
      <img src="${data.poster}" alt="Movie Poster">
      <div id="movieInformation">
    <h2 class="title">${data.title}</h2>
    <p class="plot">${data.plot}</p>
    <p><strong class="director">Director:</strong> ${data.director}</p>
    <p><strong class="released">Released:</strong> ${data.released}</p>
    </div>
  </div>
  `;
  
  // Animate background opacity
  gsap.to(backgroundElement, { opacity: 0.4, duration: 0.5 });
}

// Function to fetch recent movies based on the current year
function fetchRecentMovies() {
  const currentYear = new Date().getFullYear();
  const recentMoviesQuery = `https://www.omdbapi.com/?s=movie&y=${currentYear}&apikey=${apiKey}`;
  
  fetch(recentMoviesQuery)
    .then(response => response.json())
    .then(data => {
      recentMoviesList.innerHTML = '';
      if (data.Response === "True") {
        // Iterate over the search results and create movie cards
        data.Search.forEach(movie => {
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
          movieCard.innerHTML = `<div id="movieCardContainer">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie-details">
              <h3>${movie.Title} (${movie.Year})</h3>
              <p>${movie.Type}</p>
            </div></div>
          `;

          // Add click event to fetch and display detailed information
          movieCard.addEventListener('click', () => {
            fetchMovieDetails(movie.imdbID);
          });

          recentMoviesList.appendChild(movieCard);
        });

        // Save to localStorage
        localStorage.setItem('recentMovies', recentMoviesList.innerHTML);

        animateRecentMovies();
      } else {
        recentMoviesList.innerHTML = '<p>No recent movies found!</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching recent movies:', error);
    });
}

// Function to load the state from localStorage
function loadState() {
  const savedMovieDetails = localStorage.getItem('movieDetails');
  if (savedMovieDetails) {
    displayMovieDetails(JSON.parse(savedMovieDetails));
    animateMovieDetails(); // Call animation function here
  }

  const savedRecentMovies = localStorage.getItem('recentMovies');
  if (savedRecentMovies) {
    recentMoviesList.innerHTML = savedRecentMovies;
    animateRecentMovies();
  }
}

