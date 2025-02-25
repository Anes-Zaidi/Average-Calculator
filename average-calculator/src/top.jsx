import React from "react";
import './App.css'
import Semester from "./side";

function Top({semester , universty}){
    return(
        <header className="topContent">

        <div className="topLeft"></div>

        <div className="topMid">
            <h1 id="logo">Average  Calculator</h1>
            <h2>{universty.name}</h2>
        </div>

        <div className="topRight"></div>

        </header>
    )
}

export default Top;