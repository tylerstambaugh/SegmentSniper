import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/app" element={<Home />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
