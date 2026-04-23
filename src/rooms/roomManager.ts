import { Rooms } from "../types/game";

export const rooms: Rooms = {};

export function createRoom(roomId: string) {
  rooms[roomId] = {
    users: [],
    currentRound: {
      title: "",
      link: "",
      votes: {},
      revealed: false
    },
    history: []
  };
}