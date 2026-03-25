import request from 'supertest';
import app from '../src/server';
import { prisma } from '../src/lib/prisma';

const baseFund = {
  name: 'Fundo Teste',
  ticker: 'FT11',
  type: 'FII',
  quotaValue: 100,
};

beforeEach(async () => {
  await prisma.transaction.deleteMany();
  await prisma.fund.deleteMany();
});

afterAll(async () => {
  await prisma.transaction.deleteMany();
  await prisma.fund.deleteMany();
  await prisma.$disconnect();
});

describe('Fund Routes', () => {
  it('GET /api/funds - deve retornar 200 e array vazio', async () => {
    const res = await request(app).get('/api/funds');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });

  it('POST /api/funds - deve criar um fundo', async () => {
    const res = await request(app).post('/api/funds').send(baseFund);
    expect(res.status).toBe(201);
    expect(res.body.ticker).toBe('FT11');
    expect(res.body.name).toBe('Fundo Teste');
  });

  it('POST /api/funds - deve retornar 400 se ticker duplicado', async () => {
    await request(app).post('/api/funds').send(baseFund);
    const res = await request(app).post('/api/funds').send(baseFund);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('POST /api/funds - deve retornar 400 se dados inválidos', async () => {
    const res = await request(app).post('/api/funds').send({ name: '', ticker: '', quotaValue: -1 });
    expect(res.status).toBe(400);
    expect(res.body.details).toBeDefined();
  });

  it('GET /api/funds/:id - deve retornar o fundo criado', async () => {
    const created = await request(app).post('/api/funds').send(baseFund);
    const res = await request(app).get(`/api/funds/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(created.body.id);
  });

  it('GET /api/funds/:id - deve retornar 404 se não encontrar', async () => {
    const res = await request(app).get('/api/funds/id-inexistente');
    expect(res.status).toBe(404);
  });

  it('PUT /api/funds/:id - deve atualizar o fundo', async () => {
    const created = await request(app).post('/api/funds').send(baseFund);
    const res = await request(app)
      .put(`/api/funds/${created.body.id}`)
      .send({ name: 'Nome Atualizado' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Nome Atualizado');
  });

  it('DELETE /api/funds/:id - deve deletar o fundo', async () => {
    const created = await request(app).post('/api/funds').send(baseFund);
    const res = await request(app).delete(`/api/funds/${created.body.id}`);
    expect(res.status).toBe(204);
  });
});

describe('Transaction Routes', () => {
  it('POST /api/transactions - deve criar uma transação (APORTE)', async () => {
    const fund = await request(app).post('/api/funds').send(baseFund);
    const res = await request(app).post('/api/transactions').send({
      fundId: fund.body.id,
      type: 'APORTE',
      value: 500,
      date: '2024-01-15',
    });
    expect(res.status).toBe(201);
    expect(res.body.type).toBe('APORTE');
    expect(res.body.quotas).toBeCloseTo(5);
  });

  it('POST /api/transactions - deve retornar 400 se tipo inválido', async () => {
    const fund = await request(app).post('/api/funds').send(baseFund);
    const res = await request(app).post('/api/transactions').send({
      fundId: fund.body.id,
      type: 'INVALIDO',
      value: 500,
      date: '2024-01-15',
    });
    expect(res.status).toBe(400);
  });

  it('POST /api/transactions - deve retornar 404 se fundo não existe', async () => {
    const res = await request(app).post('/api/transactions').send({
      fundId: 'fundo-inexistente',
      type: 'APORTE',
      value: 500,
      date: '2024-01-15',
    });
    expect(res.status).toBe(404);
  });

  it('GET /api/transactions/wallet/summary - deve retornar saldo correto', async () => {
    const fund = await request(app).post('/api/funds').send(baseFund);
    await request(app).post('/api/transactions').send({
      fundId: fund.body.id,
      type: 'APORTE',
      value: 1000,
      date: '2024-01-15',
    });
    await request(app).post('/api/transactions').send({
      fundId: fund.body.id,
      type: 'RESGATE',
      value: 300,
      date: '2024-01-20',
    });
    const res = await request(app).get('/api/transactions/wallet/summary');
    expect(res.status).toBe(200);
    expect(res.body.balance).toBeCloseTo(700);
    expect(res.body.totalTransactions).toBe(2);
  });

  it('DELETE /api/transactions/:id - deve deletar a transação', async () => {
    const fund = await request(app).post('/api/funds').send(baseFund);
    const tx = await request(app).post('/api/transactions').send({
      fundId: fund.body.id,
      type: 'APORTE',
      value: 500,
      date: '2024-01-15',
    });
    const res = await request(app).delete(`/api/transactions/${tx.body.id}`);
    expect(res.status).toBe(204);
  });
});