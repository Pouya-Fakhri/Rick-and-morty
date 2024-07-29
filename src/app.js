// https://rickandmortyapi.com/api/character
class rickAndMordy {
  constructor(url, charectersContainer, infoContainer, searchInput) {
    this.url = url;
    (this.charectersContainer = charectersContainer),
      (this.searchInput = searchInput),
      (this.infoContainer = infoContainer);
  }

  get() {
    axios
      .get(this.url)
      .then((rest) => rest.data)
      .then(({ results }) => {
        console.log(results);
        this.charectersRenderUi(results, this.charectersContainer);
        this.search(this.searchInput, results);
        app.clicked(results);
      })
      .ten(()=>{})
      .catch((err) => {
        console.error(err);
      });
  }

  grtEpisodes(id,arry){
    arry.
  }

  search(input, searchArry) {
    input.addEventListener("input", (e) => {
      const userSearchText = e.target.value.toLowerCase();
      const searchResult = searchArry.filter((item) =>
        item.name.toLowerCase().includes(userSearchText)
      );
      this.charectersRenderUi(searchResult, this.charectersContainer);
    });
  }

  charectersInfoRenderUi(contentArry, container) {
    container.innerHTML = "";
    contentArry.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add(
        "info",
        "w-full",
        "h-1/6",
        "bg-[#03346E]",
        "rounded-3xl",
        "overflow-hidden",
        "flex"
      );
      div.innerHTML = `<img src="${contentArry[0].image}" alt="" />
            <div class="textsContainer h-full p-2">
              <h2 class="text-lg text-white font-semibold">${contentArry[0].status} ${contentArry[0].species}</h2>
              <div >
                <p class="text-lg text-white/40 font-medium">Lats known location:</p>
                <p class="text-lg text-white font-bold">${contentArry[0].location.name}</p>
              </div>
              <p class="text-lg text-white/60 font-semibold">this chatacter already is in your favourites</p>
            </div>`;
      div.setAttribute("id", `${item.id}`);
      container.appendChild(div);
    });
  }

  clicked(arry) {
    this.charectersContainer.addEventListener("click", (e) => {
      let characterId = null;
      console.log(e.target.tagName);
      if (e.target.tagName == "H2" || e.target.tagName == "P") {
        characterId = e.target.parentElement.parentElement.parentElement.id;
      } else if (e.target.tagName == "IMG") {
        characterId = e.target.parentElement.parentElement.id;
      } else {
      }
      const resultsRender = arry.filter((item) => characterId == item.id);
      console.log(characterId);
      console.log(resultsRender);
      this.charectersInfoRenderUi(resultsRender, this.infoContainer);
    });
  }

  charectersRenderUi(contentArry, container) {
    container.innerHTML = "";
    contentArry.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add(
        "caracter",
        "bg-[#03346E]",
        "w-full",
        "h-20",
        "rounded-xl",
        "p-4",
        "flex",
        "gap-1",
        "justify-between",
        "items-center",
        "mt-4"
      );
      div.innerHTML = `<div class="flex gap-3">
              <img src="${
                item.image
              }" alt="" class="bg-slate-600 w-14 h-14 rounded" />
              <div class="name text-white">
                <h2> ${this.genderStiker(item)} ${item.name}</h2>
                <p> ${item.status}-${item.species}</p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="#f00000"
              version="1.1"
              id="Capa_1"
              width="30px"
              height="30px"
              viewBox="0 0 442.04 442.04"
              xml:space="preserve"
              stroke="#f00000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <g>
                  <g>
                    <path
                      d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203 c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219 c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367 c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021 c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212 c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071 c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"
                    />
                  </g>
                  <g>
                    <path
                      d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188 c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993 c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5 s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"
                    />
                  </g>
                  <g>
                    <path
                      d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z"
                    />
                  </g>
                </g>
              </g>
            </svg>`;
      div.setAttribute("id", `${item.id}`);
      container.appendChild(div);
    });
  }

  genderStiker(item) {
    if (item.gender === "Male") {
      return "👱‍♂️";
    } else if (item.gender === "Female") {
      return "👱‍♀️";
    } else {
      return "🤔";
    }
  }
}

const app = new rickAndMordy(
  "https://rickandmortyapi.com/api/character",
  document.querySelector(".characters-part"),
  document.querySelector(".info-part"),
  document.querySelector("#search")
);
app.get();
