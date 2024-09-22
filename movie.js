// globabally available
let allFilterButton = document.querySelectorAll("#filterContainer span"); 
let movieCards = document.getElementById("movieCards"); 
let userInput = document.getElementById("userInput");

let currFilt; 
let currPage; 

//& previous and Next button Functionality
let page = 1; 
let previousBtn = document.querySelector("#previous"); 
let nextBtn = document.querySelector("#next"); 
 
let previousBtnFunc = ()=>{
    // console.log(page); 
    if(page>1){
        page--; 
        getMovies(userInput.value.trim(),filterQuery,page);  
    }else{
        page=1; 
    }
}
previousBtn.addEventListener("click", previousBtnFunc)

let nextBtnFunc = ()=>{
    page++;
    // console.log("Page: ", page); 
    getMovies(userInput.value.trim(),filterQuery,page);  
}
nextBtn.addEventListener("click", nextBtnFunc);

//& Main function to fetch data from API
async function getMovies(inp="", filt="All", pag="1")
{   
    nextBtn.addEventListener("click", nextBtnFunc); 
    // previousBtn.addEventListener("click", previousBtnFunc); 

    currFilt = filt;
    currPage = pag; 
                                                        // console.log("input=",inp); 
    inp = (inp==="")?"king":inp; 
    filt = (filt==="All")?"":`&type=${filt}`;
                                                        // (filt==="")?console.log("type=All"):console.log(filt); 
    pag = (pag==="1")?"":`&page=${pag}`; 

    try{
        let api = `https://www.omdbapi.com/?s=${inp}&apikey=4d8bec6f${filt}${pag}`; 
        // https://www.omdbapi.com/?s=Batman&apikey=4d8bec6f&page=1
        // console.log(api); 
        let response = await fetch(api); 
        let data = await response.json(); 

        if(data.Search.length<10){
            nextBtn.removeEventListener("click", nextBtnFunc); 
            // console.log("nextBtn addEventListener removed"); 
        } 
        
        // console.log("Array Length: ", data.Search.length); 
        showMovies(data.Search);

    }
    catch (error) {
        document.querySelector("#showAll").classList.remove("active"); 
        movieCards.innerHTML = `<h1>No data Found</h1>`; 
    }
}
getMovies(); 

function showMovies(movies){


    pageContainer.classList.remove("hide")
    pageNo.innerText = `${page}`; 
    // console.log(allFilterButton);

    // console.log(data); 

    movieCards.innerHTML = ""
    movies.forEach( (movie) => {
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

        //&Adding Event Listener to each film card
        film.addEventListener("click", ()=>{
            
            film.classList.toggle("eventNone"); 

            // nextBtn.classList.add("hide"); 
            // previousBtn.classList.add("hide"); 

            filterContainer.classList.add("hide"); 
            movieCards.classList.add("hide"); 
            let cardContainer =  document.getElementById("cardContainer");
            cardContainer.classList.add("showCardContainer"); 

            // console.log(film); 
            //* Creating HTML of Specific Movie card 
            cardContainer.innerHTML = ""
            cardContainer.append(film); 

            let closeButton = document.createElement("button"); 
            let closeBtnText = document.createTextNode(" Close ");
            closeButton.appendChild(closeBtnText);
            closeButton.setAttribute("id", "closeIt");
            closeButton.classList.add("closeBtn"); 
 
            cardContainer.append(closeButton); 

            //! Hiding Page Section
            pageContainer.classList.toggle("hide")

            //! Add Event Listener to Close Button
            closeButton.addEventListener("click", closeButtonFunc);

        });
    });
}

//! Function Add to EventListener of Close Button
let closeButtonFunc =  () => {

    pageContainer.classList.toggle("hide")
    filterContainer.classList.remove("hide"); 
    movieCards.classList.remove("hide"); 
    cardContainer.classList.remove("showCardContainer");
    cardContainer.innerHTML = ""; 

    getMovies(userInput.value.trim(), currFilt, currPage); 
}


//& adding EventListener to user input value
let timeout;
userInput.addEventListener("input", ()=>inputFunction());
function inputFunction(){
    clearTimeout(timeout); 
    timeout = setTimeout(()=>{ 
        closeButtonFunc(); 
        // allFilterButton.forEach(ele=>{ ele.classList.remove("active") }); 
        // document.querySelector("#showAll").classList.add("active"); 
        getMovies(userInput.value.trim(), currFilt); 
    }, 1000)
}

//& search functionality
let searchBtn = document.getElementById("searchBtn"); 
searchBtn.addEventListener( ("click"), ()=>{getMovies(userInput.value.trim());} )

//& filtering
let filterMovie = document.querySelector("#filterContainer"); 
let filterQuery; 
filterMovie.addEventListener("click", (e)=>{
    if(e.target===filterMovie){
        e.stopPropagation();
    }
    else{
        allFilterButton.forEach(ele=>{ ele.classList.remove("active") })
        page=1;
        let filterButton = e.target; 
        filterQuery = filterButton.innerText;
        filterButton.classList.toggle("active");  
        getMovies(userInput.value.trim(), filterQuery); 
    }
})

let pageContainer = document.querySelector(".pageContainer"); 
let pageNo = document.getElementById("pageNo"); 



 


