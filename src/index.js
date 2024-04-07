// Your code here
const url= "http://localhost:3000/films"
document.addEventListener("DOMContentLoaded",()=>{
    const movieTitle=document.getElementById('title')
    const runtime = document.getElementById('runtime')
    const filmInfo =document.getElementById('film-info')
    const showtime= document.getElementById('showtime')
    const moviePoster= document.getElementById('poster')
    const ticketNum = document.querySelector('#ticket-num')
    const remainingTickets =document.querySelector("#remaining-tickets")
    const buyTicket =document.getElementById("buy-ticket")
    fetch(url)
    .then(res =>res.json())
    .then((data)=>{
        // Display movie titles in the menu
        displayMenu(data)
        const onLoad= data[0]
        console.log(onLoad)
        //Render detailed info of the first movie
        renderInfo(onLoad)
        return data
    })
    .catch((error)=>{console.log(`error is ${error}`)})

    function renderInfo (movieData){
        moviePoster.setAttribute("src",`${movieData.poster}`)
       movieTitle.textContent= `${movieData.title}`
       runtime.textContent=`${movieData.runtime} minutes`
       filmInfo.textContent=`${movieData.description}`
       showtime.textContent=`${movieData.showtime}`
       ticketNum.innerText=`${movieData.capacity} tickets`
       let availableTickets=movieData.capacity-movieData.tickets_sold
       console.log(availableTickets)
       remainingTickets.innerText=`${availableTickets} remaining-tickets`
       
       
       buyTicket.addEventListener('click',()=>{
        
        if (availableTickets>0){
        availableTickets-= 1
        remainingTickets.innerText=`${availableTickets} remaining-tickets`
        updateTickets(movieData)
        } 
        })
    }
    function displayMenu (movieLlist){
       movieLlist.forEach((movie) => {
       const list=document.createElement('li')
       list.className='film item'
       list.innerText=`${movie.title}`
       const sidebar=document.getElementById('films')
       sidebar.appendChild(list)
       const deleteButton = document.createElement('button')
       deleteButton.className='deleteFilm'
       deleteButton.innerHTML='type= button '
       deleteButton.innerText= "Delete Film"
       list.appendChild(deleteButton)
       deleteButton.addEventListener('click',removefilm(movie))
    });
    
    }
    
    
})
function updateTickets(movieData){
movieData.tickets_sold +=1
console.log(movieData.tickets_sold)
    fetch(`${url}/${movieData.id}`,
    {
        method:'PATCH',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({tickets_sold: movieData.tickets_sold })
    }).then(res=>{res.json()}).then(data=> console.log(data))
}
function removefilm (movieData){
    fetch(`${url}/${movi}`)
}

