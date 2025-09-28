const Evento = require('../models/Evento');
const logger = require('../logger');


exports.criarEvento = async (req, res) => {
  try {
    const novoEvento = new Evento(req.body);
    await novoEvento.save();
    res.status(201).json({ message: "Evento criado com sucesso!", data: novoEvento });
  } catch (error) {
    logger.error({
      message: `Erro ao criar evento: ${error.message}`,
      stack: error.stack,
      body: req.body
    });
    res.status(400).json({ message: "Erro ao criar evento.", error: error.message });
  }
};

exports.buscarEventos = async (req, res) => {
    try {
        const { calendarioId } = req.query;
        if (!calendarioId) {
            return res.status(400).json({ message: "O ID do calendário é obrigatório na busca." });
        }
        const eventos = await Evento.find({ calendarioId: calendarioId });
        res.status(200).json(eventos);
    } catch (error) {
        logger.error(`Erro ao buscar eventos: ${error.message}`);
        res.status(500).json({ message: "Erro interno no servidor.", error: error.message });
    }
};

exports.deletarEvento = async (req, res) => {
    try {
        const evento = await Evento.findByIdAndDelete(req.params.id);
        if (!evento) {
            return res.status(404).json({ message: "Evento não encontrado." });
        }
        res.status(200).json({ message: "Evento deletado com sucesso." });
    } catch (error) {
        logger.error(`Erro ao deletar evento: ${error.message}`);
        res.status(500).json({ message: "Erro interno no servidor.", error: error.message });
    }
};