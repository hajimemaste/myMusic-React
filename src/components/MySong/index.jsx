import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import ListSong from "./ListSong";
import LyrisSong from "./LyricsSong";
import HandleSong from "./HandleSong";

function MySong(props) {
  const { data } = props;
  const [indexSong, setIndexSong] = useState(0);
  const [processValue, setProcessValue] = useState(0);
  const [handleAcitonSong, setHandleAcitonSong] = useState({
    isPlaying: false,
    isLoop: false,
    isRamdom: false,
  });
  const [isRender, setIsRender] = useState(false);
  const audioElement = useRef();
  const timeSongs = useRef();

  // Show Item Song
  const handleShowSong = (id) => {
    const songList = [...data];
    const index = songList?.findIndex((item) => item._id === id);
    setIndexSong(index);
    setHandleAcitonSong({ ...handleAcitonSong, isPlaying: true });
  };

  // Update Time
  const changeTimeSong = (e) => {
    const value = e.target.value;
    setProcessValue(parseFloat(value));
    audioElement.current.currentTime =
      (parseFloat(value) / 100) * audioElement.current.duration;
  };

  const handleUpdateTime = (e) => {
    if (e.target.duration) {
      const timeSong = (e.target.currentTime * 100) / e.target.duration;
      setProcessValue(timeSong);
    }
  };

  // Handle Action Song
  const actionSong = (action) => {
    switch (action) {
      case "play":
        if (handleAcitonSong.isPlaying) {
          audioElement.current.pause();
        } else {
          audioElement.current.play();
        }
        setHandleAcitonSong({
          ...handleAcitonSong,
          isPlaying: !handleAcitonSong.isPlaying,
        });
        break;
      case "next":
        handleAcitonSong.isRamdom
          ? setIndexSong(Math.floor(Math.random() * data.length))
          : setIndexSong(indexSong === data.length - 1 ? 0 : indexSong + 1);
        break;
      case "prev":
        handleAcitonSong.isRamdom
          ? setIndexSong(Math.floor(Math.random() * data.length))
          : setIndexSong(indexSong === 0 ? data.length - 1 : indexSong - 1);
        break;
      case "loop":
        setHandleAcitonSong({
          ...handleAcitonSong,
          isLoop: !handleAcitonSong.isLoop,
        });
        break;
      case "random":
        setHandleAcitonSong({
          ...handleAcitonSong,
          isRamdom: !handleAcitonSong.isRamdom,
        });
        break;
    }
  };

  return (
    <div className="main">
      <HandleSong
        data={data}
        indexSong={indexSong}
        actionSong={actionSong}
        handleAcitonSong={handleAcitonSong}
        timeSongs={timeSongs}
        processValue={processValue}
        changeTimeSong={changeTimeSong}
        isRender={isRender}
      />
      <ListSong data={data} handleShowSong={handleShowSong} />
      <LyrisSong lyrisSong={data[indexSong]?.lyrics} />

      <audio
        ref={audioElement}
        src={data[indexSong]?.path}
        className="audio"
        autoPlay
        onEnded={() => {
          actionSong("next");
        }}
        loop={handleAcitonSong.isLoop}
        onTimeUpdate={handleUpdateTime}
        onChange={handleUpdateTime}
      ></audio>
    </div>
  );
}

export default MySong;
