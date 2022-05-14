import Fastify, { FastifyInstance } from "fastify";
import fastifyIO from "fastify-socket.io";
import { join } from "path";
import { readFile } from "fs/promises";

const fastify: FastifyInstance = Fastify({
    logger: true,
});
fastify.register(fastifyIO);

fastify.get("/", async (req, reply) => {
    const data = await readFile(join(__dirname, "..", "test.html"));
    reply.header("content-type", "text/html; charset=utf-8");
    reply.send(data);
});

fastify.ready((err) => {
    if (err) throw err;

    fastify.io.on("connection", (socket) => {
        console.info("Socket connected!", socket.id);
        socket.on("chat message", (msg) => {
            console.log(`${socket.id} sent: ${msg}`);
            fastify.io.emit("chat message", `${socket.id}: ${msg}`)
        });
    });
});

fastify.listen(4000);
