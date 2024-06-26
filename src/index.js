// Define the URL for fetching movie data
const url = "http://localhost:3000/films";

// Select elements for movie details display
const movieTitle = document.getElementById('title');
const runtime = document.getElementById('runtime');
const filmInfo = document.getElementById('film-info');
const showtime = document.getElementById('showtime');
const moviePoster = document.querySelector('#poster');
const ticketNum = document.querySelector('#ticket-num');
const remainingTickets = document.querySelector("#remaining-tickets");
const buyTicket = document.getElementById('buy-ticket');
const deleteButton = document.getElementById('delete-button'); // Add the delete button

// Variables to hold the data
let currentMovie = null; // Store currently selected movie
let MoviesData = []; // Store movie data

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Fetch movie data from the server
    fetch(`${url}`)
        .then(res => res.json())
        .then((data) => {
            if (Array.isArray(data)) {
                MoviesData = data;
                if (data.length > 0) {
                    currentMovie = data[0];
                    renderInfo(currentMovie);
                }
                // Display movie titles in the menu
                displayMenu(MoviesData);
            }
        })
        .catch((error) => {
            console.log(error);
        });

    // Render detailed information about a movie
    function renderInfo(movie) {
        moviePoster.setAttribute('src', `${movie.poster}`);
        movieTitle.textContent = `${movie.title}`;
        runtime.textContent = `${movie.runtime} minutes`;
        filmInfo.textContent = `${movie.description}`;
        showtime.textContent = `${movie.showtime}`;
        ticketNum.innerText = `${movie.capacity} tickets`;
        let availableTickets = movie.capacity - movie.tickets_sold;
        remainingTickets.innerText = `${availableTickets} remaining tickets`;
        if (movie.tickets_sold >= movie.capacity) {
            buyTicket.innerText = 'Sold Out';
            buyTicket.setAttribute("disabled", true);
        } else {
            buyTicket.textContent = 'Buy Ticket';
            buyTicket.removeAttribute('disabled');
        }
        // Add click event listener to buy ticket button
        buyTicket.addEventListener('click', buyingticket);
    }

    function buyingticket() {
        if (currentMovie) {
            if (currentMovie.tickets_sold < currentMovie.capacity) {
                currentMovie.tickets_sold++;
                updateTickets(currentMovie);
            }
        }
    }

    // Display movie titles in the menu
    function displayMenu(movieList) {
        const sidebar = document.getElementById('films');
        movieList.forEach((movie) => {
            const list = document.createElement('li');
            list.className = 'film item';
            list.id = `${movie.title}`;
            list.textContent = `${movie.title}`;
            // Create delete button for each movie
            const deleteButton = document.createElement('button');
            deleteButton.className = 'deleteFilm';
            deleteButton.innerText = "Delete Film";
            list.appendChild(deleteButton);
            sidebar.appendChild(list);

            // Add click event listener to delete button
            deleteButton.addEventListener('click', () => {
                removeFilm(movie.id);
            });

            list.addEventListener('click', () => {
                currentMovie = movie;
                renderInfo(movie);
            });
        });
    }

    // Update tickets sold for a movie
    function updateTickets(movie) {
        fetch(`${url}/${movie.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(movie),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((ChangedMovie) => {
            currentMovie = ChangedMovie;
            renderInfo(ChangedMovie);
        })
        .catch((error) => {
            console.error('error is', error);
        });
    }

    // Remove a movie from the list
    function removeFilm(movieId) {
        fetch(`${url}/${movieId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(() => {
            MoviesData = MoviesData.filter((movie) => movie.id !== movieId);
            currentMovie = null;
            moviePoster.removeAttribute('src');
            movieTitle.textContent = '';
            runtime.textContent = '';
            filmInfo.textContent = '';
            showtime.textContent = '';
            ticketNum.innerText = '';
            buyTicket.setAttribute("disabled", true);
            deleteButton.setAttribute("disabled", true);
            displayMenu(MoviesData);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
