Bun.serve({
  port: 3000,
  fetch(request, server) {
    if (server.upgrade(request)) return;

    return new Response("Hello World");
  },
  websocket: {
    open(ws) {
      console.log(`Websocket opened ${ws}`);
    },
    message(ws, message) {
      console.log(`Websocket message ${ws} ${message}`);
    },
    close(ws) {
      console.log(`Websocket closed ${ws}`);
    },
  },
});
