// globabally available
let api = "https://www.omdbapi.com/?s=king&apikey=4d8bec6f"; 
let allFilterButton = document.querySelectorAll("#filterContainer span"); 
let movieCards = document.getElementById("movieCards"); 
let userInput = document.getElementById("userInput");

async function getMovies(api) {
    try {
        let response = await fetch(api); 
        let data = await response.json(); 
        console.log(data); 
        showMovies(data.Search);
    }catch (error) {
        movieCards.innerHTML = `<h1>No Found Found</h1>`; 
        console.log(error);
    }
}
getMovies(api); 

function showMovies(data){
    console.log(allFilterButton); 
    allFilterButton.forEach(ele=>{ele.classList.remove("filterBgOn");})
    console.log(data); 
    let movies = data; 
    movieCards.innerHTML = ""
    movies.forEach( movie => {
        // console.log(movie); 
        //& Creating HTML of Movie card
        let film = document.createElement("div"); 
        film.classList.add("movie")
        
        let movieImageContainer= document.createElement("div"); 
        movieImageContainer.classList.add("movieImageContainer");
        let movieImage = document.createElement("img"); 
        movieImage.classList.add("movieImage");
        movieImage.classList.add("movieImage");
        let src = movie.Poster==="N/A"?"https://media.istockphoto.com/id/1352945762/vector/no-image-available-like-missing-picture.jpg?s=612x612&w=0&k=20&c=4X-znbt02a8EIdxwDFaxfmKvUhTnLvLMv1i1f3bToog=":movie.Poster;   
        movieImage.setAttribute("src", src); 
        movieImageContainer.append(movieImage); 

        let movieTitle = document.createElement("div"); 
        movieTitle.classList.add("movieTitle");
        let titleText = document.createTextNode (`${movie.Title}`);
        movieTitle.appendChild(titleText); 


        let movieYear = document.createElement("div"); 
        movieYear.classList.add("movieYear"); 
        let yearText = document.createTextNode (`${movie.Year}`);
        movieYear.appendChild(yearText);

        let movieType = document.createElement("div"); 
        movieType.classList.add("movieType"); 
        let typeText = document.createTextNode (`${movie.Type}`);
        movieType.appendChild(typeText);

        film.append(movieImageContainer, movieTitle, movieYear, movieType);

        movieCards.append(film); 

        //&Adding Event Listener to each film
        film.addEventListener("click", ()=>{

            movieCards.classList.add("hide"); 
            console.log(film); 
            let cardContainer =  document.getElementById("cardContainer");
            console.log(cardContainer); 

            cardContainer.classList.add("showCardContainer"); 
            console.log(film); 

            //* Creating HTML of Specific Movie card 
            cardContainer.innerHTML = ""
            cardContainer.append(film); 

            let closeButton = document.createElement("button"); 
            let closeBtnText = document.createTextNode(" Close ");
            closeButton.appendChild(closeBtnText);
            closeButton.setAttribute("id", "closeIt");
            closeButton.classList.add("closeBtn"); 
 
            cardContainer.append(closeButton); 

            //! Add Event Listener to Close Button
            closeButton.addEventListener("click", () => {
                movieCards.classList.remove("hide"); 
                cardContainer.classList.remove("showCardContainer");
                cardContainer.innerHTML = ""; 
                if(!userInput.value){
                    getMovies(api); 
                }
                else{
                    let api = `https://www.omdbapi.com/?s=${userInput.value.trim()}&apikey=4d8bec6f`;  
                    console.log(api)
                    getMovies(api); 
                }
            });
        })
    });
}

//& search functionality
let searchBtn = document.getElementById("searchBtn"); 
searchBtn.addEventListener(("click"), ()=>
    {
    if(!userInput.value){
        getMovies(api); 
    }else{
        let api = `https://www.omdbapi.com/?s=${userInput.value.trim()}&apikey=4d8bec6f`;  
        console.log(api)
        getMovies(api); 
    }
})

//& filtering
let filterMovie = document.querySelector("#filterContainer"); 
filterMovie.addEventListener("click", (e)=>{
    let filterButton = e.target; 
    let filterQuery = filterButton.innerText; 
    console.log(filterQuery);

    if(!userInput.value.trim()){
        getMovies(api); 
    }
    else{
        if(filterQuery==="All"){
            let api = `https://www.omdbapi.com/?s=${userInput.value.trim()}&apikey=4d8bec6f`;  
            console.log(api)
            filterButton.classList.add("filterBgOn");
            getMovies(api);
        }
        else{
            let api = `https://www.omdbapi.com/?s=${userInput.value.trim()}&apikey=4d8bec6f&type=${filterQuery}`;  
            console.log(api)
            filterButton.classList.add("filterBgOn");
            getMovies(api); 
        }
    }  
})

// & adding Event Listener to user input value
let timeout;
userInput.addEventListener("input", ()=>{
        // clearTimeout(); 
        clearTimeout(timeout); 
        timeout = setTimeout(()=>{
            if(!userInput.value.trim()){
                getMovies(api); 
            }
            else{
                let api = `https://www.omdbapi.com/?s=${userInput.value.trim()}&apikey=4d8bec6f`;  
                console.log(api)
                getMovies(api); 
            }
        }, 700)
})


//& previous and Next button Functionality
let previousBtn = document.querySelector("#previous"); 
let nextBtn = document.querySelector("#next"); 
let page = 1; 

previousBtn.addEventListener("click", (e)=>{
    if(page>1){
        // let currentQuery = document.
        let api = `https://www.omdbapi.com/?s=${userInput.value.trim()}&apikey=4d8bec6f&type=${currentQuery}&page=${page}`;  
        console.log(api)
        getMovies(api); 
    }
})

nextBtn.addEventListener("click", ()=>{
    if(page>1){
        // let currentQuery = document.
        let api = `https://www.omdbapi.com/?s=${userInput.value.trim()}&apikey=4d8bec6f&type=${currentQuery}&page=${page}`;  
        console.log(api)
        getMovies(api); 
    }
})


