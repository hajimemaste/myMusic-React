import React from "react";
import { FiRotateCcw } from "react-icons/fi";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { BsFillPlayFill } from "react-icons/bs";
import { BiPause, BiShuffle } from "react-icons/bi";

function HandleSong(props) {
  const {
    data,
    indexSong,
    handlePlay,
    isPlaying,
    timeSongs,
    changeTimeSong,
    prerSong,
    nextSong,
    resetSong,
    isReset,
    renderSong,
    isRender,
    handleRenderSong,
  } = props;

  return (
    <div className="music_box">
      <div className="music_cd">
        <img
          src={data[indexSong].image}
          alt=""
          className={isPlaying ? "music_cd-main action" : "music_cd-main"}
        />
      </div>
      <div className="music_play">
        <h2 className="music_name">{data[indexSong].name}</h2>
        <p>{data[indexSong].singer}</p>
        <input
          type="range"
          id="music_run"
          ref={timeSongs}
          min="0"
          max="100"
          step="0.1"
          onChange={changeTimeSong}
        />
        <div className="music_btn">
          <FiRotateCcw
            style={
              isReset
                ? { color: "orange", fontSize: 20 }
                : { color: "black", fontSize: 20 }
            }
            onClick={() => resetSong()}
          />
          <FaAnglesLeft
            style={{ fontSize: 20 }}
            onClick={() => {
              isRender ? renderSong() : prerSong();
            }}
          />
          <div
            className="music_btn-actions"
            onClick={() => {
              handlePlay();
            }}
          >
            {isPlaying ? (
              <BiPause style={{ fontSize: 30, color: "white" }} />
            ) : (
              <BsFillPlayFill style={{ fontSize: 30, color: "white" }} />
            )}
          </div>
          <FaAnglesRight
            style={{ fontSize: 20 }}
            onClick={() => {
              isRender ? renderSong() : nextSong();
            }}
          />
          <BiShuffle
            style={
              isRender
                ? { color: "orange", fontSize: 20 }
                : { color: "black", fontSize: 20 }
            }
            onClick={() => handleRenderSong()}
          />
        </div>
      </div>
    </div>
  );
}

export default HandleSong;
