function main() {
  const HOST = "http://127.0.0.1:3000/v1/";
  const btnDialog = document.querySelector("#btnActionDialog");
  const dialogBox = document.querySelector(".formMain");
  const buttonCloseDialog = document.querySelector(".closeDialog");
  const addLyricButton = document.querySelector("#LyricButton");
  const formInputSub = document.querySelector("#formInputSub");
  const music_input = document.querySelector("#music_input");
  const mainCard = document.querySelector(".cardPopularAndRecommended");
  const submitForm = document.querySelector("#submitForm");
  const form = document.querySelector("form");
  let subs_arr = [];
  let music_duration = 0;
  getMusics();
  //Actions
  music_input.addEventListener("change", removeOrAddActions);
  btnDialog.addEventListener("click", addDialog);
  buttonCloseDialog.addEventListener("click", removeDialog);
  addLyricButton.addEventListener("click", addSubTitles);

  function addDialog() {
    dialogBox.style.display = "unset";
  }

  function removeDialog() {
    dialogBox.style.display = "none";
  }

  function removeOrAddActions({ target }) {
    music_file = target.files[0];
    url_blob = URL.createObjectURL(target.files[0]);
    submitForm.style.display = "unset";
    document.getElementById("afterChange").remove();
    document.getElementById("afterChange").insertAdjacentHTML(
      "beforeend",
      `
        <div style='margin:20px 0px'>
        <div style='margin:20px 0px'>
          <audio controls id="audio_preview">
            <source src="${url_blob}">
          </audio>
        </div>
        <a class="input_upload">Remove Music</a>
        </div>
    `
    );
  }

  function addSubTitles() {
    let audio_ref = document.getElementById("audio_preview");
    let list = document.createElement("p");
    list.className = "chip_list";
    subs_arr.push({
      time: audio_ref.currentTime,
      sub_text: formInputSub.value,
    });
    list.innerHTML = formInputSub.value + "time: " + audio_ref.currentTime;
    document.getElementById("subs").appendChild(list);
  }
  async function getMusics() {
    const response = await fetch(`${HOST}musics`);
    let albumCard = await response.json();

    console.log(albumCard['user_musics']);

    albumCard['user_musics'].forEach((el) => {
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
                <span class="size">${el.song_size}</span>
                <span class="material-symbols-outlined">share</span>
            </div>
        </figure>
      `);
    }); 
  }

  form.addEventListener("submit", (event) => {
    let audio_ref = document.getElementById("audio_preview");
    event.preventDefault();

    const formData = new FormData(form);
    formData.append('song_size', audio_ref.duration);
    formData.append('subs_payload',JSON.stringify(subs_arr));
    fetch(`${HOST}/musics`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  });
}

main();
