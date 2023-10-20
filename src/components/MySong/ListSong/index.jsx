import React from "react";
import { BsFillTrashFill } from "react-icons/bs";

function ListSong(props) {
  const { data, handleShowSong, handleDeleteSong } = props;

  return (
    <div className="music_block">
      <h2>Music là để nghe 🎶</h2>
      <div className="list_music">
        {data.map((item) => (
          <div
            key={item?.name}
            className="item_music"
            onClick={() => handleShowSong(item?._id)}
          >
            <img src={item?.image} alt="" />
            <div className="item_content">
              <h3>{item?.name}</h3>
              <p>{item?.singer}</p>
            </div>
            <BsFillTrashFill onClick={() => handleDeleteSong(item?._id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListSong;
