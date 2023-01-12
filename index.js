const express = require("express"); //importación de librería
const app = express(); //inicialización de la librería
const router = require("./routes");
const cors = require("cors");
require("dotenv").config();
app.use(express.json()); //Intermediarios
app.use(express.urlencoded({ extended: true })); //Analiza las request entrantes con cargas útiles codificadas en urlencoded
app.use(cors());
app.use(router);
app.listen(process.env.API_PORT, () => {
  // Se define y se apertura un puerto
  console.log(" Api port:", process.env.API_PORT);
});
