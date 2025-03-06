import React from "react";
import "../css/homePG.css";
import TopBar from "../../components/jsx/topBar";
import Card from "../../components/jsx/card";
import SchoolIcon from '@mui/icons-material/School';

const data = [
    {
        id: "1",
        icon: <SchoolIcon/>,
        title: "KarTU",
        rating: "3.5"
    },
    {
        id: "2",
        icon: <SchoolIcon/>,
        title: "KarGU",
        rating: "5"
    },{
        id: "3",
        icon: <SchoolIcon/>,
        title: "Nazarbaev",
        rating: "5"
    },
    {
        id: "4",
        icon: <SchoolIcon/>,
        title: "TECH",
        rating: "5"
    },
    {
        id: "5",
        icon: <SchoolIcon/>,
        title: "POLPO",
        rating: "5"
    },
    {
        id: "1",
        icon: <SchoolIcon/>,
        title: "KarTU",
        rating: "3.5"
    },
    {
        id: "2",
        icon: <SchoolIcon/>,
        title: "KarGU",
        rating: "5"
    },{
        id: "3",
        icon: <SchoolIcon/>,
        title: "Nazarbaev",
        rating: "5"
    },
    {
        id: "4",
        icon: <SchoolIcon/>,
        title: "TECH",
        rating: "5"
    },
    {
        id: "5",
        icon: <SchoolIcon/>,
        title: "POLPO",
        rating: "5"
    }
    ,{
        id: "1",
        icon: <SchoolIcon/>,
        title: "KarTU",
        rating: "3.5"
    },
    {
        id: "2",
        icon: <SchoolIcon/>,
        title: "KarGU",
        rating: "5"
    },{
        id: "3",
        icon: <SchoolIcon/>,
        title: "Nazarbaev",
        rating: "5"
    },
    {
        id: "4",
        icon: <SchoolIcon/>,
        title: "TECH",
        rating: "5"
    },
    {
        id: "5",
        icon: <SchoolIcon/>,
        title: "POLPO",
        rating: "5"
    }
]

export default function HomePG(){
    return(
        <main>
            <TopBar/>
            <div className="main-body">
            <Card data={data}/>
            </div>
        </main>
    )
}