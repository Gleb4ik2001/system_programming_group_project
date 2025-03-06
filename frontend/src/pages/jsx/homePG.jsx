import React , {useState , useEffect} from "react";
import "../css/homePG.css";
import TopBar from "../../components/jsx/topBar";
import Card from "../../components/jsx/card";
import SchoolIcon from '@mui/icons-material/School';


export default function HomePG(){
    const [universityList , setUniversityList] = useState([])

    useEffect(() => {
        fetch('http://192.168.0.10:8000/university/api/university-list/')
            .then(response => {
                return response.text();  // Пробуем получить текстовый ответ
            })
            .then(data => {
                try {
                    const jsonData = JSON.parse(data); // Пробуем разобрать JSON
                    setUniversityList(Array.isArray(jsonData) ? jsonData : jsonData.data);
                } catch (error) {
                    alert("Ошибка при парсинге JSON: " + error);
                }
            })
            .catch(error => alert("Ошибка при загрузке данных: " + error));
    }, []);
    
    
    return(
        <main>
            <TopBar/>
            <div className="main-body">
            <Card data={universityList}/>
            </div>
        </main>
    )
}