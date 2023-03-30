import { Socket } from "socket.io";
export default function disconnect(socket: Socket) {
  socket.disconnect();
  console.log("🔥: A user disconnected");
}
