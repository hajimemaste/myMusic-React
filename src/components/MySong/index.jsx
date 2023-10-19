import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import ListSong from "./ListSong";
import LyrisSong from "./LyricsSong";
import HandleSong from "./HandleSong";

function MySong(props) {
  const { data } = props;
  const [indexSong, setIndexSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const audioElement = useRef();
  const timeSongs = useRef();
  var index = indexSong;

  const timeSong = () => {
    audioElement.current.ontimeupdate = () => {
      timeSongs.current.value =
        (audioElement.current.currentTime / audioElement.current.duration) *
        100;
      if (timeSongs.current.value == 100) {
        indexSong == data.length - 1 ? 0 : (index += 1);
        handleShowSong(index);
        console.log(index);
        console.log(indexSong);
      }
    };
  };

  const handleShowSong = (id) => {
    setIndexSong(id);
    setIsPlaying(true);
    index = id;
    console.log(indexSong);
  };

  const handlePlay = () => {
    if (isPlaying) {
      audioElement.current.pause();
    } else {
      audioElement.current.play();
    }
    setIsPlaying(!isPlaying);
    timeSong();
  };

  const changeTimeSong = (e) => {
    audioElement.current.currentTime =
      (e.target.value / 100) * audioElement.current.duration;
  };

  const nextSong = () => {
    if (indexSong == data.length - 1) {
      setIndexSong(0);
    } else {
      setIndexSong(indexSong + 1);
    }
    setIsPlaying(true);
  };

  const prerSong = () => {
    if (indexSong == 0) {
      setIndexSong(data.length - 1);
    } else {
      setIndexSong(indexSong - 1);
    }
    setIsPlaying(true);
  };
  const renderSong = () => {
    setIndexSong(Math.floor(Math.random() * data.length));
  };
  const handleRenderSong = () => {
    setIsRender(!isRender);
  };

  const resetSong = () => {
    setIsReset(!isReset);
  };

  return (
    <div className="main">
      <HandleSong
        data={data}
        indexSong={indexSong}
        handlePlay={handlePlay}
        isPlaying={isPlaying}
        timeSongs={timeSongs}
        changeTimeSong={changeTimeSong}
        nextSong={nextSong}
        prerSong={prerSong}
        resetSong={resetSong}
        isReset={isReset}
        renderSong={renderSong}
        isRender={isRender}
        handleRenderSong={handleRenderSong}
      />
      <ListSong data={data} handleShowSong={handleShowSong} />
      <LyrisSong data={data} indexSong={indexSong} />

      <audio
        ref={audioElement}
        src={data[indexSong].path}
        className="audio"
        autoPlay
        loop={isReset}
      ></audio>
    </div>
  );
}

export default MySong;
