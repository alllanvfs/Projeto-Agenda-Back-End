# Projeto: Aplicação de Console - Agenda Eletrônica

Aplicação de console interativa para gerenciamento de eventos, desenvolvida para a disciplina de Programação Web Back-End.

O projeto cumpre com todos os requisitos solicitados: classes com CRUD, arquivo de banco de dados, classe de log, validações e um arquivo principal que executa a aplicação.

## Desenvolvedores

- **Nome:** `Allan Vinicios Ferraz Santos - 2465272` 
- **Nome:** `Luhan Christyan Rodrigues - 2453630`

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução do código.
- **MongoDB**: Banco de dados NoSQL para armazenamento dos dados.
- **Mongoose**: Biblioteca para modelagem e comunicação com o MongoDB.
- **prompt-sync**: Biblioteca para permitir a interação com o usuário no terminal.

## Funcionalidades

- **Menu Interativo:** Permite que o usuário escolha as ações que deseja realizar.
- **CRUD de Eventos:**
    - **Listar:** Visualiza todos os eventos salvos no banco de dados.
    - **Adicionar:** Cria um novo evento de forma interativa, selecionando um calendário existente.
    - **Modificar:** Altera informações de um evento existente através de seu ID.
    - **Deletar:** Remove um evento do banco de dados.
- **Validação de Dados:** O sistema impede a criação de registros com campos obrigatórios faltando.
- **Log de Erros:** Qualquer falha durante as operações de banco de dados é capturada e salva no arquivo `/logs/exceptions.log`.
