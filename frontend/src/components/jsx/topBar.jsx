import React from "react";
import "../css/topBar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from "./button" ;
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function TopBar({isLogged}){
    return(<header>
        <span>My project</span>
        <div className="ava">
            <span>NickName</span>
            <Button className='ava-btn'><ExitToAppIcon sx={{fontSize: "1.2rem" , margin: "0.4rem 0.2rem"}}/></Button>
            <AccountCircleIcon className="ava-icon"/>

        </div>
    </header>)
}