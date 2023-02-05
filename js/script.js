function main() {
  const btnDialog = document.querySelector("#btnActionDialog");
  const dialogBox = document.querySelector(".formMain");
  const buttonCloseDialog = document.querySelector(".closeDialog");
  const addLyricButton = document.querySelector("#LyricButton");
  const formInputSub = document.querySelector("#formInputSub");

  const mainCard = document.querySelector(".cardPopularAndRecommended");
  const albumCard = [
    {
      id: 0,
      image: "https://www.vagalume.com.br/travis-scott/discografia/birds-in-the-trap-sing-mcknight.webp",
      name: "AstroWorld",
      description: "test test test test test test",
      songSize: "2:30"
  }
];

  albumCard.forEach((el) => {
    mainCard.insertAdjacentHTML("beforeend", `
        <figure class="albumCard">
          <div class="albumImageCard">
              <span class="material-symbols-outlined">favorite</span>
              <img src="images/imageAlbum01.webp" alt="" class="albumImage">
          </div>
          <div class="albumDescription">
              <figcaption class="albumTitle">${el.name}</figcaption>
              <p class="albumParagraph">${el.description}</p>
          </div>
          <div class="songSize">
              <span class="size">${el.songSize}</span>
              <span class="material-symbols-outlined">share</span>
          </div>
      </figure>
    `);
  }); 

  //Click actions

  btnDialog.addEventListener("click", addDialog);
  buttonCloseDialog.addEventListener("click", removeDialog);
  addLyricButton.addEventListener("click", addSubTitles);

  function addDialog() {
    dialogBox.style.display = "unset";
  }

  function removeDialog() {
    dialogBox.style.display = "none";
  }

  function addSubTitles() {
    let list = document.createElement("p");
    list.className = "chip_list";
    list.innerHTML = formInputSub.value + "time: 12sec";
    document.getElementById("subs").appendChild(list);
  }
}

main();


