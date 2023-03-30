import { Socket } from "socket.io";

export default function deleteTodo(socket: Socket, todoList: any[], id: any) {
  const res = todoList.filter((todo) => todo.id !== id);
  socket.emit("todos", todoList);
  return res;
}
