export type User = {
  id: string;
  name: string;
  hasVoted: boolean;
};

export type Votes = {
  [userId: string]: number | string;
};

export type Round = {
  title: string;
  link?: string;
  votes: Votes;
  revealed: boolean;
};

export type HistoryItem = {
  title: string;
  link: string;
  votes: Record<string, number | string>;
  result: number | null;
};

export type Room = {
  users: User[];
  currentRound: Round;
  history: HistoryItem[];
};

export type Rooms = {
  [roomId: string]: Room;
};