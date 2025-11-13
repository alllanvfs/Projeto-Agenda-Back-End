const express = require('express');
const session = require('express-session');
const connectDB = require('./database');

const authRoutes = require('./routes/authRoutes');
const eventoRoutes = require('./routes/eventoRoutes');

connectDB();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(session({

  secret: 'seu-segredo-muito-seguro-aqui', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/auth', authRoutes);

app.use('/api/eventos', eventoRoutes); 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log('API pronta para uso em http://localhost:3000');
});