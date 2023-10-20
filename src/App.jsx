import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MySong from "./components/MySong";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://sever-my-music.vercel.app/api/v1/myMusic/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleRemove = (id) => {
    const songList = [...data];
    const index = songList.findIndex((item) => item._id === id);
    songList.splice(index, 1);
    setData(songList);
  };
  if (loading) return "Loading ...";
  if (error) return "Error!!";

  return <MySong data={data} handleRemove={handleRemove} />;
}

export default App;
