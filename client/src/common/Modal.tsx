import { FC, useState } from "react";

interface ModelProps {
  socket: any;
  showModal: boolean;
  setShowModal: any;
}

const Modal: FC<ModelProps> = ({ socket, showModal, setShowModal }) => {
  const [comment, setComment] = useState("");

  const onInputChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    const value = el.target.value;
    setComment(value);
  };

  const addComment = (el: React.FormEvent<HTMLFormElement>) => {
    el.preventDefault();
    console.log({
      comment,
    });
    setComment("");
  };

  return (
    <div className="modal">
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
        <div className="comments__container">
          <div className="comment">
            <p>
              <strong>Neva - </strong> Hello guys
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
