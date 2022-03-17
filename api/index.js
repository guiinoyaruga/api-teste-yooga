const express = require("express"); // chama a biblioteca do express
const app = express(); //app vai usar os metodos do express
const bodyParser = require("body-parser"); //serve como um plugin para app
//bodyParser serve para tranformar a requisição em um objeto
const config = require("config");

app.use(bodyParser.json());

const roteador = require("./rotas/fornecedores");
app.use("/api/fornecedores", roteador);

//metodo para escutar a porta
app.listen(config.get("api.porta"), () => console.log("API Online!"));