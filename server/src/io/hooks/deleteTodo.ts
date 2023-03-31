import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@/types";
export default function deleteTodo(
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  todoList: any[],
  id: any
) {
  const res = todoList.filter((todo) => todo.id !== id);
  socket.emit("deleteTodo", todoList);
  return res;
}
