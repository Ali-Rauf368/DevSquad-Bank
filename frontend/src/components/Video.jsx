import React, { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa"; // Import icons
import "./Video.css";
import DevSquad from "../assets/DevSquad.webm";

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="video-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="video-player"
          src={DevSquad}
          aria-label="DevSquad Bank introduction video"
          onClick={handlePlayPause} 
        ></video>
      </div>

      {/* Play/Pause Icon in Top-Right Corner */}
      <button
        onClick={handlePlayPause}
        className="play-pause-icon"
        aria-pressed={isPlaying}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
};

export default VideoPlayer;
