class rickAndMordy {
  constructor(
    url,
    charectersContainer,
    infoContainer,
    episodeContainer,
    searchInput
  ) {
    this.url = url;
    this.charactersContainer = charectersContainer;
    this.infoContainer = infoContainer;
    this.episodeContainer = episodeContainer;
    this.searchInput = searchInput;
    this.episodesList = [];
    this.favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  }

  get() {
    axios
      .get(this.url)
      .then((rest) => rest.data)
      .then(({ results }) => {
        this.charectersRenderUi(results, this.charactersContainer);
        this.search(this.searchInput, results);
        app.clicked(results);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  search(input, searchArry) {
    input.addEventListener("input", (e) => {
      const userSearchText = e.target.value.toLowerCase();
      const searchResult = searchArry.filter((item) =>
        item.name.toLowerCase().includes(userSearchText)
      );
      this.charectersRenderUi(searchResult, this.charactersContainer);
    });
  }

  clicked(arry) {
    this.charactersContainer.addEventListener("click", (e) => {
      let characterId = null;
      
      if (e.target.tagName == "H2" || e.target.tagName == "P") {
        characterId = e.target.parentElement.parentElement.parentElement.id;
      } else if (e.target.tagName == "IMG") {
        characterId = e.target.parentElement.parentElement.id;
      } else if (e.target.classList.contains("favourites-btn")) {
        characterId = e.target.parentElement.id;
        const favourit = arry.find((item) => characterId == item.id);
        const isFavourite = this.favourites.some(f => f.id === favourit.id);
        if (!isFavourite) {
          this.favourites.push(favourit);
          localStorage.setItem("favourites", JSON.stringify(this.favourites));
        } else {
          this.favourites = this.favourites.filter(f => f.id !== favourit.id);
          localStorage.setItem("favourites", JSON.stringify(this.favourites));
        
        }
      } else {
        characterId = e.target.id;
      }
    
      const resultsRender = arry.filter((item) => characterId == item.id);
      this.charectersInfoRenderUi(resultsRender, this.infoContainer);
      this.grtEpisodes(resultsRender);
    });
  }
  
  
  grtEpisodes(character) {
    this.episodesList = [];
    character.forEach((item) => {
      let promises = item.episode.map((i) =>
        axios
          .get(i)
          .then((rest) => rest.data)
          .then((data) => {
            this.episodesList.push(data);
            return data;
          })
          .catch((err) => {
            console.error(err);
          })
      );

      Promise.all(promises).then(() => {
        this.episodesRenderUi(this.episodesList, this.episodeContainer);
      });
    });
  }

  episodesRenderUi(contentArry, container) {
    container.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add(
      "episodes-container",
      "w-full",
      "h-1/2",
      "bg-[#03346E]",
      "rounded-3xl",
      "p-3",
      "text-white",
      "overflow-y-scroll",
      "hide-scroll-bar"
    );

    const h2 = document.createElement("h2");
    h2.innerText = "List of Epilodes";
    h2.classList.add("text-3xl", "opacity-75", "self-start");

    const ol = document.createElement("ol");
    ol.classList.add("list-decimal", "list-inside");

    contentArry.forEach((item) => {
      let li = document.createElement("li");
      li.classList.add(
        "font-medium",
        "flex",
        "items-center",
        "justify-between"
      );
      li.innerHTML = `<span>${item.episode} : <span class="font-black">${item.name}</span></span><span class="bg-slate-600 flex h-10 m-2 p-2 rounded-3xl">${item.air_date}</span>`;

      // container.appendChild(li);
      ol.appendChild(li);
    });
    div.appendChild(h2);
    div.appendChild(ol);
    container.appendChild(div);
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
      div.innerHTML = `<div class="flex gap-3 justify-between">
              <img src="${
                item.image
              }" alt="" class="bg-slate-600 w-14 h-14 rounded" />
              <div class="name text-white ">
                <h2> ${this.genderStiker(item)} ${item.name}</h2>
                <p> ${item.status} - ${item.species}</p>
              </div>
              
            </div>
            <svg
            class="favourites-btn w-8 bg-white h-8 text-white rounded font-bold flex justify-center items-center p-1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="#f00000"
            height="20px"
            width="20px"
            version="1.1"
            id="Capa_1"
            viewBox="0 0 471.701 471.701"
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
                <path
                  d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"
                />
              </g>
            </g>
          </svg>`;
      div.setAttribute("id", `${item.id}`);
      container.appendChild(div);
    });
  }

  charectersInfoRenderUi(contentArry, container) {
    container.innerHTML = "";
    contentArry.forEach(() => {
      const div = document.createElement("div");
      div.classList.add(
        "info",
        "w-full",
        "h-full",
        "bg-[#03346E]",
        "rounded-3xl",
        "overflow-hidden",
        "flex"
      );
      div.innerHTML = `<img src="${contentArry[0].image}" alt="" />
            <div class="textsContainer h-full p-2">
              <h2 class="text-lg text-white font-semibold">${contentArry[0].status} ${contentArry[0].species}</h2>
              <div>
                <p class="text-lg text-white/40 font-medium">Last known location:</p>
                <p class="text-lg text-white font-bold">${contentArry[0].location.name}</p>
              </div>
             
    </button>
              </div>`;
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
  document.querySelector(".episodes-part"),
  document.querySelector("#search")
);
app.get();
