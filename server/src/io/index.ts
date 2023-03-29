// const { Server } = require("socket.io");
import { socketFCName } from "@/contant";
import { Server, Socket } from "socket.io";
import {
  addTodo,
  updateComment,
  viewComments,
  deleteTodo,
  disconnect,
} from "./hooks";
interface IOProps {
  http: any;
  origin: string;
}
export default function createSocketIO(params: IOProps) {
  return () => {
    const socketIO = new Server(params.http, {
      cors: {
        origin: params.origin,
      },
    });
    socketIO.on(socketFCName.Connection, (socket: Socket) => {
      console.log(`⚡: ${socket.id} user just connected!`);
      socket.on(socketFCName.AddTodo, addTodo);

      socket.on(socketFCName.ViewComments, viewComments);

      socket.on(socketFCName.UpdateComment, updateComment);

      socket.on(socketFCName.DeleteTodo, deleteTodo);

      socket.on(socketFCName.Disconnect, disconnect);
    });
  };
}
