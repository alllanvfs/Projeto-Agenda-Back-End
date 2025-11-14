# Projeto 2: API de Agenda Eletrônica (com Login)

API RESTful desenvolvida para a disciplina de Programação Web Back-End (Projeto 2).

Esta versão evolui o Projeto 1, transformando a aplicação de console em uma **API web segura** construída com Node.js e Express. O foco principal é a implementação de um sistema de autenticação completo, utilizando **sessões** e **criptografia de senhas** para proteger as rotas de acesso aos dados.

![Banner do Projeto](agenda.PNG)

👨‍💻 𝓓𝓮𝓼𝓮𝓷𝓿𝓸𝓵𝓿varepsilon𝓭𝓸𝓻𝓮𝓼 𝓭𝓸 𝓟𝓻𝓸𝓳varepsilon𝓽𝓸

| ID | Equipe | RA |
| :--: | :-----------------------------------------------------------------------: | :--------: |
| 01 | Allan Vinicios Ferraz Santos | 2465272 |
| 02 | Luhan Christyan Rodrigues | 2453630 |

🚀 𝓣varepsilon𝓬𝓷𝓸𝓵𝓸𝓰𝓲𝓪𝓼 𝓾𝓽𝓲𝓵𝓲𝔃𝓪𝓭𝓪𝓼

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Node.js**: Ambiente de execução do código.
- **Express.js**: Framework para a construção do servidor e das rotas da API.
- **MongoDB**: Banco de dados NoSQL para armazenamento dos dados.
- **Mongoose**: Biblioteca para modelagem e comunicação com o MongoDB.
- **express-session**: Biblioteca para gerenciamento de sessões, permitindo o login.
- **bcrypt**: Biblioteca para criptografia segura das senhas dos usuários.

## Como Executar e Testar o Projeto (Passo a Passo)

Siga este guia para configurar e testar a API. O servidor **não possui interface gráfica** (views) e deve ser testado através de uma ferramenta como o Postman.

---

### Passo 1: Pré-requisitos

- Node.js instalado.
- MongoDB Server instalado e rodando localmente (na porta padrão `27017`).

---

### Passo 2: Instalação

1.  **Clone o repositório** para a sua máquina local.
2.  Abra um terminal na pasta do projeto.
3.  **Instale as dependências** do projeto (Express, Mongoose, bcrypt, etc):
    ```bash
    npm install
    ```

---

### Passo 3: Iniciar o Servidor

1.  No seu terminal, execute o comando para iniciar a API:
    ```bash
    node app.js
    ```
2.  O terminal deve exibir as seguintes mensagens. **Mantenha este terminal rodando** durante todos os testes.
    ```
    Servidor rodando na porta 3000
    API pronta para uso em http://localhost:3000
    Conectado ao MongoDB com sucesso!
    ```

---

### Passo 4: Testar a Proteção (Postman) 🚫

Vamos provar que a rota de eventos está segura.

- **Ferramenta:** Postman
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/eventos`
- **Resultado Esperado:** Um erro **`401 Unauthorized`** com a mensagem:
  ```json
  {
    "message": "Acesso não autorizado. Por favor, faça login."
  }

---

### Passo 5: Registrar um Usuário (Postman) 📝

* **Método:** `POST`
* **URL:** `http://localhost:3000/auth/register`
* **Body (raw/JSON):**
    ```json
    {
      "nome": "Seu Nome de Teste",
      "email": "teste@email.com",
      "password": "123"
    }
    ```
* **Resultado Esperado:** `201 Created` com a mensagem:
    ```json
    {
      "message": "Usuário registrado com sucesso!",
      "userId": "..."
    }
    ```

---

### Passo 6: Fazer Login (Postman) 🔑

Isso irá criar sua sessão. O Postman gerencia o cookie automaticamente.

* **Método:** `POST`
* **URL:** `http://localhost:3000/auth/login`
* **Body (raw/JSON):**
    ```json
    {
      "email": "teste@email.com",
      "password": "123"
    }
    ```
* **Resultado Esperado:** `200 OK` com a mensagem:
    ```json
    {
      "message": "Login realizado com sucesso!"
    }
    ```

---

### Passo 7: Testar a Rota Protegida (com Login) ✅

Agora que você está logado no Postman, repita o Passo 4.

* **Método:** `GET`
* **URL:** `http://localhost:3000/api/eventos`
* **Resultado Esperado:** `200 OK` com a lista de eventos (provavelmente uma lista vazia `[]`). Isso prova que seu login funcionou.

---

### Passo 8: Criar um Evento (Postman) ➕

Vamos testar a criação de um novo dado, que também é uma rota protegida.

* **Método:** `POST`
* **URL:** `http://localhost:3000/api/eventos`
* **Body (raw/JSON):** (Lembre-se de usar um `calendarioId` válido do seu banco de dados)
    ```json
    {
      "titulo": "Meu Evento pela API",
      "dataInicio": "2025-11-20T10:00:00Z",
      "dataFim": "2025-11-20T11:00:00Z",
      "calendarioId": "68f17be8890ecb04a833cd21"
    }
    ```
* **Resultado Esperado:** `201 Created` com os dados do evento que acabou de ser criado.

---

## Resumo dos Endpoints da API

### Autenticação (`/auth`)

* `POST /auth/register`: Cria um novo usuário.
* `POST /auth/login`: Inicia uma sessão (loga o usuário).
* `POST /auth/logout`: Encerra a sessão.

### Eventos (`/api/eventos`) - (Requer Login)

* `GET /`: Lista todos os eventos.
* `POST /`: Cria um novo evento.
* `DELETE /:id`: Deleta um evento.
