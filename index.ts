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
      console.log(`Websocket opened ${ws} ${welcomeMessage}`);
    },
    message(ws, message) {
      console.log(`Incomming message ${ws} ${message}`);
      if (message.trim().toLowerCase() === "time") {
        const time = new Date().toLocaleTimeString();
      }
    },
    close(ws) {
      console.log(`Websocket closed ${ws}`);
    },
  },
});

console.log(`Listening on ${server.url}`);
