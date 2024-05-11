import readline from "readline";
const socket = new WebSocket("ws://localhost:3000");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.addEventListener("open", () => {
  console.log("connected");
});

socket.addEventListener("message", (event) => {
  console.log(event.data);
});

socket.addEventListener("close", () => {
  console.log("disconnected");
  rl.close();
});

rl.on("line", (line) => {
  socket.send(line);
  rl.prompt();
});
