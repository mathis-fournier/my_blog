import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/home.tsx";
import Articles from "./Pages/Articles.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </>
  );
}

export default App;
