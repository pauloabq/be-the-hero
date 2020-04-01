// utilização do express
const express = require('express');
const cors = require('cors');
/* 
importação do nosso aquivo para controle das rotas. indicar o caminho relativo do arquivo ./ para não confundir com módulos.
*/
const routes = require('./routes');

const app = express();

app.use(cors());
// antes de todas as requisições, permitir uso de json
app.use(express.json());
// informa o uso do routes, que foi importado de nosso arqivo de rodas routes.js
app.use(routes);

//node fica escutando a nossa aplicação na porta 3333
app.listen(3333);