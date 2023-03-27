import { FC, useState } from "react";

const Home: FC = () => {
    const [username, setUsername] = useState("");
  return (
    <div className="home">
      <h2>Sign in to your todo-list</h2>
      <form>
        <label htmlFor="username">Your Username</label>
        <input
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <button>SIGN IN</button>
      </form>
    </div>
  );
};

export default Home;
