export interface ServerToClientEvents {
    messageCreate: (message: Message) => void;
}

export interface ClientToServerEvents {
    messageCreate: (message: Message) => void;
}

export interface SocketData {
    user: User;
}

export type Message = {
    content: string;
    author: User;
    timestamp: number;
}

export type User = {
    username: string;
}