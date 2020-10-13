import React, { useRef, useState } from "react";
import VideoFooter from "./VideoFooter";
import "./Video.css";

function Video() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="video">
      <video
        className="video__player"
        loop
        onClick={onVideoPress}
        ref={videoRef}
        src="https://www.tiktok.com/@sunshine.and.sunflowers/video/6874216231948324102?lang=en"
      ></video>
       <VideoFooter />
      {/* <VideoFooter /> */}
      {/* <VideoSidebar /> /> */}
    </div>
  );
}

export default Video;
