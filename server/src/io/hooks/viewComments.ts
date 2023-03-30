import { Socket } from "socket.io";
export default function viewComments(socket: Socket, todoList: any[], id: any) {
  for (let i = 0; i < todoList.length; i++) {
    const item = todoList[i];
    if (id === item.id) {
      socket.emit("commentsReceived", todoList[i]);
    }
  }
}
