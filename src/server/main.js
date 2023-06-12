const httpServer = require("http").createServer();
const crypto = require("crypto");

const io = require("socket.io")(httpServer, {
  serveClient: false,
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const rooms = {
  lobby: {
    name: "Lobby",
    participants: [],
  },
};

function leaveRoom(socket, roomId) {
  const roomInfo = rooms[roomId];
  const index = roomInfo.participants.indexOf(socket.id);
  if (index > -1) {
    roomInfo.participants.splice(index, 1);
    if (roomId !== "lobby" && roomInfo.participants.length === 0) {
      delete rooms[roomId];
    }
  }
  socket.leave(roomId);
}

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("private message", (anotherSocketId, msg) => {
    socket.to(anotherSocketId).emit("private message", socket.id, msg);
  });
  socket.on("create-room", (roomName, callback) => {
    const roomId = crypto.randomBytes(16).toString("hex");
    rooms[roomId] = { name: roomName, participants: [socket.id] };
    callback({
      id: roomId,
    });
  });
  socket.on("join-room", (roomId, callback) => {
    const roomInfo = rooms[roomId];
    if (!roomInfo) {
      callback({
        status: "room not found",
      });
      return;
    }
    if (socket.room) {
      leaveRoom(socket, socket.room);
    }
    roomInfo.participants.push(socket.id);
    socket.room = roomId;
    socket.join(roomId);
    callback({
      status: "ok",
    });
  });
  socket.on("disconnect", (reason) => {
    console.log(socket.room);
    if (socket.room) {
      leaveRoom(socket, socket.room);
    }
    console.log(rooms);
  });
});

httpServer.listen(3000);
