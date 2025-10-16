const mongoose = require('mongoose');
const connectDB = require('./database');
const prompt = require('prompt-sync')();

const UsuarioService = require('./services/usuarioService');
const CalendarioService = require('./services/calendarioService');
const EventoService = require('./services/eventoService');

async function main() {
  await connectDB(); 

  while (true) {
    console.clear();
    console.log('--- MENU PRINCIPAL DA AGENDA ---');
    console.log('1. Listar todos os Eventos');
    console.log('2. Adicionar um novo Evento');
    console.log('3. Modificar um Evento existente');
    console.log('4. Deletar um Evento');
    console.log('5. Sair');
    console.log('---------------------------------');

    const escolha = prompt('Escolha uma opção: ');

    switch (escolha) {
      case '1':
        await listarEventos();
        break;
      case '2':
        await adicionarEvento();
        break;
      case '3':
        await modificarEvento();
        break;
      case '4':
        await deletarEvento();
        break;
      case '5':
        console.log('Saindo da aplicação...');
        await mongoose.disconnect();
        return;
      default:
        console.log('Opção inválida, por favor tente novamente.');
    }

    prompt('\nPressione ENTER para continuar...');
  }
}

async function listarEventos() {
  console.log('\n--- LISTA DE EVENTOS ---');
  const eventos = await EventoService.getAll();
  if (eventos.length === 0) {
    console.log('Nenhum evento encontrado.');
    return;
  }
  eventos.forEach(evento => {
    console.log(`ID: ${evento._id} | Título: ${evento.titulo} | Início: ${evento.dataInicio.toLocaleString()}`);
  });
}

async function adicionarEvento() {
  console.log('\n--- ADICIONAR NOVO EVENTO ---');

  console.log('Selecione um calendário para adicionar o evento:');
  const calendarios = await CalendarioService.getAll();

  if (calendarios.length === 0) {
    console.log('Nenhum calendário encontrado! Por favor, crie um calendário primeiro.');
    return;
  }

  calendarios.forEach((calendario, index) => {
    console.log(`${index + 1}. ${calendario.nome} (ID: ${calendario._id})`);
  });

  const escolha = prompt('Escolha o número do calendário: ');
  const escolhaIndex = parseInt(escolha) - 1;

  if (isNaN(escolhaIndex) || escolhaIndex < 0 || escolhaIndex >= calendarios.length) {
    console.log('Escolha inválida.');
    return;
  }

  const calendarioEscolhido = calendarios[escolhaIndex];
  const calendarioId = calendarioEscolhido._id;
  console.log(`Você escolheu: "${calendarioEscolhido.nome}"`);

  const titulo = prompt('Título do evento: ');
  const dataInicio = prompt('Data de início (ex: 2025-10-28T10:00:00): ');
  const dataFim = prompt('Data de término (ex: 2025-10-28T11:00:00): ');

  if (!titulo || !dataInicio || !dataFim) {
    console.log('Todos os campos do evento são obrigatórios!');
    return;
  }

  await EventoService.create({
    titulo,
    dataInicio: new Date(dataInicio),
    dataFim: new Date(dataFim),
    calendarioId: calendarioId,
  });
}

async function modificarEvento() {
  console.log('\n--- MODIFICAR EVENTO ---');
  const id = prompt('Digite o ID do evento que deseja modificar: ');
  const novoTitulo = prompt('Novo título (deixe em branco para não alterar): ');

  const dadosParaAtualizar = {};
  if (novoTitulo) {
    dadosParaAtualizar.titulo = novoTitulo;
  }

  if (Object.keys(dadosParaAtualizar).length === 0) {
    console.log('Nenhum dado foi alterado.');
    return;
  }

  const eventoAtualizado = await EventoService.update(id, dadosParaAtualizar);
  if (!eventoAtualizado) {
      console.log("Não foi possível atualizar. Verifique se o ID está correto.");
  }
}

async function deletarEvento() {
  console.log('\n--- DELETAR EVENTO ---');
  const id = prompt('Digite o ID do evento que deseja deletar: ');
  
  const sucesso = await EventoService.delete(id);
  if (!sucesso) {
      console.log("Não foi possível deletar. Verifique se o ID está correto.");
  }
}

main();