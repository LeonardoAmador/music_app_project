function main() {
  const HOST = 'http://127.0.0.1:3000/v1/';
  let albumCard = null;
  const btnDialog = document.querySelector("#btnActionDialog");
  const dialogBox = document.querySelector(".formMain");
  const buttonCloseDialog = document.querySelector(".closeDialog");
  const addLyricButton = document.querySelector("#LyricButton");
  const formInputSub = document.querySelector("#formInputSub");
  const music_input = document.querySelector("#music_input")
  const mainCard = document.querySelector(".cardPopularAndRecommended");
  let subs_arr = [] 

  getMusics();



  //Click actions
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

  function removeOrAddActions({target}){
    url_blob = URL.createObjectURL(target.files[0]);
    document.getElementById('afterChange').remove();
    document.getElementById('afterChange').insertAdjacentHTML("beforeend", `
        <div style='margin:20px 0px'>
        <div style='margin:20px 0px'>
          <audio controls id="audio_preview">
            <source src="${url_blob}">
          </audio>
        </div>
        <a class="input_upload">Remove Music</a>
        </div>
    `);
  }



  function addSubTitles() {
    let audio_ref = document.getElementById('audio_preview');
    let list = document.createElement("p");
    list.className = "chip_list";
    subs_arr.push({time: audio_ref.currentTime, sub_text: formInputSub.value})
    list.innerHTML = formInputSub.value + "time: " + audio_ref.currentTime;
    document.getElementById("subs").appendChild(list);
  }
  async function getMusics() {
    const response = await fetch(`${HOST}/musics`)
    albumCard = await response.json();
    console.log(albumCard);
  }

  async function createMusic(){
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

main();


