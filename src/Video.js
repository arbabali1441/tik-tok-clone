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
        src="https://www.tiktok.com/@kynsmith/video/6882573007475248389?sender_device=pc&sender_web_id=6882964992313591298&is_from_webapp=1"
      ></video>
       <VideoFooter />
      {/* <VideoFooter /> */}
      {/* <VideoSidebar /> /> */}
    </div>
  );
}

export default Video;
