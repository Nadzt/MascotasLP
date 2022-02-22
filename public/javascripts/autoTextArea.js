const textAreas = document.getElementsByClassName("autosize");
for (let i = 0; i < textAreas.length; i++) {
  textAreas[i].setAttribute("style", "height:" + (textAreas[i].scrollHeight) + "px;");
  textAreas[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}