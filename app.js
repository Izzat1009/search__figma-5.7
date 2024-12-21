const wrapperEl = document.querySelector(".wrapper")
const loadingEl = document.querySelector(".loading")
const btnSeemore = document.querySelector(".btn__seemore")
const BASE_URL = "https://dummyjson.com"

async function fetchData(endpoint){
    const response = await fetch(`${BASE_URL}${endpoint}`)
    response
        .json()
        .then((res)=> createCard(res))
        .catch((err) => console.log(err))
        .finally(()=> {
            loadingEl.style.display = "none"
        })
}

window.addEventListener("load", ()=>{
    createLoading(5)
    fetchData("/products?limit=5")

})

function createLoading(n){
    Array(n).fill().forEach(()=>{
        const div = document.createElement("div")
        div.className = "loading__item"
        div.innerHTML = `
            <div class="loading__image to-left"></div>
            <div class="loading__title to-left"></div>
            <div class="loading__title to-left"></div>
        `
        loadingEl.appendChild(div)
    })
}

function createCard(data){
    data.products.forEach(product=> {
        const divEl = document.createElement("div")
        divEl.className = "card"
        divEl.innerHTML = `
            <img src=${product.thumbnail} alt="rasm">
            <h3>${product.title}</h3>
            <p>${product.price} USD</p>
            <button>Buy now</button>
        `
        wrapperEl.appendChild(divEl)    
    })
    
}

let offset = 1
btnSeemore.addEventListener("click", ()=>{
    offset++
    fetchData(`/products?limit=5&skip=${offset * 5}`)

})
