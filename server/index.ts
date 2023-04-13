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

// import createNovuServer from "./src/novu";
const { Novu } = require("@novu/node");

const app = express();
const PORT = 9000;

const http = createServer(app);

import { Server } from "socket.io";

const isNovu = new Novu("539b34788fa5464ce0499b8c859a55fa");

const socketIO = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(http, {
  cors: {
    origin: "http://127.0.0.1:5000",
  },
});

let todoList = [];

// socketIO.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   socket.on(socketFCName.AddTodo, async (todo) => {
//     todoList.unshift(todo);
//     addTodo(socket, todoList);
//     // 👇🏻 Triggers the notification via Novu
//     await sendNotification("taska-notification");
//   });

//   socket.on(socketFCName.ViewComments, (id) => {
//     viewComments(socket, todoList, id);
//   });
//   socket.on(socketFCName.UpdateComment, (data: updateCommentCBProps) => {
//     updateComment(socket, todoList, data);
//   });

//   socket.on(socketFCName.DeleteTodo, (data) => {
//     const { id } = data;
//     const list = deleteTodo(socket, todoList, id);
//     todoList = list;
//     socket.emit("todos", todoList);
//   });

//   socket.on("disconnect", () => {
//     socket.disconnect();
//     console.log("🔥: A user disconnected");
//   });
// });

async function sendNotification(templateId) {
  console.log("111");
  try {
    const result = await isNovu.trigger(templateId, {
      to: {
        subscriberId: "64376d83c3f9dd9ef67e8051",
      },
      payload: {
        attachments: [],
        userId: "on-boarding-subscriber-id-123",
      },
    });
    console.log("result", result);
  } catch (error) {
    console.error("Error >>>>", { error });
  }
}

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

socketIO.listen(4153);
