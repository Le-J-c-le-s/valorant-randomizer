// make spinner button works
const moneyAvailable = document.getElementById("money-available");
function stepper(btn) {
  let id = btn.getAttribute("id");
  let min = moneyAvailable.getAttribute("min");
  let max = moneyAvailable.getAttribute("max");
  let value = moneyAvailable.getAttribute("value");
  let step = moneyAvailable.getAttribute("step");

  let calcStep = id == "increment" ? step * 1 : step * -1;
  let newValue = parseInt(value) + calcStep;

  if (newValue >= min && newValue <= max) {
    moneyAvailable.setAttribute("value", newValue);
  }

  console.log(id, min, max, value, step);
  console.log(id, calcStep);
}

function transvalue() {
  const valeur = document.getElementById("money-available").value;
  if (parseInt(valeur) <= 9000) {
    localStorage.setItem("money-available", valeur);
  } else {
    e.preventDefault();
    alert("You've never played the game, 5 is the max, idiot");
  }
}
