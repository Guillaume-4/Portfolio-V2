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

app.get('/test',(req,res)=>{
    res.render("apropos")
})

app.listen(port,()=>{
    console.log(`Listening on port : ${port}`);
})