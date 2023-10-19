import React from "react";

function LyrisSong(props) {
  const { data, indexSong } = props;
  return (
    <div className="music_lyris">
      <h2>
        Lyris là để đọc <span>📖</span>
      </h2>
      <p dangerouslySetInnerHTML={{ __html: data[indexSong].lyrics }}></p>
    </div>
  );
}

export default LyrisSong;
