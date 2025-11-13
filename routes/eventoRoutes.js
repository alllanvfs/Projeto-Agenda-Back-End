const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/eventoController');
const isAuthenticated = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, EventoController.listarEventos);

router.post('/', isAuthenticated, EventoController.criarEvento);

router.delete('/:id', isAuthenticated, EventoController.deletarEvento);

module.exports = router;