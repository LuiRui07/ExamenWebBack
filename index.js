const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose")

const app = express();
const port = 5001;
app.use(express.json());
app.use(cors());

const routes = require("./routes.js")
app.use('/api', routes);
mongoose.connect(
  "mongodb+srv://ei:ei@cluster0.1acabfy.mongodb.net/kalendas").then(()=>
    console.log("Hemos conectado con mongoDB")
  ).catch((error)=>
    console.error(error)
  )

app.get("/",(req,res) =>{
  res.send("Esta es la API")}
)

app.listen(port, console.log("Servidor Backend escuchando en el puerto ", port))
