const snowContainer = document.getElementById("snow");

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❄"; // Caractère unicode pour un flocon
  snowflake.style.left = Math.random() * 100 + "vw"; // Position horizontale aléatoire
  snowflake.style.fontSize = Math.random() * 20 + 10 + "px"; // Taille aléatoire
  snowflake.style.animationDuration = Math.random() * 5 + 3 + "s"; // Durée de chute aléatoire
  snowflake.style.opacity = Math.random();

  snowContainer.appendChild(snowflake);

  // Supprimer le flocon une fois l'animation terminée
  setTimeout(() => {
    snowflake.remove();
  }, 8000);
}

// Générer des flocons régulièrement
setInterval(createSnowflake, 300);