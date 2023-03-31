import express from "express";
import cors from "cors";
import { createServer } from "http";
import { socketFCName, updateCommentCBProps } from "./src/contant";
import {
  addTodo,
  deleteTodo,
  updateComment,
  viewComments,
} from "./src/io/hooks";
import {
  ServerToClientEvents,
  InterServerEvents,
  ClientToServerEvents,
  SocketData,
} from "@/types";
const app = express();
const PORT = 4000;

const http = createServer(app);

import { Server } from "socket.io";

const socketIO = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(http, {
  cors: {
    origin: "http://127.0.0.1:5000",
  },
});

let todoList = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on(socketFCName.AddTodo, (todo) => {
    todoList.unshift(todo);
    addTodo(socket, todoList);
  });

  socket.on(socketFCName.ViewComments, (id) => {
    viewComments(socket, todoList, id);
  });
  socket.on(socketFCName.UpdateComment, (data: updateCommentCBProps) => {
    updateComment(socket, todoList, data);
  });

  socket.on(socketFCName.DeleteTodo, (id) => {
    deleteTodo(socket, todoList, id);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/api", (req, res) => {
  res.json(todoList);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

socketIO.listen(4001);
