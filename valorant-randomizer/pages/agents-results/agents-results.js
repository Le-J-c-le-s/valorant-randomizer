let agentsData;
// Call to Valorant API
await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    console.log(json);
    agentsData = json;
  });
// Get player count from agents-settings
const playerCount = localStorage.getItem("player-count");
console.log(playerCount);

// Creat random numbers from player count
const generatedNumbers = new Set();

for (let i = 0; i < playerCount; i++) {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 23);
  } while (generatedNumbers.has(randomNumber));

  generatedNumbers.add(randomNumber);

  console.log(randomNumber);
  console.log(generatedNumbers);
}

// Now I need to get only "displayName" and "displayIcon"
const filteredInfos = agentsData.data.map((agent) => {
  return {
    displayName: agent.displayName,
    displayIcon: agent.displayIcon,
  };
});
console.log(filteredInfos);

const finalAgent = [];
// Get agent from the random number
for (const randomNumber of generatedNumbers) {
  const agent = filteredInfos[randomNumber];
  finalAgent.push(agent);
  console.log(agent);
}

// Display "agent card" to show displayName, displayIcon, playerNumber, and rerandomizeButton
let playerNumber = 0;

console.log(finalAgent);

finalAgent.forEach((agent) => {
  const playerCountElement = document.createElement("p");
  playerCountElement.classList.add("player-count");

  const containerElement = document.getElementById("agent-container");
  containerElement.classList.add("agent-container");

  playerNumber++;
  playerCountElement.textContent = `Player ${playerNumber}`;

  const agentImg = document.createElement("img");
  agentImg.src = agent.displayIcon;
  agentImg.classList.add("agent-img");

  const agentName = document.createElement("p");
  agentName.textContent = agent.displayName;
  agentName.classList.add("agent-name");

  const rerandomizeButton = document.createElement("button");
  rerandomizeButton.innerHTML = "Try Again";
  rerandomizeButton.classList.add("rerandomize-button");

  const cardElement = document.createElement("div");
  containerElement.appendChild(cardElement);
  cardElement.appendChild(playerCountElement);
  cardElement.appendChild(agentImg);
  cardElement.appendChild(agentName);
  cardElement.appendChild(rerandomizeButton);
  cardElement.classList.add("agent-card");

  // Re-randomize 1 agent
  const cards = document.querySelectorAll(".agent-card");

  cards.forEach((card) => {
    const rerandomizeButton = card.querySelector(".rerandomize-button");

    rerandomizeButton.addEventListener("click", () => {
      let randomNumber = Math.floor(Math.random() * agentsData.data.length);
      generatedNumbers.forEach((nbr) => {
        if (nbr === randomNumber) {
          randomNumber = Math.floor(Math.random() * agentsData.data.length);
        }
      });
      const newAgent = agentsData.data[randomNumber];

      const agentImg = card.querySelector(".agent-img");
      agentImg.src = newAgent.displayIcon;

      const agentName = card.querySelector(".agent-name");
      agentName.textContent = newAgent.displayName;
    });
  });

  // Re-randomize every agents
});
