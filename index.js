const mongoose = require('mongoose');
const connectDB = require('./database');
const prompt = require('prompt-sync')(); // Importa a biblioteca para input do usuário

// Importa as classes de serviço
const UsuarioService = require('./services/usuarioService');
const CalendarioService = require('./services/calendarioService');
const EventoService = require('./services/eventoService');

/**
 * Função principal que inicia a aplicação e o menu interativo.
 */
async function main() {
  await connectDB(); // Conecta ao banco de dados uma vez no início

  // Loop infinito para manter o menu ativo
  while (true) {
    console.clear(); // Limpa o console para uma melhor visualização
    console.log('--- MENU PRINCIPAL DA AGENDA ---');
    console.log('1. Listar todos os Eventos');
    console.log('2. Adicionar um novo Evento');
    console.log('3. Modificar um Evento existente');
    console.log('4. Deletar um Evento');
    console.log('5. Sair');
    console.log('---------------------------------');

    const escolha = prompt('Escolha uma opção: ');

    // Estrutura switch para lidar com a escolha do usuário
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
        await mongoose.disconnect(); // Desconecta do banco antes de sair
        return; // Sai da função main e encerra o programa
      default:
        console.log('Opção inválida, por favor tente novamente.');
    }

    prompt('\nPressione ENTER para continuar...'); // Pausa para o usuário poder ler a saída
  }
}

// --- Funções Auxiliares do Menu ---

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

  // 1. O programa busca e lista os calendários para você
  console.log('Selecione um calendário para adicionar o evento:');
  const calendarios = await CalendarioService.getAll();

  if (calendarios.length === 0) {
    console.log('Nenhum calendário encontrado! Por favor, crie um calendário primeiro.');
    // (Aqui poderíamos ter uma opção para criar um calendário)
    return;
  }

  calendarios.forEach((calendario, index) => {
    console.log(`${index + 1}. ${calendario.nome} (ID: ${calendario._id})`);
  });

  // 2. Você escolhe um número da lista
  const escolha = prompt('Escolha o número do calendário: ');
  const escolhaIndex = parseInt(escolha) - 1;

  // 3. Validação da sua escolha
  if (isNaN(escolhaIndex) || escolhaIndex < 0 || escolhaIndex >= calendarios.length) {
    console.log('Escolha inválida.');
    return;
  }

  // 4. O programa pega o ID correto para você
  const calendarioEscolhido = calendarios[escolhaIndex];
  const calendarioId = calendarioEscolhido._id;
  console.log(`Você escolheu: "${calendarioEscolhido.nome}"`);

  // 5. Pede o resto das informações
  const titulo = prompt('Título do evento: ');
  const dataInicio = prompt('Data de início (ex: 2025-10-28T10:00:00): ');
  const dataFim = prompt('Data de término (ex: 2025-10-28T11:00:00): ');

  if (!titulo || !dataInicio || !dataFim) {
    console.log('Todos os campos do evento são obrigatórios!');
    return;
  }

  // 6. Cria o evento usando o ID que o programa obteve
  await EventoService.create({
    titulo,
    dataInicio: new Date(dataInicio),
    dataFim: new Date(dataFim),
    calendarioId: calendarioId, // Usando o ID selecionado!
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
  // (Poderíamos adicionar outros campos para modificar aqui)

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

// Executa a função principal para iniciar a aplicação
main();