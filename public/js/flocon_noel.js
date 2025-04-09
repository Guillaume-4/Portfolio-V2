const snowContainer = document.getElementById("snow");

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❆";
  snowflake.style.left = Math.random() * 100 + "vw"; 
  snowflake.style.fontSize = Math.random() * 20 + 10 + "px";
  snowflake.style.animationDuration = Math.random() * 5 + 3 + "s";
  snowflake.style.opacity = Math.random();

  snowContainer.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, 8000);
}

// Générer des flocons régulièrement
//setInterval(createSnowflake, 50);