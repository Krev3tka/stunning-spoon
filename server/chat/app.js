import {WebSocketServer} from "ws";

const PORT = 8080;

const wss = new WebSocketServer({port: PORT});
console.log(`WS server is running on ws://localhost:${PORT}`);

wss.on("connection", (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const clientName = url.searchParams.get('clientName');

    console.log(`${clientName} connected`);
    wss.clients.forEach((client) => {
        client.send(`${clientName} connected!`);
    });

    ws.on("close", () => {
        console.log(`${clientName} disconnected`);
        wss.clients.forEach((client) => {
            client.send(`${clientName} disconnected!`);
        });
    });

    ws.on("message", (data) => {
        const message = data.toString(); // Преобразуем в строку
        wss.clients.forEach((client) => {
            client.send(message);
        });
    });
});
