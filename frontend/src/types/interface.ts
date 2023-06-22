export interface IUser {
  id: number;
  username: string;
  socketId?: string;
}

export interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export interface IAppStore {
  users: IUser[];
  setUsers: (users: IUser[]) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  info: string | null;
  setInfo: (token: string | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export interface IRoomStore {
  currentRoom: IRoom | null;
  setCurrentRoom: (room: IRoom | null) => void;
  rooms: IRoomItem[];
  setRooms: (room: IRoomItem[]) => void;
}

export interface IForm {
  username: string;
  password: string;
}

export interface IRoom {
  id: string;
  messages: IMessage[];
  name: string;
  participants: IUser[];
}

export interface IRoomItem {
  id: string;
  name: string;
  users: number;
}

export interface IMessage {
  id: string;
  text: string;
  username: string;
  date: number;
}
