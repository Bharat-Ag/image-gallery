let imgWraper = document.querySelector(".image");
let load_more = document.querySelector(".load-more");
let input = document.querySelector("#input");

const apiKey = "CDQpJxCfBJv8gEFX7K219FaQpoNggumb9wIyHjFA1DZbRq5N26CdZvqr";
let perPage = 15;
let currentPage = 1;

let search = null;

let generateHTML = (images) => {
	imgWraper.innerHTML += images.map(img =>
		`<li class="card">
                <img src="${img.src.large2x}" alt="img">
                <div class="desc">
                <div class="credits">
                   <i class="fa-solid fa-camera"></i>
                   <span>${img.photographer}</span>
                </div>
                <button>
				           <i class="fa-solid fa-download"></i>
				        </button>
                </div>
     </li>`
	).join("");
}


let getImages = (apiURL) => {

	load_more.innerHTML = "Loading...";
	load_more.classList.add("disabled");


	fetch(apiURL, {
		headers: { Authorization: apiKey }
	}).then(res => {
		return res.json()
	}).then(data => {
		generateHTML(data.photos)
		load_more.innerHTML = "Load More";
		load_more.classList.remove("disabled");
	}).catch(() => {
		alert("failed to load images")
	})

}

getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`)


load_more.addEventListener("click", () => {
	currentPage++;
	let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;

	apiURL = search ? `https://api.pexels.com/v1/search?query=${search}&page=${currentPage}&per_page=${perPage}` : apiURL;

	getImages(apiURL)
})

input.addEventListener("keyup", (e) => {
	if (e.target.value === "") return search = null
	if (e.key === "Enter") {
		currentPage = 1
		search = e.target.value;
		imgWraper.innerHTML = ""
		getImages(`https://api.pexels.com/v1/search?query=${search}&page=${currentPage}&per_page=${perPage}`);
	}
})
