import React , {useState, useEffect} from "react";
import "../css/information.css";
import Rating from '@mui/material/Rating';
import Button from "../../components/jsx/button" ;
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import LanguageIcon from '@mui/icons-material/Language';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Information({ university, onClose }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        console.log("Fetching comments for university:", university.id);

        fetch(`http://192.168.0.10:8000/university/api/comments/${university.id}`)
            .then((response) => response.json()) // Парсим сразу как JSON
            .then((data) => {
                setComments(Array.isArray(data) ? data : data.data);
            })
            .catch((error) => console.error("Ошибка при загрузке данных:", error));
    }, [university]); 

if (!university) return null; 
  return (
    <div className="main">
        <div className="main-content">
            <div className="header">
                <img src={university.logo} alt="University Logo" />
                <h2>{university.title}</h2>
            </div>
            <div className="body">
                <p>{university.city}</p>
                <p>{university.address}</p>
                <Rating
                      name="half-rating-read"
                      defaultValue={university.rating}
                      precision={0.5}
                      readOnly
                    />
                <p>Рейтинг: {university.rating}</p>
               
                <nav className="comments">
                    <ul>
                    <Comments comments={comments}/>
                    </ul>
                </nav>
            </div>
            <div className="footer">
                <Button className="close-btn" onClick={onClose}><NotInterestedIcon/></Button>
                <Button className="website-btn" onClick={() => window.open(university.website, "_blank")}><LanguageIcon /></Button>
                <Button className="comment-btn" onClick={onClose}><AddCommentIcon/></Button>
            </div>
      </div>
    </div>
  );
}

function Comments({ comments }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (comments.length === 0) return;

        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
        }, 5000); // Меняет комментарий каждые 5 секунд

        return () => clearTimeout(timer); // Очищаем таймер при размонтировании
    }, [currentIndex, comments.length]); 

    if (!comments.length) return <p>Комментарии отсутствуют</p>;

    const currentComment = comments[currentIndex];

    return (
        <div className="comments-content">
                <p className="comment-author">{currentComment.author}</p>
                <p className="comment-time">
                    {new Date(currentComment.datetime_created).toLocaleDateString()}
                </p>
            <span className="comment-text">{currentComment.text}</span>
            <span className="comment-rating">
                Оценка: <Rating name="half-rating-read" value={currentComment.rating} precision={0.5} readOnly />
            </span>

            <div className="comment-navigation">
                <Button onClick={() => setCurrentIndex((prev) => (prev - 1 + comments.length) % comments.length)}><ChevronRightIcon sx={{transform: "rotate(180deg)"}}/></Button>
                <Button onClick={() => setCurrentIndex((prev) => (prev + 1) % comments.length)}><ChevronRightIcon/></Button>
            </div>
        </div>
    );
}


   