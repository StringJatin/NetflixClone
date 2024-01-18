import React, { useEffect, useState } from 'react';
import "../product/Product.css";
import { productData } from "../../dummyData";
import Chart from "../../components/chart/Chart";
import { Link, useParams } from "react-router-dom";
import Publish from "@mui/icons-material/Publish";
import axios from "axios";

const List = () => {
  const { id } = useParams();
  const [list, setLists] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/lists/find/${id}`,
          {
            headers: {
              token:
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODljZGI0NDBmNjRjMzM4NGY3NjE0YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNTQ3ODMyMywiZXhwIjoxNzA1OTEwMzIzfQ.WBhQD-ZOB3oiGHbkul7225-3M3h9iGIZAeAZ7vOR4v8`,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getMovie();
  }, [id]);

console.log(list)
  return (
    <div className="product">

      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list ? list.title : ""}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{list ? list._id : ""}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{list ? list.genre : ""}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Type:</span>
              <span className="productInfoValue">{list ? list.type : ""}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input type="text" placeholder={list ? list.title : ""} />
            <label>Type</label>
            <input type="text" placeholder={list ? list.title : ""} />
            <label>Genre</label>
            <input type="text" placeholder={list ? list.genre : ""} />
          </div>
          <div className="productFormRight">
            <button className="productButton">Update</button>
          </div>
        </form>
      </div> 
    </div>
  )
}

export default List;
