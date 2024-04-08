let weaponsData;
// Call to Valorant API for weapons
await fetch("https://valorant-api.com/v1/weapons")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    weaponsData = json;
    console.log(json);
  });

// Get money available from weapons-settings
const moneyAvailable = localStorage.getItem("firstMoneyAvailable");
console.log(moneyAvailable);

// filter "displayName","displayIcon" and "cost"
const refractorInfos = weaponsData.data.map((weapons) => {
  return {
    cost: weapons?.shopData?.cost ?? 0,
    category: weapons?.shopData?.category ?? 0,
    displayName: weapons.displayName,
    displayIcon: weapons.displayIcon,
  };
});

// PRIMARY WEAPON

// Filter weapon for get only when categ is different "pistols"
const filteredInfosPrimary = refractorInfos.filter(
  (weapon) => weapon.category !== "Pistols" && weapon.cost <= moneyAvailable
);
console.log(filteredInfosPrimary);

// SECONDARY WEAPON

// Flitered weapons for get only when categ = "Pistols"
const filteredInfosSecondary = refractorInfos.filter(
  (weapon) => weapon.category === "Pistols" && weapon.cost <= moneyAvailable
);
console.log(filteredInfosSecondary);

// Make sure that "priamryWeapon" + "secondaryWeapon" <= moneyAvailable
function selectAffordableWeapons() {
  let primaryWeapon, secondaryWeapon;
  let totalCost;

  while (true) {
    primaryWeapon =
      filteredInfosPrimary[
        Math.floor(Math.random() * filteredInfosPrimary.length)
      ];
    secondaryWeapon =
      filteredInfosSecondary[
        Math.floor(Math.random() * filteredInfosSecondary.length)
      ];

    totalCost = primaryWeapon.cost + secondaryWeapon.cost;

    if (totalCost <= moneyAvailable) {
      break;
    }
  }

  return { primaryWeapon, secondaryWeapon };
}

const { primaryWeapon, secondaryWeapon } = selectAffordableWeapons();
console.log("Primary weapon:", primaryWeapon);
console.log("Secondary weapon:", secondaryWeapon);

const finalWeapons = [
  {
    name: "Primary Weapon",
    weapon: primaryWeapon,
    displayName: primaryWeapon.displayName,
    displayIcon: primaryWeapon.displayIcon,
    category: primaryWeapon.category,
  },
  {
    name: "Secondary Weapon",
    weapon: secondaryWeapon,
    displayName: secondaryWeapon.displayName,
    displayIcon: secondaryWeapon.displayIcon,
  },
];
// Display weaponCard to show displayName + displayIcon and next round with input number

console.log(finalWeapons);

finalWeapons.forEach((weapons) => {
  const containerElement = document.getElementById("weapons-container");
  containerElement.classList.add("weapons-container");

  const weaponName = document.createElement("p");
  weaponName.textContent = weapons.displayName;
  weaponName.classList.add("weapon-name");

  const weaponImg = document.createElement("img");
  weaponImg.src = weapons.displayIcon;
  weaponImg.classList.add("weapon-img");

  const cardElement = document.createElement("div");
  containerElement.appendChild(cardElement);
  cardElement.appendChild(weaponImg);
  cardElement.appendChild(weaponName);
  cardElement.classList.add("weapons-card");
});

// uptade money

const moneyContainer = document.querySelector(".set-money");

moneyContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("primary-button")) {
    const newMoneyAvailable = event.target.getAttribute("data-value");
    localStorage.setItem("firstMoneyAvailable", newMoneyAvailable);
    location.reload(); // recharge la page
  }
});
