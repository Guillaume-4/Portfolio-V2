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
  let getRepo = await fetch("https://api.github.com/users/Guillaume-4/repos");
  getRepo = await getRepo.json()
  getRepo = await Promise.all(getRepo.map(async(element) => ({
    Name: element.name,
    CreateDate: element.created_at.slice(0, -10),
    UpdateDate: element.updated_at.slice(0, -10),
    Description: `${
      element.description !== null
        ? element.description
        : "Ce Repo n'a pas de description"
    }`,
    Language: Object.keys(await(await(await fetch(`${element.languages_url}`)).json()))
  })));
  console.log(getRepo)
  res.render("missions", { getRepo });
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
