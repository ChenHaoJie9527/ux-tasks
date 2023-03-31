import { updateCommentCBProps } from "@/contant";

// ServerToClientEvents在发送和广播事件时使用接口中声明的事件：
export interface ServerToClientEvents {
  todos: (todoList: any[]) => void;
  commentsReceived: (item) => void;
  viewComments: (item) => void;
  deleteTodo: (todoList: any[]) => void;
}

// ClientToServerEvents接收事件时使用接口中声明的那些：
export interface ClientToServerEvents {
  addTodo: (todo) => void;
  viewComments: (id) => void;
  updateComment: (data: updateCommentCBProps) => void;
  deleteTodo: (id) => void;
}

// 接口中声明的InterServerEvents用于服务器间通信
export interface InterServerEvents {
  ping: () => void;
}

// 最后，SocketData type 用于键入 socket.data 属性
export interface SocketData {
  name: string;
  age: number;
}
