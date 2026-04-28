# Stareast Commerce API

## Description
Simple REST API for an e-commerce checkout flow using JavaScript and Express.  
All data is in memory (no database), and checkout requires authentication with JWT.

## Installation
```bash
npm install
```

## How to Run
```bash
npm start
```

Server runs at `http://localhost:3000`.

Swagger UI is available at `http://localhost:3000/swagger`.

## Rules
- Endpoints: `POST /register`, `POST /login`, `POST /checkout`, `GET /healthcheck`
- Checkout accepts only `cash` or `credit_card`
- If payment method is `cash`, checkout applies `10%` discount
- Only authenticated users can use checkout (`Authorization: Bearer <token>`)
- Everything runs in memory

## Data Already Existent

### Users (3)
- `alice@example.com` / `alice123`
- `bob@example.com` / `bob123`
- `carol@example.com` / `carol123`

### Products (3)
- `id: 1` - Notebook - `price: 1000`
- `id: 2` - Headphones - `price: 250`
- `id: 3` - Mouse - `price: 120`

## How to Use the Rest API

### 1) Register
`POST /register`
```json
{
  "name": "Dave",
  "email": "dave@example.com",
  "password": "dave123"
}
```

### 2) Login
`POST /login`
```json
{
  "email": "alice@example.com",
  "password": "alice123"
}
```
Response returns a token:
```json
{
  "token": "<jwt-token>"
}
```

### 3) Checkout (Authenticated)
`POST /checkout`

Headers:
`Authorization: Bearer <jwt-token>`

Body:
```json
{
  "paymentMethod": "cash",
  "items": [
    { "productId": 1, "quantity": 1 },
    { "productId": 2, "quantity": 2 }
  ]
}
```

### 4) Healthcheck
`GET /healthcheck`
