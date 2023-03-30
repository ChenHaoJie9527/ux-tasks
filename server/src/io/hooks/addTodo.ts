import { Socket } from "socket.io";
export default function addTodo(socket: Socket, todoList: any[]): void {
  socket.emit("todos", todoList);
}
