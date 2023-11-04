const app = require("./app");
const server = require("./config/socket.io.config");
require("dotenv").config();

app.listen(process.env.SERVER_PORT, () =>
  console.log(`app is listening at http://localhost:${process.env.SERVER_PORT}`)
);

server.listen(process.env.SOCKET_IO_PORT, () => {
  console.log(
    `SOCKET.IO is listening at http://localhost:${process.env.SOCKET_IO_PORT}`
  );
});
