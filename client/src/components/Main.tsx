import { FC, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Nav } from "@/common";
import Modal from "@/common/Modal";

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  todos: (list: any[]) => void;
  commentsReceived: (todo: any) => void;
}

interface ClientToServerEvents {
  addTodo: (props: { id: string; todo: string; comments: any[] }) => void;
  deleteTodo: (data: { id: any }) => void;
  viewComments: (id: any) => void;
}

interface MainProps {
  socketIO: typeof io;
}

const Main: FC<MainProps> = ({ socketIO }) => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<any[]>([]);
  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectItemID, setSelectItemID] = useState("");

  const handleAddTodo = (el: any) => {
    el.preventDefault();
    const socket = socketRef.current;
    socket?.emit("addTodo", {
      id: generateID(),
      todo,
      comments: [],
    });
    setTodo("");
  };

  const handleDeleteTodo = (id: any) => {
    const socket = socketRef.current;
    socket?.emit("deleteTodo", { id });
  };

  useEffect(() => {
    if (socketRef.current === null) {
      socketRef.current = socketIO("http://localhost:4001");
    }

    const socket = socketRef.current;
    function fetchTodos() {
      fetch("http://localhost:4000/api")
        .then((res) => res.json())
        .then((data) => setTodoList(data))
        .catch((err) => console.error(err));
    }

    fetchTodos();
    socket?.on("todos", (data) => {
      setTodoList(data);
    });
    socket?.on("commentsReceived", (todo) => {
      console.log(todo);
    });
  }, [socketIO]);

  const toggleModal = (todoId: any) => {
    const socket = socketRef.current;
    setSelectItemID(todoId);
    socket?.emit("viewComments", todoId);
    setShowModal(!showModal);
  };

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
                <button
                  className="commentsBtn"
                  onClick={() => toggleModal(item.id)}
                >
                  View Comments
                </button>
                <button
                  className="deleteBtn"
                  onClick={() => handleDeleteTodo(item.id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {showModal ? (
        <Modal
          showModal={showModal}
          socket={socketRef.current}
          setShowModal={setShowModal}
          selectedItemID={selectItemID}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;
function generateID() {
  return Math.random().toString(36).substring(2, 10);
}
