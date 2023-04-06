import { FC, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Nav } from "@/common";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  todos: (list: any[]) => void;
}

interface ClientToServerEvents {
  addTodo: (props: { id: string; todo: string; comments: any[] }) => void;
}

interface MainProps {
  socketIO: typeof io;
}

const Main: FC<MainProps> = ({ socketIO }) => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<any[]>([]);
  const socketOriginURL = useRef("http://localhost:4001");
  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  const handleAddTodo = (el: any) => {
    console.log("todoList", todoList);
    el.preventDefault();
    const socket = socketRef.current;
    socket?.emit("addTodo", {
      id: generateID(),
      todo,
      comments: [1],
    });
    setTodo("");
  };

  useEffect(() => {
    if (socketRef.current === null) {
      socketRef.current = socketIO(socketOriginURL.current);
    }
    const socket = socketRef.current;
    function fetchTodos() {
      fetch(`${socketOriginURL.current}/api`)
        .then((res) => res.json())
        .then((data) => setTodoList(data))
        .catch((err) => console.error(err));
    }

    fetchTodos();
    socket?.on("todos", (data) => {
      setTodoList(data);
    });
  }, [socketIO]);

  return (
    <div>
      <Nav />
      <form className="form" onSubmit={handleAddTodo}>
        <input
          type="text"
          value={todo}
          className="input"
          required
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="form__cta">ADD TODO</button>
      </form>
      <div className="todo__container">
        {todoList.map((item) => {
          return (
            <div className="todo__item" key={item.id}>
              <p>{item.todo}</p>
              <div>
                <button className="commentsBtn">View Comments</button>
                <button className="deleteBtn">DELETE</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
function generateID() {
  return Math.random().toString(36).substring(2, 10);
}
