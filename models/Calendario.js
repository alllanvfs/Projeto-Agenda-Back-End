const mongoose = require('mongoose');

const CalendarioSchema = new mongoose.Schema({
    nome: { type: String, required: true, default: 'Meu Calendário' },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

module.exports = mongoose.model('Calendario', CalendarioSchema);