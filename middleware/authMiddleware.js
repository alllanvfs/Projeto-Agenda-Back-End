function isAuthenticated(req, res, next) {
  console.log("VERIFICANDO SESSÃO:", req.session);
  
  if (req.session.user) {

    return next();
  }

  res.status(401).json({ message: 'Acesso não autorizado. Por favor, faça login.' });
}

module.exports = isAuthenticated;