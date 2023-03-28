import { useState } from "react";
import {io} from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home, Main } from "@/components";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/app" element={<Main socketIO={io} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
