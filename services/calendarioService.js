const Calendario = require('../models/Calendario');
const Logger = require('../Logger');

class CalendarioService {

  static async create(data) {
    try {
      const novoCalendario = new Calendario(data);
      await novoCalendario.save();
      console.log('Calendário criado com sucesso!');
      return novoCalendario;
    } catch (error) {
      console.error(`Falha ao criar calendário: ${error.message}`);
      Logger.logError(`Erro ao criar calendário: ${error.message}`);
      return null;
    }
  }

  static async getById(id) {
    try {
      return await Calendario.findById(id);
    } catch (error) {
      Logger.logError(`Erro ao buscar calendário por ID (${id}): ${error.message}`);
      return null;
    }
  }
  
  static async getAll() {
    try {
      return await Calendario.find({});
    } catch (error) {
      Logger.logError(`Erro ao buscar todos os calendários: ${error.message}`);
      return [];
    }
  }

  static async update(id, data) {
    try {
      const calendario = await Calendario.findByIdAndUpdate(id, data, { new: true, runValidators: true });
      if (!calendario) {
        console.log(`Calendário com ID ${id} não encontrado para atualização.`);
        return null;
      }
      console.log('Calendário atualizado com sucesso!');
      return calendario;
    } catch (error) {
      console.error(`Falha ao atualizar calendário: ${error.message}`);
      Logger.logError(`Erro ao atualizar calendário (${id}): ${error.message}`);
      return null;
    }
  }

  static async delete(id) {
    try {
      const result = await Calendario.findByIdAndDelete(id);
      if (!result) {
          console.log(`Calendário com ID ${id} não encontrado para deleção.`);
          return false;
      }
      console.log('Calendário deletado com sucesso!');
      return true;
    } catch (error) {
      Logger.logError(`Erro ao deletar calendário (${id}): ${error.message}`);
      return false;
    }
  }
}

module.exports = CalendarioService;