import { FC, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

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
  updateComment: (params: {
    todoID: any;
    comment: string;
    user: string;
  }) => void;
}
interface ModelProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  showModal: boolean;
  setShowModal: any;
  selectedItemID: any;
}

const Modal: FC<ModelProps> = ({
  socket,
  showModal,
  setShowModal,
  selectedItemID,
}) => {
  const [comment, setComment] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const [commentList, setCommentList] = useState([]);

  const onInputChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    const value = el.target.value;
    setComment(value);
  };
  // If the container (modalRef) is clicked, it closes the modal.
  const closeModal = (el: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === el.target) {
      setShowModal(!showModal);
    }
  };

  const addComment = (el: React.FormEvent<HTMLFormElement>) => {
    el.preventDefault();
    socket?.emit("updateComment", {
      todoID: selectedItemID,
      comment,
      user: localStorage.getItem("_username")!,
    });
    console.log({
      comment,
    });
    setComment("");
  };

  useEffect(() => {
    socket?.on("commentsReceived", (todo) => {
      setCommentList(todo.comments);
    });
  }, [socket]);

  return (
    <div className="modal" ref={modalRef} onClick={closeModal}>
      <div className="modal__container">
        <h3>Comments</h3>
        <form className="comment__form" onSubmit={addComment}>
          <input
            type="text"
            className="comment__form"
            value={comment}
            name=""
            id=""
            required
            onChange={onInputChange}
          />
          <button>Add Comment</button>
        </form>
        {/*👇🏻 Displays the comments --- */}
        <div className="comments__container">
          <div className="comment">
            {/* <p>
              <strong>Neva - </strong> Hello guys
            </p> */}
            {commentList.length > 0 ? (
              commentList.map((item, index) => {
                return (
                  <div className="comment" key={index}>
                    <p>
                      <strong>{item.name} - </strong> {item.text}
                    </p>
                  </div>
                );
              })
            ) : (
              <p>No comments available yet...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
