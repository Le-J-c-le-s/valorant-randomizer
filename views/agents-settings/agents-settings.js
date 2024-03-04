// make spinner button works
const playerCount = document.getElementById("player-count");
function stepper(btn) {
  let id = btn.getAttribute("id");
  let min = playerCount.getAttribute("min");
  let max = playerCount.getAttribute("max");
  let value = playerCount.getAttribute("value");
  let step = playerCount.getAttribute("step");

  let calcStep = id == "increment" ? step * 1 : step * -1;
  let newValue = parseInt(value) + calcStep;

  if (newValue >= min && newValue <= max) {
    playerCount.setAttribute("value", newValue);
  }

  console.log(id, min, max, value, step);
  console.log(id, calcStep);
}

// Save player count to local storage
function transvalue() {
  const valeur = document.getElementById("player-count").value;
  localStorage.setItem("player-count", valeur);
}
