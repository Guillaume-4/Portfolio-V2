const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const { SECRETKEY } = require("./config");

app.set("views", path.join(__dirname, "/public/pages"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));

// Route principale - Portfolio one-page
app.get("/", async (req, res) => {
  try {
    // Récupération des repos GitHub
    const response = await fetch("https://api.github.com/users/Guillaume-4/repos", {
      headers: {
        Authorization: `token ${SECRETKEY}`,
      },
    });

    let repos = await response.json();

    if (!Array.isArray(repos)) {
      repos = [];
    }

    // Filtrer et enrichir les repos
    const projects = await Promise.all(
      repos
        .filter((repo) => repo.name !== "GestStockJava" && repo.name !== "Guillaume-4")
        .map(async (repo) => {
          // Récupérer les langages
          const langResponse = await fetch(repo.languages_url, {
            headers: { Authorization: `token ${SECRETKEY}` },
          });
          const languages = await langResponse.json();

          // Récupérer l'image banner si elle existe
          const imgResponse = await fetch(`${repo.url}/contents/portfolio_banner.png`, {
            headers: { Authorization: `token ${SECRETKEY}` },
          });

          let imageUrl = null;
          if (imgResponse.status !== 404) {
            const imgData = await imgResponse.json();
            imageUrl = `data:${imgData.content_type};base64,${imgData.content}`;
          }

          return {
            name: repo.name,
            description: repo.description || "Pas de description disponible",
            url: repo.html_url,
            languages: Object.keys(languages),
            image: imageUrl,
            createdAt: new Date(repo.created_at).getFullYear(),
          };
        })
    );

    res.render("index", { projects });
  } catch (error) {
    console.error("Erreur:", error);
    res.render("index", { projects: [] });
  }
});

app.listen(port, () => {
  console.log(`Portfolio en ligne sur http://localhost:${port}`);
});
