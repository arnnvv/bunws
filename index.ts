import WebSocket, { WebSocketServer } from "ws";

const port: number = 8080;

const server = Bun.serve({
  port: port,
  fetch(req) {
    console.log(`${new Date()} Server listning on ${req.url}`);
    return new Response("HII this is a bun server");
  },
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("error", console.error);
  ws.on("message", (data, isBinary) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  ws.send("Hello World!");
});
