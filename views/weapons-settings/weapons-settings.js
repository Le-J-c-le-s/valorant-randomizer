function transvalue(event) {
  const dataValue = event.target.getAttribute("data-value");

  localStorage.setItem("firstMoneyAvailable", dataValue);
}
