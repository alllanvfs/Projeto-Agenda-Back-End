const EventoService = require('../services/eventoService');

class EventoController {
  
  static async criarEvento(req, res) {
    try {

      const novoEvento = await EventoService.create(req.body);
      
      if (!novoEvento) {
        return res.status(400).json({ message: "Falha ao criar evento. Verifique os campos obrigatórios." });
      }
      
      res.status(201).json(novoEvento);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async listarEventos(req, res) {
    try {
      const eventos = await EventoService.getAll();
      res.status(200).json(eventos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deletarEvento(req, res) {
    try {

      const sucesso = await EventoService.delete(req.params.id);
      if (!sucesso) {
        return res.status(404).json({ message: "Evento não encontrado." });
      }
      res.status(200).json({ message: "Evento deletado com sucesso." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
}

module.exports = EventoController;