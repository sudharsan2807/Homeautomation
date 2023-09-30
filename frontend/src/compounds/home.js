import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Metadata from "../scrvices/metadata";
import { IOT_GET1, IOT_GET2, IOT_GET3, IOT_GET4, IOT_PUT1, IOT_PUT2, IOT_PUT3 } from "../scrvices/api/api-iot";
import { tankpercentage } from "../scrvices/info/tankinfo";
import { ID_REMOVER } from "../scrvices/auth/storge";
export default function Home() {
    const [Data, Setdata] = useState({
        Email: "",
        Name: ""
    });
    const navigate = useNavigate();
    const [btn1state, Setbtn1state] = useState(""); // Initialize with an empty string
    const [btn2state, Setbtn2state] = useState(""); // Initialize with an empty string
    const [btn3state, Setbtn3state] = useState(""); // Initialize with an empty string
    const [btn4state, Setbtn4state] = useState(""); // Initialize with an empty string

    useEffect(() => {

        IOT_GET1(36176255)
            .then((response) => {
                const print = response.data.command_string;
                Setbtn1state(print);
            })
            .catch((err) => {
                console.log(err);
            });

        IOT_GET2(36176282)
            .then((response) => {
                const print = response.data.command_string;
                Setbtn2state(print);
            })
            .catch((err) => {
                console.log(err);
            });
        IOT_GET3(36176317)
            .then((response) => {
                const print = response.data.command_string;
                Setbtn3state(print);
            })
            .catch((err) => {
                console.log(err);
            });
        IOT_GET4(36176206)
            .then((response) => {
                const print = response.data.command_string;
                Setbtn4state(print);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let [menuopen, setmenuopen] = useState(false);

    const menuhandle = () => {
        setmenuopen(!menuopen);
    }

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

    const btn2handler = () => {
        let new2state = btn2state === "Motor_on" ? "Motor_of" : "Motor_on";
        IOT_PUT2(new2state, 36176282)
            .then(() => {
                Setbtn2state(new2state);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const btn3handler = () => {
        let new3state = btn3state === "ROOM_R1a" ? "ROOM_R1A" : "ROOM_R1a";
        IOT_PUT3(new3state, 36176317).then(() => {
            Setbtn3state(new3state);
        }).catch((err) => {
            console.log(err);
        })
    }
    const tanklevel = tankpercentage();

    const logouthandler = () => {
        ID_REMOVER();
        navigate('/')
    }
    return (
        <Fragment>
            <body className="myhomebody">
                <Metadata title={"home"} />
                <div className="myhome">
                    <div className="mycontent">
                        <div className="myoverlay"></div>
                        <img className="mybackground" src="/material/bg-2.jpg" alt="" />
                    </div>
                    <div className="mynav-bar">
                        <div className="mylogo">
                            <img src="/material/logonav.png" alt="" />
                        </div>
                        <div className={`mynav ${menuopen ? "menuopen" : ""}`}>
                            <ul>
                                <li onClick={logouthandler}>LOG_OUT</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mybox">
                        <div className="box-1">
                            <div className="col-1">
                                <img src="/material/img-1.png" alt="" />
                            </div>
                            <div className="col-2">
                                <div className="mywifi">
                                    <p>Wifi</p>
                                    <span></span>
                                </div>
                                <Link to={'/fan'}>
                                    <div className="myarrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style={{ fill: 'white', transform: 'scaleX(-1)' }}>
                                            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                                        </svg>
                                    </div>
                                </Link>
                                <div className="mypower" onClick={btn1handler}>
                                    <i className="fa-solid fa-power-off">
                                        <span className={`${btn1state === "RELAY_ON" ? "" : "power-of"}`}></span>
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div className="box-2">
                            <div className="col-1">
                                <img src="/material/img-2.png" alt="" />
                            </div>
                            <div className="col-2">
                                <div className="mywifi">
                                    <p>Wifi</p>
                                    <span></span>
                                </div>
                                <Link to={'/tank'}>
                                    <div className="myarrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style={{ fill: 'white', transform: 'scaleX(-1)' }}>
                                            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                                        </svg>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-3">
                                <div className="myrange-box"><span style={{ height: `${tanklevel}%` }}></span></div>
                                <div className="myinfo">
                                    <ul>
                                        <li>
                                            <span className={btn4state === "HIG" ? "letter-big" : ""}></span>
                                            <p className={btn4state === "HIG" ? "letter-size" : ""}>HIGH</p>
                                        </li>
                                        <li>
                                            <span className={btn4state === "MED" ? "letter-big" : ""}></span>
                                            <p className={btn4state === "MED" ? "letter-size-med" : ""}>MEDIUM</p>
                                        </li>
                                        <li>
                                            <span className={btn4state === "LOW" ? "letter-big" : ""}></span>
                                            <p className={btn4state === "LOW" ? "letter-size" : ""}>LOW</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="box-3">
                            <div className="col-1">
                                <img src="/material/img-3.png" alt="" />
                                <img className={`mygif ${btn2state === "Motor_on" ? "display" : ""}`} src="/material/gif-2.gif" alt="" />
                            </div>
                            <div className="col-2">
                                <div className="mywifi">
                                    <p>Wifi</p>
                                    <span></span>
                                </div>
                                <Link to={'/motor'}>
                                    <div className="myarrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style={{ fill: 'white', transform: 'scaleX(-1)' }}>
                                            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                                        </svg>
                                    </div>
                                </Link>
                                <div className="mypower" onClick={btn2handler}>
                                    <i className="fa-solid fa-power-off">
                                        <span className={`${btn2state === "Motor_on" ? "" : "power-of"}`}></span>
                                    </i>
                                </div>
                            </div>
                            <div className="col-3">
                                <p>time -</p>
                                <span>12</span>:<span>30</span>
                            </div>
                        </div>
                        <div className="box-4">
                            <div className="col-1">
                                <img src="/material/img-4.png" alt="" />
                            </div>
                            <div className="col-2">
                                <div className="mywifi">
                                    <p>Wifi</p>
                                    <span></span>
                                </div>
                                <Link to={'/room'}>
                                    <div className="myarrow">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style={{ fill: 'white', transform: 'scaleX(-1)' }}>
                                            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                                        </svg>
                                    </div>
                                </Link>
                                <div className="mypower" onClick={btn3handler}>
                                    <i className="fa-solid fa-power-off"><span className={`${btn3state === "ROOM_R1a" ? "" : "power-of"}`}></span></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </Fragment >
    );
}