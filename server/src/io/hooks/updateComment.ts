import { updateCommentCBProps } from "@/contant";
import { Socket } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../../types";
export default function updateComment(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
  todoList: any[],
  data: updateCommentCBProps
) {
  for (let i = 0; i < todoList.length; i++) {
    const item = todoList[i];
    if (item.id === data.todoID) {
      todoList[i].comments.push({
        name: data.user,
        text: data.comment,
      });
      socket.emit("commentsReceived", todoList[i]);
    }
  }
  return todoList;
}
