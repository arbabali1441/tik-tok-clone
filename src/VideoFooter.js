import React from "react";
import "./VideoFooter.css";
import MusicNoteIcon from "@material-ui/icons/FavoriteBorder";

function VideoFooter() {
  return (
    <div className="videoFooter">
      <div className="videoFooter__text">
        <h3>@arbabali</h3>
        <p>This is a description</p>
        <MusicNoteIcon />
      </div>
      <img 
        className="videoFooter__record"
        src="https://static.thenounproject.com/png/934821-200.png" 
        alt=""
      />
    </div>
  );
}

export default VideoFooter;
