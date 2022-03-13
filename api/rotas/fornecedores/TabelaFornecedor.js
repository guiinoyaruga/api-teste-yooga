const Modelo = require('./ModeloTabelaFornecedor');

module.exports ={
    listar(){
       return Modelo.findAll(); //obtem uma lista de todos os padrões encontrados
    }
}