# desafio-fullstack-merito

Dashboard de gestão de fundos de investimento com registro de aportes e resgates e controle de saldo da carteira.

## Tecnologias

- **Backend:** Node.js, Express, TypeScript, PostgreSQL, Prisma, Jest, Zod
- **Frontend:** React, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod
- **DevOps:** Docker, Docker Compose, GitHub Actions

## Como rodar o backend localmente

Você precisa ter o PostgreSQL rodando e criar o banco antes de continuar.
```bash
cd backend
npm install
cp .env.example .env
```

Edite o `.env` com suas credenciais:
```env
DATABASE_URL="postgresql://postgres:suasenha@localhost:5432/merito_dev"
PORT=3333
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```
```bash
npx prisma migrate dev --name init
npm run dev
```

API disponível em `http://localhost:3333`

## Como rodar o frontend

Em outro terminal:
```bash
cd frontend
npm install
npm run dev
```

Acesse em `http://localhost:5173`

## Como rodar com Docker

Sobe o banco e o backend juntos:
```bash
docker-compose up --build
```

Depois sobe o frontend separadamente como indicado acima.

## Como rodar os testes

Os testes rodam com PostgreSQL. Certifique-se de que o banco está configurado no `.env`.
```bash
cd backend
npm test
```

## Testando as APIs

### Fundos
```bash
# Listar fundos
curl http://localhost:3333/api/funds

# Criar fundo
curl -X POST http://localhost:3333/api/funds \
  -H "Content-Type: application/json" \
  -d '{"name":"Maxi Renda","ticker":"MXRF11","type":"FII","quotaValue":10.50}'

# Atualizar fundo
curl -X PUT http://localhost:3333/api/funds/<id> \
  -H "Content-Type: application/json" \
  -d '{"quotaValue":11.00}'

# Remover fundo
curl -X DELETE http://localhost:3333/api/funds/<id>
```

### Movimentações
```bash
# Listar movimentações
curl http://localhost:3333/api/transactions

# Registrar aporte
curl -X POST http://localhost:3333/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"fundId":"<id>","type":"APORTE","value":1000,"date":"2024-03-24"}'

# Registrar resgate
curl -X POST http://localhost:3333/api/transactions \
  -H "Content-Type: application/json" \
  -d '{"fundId":"<id>","type":"RESGATE","value":500,"date":"2024-03-24"}'

# Saldo da carteira
curl http://localhost:3333/api/transactions/wallet/summary

# Remover movimentação
curl -X DELETE http://localhost:3333/api/transactions/<id>
```

Ou via Postman usando `http://localhost:3333` como base URL e os mesmos endpoints acima.
