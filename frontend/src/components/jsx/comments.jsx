import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import "../css/comments.css";

export default function Comments({ university }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (!university || !university.id) return; 

        console.log("Fetching comments for university:", university.id);

        fetch(`http://192.168.0.10:8000/university/api/comments/${university.id}`)
            .then((response) => response.json()) // Парсим сразу как JSON
            .then((data) => {
                setComments(Array.isArray(data) ? data : data.data);
            })
            .catch((error) => console.error("Ошибка при загрузке данных:", error));
    }, []); // useEffect теперь срабатывает при изменении `university`

    if (!comments.length) return <p>Комментарии отсутствуют</p>;

    return (
        <ul>
            {comments.map((comment, i) => (
                <li key={i}>
                    <div className="comments-content">
                        <div className="header">
                            <p>{comment.author}</p>
                            <p className="comment-time">{comment.datetime_created}</p>
                        </div>
                        <span className="comment-text">{comment.text}</span>
                        <Rating name="half-rating-read" value={comment.rating} precision={0.5} readOnly />
                    </div>
                </li>
            ))}
        </ul>
    );
}
