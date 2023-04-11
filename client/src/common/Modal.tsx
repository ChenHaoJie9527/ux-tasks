import { FC, useRef, useState } from "react";

interface ModelProps {
  socket: any;
  showModal: boolean;
  setShowModal: any;
}

const Modal: FC<ModelProps> = ({ socket, showModal, setShowModal }) => {
  const [comment, setComment] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

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
    console.log({
      comment,
    });
    setComment("");
  };

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
