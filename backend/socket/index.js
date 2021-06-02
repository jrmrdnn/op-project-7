import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const Socket = (server) => {
  const io = new Server(server);

  let users = [];

  io.use((socket, next) => {
    if (socket.handshake.auth.token) {
      jwt.verify(
        socket.handshake.auth.token,
        process.env.JWT_SECRET_KEY,
        (err, decoded) => {
          if (err) return next(new Error("Authentication error"));
          socket.decoded = decoded;
          next();
        }
      );
    } else {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    let currentUser = null;

    currentUser = {
      id: socket.decoded.userId,
      username: socket.decoded.username,
    };

    let user = users.find((u) => u.id === currentUser.id);

    if (!user) {
      users.push(currentUser);
    }

    socket.broadcast.emit("users.new", { user: currentUser });

    io.emit("users.list", { users });

    socket.on("disconnect", () => {
      users = users.filter((u) => u.id !== currentUser.id);
      socket.broadcast.emit("users.leave", { user: currentUser });
    });

    socket.on("messages", (message) => {
      io.emit("messages.list", message);
    });

    socket.on("likes", (message) => {
      socket.broadcast.emit("likes.list", message);
    });

    socket.on("comments", (message) => {
      socket.broadcast.emit("comments.list", message);
    });
  });
};

export default Socket;
