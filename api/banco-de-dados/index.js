const Sequelize = require("sequelize");
const config = require("config"); //ver a biblioteca em qualquer lugar

const instancia = new Sequelize(
  config.get('mysql.banco-de-dados'),
  config.get('mysql.usuario'),
  config.get('mysql.senha'),
  {
    host: config.get('mysql.host'),
    dialect: 'mysql',
  }
);

module.exports = instancia;
