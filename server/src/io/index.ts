import { socketFCName, updateCommentCBProps } from "@/contant";
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
export function createSocketIO(params: IOProps) {
  let todoList = [];
  return () => {
    const socketIO = new Server(params.http, {
      cors: {
        origin: params.origin,
      },
    });
    socketIO.on(socketFCName.Connection, (socket: Socket) => {
      console.log(`⚡: ${socket.id} user just connected!`);

      socket.on(socketFCName.AddTodo, (todo) => {
        todoList.push(todo);
        addTodo(socket, todoList);
      });

      socket.on(socketFCName.ViewComments, (id) => {
        viewComments(socket, todoList, id);
      });

      socket.on(socketFCName.UpdateComment, (data: updateCommentCBProps) => {
        todoList = updateComment(socket, todoList, data);
      });

      socket.on(socketFCName.DeleteTodo, (id) => {
        todoList = deleteTodo(socket, todoList, id);
      });

      socket.on(socketFCName.Disconnect, () => {
        disconnect(socket);
      });
    });
    return {
      todoList,
      socketIO,
    };
  };
}
