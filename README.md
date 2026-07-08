# Home Expense Tracker
Um **sistema full-stack de controle de gastos residenciais**, construído com **ASP.NET Core Web API** e **React + TypeScript**.

> O backend expõe uma API REST e o frontend consome essa API via HTTP. Backend e frontend rodam separadamente (backend em `https://localhost:7210`, frontend em `http://localhost:5173`).

---

## Funcionalidades

### Gestão de Pessoas
- **Cadastro de pessoas** com nome e idade
- **Listagem de pessoas** cadastradas
- **Exclusão de pessoas** com **cascade delete** das transações vinculadas

### Gestão de Transações
- **Cadastro de transações** (receita ou despesa) vinculadas a uma pessoa
- **Listagem de transações** (sem edição ou exclusão, conforme escopo do desafio)
- Validação de regra de negócio: **pessoas menores de 18 anos só podem registrar despesas**
- Feedback visual em tempo real: opção "Income" desabilitada no formulário quando a pessoa selecionada é menor de idade
- Exibição de erros de regra de negócio retornados pelo backend

### Consulta de Totais
- Total de receitas, despesas e saldo **por pessoa**
- Totais gerais (soma de todas as pessoas)
- Atualização manual via botão de refresh

### Regras de Negócio
- **Cascade delete**: ao remover uma pessoa, todas as suas transações são removidas junto
- **Restrição de idade**: menores de 18 anos não podem ter transações do tipo receita (validado no backend, retorna erro 400 com mensagem explicativa)

### API
API REST documentada via Swagger.

Principais endpoints:
- `GET/POST /api/persons`
- `DELETE /api/persons/{id}`
- `GET/POST /api/transactions`
- `GET /api/totals`

Swagger disponível em:
`https://localhost:7210/swagger`

### Arquitetura
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core + SQLite (banco local em arquivo, sem servidor externo)
- Frontend React + TypeScript (Vite)
- Comunicação via REST/JSON
- Mono-repo com pastas `backend/` e `frontend/`

---

## Como Executar

### Pré-requisitos
- .NET 8 SDK
- Node.js (versão LTS) + npm

### Executando o Backend
1. Acesse a pasta `backend/HomeExpenseTracker.Api`
2. Execute:
   ```
   dotnet restore
   dotnet ef database update
   dotnet run
   ```
3. Swagger disponível em:
   `https://localhost:7210/swagger`

### Executando o Frontend
1. Acesse a pasta `frontend`
2. Execute:
   ```
   npm install
   npm run dev
   ```
3. Aplicação disponível em:
   `http://localhost:5173`

> Certifique-se de que o backend está rodando antes de abrir o frontend, já que as requisições dependem da API estar ativa.

---

## Tecnologias

### Backend
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- SQLite
- C#

### Frontend
- React
- TypeScript
- Vite
- CSS puro (sem frameworks)

---

## Status do Projeto
Mínimo concluído, com possíveis melhorias futuras.
