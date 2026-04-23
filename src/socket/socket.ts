import { Server, Socket } from "socket.io";
import { rooms, createRoom } from "../rooms/roomManager";
import { generateRoomId } from "../utils/generateRoomId";

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`[connection] Novo socket conectado: ${socket.id}`);

    socket.on("create_room", () => {
      const roomId = generateRoomId();
      console.log(`[create_room] socket=${socket.id} criando sala=${roomId}`);

      createRoom(roomId);

      socket.join(roomId);

      console.log(`[create_room] sala=${roomId} criada. Usuários:`, rooms[roomId].users);
      socket.emit("room_created", { roomId });
    });

    socket.on("join_room", ({ roomId, userName }) => {
      const room = rooms[roomId];
      console.log(`[join_room] socket=${socket.id} name=${userName} tentando entrar na sala=${roomId}`);
      console.log(`[join_room] Usuários ANTES:`, room ? room.users.map(u => `${u.name}(${u.id})`) : "sala não encontrada");

      if (!room) return;

      const alreadyInRoom = room.users.some(u => u.id === socket.id);
      if (alreadyInRoom) {
        console.log(`[join_room] socket=${socket.id} já está na sala, ignorando duplicata`);
        return;
      }

      const user = {
        id: socket.id,
        name: userName,
        hasVoted: false
      };

      room.users.push(user);

      socket.join(roomId);

      console.log(`[join_room] Usuários DEPOIS:`, room.users.map(u => `${u.name}(${u.id})`));
      io.to(roomId).emit("room_update", room);
    });

    socket.on("vote", ({ roomId, value }) => {
      const room = rooms[roomId];
      if (!room) return;

      room.currentRound.votes[socket.id] = value;

      const user = room.users.find(u => u.id === socket.id);
      if (user) user.hasVoted = true;

      io.to(roomId).emit("room_update", room);
    });

    socket.on("reveal_votes", ({ roomId }) => {
      const room = rooms[roomId];
      if (!room) return;

      room.currentRound.revealed = true;

      io.to(roomId).emit("room_update", room);
    });

    socket.on("reset_round", ({ roomId, title, link }) => {
      const room = rooms[roomId];
      if (!room) return;

      const round = room.currentRound;

      if (Object.keys(round.votes).length > 0) {
        room.history.push({
          title: round.title,
          link: round.link ?? "",
          votes: { ...round.votes },
          result: calculateAverage(round.votes)
        });
      }

      room.currentRound = {
        title: title ?? "",
        link: link ?? "",
        votes: {},
        revealed: false
      };

      room.users.forEach(u => (u.hasVoted = false));

      io.to(roomId).emit("room_update", room);
    });

    socket.on("disconnect", () => {
      console.log(`[disconnect] socket=${socket.id} desconectado`);
      for (const roomId in rooms) {
        const room = rooms[roomId];
        const antes = room.users.length;
        room.users = room.users.filter(u => u.id !== socket.id);
        if (antes !== room.users.length) {
          console.log(`[disconnect] Removido socket=${socket.id} da sala=${roomId}. Usuários restantes:`, room.users.map(u => `${u.name}(${u.id})`));
        }
        io.to(roomId).emit("room_update", room);
      }
    });
  });
}

function calculateAverage(votes: Record<string, number | string>): number | null {
  const values = Object.values(votes).filter(
    (v): v is number => typeof v === "number"
  );

  if (!values.length) return null;

  const sum = values.reduce((a, b) => a + b, 0);
  return Math.round(sum / values.length);
}