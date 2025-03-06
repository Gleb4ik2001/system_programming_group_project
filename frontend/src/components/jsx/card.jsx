import React from 'react';
import Rating from '@mui/material/Rating';
import "../css/card.css";
import logo from "../../assets/ogo_stu.png";

function Card({ data }) {
    return (
      <>
        {data.map((item, i) => (
        <div className="card-bg" key={i}>
          <table>
            <thead>
              <tr>
                <th>
                  <img src={logo} alt="logo" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr id="title">
                <td>{item.title}</td>
              </tr>
              <tr>
                <td id="rating">
                  <p>{item.rating}</p>
                  <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <button className="table-btn">Information</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
         ))}
      </>
    );
  }
  
export default Card;
