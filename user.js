document.addEventListener("DOMContentLoaded", () =>{
const wrapperEl = document.querySelector(".wrapper");
const loadingEl = document.querySelector(".loading");
const btnSeemore = document.querySelector(".btn__seemore")


const perPageCount = 4
let offset = 0
let productEndpoint = "/users"

btnSeemore.addEventListener("click", ()=>{
    offset++
   
    fetchData(`${productEndpoint}?limit=${perPageCount}&skip=${offset * perPageCount}`)
})






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
    fetchData("/user?limit=4")
})

function createCard(data){
    data.users.forEach(user=> {
        const divEl = document.createElement("div")
        divEl.className = "card"


        divEl.innerHTML = `
            <img src="${user.image}" alt="${user.firstName} ${user.lastName}">
                    <h2>${user.firstName} ${user.lastName}</h2>
                    <p><strong>Age:</strong> ${user.age}</p>
                    <p><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:${user.phone}">${user.phone}</a></p>
        `
        wrapperEl.appendChild(divEl)    
    })
    
}
})