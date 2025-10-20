# Orange Notes

Siga as etapas abaixo para configurar e executar o ambiente corretamente.

## 🖥️ Backend

### 1️⃣ Configuração das variáveis de ambiente

Crie um arquivo .env na raiz do backend e preencha os seguintes campos:

```
### Porta em que o servidor será executado

PORT=

### URL de conexão com o banco de dados (ex: PostgreSQL, MySQL, etc.)

DATABASE_URL=

### Chave secreta usada para gerar tokens JWT

JWT_SECRET=

### Chaves da integração com o Stripe

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRODUCT_ID=
```

### 2️⃣ Instalação e execução

Dentro da pasta do backend, execute os comandos:

```
# Instalar dependências
pnpm install

# Criar/atualizar as tabelas do banco de dados com base no schema do Prisma
pnpm prisma migrate deploy

# Iniciar o servidor em modo de desenvolvimento
pnpm start:dev
```

O servidor será iniciado na porta definida em PORT.

## 🌐 Frontend

### 1️⃣ Configuração das variáveis de ambiente

Na raiz do frontend, crie o arquivo .env e adicione:

```
### URL base da API backend

API_URL=
```

### 2️⃣ Instalação e execução

No diretório do frontend, execute:

```
pnpm install
pnpm dev
```

O frontend será iniciado (geralmente em http://localhost:3000).

## 📦 Resumo do fluxo de sincronização através de webhooks

### Evento Stripe → Ação no sistema local → Status da assinatura

`checkout.session.completed` → Cria ou ativa assinatura → ✅ Ativa

`invoice.paid` → Confirma pagamento e mantém assinatura ativa → ✅ Ativa

`invoice.payment_failed` → Marca assinatura como inadimplente → ⚠️ Pagamento falhou

`customer.subscription.deleted` → Cancela assinatura e revoga acesso → ❌ Cancelada

## Features

### 1. Planos e preços

- [x] Planos sendo obtidos dinamicamente da API do Stripe (não codificados).

- [x] Incluir opções de faturamento anual e mensal.

- [ ] Incluir preços diferentes por país ou moeda (por exemplo, BRL, USD, EUR).

### 2. Checkout e faturamento

- [x] Os usuários podem iniciar uma sessão do Stripe Checkout e assinar um plano.

- [x] Após o pagamento, seu aplicativo atualiza corretamente o status do plano.

- [x] Inclua um portal de cobrança para que os usuários possam gerenciar os métodos de pagamento ou cancelar.

### 3. Webhooks e ciclo de vida

- [x] Tratamento do webhook checkout.session.completed

- [ ] customer.subscription.updated

- [x] Tratamento do webhook invoice.payment_failed

- [x] Tratamento do webhook customer.subscription.deleted

- [ ] Atualize e mantenha adequadamente o status da assinatura em seu banco de dados.

- [ ] Trate as novas tentativas e a idempotência para garantir a confiabilidade.

### 4. Limites de recursos

- [x] Imponha limites de uso com base no plano.

### 5. Migração de contas

- [ ] Fluxo administrativo para transferir uma assinatura de uma conta para outra.
