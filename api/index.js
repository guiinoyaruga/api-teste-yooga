const express = require("express"); // chama a biblioteca do express
const app = express(); //app vai usar os metodos do express
const bodyParser = require("body-parser"); //serve como um plugin para app
//bodyParser serve para tranformar a requisição em um objeto
const config = require("config");
const NaoEncontrado = require("./erros/NaoEncontrado");
const CampoInvalido = require("./erros/CampoInvalido");
const DadosNaoFornecidos = require("./erros/DadosNaoFornecidos");
const ValorNaoSuportado = require("./erros/ValorNaoSuportado");
const formatosAceitos = require("./Serializador").formatosAceitos;
const SerializadorErro = require("./Serializador").SerializadorErro;

app.use(bodyParser.json());

app.use((requisicao, resposta, proximo) => {
  let formatoRequisitado = requisicao.header("Accept");

  if (formatoRequisitado === "*/*") {
    formatoRequisitado = "application/json";
  }

  if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
    resposta.status(406);
    resposta.end();
    return;
  }

  resposta.setHeader("Content-Type", formatoRequisitado);
  proximo();
});

const roteador = require("./rotas/fornecedores");
app.use("/api/fornecedores", roteador);

app.use((erro, requisicao, resposta, proximo) => {
  let status = 500;

  if (erro instanceof NaoEncontrado) {
    status = 404;
  }
  if (erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
    status = 400;
  }
  if (erro instanceof ValorNaoSuportado) {
    status = 406;
  }
  const serializador = new SerializadorErro(resposta.getHeader("Content-Type"));
  resposta.status(status);
  resposta.send(
    serializador.serializar({
      mensagem: erro.message,
      id: erro.idErro,
    })
  );
});

//metodo para escutar a porta
app.listen(config.get("api.porta"), () => console.log("API Online!"));
