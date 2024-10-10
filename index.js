const express = require("express")
const path = require("path")
const app = express()
const port = 3000


app.set("views", path.join(__dirname + "/public/pages"));
app.set('view engine', 'ejs'); 

app.use(express.static(path.join(__dirname + "/public")));

app.get('/',(req,res)=>{
    res.render("index")
})

app.get('/apropos',(req,res)=>{
    res.render("apropos")
})

app.get('/contact',(req,res)=>{
    res.render("contact")
})

app.get('/btssio',(req,res)=>{
    res.render("btssio")
})

app.get('/EcoleEtEntreprise',(req,res)=>{
    res.render("eee")
})

app.get('/missions',(req,res)=>{
    res.render("missions")
})

app.get('/projets',(req,res)=>{
    res.render("projets")
})

app.get('/veilletechnologique',(req,res)=>{
    res.render("veilletechnologique")
})

app.get('/contact',(req,res)=>{
    res.render("contact")
})

app.listen(port,()=>{
    console.log(`Listening on port : ${port}`);
})