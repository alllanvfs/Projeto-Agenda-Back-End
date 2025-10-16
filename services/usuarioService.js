const Usuario = require('../models/Usuario');
const Logger = require('../Logger');

class UsuarioService {
  // CREATE
  static async create(data) {
    try {
      const novoUsuario = new Usuario(data);
      await novoUsuario.save();
      console.log('Usuário criado com sucesso!');
      return novoUsuario;
    } catch (error) {
      console.error(`Falha ao criar usuário: ${error.message}`);
      Logger.logError(`Erro ao criar usuário: ${error.message}`);
      return null;
    }
  }

  // READ (Ler um por ID)
  static async getById(id) {
    try {
      return await Usuario.findById(id);
    } catch (error) {
      Logger.logError(`Erro ao buscar usuário por ID (${id}): ${error.message}`);
      return null;
    }
  }
  
  // READ (Ler todos)
  static async getAll() {
    try {
      return await Usuario.find({});
    } catch (error) {
      Logger.logError(`Erro ao buscar todos os usuários: ${error.message}`);
      return [];
    }
  }

  // UPDATE
  static async update(id, data) {
    try {
      const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true, runValidators: true });
      if (!usuario) {
        console.log(`Usuário com ID ${id} não encontrado para atualização.`);
        return null;
      }
      console.log('Usuário atualizado com sucesso!');
      return usuario;
    } catch (error) {
      console.error(`Falha ao atualizar usuário: ${error.message}`);
      Logger.logError(`Erro ao atualizar usuário (${id}): ${error.message}`);
      return null;
    }
  }

  // DELETE
  static async delete(id) {
    try {
      const result = await Usuario.findByIdAndDelete(id);
      if (!result) {
          console.log(`Usuário com ID ${id} não encontrado para deleção.`);
          return false;
      }
      console.log('Usuário deletado com sucesso!');
      return true;
    } catch (error) {
      Logger.logError(`Erro ao deletar usuário (${id}): ${error.message}`);
      return false;
    }
  }
}

module.exports = UsuarioService;