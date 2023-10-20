import React from "react";
import { FiRotateCcw } from "react-icons/fi";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { BsFillPlayFill } from "react-icons/bs";
import { BiPause, BiShuffle } from "react-icons/bi";

function HandleSong(props) {
  const {
    data,
    indexSong,
    handleAcitonSong,
    actionSong,
    timeSongs,
    processValue,
    changeTimeSong,
  } = props;

  return (
    <div className="music_box">
      <div className="music_cd">
        <img
          src={data[indexSong]?.image}
          alt=""
          className={
            handleAcitonSong?.isPlaying
              ? "music_cd-main action"
              : "music_cd-main"
          }
        />
      </div>
      <div className="music_play">
        <h2 className="music_name">{data[indexSong]?.name}</h2>
        <p>{data[indexSong]?.singer}</p>
        <input
          type="range"
          id="music_run"
          ref={timeSongs}
          min="0"
          max="100"
          step="0.1"
          value={processValue}
          onChange={changeTimeSong}
        />
        <div className="music_btn">
          <FiRotateCcw
            style={
              handleAcitonSong?.isLoop
                ? { color: "orange", fontSize: 20 }
                : { color: "black", fontSize: 20 }
            }
            onClick={() => actionSong("loop")}
          />
          <FaAnglesLeft
            style={{ fontSize: 20 }}
            onClick={() => {
              actionSong("prev");
            }}
          />
          <div
            className="music_btn-actions"
            onClick={() => {
              actionSong("play");
            }}
          >
            {handleAcitonSong?.isPlaying ? (
              <BiPause style={{ fontSize: 30, color: "white" }} />
            ) : (
              <BsFillPlayFill style={{ fontSize: 30, color: "white" }} />
            )}
          </div>
          <FaAnglesRight
            style={{ fontSize: 20 }}
            onClick={() => {
              actionSong("next");
            }}
          />
          <BiShuffle
            style={
              handleAcitonSong?.isRamdom
                ? { color: "orange", fontSize: 20 }
                : { color: "black", fontSize: 20 }
            }
            onClick={() => actionSong("random")}
          />
        </div>
      </div>
    </div>
  );
}

export default HandleSong;
