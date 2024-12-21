const productEL = document.querySelector(".products"); 
const BASE_URL = "https://dummyjson.com";
const btnSeemore = document.querySelector(".btn__seemore")

const perPageCount = 4
let offset = 0
let productEndpoint = "/products"
{
    btnSeemore.addEventListener("click", ()=>{
    offset++
   
    fetchData(`${productEndpoint}?limit=${perPageCount}&skip=${offset * perPageCount}`)
})
}




async function fetchData(endpoint) {
    const response  = await fetch(`${BASE_URL}${endpoint}`)
    response
        .json()
        .then((res)=> createCard(res))
        .catch((err)=> console.log(err))
        .finally(()=>{
            loadingElement.style.display = "none"
        })
}

window.addEventListener("load", ()=>{
    fetchData("/product?limit=4")
})

function createCard(data) {
    data.products.forEach(product => {
        const divEl = document.createElement("div");
        divEl.className = "card";
        divEl.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h4>${product.title}</h4>
            <p>Price: $${product.price}</p>
            <h3>Brand: ${product.brand}</h3>
            <button>Buy now</button>
        `;
        productEL.appendChild(divEl);
    });
}

function createLoading() {
    const loadingEl = document.createElement("div");
    loadingEl.className = "loading";
    loadingEl.innerText = "Loading...";
    productEL.appendChild(loadingEl);
}
