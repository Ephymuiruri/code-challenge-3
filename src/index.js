// Your code here
const url= "http://localhost:3000/films"
document.addEventListener("DOMContentLoaded",()=>{
    const movieTitle=document.getElementById('title')
    const runtime = document.getElementById('runtime')
    const filmInfo =document.getElementById('film-info')
    const showtime= document.getElementById('showtime')
    const moviePoster= document.querySelector('#poster')
    const ticketNum = document.querySelector('#ticket-num')
    const remainingTickets =document.querySelector("#remaining-tickets")
    const buyTicket =document.getElementById("buy-ticket")
 fetch(url)
    .then(res =>res.json())
    .then((data)=>{
        // Display movi
        console.log(data)
        displayMenu(data)
        const onLoad = data[0]
        //Render detailed info of the first movie
        renderInfo(onLoad)
        return data
    })
    .catch((error)=>{console.log(error)})

    function renderInfo (movieData){
       moviePoster.setAttribute('src',`${movieData.poster}`)
       movieTitle.textContent= `${movieData.title}`
       runtime.textContent=`${movieData.runtime} minutes`
       filmInfo.textContent=`${movieData.description}`
       showtime.textContent=`${movieData.showtime}`
       ticketNum.innerText=`${movieData.capacity} tickets`
       let availableTickets=movieData.capacity-movieData.tickets_sold
       console.log(availableTickets)
       remainingTickets.innerText=`${availableTickets} remaining-tickets`
       
       
       buyTicket.addEventListener('click',()=>{
        
        if (availableTickets>=1){
        availableTickets-= 1
        remainingTickets.innerText=`${availableTickets} remaining-tickets`
        updateTickets(movieData)
        } else{
           const buyButton=document.getElementById('buy-ticket')
           buyButton.textContent='Sold Out' 
           console.log(movieTitle.textContent)
           document.getElementById(`${movieTitle.textContent}`).classList.add('sold-out')

        }
        })
    }
    function displayMenu (movieLlist){
       movieLlist.forEach((movie) => {
       const list=document.createElement('li')
       list.className='film item'
       list.id=`${movie.title}`
       list.innerText=`${movie.title}`
       const deleteButton = document.createElement('button')
       const deleteContainer=document.createElement('div')
       deleteContainer.className='delContainer'
       list.appendChild(deleteContainer)
       deleteButton.className='deleteFilm'
       deleteButton.innerHTML='type= button '
       deleteButton.innerText= "Delete Film"
       const sidebar=document.getElementById('films')
       deleteContainer.appendChild(deleteButton)
       sidebar.appendChild(list)
       
       deleteButton.addEventListener('click',()=>{
        removefilm(movie.id)})
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
function removefilm(id){
    fetch (`${url}/${id}`,{
        method:'DELETE',
        headers:{
            'content-type':'application/json'
        }
    })
    .then(res=>res.json()).then(data=>console.log(data))
    }








