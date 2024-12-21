const BASE_URL = "https://dummyjson.com";
const wrapperEl = document.querySelector(".details__wrapper");
const counterEl = document.querySelector(".counter");

async function fetchProductDetails(id) {
    let params = new URLSearchParams(window.location.search);
    const response = await fetch(`${BASE_URL}/products/${params.get("id")}`);
    response
        .json()
        .then((res) => {
            createDetails(res);
        })
        .catch((error) => {
            console.log(error); 
        })
        .finally(() => {
            console.log("Request completed");
        });
}
function updateCounter() {
    let count = parseInt(counterEl.querySelector(".details__count").textContent);
    counterEl.querySelector(".details__count").textContent = count + 1;
}
const createDetails = (data) => {
    
    const card = document.createElement("div");
    card.classList.add("details__content");
    card.innerHTML = ` <div class="details__img">
                    <img src="${data.thumbnail}" alt="">

                    <div class="details__desc">
                        <h3>${data.description}</h3>
                        <p>🚚 FREE SHIPPING</p>
                    </div>
                </div>
                <div class="details__info">
                    <h3 class="details__heading">${data.title}</h3>
                    <div class="details__selling">
                        <div class="details__pricing">
                            <p class="details__price">${data.price}$</p>
                            <div class="details__counter">
                                <span>Quantity</span>
                                <div class="counter">
                                    <button class="details__btn">-</button>
                                    <span class="details__count">1</span>
                                    <button class="details__btn">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="details__purchasing">
                            <div class="one">
                                <input type="radio" class="details__radio1"> One time purchase
                            </div>
                            <div class="recurring">
                                <span> <input type="radio" class="details__radio2"> Subscribe and delivery every <select
                                        name="" id="">
                                        <option value="4">4 weeks</option>
                                        <option value="5">5 weeks</option>
                                        <option value="6">6 weeks</option>
                                        <option value="7">7 weeks</option>
                                        <option value="8">8 weeks</option>
                                    </select></span>
                                <p class="recurring__desc">
                                    Subscribe now and get the 10% of discount on every recurring order. The discount
                                    will be applied at checkout.
                                    <a href="">See details</a>
                                </p>
                            </div>
                        </div>

                    </div>

                    <button class="details__buy"> <i class="fas fa-shopping-cart"></i> <i class="fas fa-plus"></i>Add to
                        cart</button>

                    <div class="details__additional">
                        <p><strong>Brand:</strong> ${data.brand}</p>
                        <p><strong>Warranty:</strong> ${data.warrantyInformation}</p>
                        <span><strong>Width:</strong> ${data.dimensions.width}   </span><span><strong>Height:</strong> ${data.dimensions.height}   </span><span><strong>Weight:</strong> ${data.weight} </span>
                    </div>
                </div>`;
    wrapperEl.appendChild(card);
};


fetchProductDetails();