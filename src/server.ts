import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { registerSocketHandlers } from "./socket/socket";

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

registerSocketHandlers(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`rodando na porta ${PORT}`);
});