import React from 'react';
import Rating from '@mui/material/Rating';
import "../css/card.css";
import logo from "../../assets/ogo_stu.png";

function Card({ data }) {
  const handleClick = (e)=>{

  }
  if (!data || data.length === 0) return <>Sorry, no data</>;
  return (
      <>
        {data.map((item, i) => (
        <div className="card-bg" key={i}>
          <table>
            <thead>
              <tr>
                <th>
                {item.logo ? <img src={item.logo} alt="logo" /> : <p>Логотип отсутствует</p>}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr id="title">
                <td>{item.title.length > 20 ? item.title.match(/\(([^)]+)\)/)?.[1]:item.title}</td>
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
