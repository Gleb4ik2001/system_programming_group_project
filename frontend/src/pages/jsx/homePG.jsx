import React , {useState , useEffect} from "react";
import "../css/homePG.css";
import TopBar from "../../components/jsx/topBar";
import Card from "../../components/jsx/card";
import Information from '../../pages/jsx/information';

export default function HomePG(){
    const [universityList , setUniversityList] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);

  

    useEffect(() => {
        fetch('http://192.168.0.10:8000/university/api/university-list/')
            .then(response => {
                return response.text();  
            })
            .then(data => {
                try {
                    const jsonData = JSON.parse(data); 
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
            <Card data={universityList} setSelectedItem={setSelectedItem}/>
            </div>
            {selectedItem ? ( <Information university={selectedItem} onClose={() => setSelectedItem(null)} />) : (<></>)}
        </main>
    )
}