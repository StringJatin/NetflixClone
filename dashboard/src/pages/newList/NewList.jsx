import { useContext, useEffect, useState } from "react";
import "./NewList.css";
import axios from "axios";

export default function NewList() {
  const [list, setList] = useState(null);
  const [movies,setMovies] = useState([]);
  
 useEffect (()=>{
    const allMovies = async ()=>{
        try{
            const res = await axios.get("https://netflix-analytics-4u5n.vercel.app/api/movies/",{
                headers: {
                    token : 'Bearer ' + JSON.parse(localStorage.getItem("user")).accessToken,
    
                }
               
            }
            )
            setMovies(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    allMovies();
 },[])


  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Make sure list state is not null before making the request
    if (list) {
      const createMovie = async () => {
        try {
          const newMovie = await axios.post("https://netflix-analytics-4u5n.vercel.app/api/lists/", list, {
            headers: {
                token :'Bearer ' + JSON.parse(localStorage.getItem("user")).accessToken,
            },
          });
          alert("New list is created")
        } catch (err) {
          console.log(err);
        }
      };
  
      createMovie();
    }
  };
  

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="action"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}