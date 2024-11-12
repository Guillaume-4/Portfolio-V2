const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const {SECRETKEY} = require("./config")

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
    let response = await fetch("https://api.github.com/users/Guillaume-4/repos", {
      headers: {
        Authorization: `token ${SECRETKEY}`
      }
    });
    
    let getRepo = await response.json();

    console.log("Type de getRepo :", typeof getRepo); 
    console.log("Contenu de getRepo :", getRepo); 

    if (!Array.isArray(getRepo)) {
      throw new Error("Les données reçues de GitHub ne sont pas un tableau comme attendu.");
    }

    getRepo = await Promise.all(
      getRepo.map(async (element) => {
        let languageResponse = await fetch(element.languages_url, {
          headers: {
            Authorization: `token ${SECRETKEY}`
          }
        });
        let fetchimage = await fetch(`${element.url}/contents/portfolio_banner.png`,{
          headers: {
            Authorization: `token ${SECRETKEY}`
          }
        });

        if(fetchimage.status === 404){
          var imageUrl = undefined
        }
        else{
          let images = await fetchimage.json()
          var imageUrl = `data:${images.content_type};base64,${images.content}`
        }
        let languages = await languageResponse.json();
        
        
        console.log(`${element.url}/contents/portfolio_banner.png`)
        return {
          Name: element.name,
          CreateDate: element.created_at.slice(0, -10),
          UpdateDate: element.updated_at.slice(0, -10),
          Html_URL: element.html_url,
          Description: element.description
            ? element.description
            : "Ce Repo n'a pas de description",
          Language: Object.keys(languages),
          Images: imageUrl,
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
