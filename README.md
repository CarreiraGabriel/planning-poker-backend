# 🃏 Planning Poker — Backend

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-green?logo=node.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Express-Server-black?logo=express" />
  <img src="https://img.shields.io/badge/Socket.IO-Realtime-black?logo=socket.io" />
  <img src="https://img.shields.io/badge/Deploy-Render-blue?logo=render" />
</p>

<p align="center">
  Backend em tempo real para sessões de <strong>Planning Poker</strong>
</p>

---

## 🧠 Sobre

Servidor responsável por gerenciar salas de Planning Poker em tempo real.

Toda a comunicação é feita via WebSocket utilizando Socket.IO, mantendo o estado sincronizado entre todos os participantes de uma sala.

---

## ⚙️ Stack

- Node.js
- TypeScript
- Express
- Socket.IO

---

## 🔌 Arquitetura

- Comunicação bidirecional via WebSocket
- Estado mantido em memória (in-memory)
- Atualizações em tempo real para todos os clientes da sala
- Backend como única fonte de verdade

---

## 🧩 Funcionalidades

- Criação de salas com ID único
- Entrada de múltiplos usuários por sala
- Votação sincronizada em tempo real
- Revelação simultânea dos votos
- Controle de rodadas
- Histórico de rodadas por sala
- Remoção automática de usuários ao desconectar

---

## 🔄 Eventos Socket.IO

### Emitidos pelo cliente

- `create_room`
- `join_room`
- `vote`
- `reveal_votes`
- `reset_round`

### Emitidos pelo servidor

- `room_created`
- `room_update`

---

## 📁 Estrutura

```
src/
├── server.ts
├── socket/
│   └── socket.ts
├── rooms/
│   └── roomManager.ts
├── types/
│   └── game.ts
└── utils/
    └── generateRoomId.ts
```

---

## 🔧 Setup

### Clone

```bash
git clone https://github.com/seu-usuario/planning-poker-backend.git
cd planning-poker-backend
```

### Instalação

```bash
npm install
```

### Rodar em desenvolvimento

```bash
npm run dev
```

---

## 🔗 Frontend

👉 https://github.com/CarreiraGabriel/planning-poker-frontend

---

## 👨‍💻 Autor

Gabriel Carreira

---

## 📄 Licença

MIT