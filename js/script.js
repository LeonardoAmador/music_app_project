function main() {
  const btnDialog = document.querySelector(".btnActionDialog");
  const dialogBox = document.querySelector(".formMain");
  const buttonCloseDialog = document.querySelector(".closeDialog");
  const addLyricButton = document.querySelector("#LyricButton ");
  const formInputSub = document.querySelector("#formInputSub");
  //Click actions
  btnDialog.addEventListener("click", addDialog, false);
  buttonCloseDialog.addEventListener("click", removeDialog, false);
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
