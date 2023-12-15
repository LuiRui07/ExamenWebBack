const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose")

const app = express();
const port = 5001;
app.use(express.json());
app.use(cors());


///Routes
const Userroutes = require("./routes/usuarioRoutes.js")
const MapRoutes = require("./routes/mapRoutes.js")
const LogRoutes = require("./routes/logRoutes.js")
const Cloudinary = require("./routes/cloudinaryRoutes.js")
const EventosRoutes = require("./routes/eventosRoutes.js")

app.use('/user', Userroutes);
app.use('/map', MapRoutes);
app.use('/logs', LogRoutes);
app.use('/cloudinary', Cloudinary);
app.use('/eventos', EventosRoutes);

/////


mongoose.connect(
  "mongodb+srv://ei:ei@cluster0.1acabfy.mongodb.net/eventual").then(()=>
    console.log("Hemos conectado con mongoDB")
  ).catch((error)=>
    console.error(error)
  )

app.get("/",(req,res) =>{
  res.send("Esta es la API")}
)

app.listen(port, console.log("Servidor Backend escuchando en el puerto ", port))
