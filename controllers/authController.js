const UsuarioService = require('../services/usuarioService');
const bcrypt = require('bcrypt');

class AuthController {
  

  static async register(req, res) {
    try {
      const { nome, email, password } = req.body;
      if (!nome || !email || !password) {
        return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
      }


      const hashedPassword = await bcrypt.hash(password, 10);

      const novoUsuario = await UsuarioService.create({
        nome,
        email,
        password: hashedPassword
      });

      if (!novoUsuario) {
        return res.status(400).json({ message: "Email já cadastrado." });
      }

      res.status(201).json({ message: "Usuário registrado com sucesso!", userId: novoUsuario._id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const usuarios = await UsuarioService.getAll();
      const usuario = usuarios.find(u => u.email === email);

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Senha inválida." });
      }

      req.session.user = {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      };
      
      console.log("SESSÃO CRIADA:", req.session);

      res.status(200).json({ message: "Login realizado com sucesso!" });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: "Não foi possível fazer logout." });
      }

      res.clearCookie('connect.sid');
      res.status(200).json({ message: "Logout realizado com sucesso." });
    });
  }
}

module.exports = AuthController;