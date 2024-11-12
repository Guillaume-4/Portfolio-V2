const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname + "/public/pages"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/apropos", (req, res) => {
  res.render("apropos");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/btssio", (req, res) => {
  res.render("btssio");
});

app.get("/EcoleEtEntreprise", (req, res) => {
  res.render("eee");
});

app.get("/missions", async (req, res) => {
  try {
    // Étape 1 : Récupérer les dépôts GitHub
    let response = await fetch("https://api.github.com/users/Guillaume-4/repos");
    
    // Vérifiez si la requête est réussie
    if (!response.ok) {
      throw new Error(`Erreur lors de la requête : ${response.statusText}`);
    }
    
    // Étape 2 : Convertir la réponse en JSON
    let getRepo = await response.json();

    // Étape 3 : Vérifiez que getRepo est bien un tableau
    console.log("Type de getRepo :", typeof getRepo); // Devrait être "object" pour un tableau JSON
    console.log("Contenu de getRepo :", getRepo); // Affichez le contenu brut pour le diagnostic

    if (!Array.isArray(getRepo)) {
      throw new Error("Les données reçues de GitHub ne sont pas un tableau comme attendu.");
    }

    // Étape 4 : Utiliser .map() pour traiter les éléments
    getRepo = await Promise.all(
      getRepo.map(async (element) => {
        // Faites la requête pour les langages utilisés dans chaque repo
        let languageResponse = await fetch(element.languages_url);
        
        if (!languageResponse.ok) {
          throw new Error(`Erreur lors de la récupération des langages : ${languageResponse.statusText}`);
        }

        let languages = await languageResponse.json();
        
        return {
          Name: element.name,
          CreateDate: element.created_at.slice(0, -10),
          UpdateDate: element.updated_at.slice(0, -10),
          Html_URL: element.html_url,
          Description: element.description
            ? element.description
            : "Ce Repo n'a pas de description",
          Language: Object.keys(languages),
        };
      })
    );

    // Étape 5 : Afficher les données traitées dans la console pour vérification
    console.log("Contenu final de getRepo :", getRepo);

    // Rendre la page avec les données
    res.render("missions", { getRepo });

  } catch (error) {
    console.error("Erreur lors de la récupération des missions :", error);
    res.status(500).send("Erreur lors de la récupération des missions");
  }
});

app.get("/projets", (req, res) => {
  res.render("projets");
});

app.get("/veilletechnologique", (req, res) => {
  res.render("veilletechnologique");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});
