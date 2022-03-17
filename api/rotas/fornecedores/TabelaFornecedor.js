const Modelo = require("./ModeloTabelaFornecedor");

module.exports = {
  listar() {
    return Modelo.findAll(); //obtem uma lista de todos os padrões encontrados
  },
  inserir(fornecedor) {
    return Modelo.create(fornecedor);
  },
  async pegarPorId(id) {
    const encontrado = await Modelo.findOne({
      where: {
        id: id,
      },
    });

    if (!encontrado) {
      throw new Error("Fornecedor não encontrado");
    }

    return encontrado;
  },
  atualizar(id, dadosParaAtualizar) {
    return Modelo.update(dadosParaAtualizar, {
      where: { id: id },
    });
  },

  remover(id) {
    return Modelo.destroy({
      where: { id: id },
    });
  },
};
