// Your code here
// Define the URL for fetching movie data
const url = "http://localhost:3000/films";

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Fetch movie data from the server
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            // Display movie titles in the menu
            displayMenu(data);
            // Select the first movie for detailed rendering
            const onLoad = data[0];
            // Render detailed info of the first movie
            renderInfo(onLoad);
            return data;
        })
        .catch((error) => {
            console.log(error);
        });

    // Select elements for movie details display
    const movieTitle = document.getElementById('title');
    const runtime = document.getElementById('runtime');
    const filmInfo = document.getElementById('film-info');
    const showtime = document.getElementById('showtime');
    const moviePoster = document.querySelector('#poster');
    const ticketNum = document.querySelector('#ticket-num');
    const remainingTickets = document.querySelector("#remaining-tickets");
    const buyTicket = document.getElementById("buy-ticket");

    // Render detailed information about a movie
    function renderInfo(movieData) {
        moviePoster.setAttribute('src', `${movieData.poster}`);
        movieTitle.textContent = `${movieData.title}`;
        runtime.textContent = `${movieData.runtime} minutes`;
        filmInfo.textContent = `${movieData.description}`;
        showtime.textContent = `${movieData.showtime}`;
        ticketNum.innerText = `${movieData.capacity} tickets`;
        let availableTickets = movieData.capacity - movieData.tickets_sold;
        console.log(availableTickets);
        remainingTickets.innerText = `${availableTickets} remaining-tickets`;

        // Add click event listener to buy ticket button
        buyTicket.addEventListener('click', () => {
            if (availableTickets >= 1) {
                availableTickets -= 1;
                remainingTickets.innerText = `${availableTickets} remaining-tickets`;
                updateTickets(movieData);
            } else {
                // Change button text and add sold-out class
                buyTicket.textContent = 'Sold Out';
                movieTitle.classList.add('sold-out');
            }
        });
    }

    // Display movie titles in the menu
    function displayMenu(movieList) {
        movieList.forEach((movie) => {
            const list = document.createElement('li');
            list.className = 'film item';
            list.id = `${movie.title}`;
            list.innerText = `${movie.title}`;

            // Create delete button for each movie
            const deleteButton = document.createElement('button');
            const deleteContainer = document.createElement('div');
            deleteContainer.className = 'delContainer';
            list.appendChild(deleteContainer);
            deleteButton.className = 'deleteFilm';
            deleteButton.innerHTML = 'type= button ';
            deleteButton.innerText = "Delete Film";
            const sidebar = document.getElementById('films');
            deleteContainer.appendChild(deleteButton);
            sidebar.appendChild(list);

            // Add click event listener to delete button
            deleteButton.addEventListener('click', () => {
                removeFilm(movie.id);
            });
        });
    }

    // Update tickets sold for a movie
    function updateTickets(movieData) {
        movieData.tickets_sold += 1;
        console.log(movieData.tickets_sold);
        fetch(`${url}/${movieData.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ tickets_sold: movieData.tickets_sold })
        }).then(res => {
            res.json()
        }).then(data => console.log(data));
    }

    // Remove a movie from the list
    function removeFilm(id) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => res.json()).then(data => console.log(data));
    }
});
