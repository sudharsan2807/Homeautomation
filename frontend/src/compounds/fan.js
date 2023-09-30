import React, { Fragment, useEffect, useState } from 'react'
import { IOT_GET1, IOT_PUT1 } from '../scrvices/api/api-iot';
import { Link } from 'react-router-dom';
import Metadata from '../scrvices/metadata';

export default function Fan() {
    const [btn1state, Setbtn1state] = useState(""); // Initialize with an empty string

    useEffect(() => {
        IOT_GET1(36176255)
            .then((response) => {
                const print = response.data.command_string;
                Setbtn1state(print);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    const btn1handler = () => {
        let new1state = btn1state === "RELAY_ON" ? "RELAY_OF" : "RELAY_ON";
        IOT_PUT1(new1state, 36176255)
            .then(() => {
                Setbtn1state(new1state);
            })
            .catch((err) => {
                console.error(err);
            });
    }
    return (
        <Fragment>
            <div className="mycontent">
                <div className="myoverlay"></div>
                <Metadata title={"fan"}></Metadata>
                <img className="mybackground" src="/material/bg-4.jpg" alt="" />
                <div className='mytitle' id='fantitle'>FAN_CONTROLLER</div>
                <Link to={"config"}>
                    <button className="btnconfigure"><span></span>configure</button>
                </Link>
                <img className="backarrow" onClick={() => window.history.back(-1)} src="/material/back-arrow.png" alt="" />
            </div>
            <div className='fancontroll'>
                <div className={`mypower ${btn1state === "RELAY_ON" ? "" : "power-of"}`} onClick={btn1handler}>
                    <i className="fa-solid fa-power-off">
                    </i>
                </div>
            </div>
        </Fragment>
    )
}
