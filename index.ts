const server = Bun.serve({
  port: 3000,
  fetch(request, server) {
    if (server.upgrade(request)) return;

    return new Response("Hello World");
  },
  websocket: {
    open(ws) {
      const welcomeMessage =
        "Welcome ask me the time and I'll tell you what time it is";
      ws.send(welcomeMessage);
      console.log(`Websocket opened`);
    },
    message(ws, message) {
      console.log(`Incomming message ${message}`);
      const messageString =
        typeof message === "string"
          ? message
          : new TextDecoder().decode(message);
      if (messageString.trim().toLowerCase() === "time?") {
        const time = new Date().toLocaleTimeString();
        ws.send(time);
        return;
      }
    },
    close(ws) {
      console.log(`Websocket closed`);
    },
  },
});

console.log(`Listening on ${server.url}`);
