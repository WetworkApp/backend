import { Server } from "socket.io";
import type { Socket } from "socket.io";
import type { Message, ServerToClientEvents, ClientToServerEvents } from "../defs";

const server = new Server<ClientToServerEvents, ServerToClientEvents>(4000, {
    cors: {
        origin: "*"
    }
});

server.on("connection", (socket: Socket) => {
    console.log(`${socket.id} connected.`);
    socket.on("messageCreate", (msg: Message) => {
        if (!msg.author) {
            return false;
        }
        console.log(`${msg.author} sent: ${msg.content}`);
        server.emit("messageCreate", <Message> {
            author: msg.author,
            content: msg.content,
            timestamp: Date.now()
        });
    });
});
