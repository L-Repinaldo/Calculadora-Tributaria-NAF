# 💻 Calculadora Tributária NAF - Backend API

Esta pasta contém o servidor backend (API REST) da Calculadora Tributária, responsável pelas regras de negócio fiscais, autenticação de usuários e persistência de dados.

## 🛠️ Tecnologias e Dependências
* **Runtime & Framework:** Node.js com Express.
* **ORM & Banco de Dados:** Prisma ORM integrado ao PostgreSQL via Docker.
* **Segurança:** BCrypt (criptografia de senhas) e JSON Web Token (JWT para autenticação de sessões).
* **Desenvolvimento:** Nodemon com suporte a *Legacy Watch* para sincronização instantânea em containers.

## 🔑 Funcionalidades e Regras de Negócio Implementadas
* **Autenticação:** Cadastro de usuários com hash seguro e geração de tokens JWT no login.
* **Motor Fiscal (2026):**
  * **Pessoa Física:** Cálculo progressivo do IRPF 2026 deduzindo despesas operacionais escrituradas via Livro Caixa.
  * **Pessoa Jurídica:** Apuração do Simples Nacional considerando Anexo IV (Advocacia) e Anexo III com Fator R ativo (Psicologia/Arquitetura), somado ao recolhimento obrigatório do INSS sobre pró-labore baseado no salário mínimo vigente de 2026 ($R\$\,1.621,00$).
* **Histórico:** Salvamento automático e consulta de simulações tributárias atreladas de forma relacional ao ID do usuário autenticado.

## 🚀 Execução Local (Desenvolvimento Isolado)
Se houver a necessidade de rodar o servidor Express isoladamente fora do Docker local:

### Passo a Passo
1. Certifique-se de estar na pasta correta:
```bash
cd backend
```
2. Instale as dependências locais:
  ```bash
  npm install
  ```
3. Configure a variável de ambiente criando um arquivo .env com a sua string de conexão para um banco PostgreSQL local:
  ```bash
  DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco?schema=public"
  ```
4. Execute as migrações do banco com o Prisma:
  ```bash
  npx prisma migrate dev
  ```
5. Inicie o servidor em modo de desenvolvimento:
  ```bash
  npm start
  ```
