import { FC } from "react";

interface MainProps {
  socket: any;
}

const Main: FC<MainProps> = ({ socket }) => {
  return (
    <div>
      <h1>Main</h1>
    </div>
  );
};

export default Main;
