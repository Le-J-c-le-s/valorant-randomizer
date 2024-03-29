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
function transvalue(e) {
  const valeur = document.getElementById("player-count").value;
  if (parseInt(valeur) <= 5) {
    localStorage.setItem("player-count", valeur);
  } else {
    e.preventDefault();
    alert("Have you ever played the game ? 5 is the max, idiot");
  }
}
