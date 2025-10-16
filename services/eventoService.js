const Evento = require('../models/Evento');
const Logger = require('../Logger');

class EventoService {

  static async create(data) {
    try {

      const novoEvento = new Evento(data);
      await novoEvento.save();
      console.log('Evento criado com sucesso!');
      return novoEvento;
    } catch (error) {
      console.error(`Falha ao criar evento: ${error.message}`);
      Logger.logError(`Erro ao criar evento: ${error.message}`);

      return null;
    }
  }

  static async getById(id) {
    try {
      return await Evento.findById(id);
    } catch (error) {
      Logger.logError(`Erro ao buscar evento por ID (${id}): ${error.message}`);
      return null;
    }
  }
  
  static async getAll() {
    try {
      return await Evento.find({});
    } catch (error) {
      Logger.logError(`Erro ao buscar todos os eventos: ${error.message}`);
      return [];
    }
  }

  static async update(id, data) {
    try {

      const evento = await Evento.findByIdAndUpdate(id, data, { new: true, runValidators: true });
      if (!evento) {
        console.log(`Evento com ID ${id} não encontrado para atualização.`);
        return null;
      }
      console.log('Evento atualizado com sucesso!');
      return evento;
    } catch (error) {
      console.error(`Falha ao atualizar evento: ${error.message}`);
      Logger.logError(`Erro ao atualizar evento (${id}): ${error.message}`);
      return null;
    }
  }

  static async delete(id) {
    try {
      const result = await Evento.findByIdAndDelete(id);
      if (!result) {
          console.log(`Evento com ID ${id} não encontrado para deleção.`);
          return false;
      }
      console.log('Evento deletado com sucesso!');
      return true;
    } catch (error) {
      Logger.logError(`Erro ao deletar evento (${id}): ${error.message}`);
      return false;
    }
  }
}

module.exports = EventoService;