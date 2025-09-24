const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

// Rota para criar um novo evento
// Ex: POST http://localhost:3000/api/eventos
router.post('/eventos', eventoController.criarEvento);

// Rota para buscar eventos
// Ex: GET http://localhost:3000/api/eventos?calendarioId=12345
router.get('/eventos', eventoController.buscarEventos);

// Rota para deletar um evento por ID
// Ex: DELETE http://localhost:3000/api/eventos/67890
router.delete('/eventos/:id', eventoController.deletarEvento);

module.exports = router;