# Projeto: Aplicação de Console - Agenda Eletrônica

Aplicação de console interativa para gerenciamento de eventos, desenvolvida para a disciplina de Programação Web Back-End.

O projeto cumpre com todos os requisitos solicitados: classes com CRUD, arquivo de banco de dados, classe de log, validações e um arquivo principal que executa a aplicação.

![Banner do Projeto](agenda.PNG)

👨‍💻 𝓓𝓮𝓼𝓮𝓷𝓿𝓸𝓵𝓿𝓮𝓭𝓸𝓻𝓮𝓼 𝓭𝓸 𝓟𝓻𝓸𝓳𝓮𝓽𝓸

| ID   |                                 Equipe                                    |   RA       | 
| :--: | :-----------------------------------------------------------------------: | :--------: |
|   01 |            Allan Vinicios Ferraz Santos                            |  2465272   |    
|   02 |           Luhan Christyan Rodrigues                                    |  2453630   |   


🚀 𝓣𝓮𝓬𝓷𝓸𝓵𝓸𝓰𝓲𝓪𝓼 𝓾𝓽𝓲𝓵𝓲𝔃𝓪𝓭𝓪𝓼

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

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
