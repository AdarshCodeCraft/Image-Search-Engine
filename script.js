let input = document.querySelector(".search input");

let btn = document.querySelector(".btn button");

let gallary = document.querySelector(".gallary");

let load = document.querySelector("#load");

const accessKey = "wy-GhBraMVx9TIra4gmRxAU1SwcL6Qum0PGeg7dQfqQ";

let page = 1;

let keyword = "";

function download(imgurl) {
  fetch(imgurl)
    .then((res) => res.blob())

    .then((file) => {
      let a = document.createElement("a");

      a.href = URL.createObjectURL(file);

      a.download = new Date().getTime();

      a.click();
    })

    .catch(() => alert("Failed to download"));
}

async function getResponse() {
  keyword = input.value;

  let url = `https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=50`;

  let response = await fetch(url);

  let data = await response.json();

  let results = data.results;

  if (page == 1) {
    gallary.innerHTML = "";
  }

  results.map((result) => {
    let li = document.createElement("li");

    li.classList.add("images");

    let html = `<img src="${result.preview_photos[0].urls.small}" alt="img">




                <div class="detail">


           
           
                <div class="user">


            
            
                <img src="photo.svg/camera.svg" alt="img">





                        <span class="imp">${result.title}</span>




                    </div>




                    <div class="download" onclick=download('${result.preview_photos[0].urls.small}')>



                        <img src="photo.svg/download.svg" alt="img">



                    </div>



                </div>`;

    li.innerHTML = html;

    gallary.appendChild(li);
  });
}

input.addEventListener("keyup", (e) => {
  page = 1;

  if (e.key === "Enter") {
    getResponse();
  }
});

btn.addEventListener("click", () => {
  page = 1;

  getResponse();
});

load.addEventListener("click", () => {
  page++;

  getResponse();
});
