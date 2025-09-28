const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
    titulo: { type: String, required: [true, 'O campo título é obrigatório.'] },
    descricao: { type: String },
    dataInicio: { type: Date, required: [true, 'A data de início é obrigatória.'] },
    dataFim: { type: Date, required: [true, 'A data de término é obrigatória.'] },
    local: { type: String },
    calendarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Calendario', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Evento', EventoSchema);