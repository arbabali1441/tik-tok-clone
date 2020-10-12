import React from "react";
import Video from "./Video";
import "./App.css";

function App() {
  return (
    // BEM
    <div className="app">
      <h1>Hello Tazkiyah Programmers, Let's build Tik Tok Clone</h1>

      <div className="app__video">
        <Video />
        <Video />
        <Video />
        <Video />
      </div>
    </div>
  );
}

export default App;
