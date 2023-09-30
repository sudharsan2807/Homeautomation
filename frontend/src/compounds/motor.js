import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { TIME_GET } from "../scrvices/api/api-reader";
import Metadata from "../scrvices/metadata";

export function Motorview() {
    const [data, Setdata] = useState([]);

    useEffect(() => {
        TIME_GET()
            .then((response) => {
                const sortedData = response.data.sort((a, b) => a.Hours - b.Hours);
                Setdata(sortedData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Fragment>
            <Metadata title={"Motor-controller"} />
            <div className="motorviewbox">
                <div className="mycontent">
                    <div className="myoverlay"></div>
                    <img className="mybackground" src="/material/bg-8.jpg" alt="" />
                    <img className="backarrow" onClick={() => window.history.back(-1)} src="/material/back-arrow.png" alt="" />
                    <div className="mytitle" id="motortitle">
                        <span>waterpump-controller</span>
                    </div>
                    <Link to={"config"}>
                        <button class="btnconfigure">
                            <span></span>configure
                        </button>
                    </Link>
                </div>
                <div class="mybox">
                    <div class="boxtime">
                        {data.map((value, index) => (
                            <div className="boxtime-1" key={index}>
                                <div className="info-top">
                                    <p>time-{index + 1}</p>
                                    <div className="toend">
                                        <Link to={`delete/${value._id}`}>
                                            <div className="delete-btn">
                                                <i class="fa-solid fa-trash"></i>
                                            </div>
                                        </Link>
                                        <span>DELAY | {value.Delay}</span>
                                    </div>
                                </div>
                                <div className="time">
                                    <div className="hour">
                                        {value.Hours > 12
                                            ? value.Hours - 12 < 10
                                                ? `0${value.Hours - 12}`
                                                : value.Hours - 12
                                            : value.Hours < 10
                                                ? `0${value.Hours}`
                                                : value.Hours}
                                    </div>
                                    <span>:</span>
                                    <div className="min">
                                        {value.Minutes < 10 ? `0${value.Minutes}` : value.Minutes}
                                    </div>
                                    <span>:</span>
                                    <div className="noon">
                                        {value.Hours > 12 ? "PM" : "AM"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
