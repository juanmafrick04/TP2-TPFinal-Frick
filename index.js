import express from "express";
import routes from "./routes/routes.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import {dbConnection} from "./dbConnection/dbConnection.js";
import {SERVER_PORT} from "./config/config.js";


const app = express();

// Agregar/cambiar otros puertos si es necesario para que les funcione la conexion con el frontend -Sebas
app.use(cors({
  origin: 'http://localhost:8081'
}));

app.use(morgan("tiny"))
app.use(express.json()) //permite decodificar y traer body de json
app.use(express.urlencoded({extended:true})) //permite decodificar y traer body de Form-encode
app.use(cookieParser())

app.use(routes);


app.use((req,res,next) =>{
  res.status(404).send({success:false,message:"not found"});
});

await dbConnection.sync();

app.listen(SERVER_PORT,()=>{
  console.log("LISTENING ON PORT:", SERVER_PORT);
})




/*const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/