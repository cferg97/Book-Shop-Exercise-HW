let arrayOfBooks = []
const row = document.querySelector(".row")
const buyNow = document.getElementById("buy-now")
const cartList = document.getElementById("cart-list")

const loadBooks = () => {
    fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
       return response.json()
    })
    .then((books) => {
        console.log(books)
       return arrayOfBooks = [...books]
    })
}

const renderBooks = (array) => {
    row.innerHTML = ""

    if (Array.isArray(array)) {
        array.forEach(books => {
            const col = document.createElement("div")
            col.className = "col-2 mt-4"
            col.innerHTML = `
                <div id="book-all" class="card mb-2 text-center">
                <a onclick = "hideCard(event)" id="skip" class="btn btn-danger mt-2">Skip this Book</a>
                <img src="${books.img}" class="card-img-top mb-3" alt="${books.title}" />
                <div class="card-body">
                    <h5 class="card-title">${books.title}</h5>
                    <p class="card-text">${books.category}</p>
                    <a id="buy-btn" href="#" class="btn btn-primary">$${books.price}</a>
                    <a id="buy-btn buy-now" onclick = "addToCart(event)" class="btn btn-warning">Buy Now</a>
                </div>
            </div>` 
            row.appendChild(col) 
        })
    }
}

const hideCard = (event) => {
    let card = event.target.closest(".card")
    card.classList.add("d-none")
}

const filterBooks = () => {
    let searchBar = document.getElementById("search-bar")
    const searchQuery = searchBar.value
    const filteredBooks = arrayOfBooks.filter(books => books.title.toLowerCase().includes(searchQuery.toLowerCase()))
            renderBooks(filteredBooks)
}

const addToCart = (event) => {
    let card = event.target.closest(".card-body")
    const buy = document.createElement("div")
    buy.className = "added"
    buy.innerText = "Added to Cart"

    let bookDetails = card.innerText
    bookDetails = removeLastWord(bookDetails)
    bookDetails = removeLastWord(bookDetails)
    
    console.log(bookDetails)
    card.appendChild(buy)

    let li = "<li>" + bookDetails + "</li>"
    cartList.innerHTML += li + `<button id="remove" type="button" class="btn btn-danger" style="font-size: 0.75em">Remove</button>`

}

function refreshPage(){
    window.location.reload();
} 


function removeLastWord(str) {
    const lastIndexOfSpace = str.lastIndexOf(' ');
  
    if (lastIndexOfSpace === -1) {
      return str;
    }
  
    return str.substring(0, lastIndexOfSpace);
}




const searchBtn = document.getElementById("search")
searchBtn.addEventListener("click", filterBooks)
