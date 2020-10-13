import React from "react";
import Video from "./Video";
import "./App.css";

function App() {
  return (
    // BEM
    <div className="app">
      <div className="app__videos">
        <Video
          url="https://tiktok.com/@charlidamelio/video/6861737179530480901?lang=en"
          channel="arbab" 
          description="like this song" 
          song="heeyyy" 
          likes="122" 
          messages="123" 
          shares="33"  
        />
        <Video />
        <Video />
        <Video />
      </div>
    </div>
  );
}

export default App;
