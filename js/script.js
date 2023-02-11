const HOST = "http://127.0.0.1:3000/v1/";
let audioPlaying = false;
function main() {
  const btnDialog = document.querySelector("#btnActionDialog");
  const dialogBox = document.querySelector(".formMain");
  const buttonCloseDialog = document.querySelector(".closeDialog");
  const addLyricButton = document.querySelector("#LyricButton");
  const formInputSub = document.querySelector("#formInputSub");
  const music_input = document.querySelector("#music_input");
  const mainCard = document.querySelector(".cardPopularAndRecommended");
  const submitForm = document.querySelector("#submitForm");
  const form = document.querySelector("form");
  const image_file = document.querySelector("#image_file");
  const mainPlayerMusic = document.querySelector("#mainPlayerMusic");
  let subs_arr = [];
  let music_duration = 0;

  //Actions
  music_input.addEventListener("change", removeOrAddActions);
  image_file.addEventListener("change", removeLabel);
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

  function removeLabel() {
    document.querySelector("#afterChangeImage").remove();
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
    mainCard.insertAdjacentHTML(
      "beforeend",
      `<h4 style="color:#fff" id='loadingS'>Loading Musics ...</h4>`
    );
    const response = await fetch(`${HOST}musics`);
    let albumCard = await response.json();
    document.querySelector("#loadingS").remove();
    if (albumCard["user_musics"].length >= 1) {
      albumCard["user_musics"].forEach((el) => {
        mainCard.insertAdjacentHTML(
          "beforeend",
          `
          <figure class="albumCard" onclick='actionPlayOrPause(${el.id})'>
            <div class="albumImageCard">
                <span class="material-symbols-outlined">favorite</span>
                <img src="${el.image_url}" alt="" class="albumImage">
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
      `
        );
      });
    } else {
      mainCard.insertAdjacentHTML(
        "beforeend",
        `<div style="margin:50px 20px"><p style="color:#fff">0 Musics Found</p></div>`
      );
    }
  }

  form.addEventListener("submit", (event) => {
    submitForm.disabled = true;
    submitForm.value = "Uploading";
    let audio_ref = document.getElementById("audio_preview");
    event.preventDefault();

    const formData = new FormData(form);

    formData.append("song_size", audio_ref.duration);
    formData.append("subs_payload", JSON.stringify(subs_arr));
    fetch(`${HOST}/musics`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        submitForm.disabled = false;
        window.location.href = "/music_app_project";
      })
      .catch((error) => console.error(error));
  });
  getMusics();
}

main();

//Out Functions
async function actionPlayOrPause(currentMusicId) {
  if(document.querySelector('#navPlayerMusic')){
    document.querySelector('#navPlayerMusic').remove();
  }
  const response = await fetch(`${HOST}musics/${currentMusicId}`);
  let albumCard = await response.json();
  mainPlayerMusic.insertAdjacentHTML(
    "beforeend",
    `
  <div class="navPlayerMusic" id="navPlayerMusic">
    <audio controls id="audio_player" style="display:none">
        <source src="${albumCard['user_music'].music_url}">
    </audio>
    <div class="progressBar" id='progressBar'></div>
      <div class="musicInfos">
        <div class="infos">
          <img src="${albumCard['user_music']['image_url']}" style="width:30px"/>
            <h4>${albumCard["user_music"].name}</h4>
            <p>${albumCard["user_music"].song_size}</p>
        </div>
        <div class="playerButton" onclick='playMusic()'>
          <span class="material-symbols-outlined" id="togglePlayer"> play_arrow </span>
        </div>
      </div>
    </div>`
  );
}

function playMusic(){
  if(document.querySelector('#audio_player')){
    const progressBar = document.querySelector('#progressBar')
    progressBar.style.width = "0px";
    player = document.querySelector('#audio_player')

    player.addEventListener('timeupdate', function() {
      let audioPorcentage =  (player.currentTime / player.duration) * 100;
      progressBar.style.width = `${audioPorcentage.toFixed(2)}%`
    });

    if(!audioPlaying){
      document.querySelector('#togglePlayer').innerText = 'pause' 
      player.play();
      audioPlaying = true;
    }else {
      document.querySelector('#togglePlayer').innerText = 'play_arrow'
      player.pause();
      audioPlaying = false;
    }
  }
}
