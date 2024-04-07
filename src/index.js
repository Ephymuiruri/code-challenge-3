// Your code here
const url= "http://localhost:3000/films"
const config ={}
document.addEventListener("DOMContentLoaded",()=>{
    fetch(url)
    .then(res =>res.json())
    .then((data)=>{
        // Display movie titles in the menu
        displayMenu(data)
        const onLoad= data[0]
        console.log(onLoad)
        //Render detailed info of the first movie
        renderInfo(onLoad)
    })
    .catch((error)=>{console.log(`error is ${error}`)})

    function renderInfo (movieData){
       const movieTitle=document.getElementById('title')
       const runtime = document.getElementById('runtime')
       const filmInfo =document.getElementById('film-info')
       const showtime= document.getElementById('showtime')
       const moviePoster= document.getElementById('poster')
       moviePoster.setAttribute("src",`${movieData.poster}`)
       movieTitle.textContent= `${movieData.title}`
       runtime.textContent=`${movieData.runtime} minutes`
       filmInfo.textContent=`${movieData.description}`
       showtime.textContent=`${movieData.showtime}`
    }
    function displayMenu (movieLlist){
       movieLlist.forEach((movie) => {
       const list=document.createElement('li')
       list.className='film item'
       list.innerText=`${movie.title}`
       const sidebar=document.getElementById('films')
       sidebar.appendChild(list)
       });
    }
})

