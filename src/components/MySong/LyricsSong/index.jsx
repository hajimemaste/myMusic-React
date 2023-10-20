import React from "react";

function LyrisSong(props) {
  const { lyrisSong } = props;
  return (
    <div className="music_lyris">
      <h2>
        Lyris là để đọc <span>📖</span>
      </h2>
      <p dangerouslySetInnerHTML={{ __html: lyrisSong }}></p>
    </div>
  );
}

export default LyrisSong;
