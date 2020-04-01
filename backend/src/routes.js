const express = require('express');
// meu próprio módulo, que exporta um objeto que contém os métodos.
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// Trabalhando com as rotas / recursos
const routes = express.Router();

// Métodos HTTP (GET, POST, PUT, DELETE)
/*
os métodos de OngController precisam possuir a mesma estrutura necessárias aos métodos get e post do express: function(req,res)
*/
routes.get("/ongs", OngController.index); 
routes.post("/ongs", OngController.create);

routes.get("/incidents", IncidentController.index); 
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

routes.get("/profile", ProfileController.index);

routes.post("/session", SessionController.create);

// exportar routes para uso em outras partes do projeto (no caso, no index.js)
module.exports = routes;