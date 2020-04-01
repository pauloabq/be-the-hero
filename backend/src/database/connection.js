// utilizar o knex
const knex = require('knex');

// utilizar o arquivo de configuração do knex
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

// exportar a conexão
module.exports = connection;
