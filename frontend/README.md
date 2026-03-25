# Desafio Fullstack — Mérito

Dashboard de gestão de fundos de investimento com registro de aportes e resgates, cálculo automático de cotas e controle de saldo da carteira.

## Tecnologias

**Backend:** Node.js · Express · TypeScript · PostgreSQL · Prisma ORM · Jest · Zod  
**Frontend:** React · TypeScript · Tailwind CSS · TanStack Query · React Hook Form · Zod  
**DevOps:** Docker · Docker Compose · GitHub Actions

---

## Funcionalidades

- Cadastro, listagem e remoção de fundos de investimento (nome, ticker, tipo, valor da cota)
- Registro de aportes e resgates com cálculo automático de cotas
- Validação de saldo antes de permitir resgates
- Dashboard com saldo da carteira e últimas movimentações em tempo real
- Validação de formulários no frontend (Zod + React Hook Form) e no backend (Zod middleware)
- Tratamento de erros centralizado no backend com `AppError`
- Feedback visual de erros e sucessos via toasts no frontend
- Testes automatizados no backend (Jest + Supertest)

---

## Pré-requisitos

- Node.js 20+
- npm
- PostgreSQL rodando localmente **ou** Docker instalado

---

## Como rodar localmente (sem Docker)

### 1. Clonar o repositório
```bash
git clone https://github.com/MessiasEduarda/desafio-fullstack.git
cd desafio-fullstack
```

### 2. Configurar e iniciar o Backend
```bash
cd backend
npm install
cp .env.example .env
```

Edite o `.env` com suas credenciais do PostgreSQL:
```env
DATABASE_URL="postgresql://postgres:root@localhost:5432/merito_dev"
PORT=3333
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

> **Atenção:** certifique-se de que o banco `merito_dev` existe no PostgreSQL antes de rodar as migrations. Você pode criá-lo pelo pgAdmin (botão direito em Databases → Create → Database → nome: `merito_dev`) ou via psql:
> ```sql
> CREATE DATABASE merito_dev;
> ```
```bash
npx prisma migrate dev --name init
npm run dev
```

API disponível em: `http://localhost:3333`

### 3. Configurar e iniciar o Frontend

Em outro terminal:
```bash
cd frontend
npm install
npm run dev
```

Acesse a aplicação em: `http://localhost:5173`

---

## Como rodar com Docker

Sobe o banco de dados PostgreSQL e o backend com um único comando na raiz do projeto:
```bash
docker-compose up --build
```

- Backend: `http://localhost:3333`
- PostgreSQL: porta `5432`

Depois suba o frontend separadamente:
```bash
cd frontend
npm install
npm run dev
```

---

## Rodar os testes

Os testes usam um banco SQLite em memória e não precisam de PostgreSQL rodando.
```bash
cd backend
npm test
```

Para rodar com cobertura:
```bash
npm test -- --coverage
```

---

## Testando a API

### Via curl

#### Fundos
```bash
# Listar todos os fundos
curl http://localhost:3333/api/funds

# Cadastrar fundo
curl -X POST http://localhost:3333/api/funds \
  -H "Content-Type: application/json" \
  -d '{"name":"Maxi Renda","ticker":"MXRF11","type":"FII","quotaValue":10.50}'

# Buscar fundo por ID
curl http://localhost:3333/api/funds/<id>

# Atualizar fundo
curl -X PUT http://localhost:3333/api/funds/<id> \
  -H "Content-Type: application/json" \
  -d '{"quotaValue":11.00}'

# Remover fundo
curl -X DELETE http://localhost:3333/api/funds/<id>
```

#### Movimentações
```bash
# Listar movimentações (ordenadas por data)
curl http://localhost:3333/api/transactions

# Registrar aporte
curl -X POST http://localhost:3333/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"fundId":"<id>","type":"APORTE","value":1000,"date":"2024-03-24"}'

# Registrar resgate
curl -X POST http://localhost:3333/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"fundId":"<id>","type":"RESGATE","value":500,"date":"2024-03-24"}'

# Saldo e resumo da carteira
curl http://localhost:3333/api/transactions/wallet/summary

# Remover movimentação
curl -X DELETE http://localhost:3333/api/transactions/<id>
```

### Via Postman

Base URL: `http://localhost:3333`

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/funds` | Lista todos os fundos |
| GET | `/api/funds/:id` | Busca fundo por ID |
| POST | `/api/funds` | Cadastra um fundo |
| PUT | `/api/funds/:id` | Atualiza um fundo |
| DELETE | `/api/funds/:id` | Remove um fundo |
| GET | `/api/transactions` | Lista movimentações |
| POST | `/api/transactions` | Registra movimentação |
| DELETE | `/api/transactions/:id` | Remove movimentação |
| GET | `/api/transactions/wallet/summary` | Saldo da carteira |

---

## Estrutura do Projeto
```
desafio-fullstack/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Camada HTTP (req/res)
│   │   ├── services/         # Regras de negócio
│   │   ├── repositories/     # Acesso ao banco via Prisma
│   │   ├── middlewares/      # Validação (Zod) e tratamento de erros
│   │   ├── routes/           # Definição das rotas Express
│   │   ├── lib/              # Instância do Prisma
│   │   └── server.ts         # Entry point
│   ├── prisma/
│   │   └── schema.prisma
│   └── tests/
│       └── fund.test.ts
├── frontend/
│   └── src/
│       ├── components/       # Componentes reutilizáveis (ui/, layout/)
│       ├── hooks/            # React Query hooks
│       ├── pages/            # Dashboard, Fundos, Movimentações
│       ├── services/         # Chamadas à API (axios)
│       ├── types/            # Interfaces TypeScript
│       └── utils/            # Formatadores e helpers
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

## Variáveis de Ambiente

### Backend (`backend/.env`)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL de conexão PostgreSQL | `postgresql://postgres:root@localhost:5432/merito_dev` |
| `PORT` | Porta do servidor | `3333` |
| `FRONTEND_URL` | URL do frontend (CORS) | `http://localhost:5173` |
| `NODE_ENV` | Ambiente de execução | `development` |

### Frontend (`frontend/.env`)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_API_URL` | URL base da API | `http://localhost:3333/api` |

---

## Decisões técnicas

- **Arquitetura em camadas** (Controller → Service → Repository) para separar responsabilidades e facilitar testes.
- **Zod** para validação tanto no backend (middleware) quanto no frontend (formulários), garantindo consistência nos schemas.
- **TanStack Query** para cache e sincronização de estado do servidor, evitando chamadas desnecessárias.
- **AppError** customizado no backend para tratamento centralizado com status HTTP corretos.
- **Validação de saldo** antes de registrar resgates, retornando erro 400 com mensagem clara ao usuário.