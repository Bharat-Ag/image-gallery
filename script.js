//Pop Up Animations------------------

let img_filter_heading = document.querySelector(".img_filter_option span");
let main_trending = document.querySelector(".main_trending");
let main_trend_links = document.querySelectorAll("li");

let img_trend = () => {
    let icon = document.querySelector(".fa-chevron-down")
    icon.classList.toggle("active")
    main_trending.classList.toggle("active")
}

main_trend_links.forEach(item => {
    item.addEventListener("click", () => {

        let option_val = item.innerText;
        main_trend_links.forEach(ele => {
            ele.classList.remove("active")
        })
        item.classList.add("active")
        img_filter_heading.innerText = option_val;
    })
})

let filter_btn = document.querySelectorAll(".btn");

filter_btn.forEach(btn => {
    btn.addEventListener("click", () => {
        filter_btn.forEach(ele => {
            ele.classList.remove("active")
        })
        btn.classList.add("active")
    })
})

//Main Search Funtionality------------------

let search_input = document.querySelector("#input")
let search_btn = document.querySelector("#search_btn")
let res_div = document.querySelector(".res_div")
let load_more_btn = document.querySelector(".load_more")
let imgDiv = document.querySelector(".res_div")

let perPage = 15;
let currentPage = 1;
let search_container = null;

const apiKey = "CDQpJxCfBJv8gEFX7K219FaQpoNggumb9wIyHjFA1DZbRq5N26CdZvqr";
const url = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`

let getHTML = (images) => {
    imgDiv.innerHTML += images.map(img =>
        `<div class="image">
            <div class="card">
                <img src="${img.src.large2x}" alt="">
                <div class="description flex">
                    <div class="credits">
                        <i class="fa-solid fa-camera"></i>
                        <span>${img.photographer}</span>
                    </div>
                </div>
                <button class="download">
                    <a href="${img.src.large2x}" download target=_blank>
                        <i class="fa-solid fa-download"></i>
                    </a>
                </button>
            </div>
        </div>`
    ).join("")
}

const searchImg = (apiUrl) => {
    load_more_btn.innerText = "Loading..."
    load_more_btn.classList.add("disabled")
    fetch(apiUrl, {
        headers: { Authorization: apiKey }
    }).then(res => res.json()
    ).then(data => {
        getHTML(data.photos)
        load_more_btn.innerText = "Load More"
        load_more_btn.classList.remove("disabled")
    }).catch(() => {
        alert("failed to load images")
    })
}

searchImg(url)

load_more_btn.addEventListener("click", () => {
    currentPage++;
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
    apiURL = search_container ? `https://api.pexels.com/v1/search?query=${search_container}&page=${currentPage}&per_page=${perPage}` : apiURL;
    searchImg(apiURL)
})

function search() {
    currentPage = 1;
    search_container = search_input.value;
    imgDiv.innerHTML = "";
    searchImg(`https://api.pexels.com/v1/search?query=${search_container}&page=${currentPage}&per_page=${perPage}`)
}

let searching = (e) => {
    if (e.key === "Enter") {
        if (e.target.value === "") {
            alert("search field is empty")
        } else {
            search()
        }
    }
}

search_input.addEventListener("keyup", searching)
search_btn.addEventListener("click", search)
