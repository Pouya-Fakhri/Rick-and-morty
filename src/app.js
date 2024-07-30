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
  }

  get() {
    axios
      .get(this.url)
      .then((rest) => rest.data)
      .then(({ results }) => {
        console.log(results);
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
      } else {
        characterId = e.target.id;
      }
      const resultsRender = arry.filter((item) => characterId == item.id);

      console.log(characterId);
      console.log(resultsRender);

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
        console.log(this.episodesList);
        this.episodesRenderUi(this.episodesList, this.episodeContainer);
      });
    });
  }

  episodesRenderUi(contentArry, container) {
    console.log(contentArry);
    container.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.innerText = "List of Epilodes";
    h2.classList.add("text-3xl", "opacity-75", "self-start");
    
    // <ol class="list-decimal list-inside" id="episodes-list"></ol>
    const ol = document.createElement("ol");
    ol.

    contentArry.forEach((item) => {
      let li = document.createElement("li");
      li.classList.add(
        "font-medium",
        "flex",
        "items-center",
        "justify-between"
      );
      li.innerHTML = `<span>${item.episode} : <span class="font-black">${item.name}</span></span>
                      <span class="bg-slate-600 flex h-10 m-2 p-2 rounded-3xl">${item.air_date}</span>`;
      container.appendChild(h2);
      // container.appendChild(li);
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
                <p> ${item.status} - ${item.species}</p>
              </div>
            </div>`;
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
              <p class="text-lg text-white/60 font-semibold">this character already is in your favourites</p>
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
  document.querySelector(".episodes-container"),
  document.querySelector("#search")
);
app.get();
