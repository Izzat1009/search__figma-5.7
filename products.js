const BASE_URL = "https://dummyjson.com";
const wrapperEl = document.querySelector(".products__list");
const searchInput = document.querySelector(".search-input");
const searchDropdown = document.querySelector(".search__drop");
const searchItem = document.querySelector(".search__item");

const fetchProducts = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  response
    .json()
    .then((data) => {
      createCards(data);
    })
    .catch((error) => {
      console.error("Error:", error); 
    })
    .finally(() => {
      console.log("Request completed");
    });
};
window.onload = fetchProducts("/products?limit=8");

const createCards = (data) => {
  data.products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("products__item");
    card.innerHTML = `
        <div class="products__img">
                        <img src="${product.thumbnail}" alt="" data-id="${product.id}">
                    </div>
                    <div class="products__content">
                        <h3 class="products__heading">${product.title}</h3>
                        <p class="products__price">${product.price}$</p>
                    </div>
    `;
    wrapperEl.appendChild(card);
  });
};
searchInput.addEventListener("keyup", async (e)=>{
  const value = e.target.value.trim()
  if(value){
      searchDropdown.style.display = "block"
      const response = await fetch(`${BASE_URL}/products/search?q=${value}&limit=5`)
      response
          .json()
          .then(res => {
              searchDropdown.innerHTML = null
              res.products.forEach((item)=>{
                  const divEl = document.createElement("div")
                  divEl.className = "search__item"
                  divEl.dataset.id = item.id
                  divEl.innerHTML = `
                  <img src=${item.thumbnail} alt="">
                  <div>
                       <p>${item.title}</p>
                  </div>
                  `
                  searchDropdown.appendChild(divEl)
              })
          })
          .catch(err => console.log(err))
  }else{
      searchDropdown.style.display = "none"
  }
})
searchDropdown.addEventListener("click", (e)=>{
  console.log(e.target.dataset.id);
  
 if(e.target.closest(".search__item")){
     open(`./pages/details.html?id=${e.target.closest(".search__item").dataset.id}`, "_self");
 }
})

wrapperEl.addEventListener("click", (e) => {
  if (e.target.closest(".products__img")) {
      open(`./pages/details.html?id=${e.target.dataset.id}`, "_self");
      console.log(e.target.dataset.id);
  }
});

