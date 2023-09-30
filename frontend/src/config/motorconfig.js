import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TIME_POST } from "../scrvices/api/api-reader";
import Metadata from "../scrvices/metadata";

export function Motorconfig() {
    const navigate = useNavigate();

    const [number, setNumber] = useState({
        number1: null,
        number2: 0,
        delay: null,
        noon: false
    });

    const [senddata, setSenddata] = useState({
        hours: "",
        minutes: "",
        Delay: ""
    });

    const [error, setError] = useState({
        input1: false,
        delay: false,
        hatch: false
    });

    const pluse1 = () => {
        if (number.number1 < 12) {
            setNumber({ ...number, number1: number.number1 + 1 });
        } if (number.number1 === 60) {
            setNumber({ ...number, number1: 1 })
        }
    };

    const sub1 = () => {
        if (number.number1 > 0 && number.number1 <= 12) {
            setNumber({ ...number, number1: number.number1 - 1 });
        } if (number.number1 === 0) {
            setNumber({ ...number, number1: 12 })
        }
    };

    const pluse2 = () => {
        if (number.number2 < 60) {
            setNumber({ ...number, number2: number.number2 + 1 });
        } if (number.number2 === 60) {
            setNumber({ ...number, number2: 1 })
        }
    };

    const sub2 = () => {
        if (number.number2 > 0 && number.number2 <= 60) {
            setNumber({ ...number, number2: number.number2 - 1 });
        } if (number.number2 === 0) {
            setNumber({ ...number, number2: 60 })
        }
    };

    const noonchanger = () => {
        setNumber({ ...number, noon: !number.noon });
    };

    const inputhandler = (event) => {
        setNumber({ ...number, delay: event.target.value });
    };

    const time_upd = () => {
        let newError = {
            input1: false,
            delay: false,
            hatch: false
        };

        if (!number.number1) {
            newError.input1 = true;
        }

        if (!number.delay) {
            newError.delay = true;
        }

        if (!number.number1 || !number.delay) {
            newError.hatch = true;
        }

        setError(newError);

        if (!newError.hatch) {
            const { Hours, Minutes, Delay } = number;
            setSenddata({ Hours, Minutes, Delay });

            TIME_POST(senddata).then((response) => {
                if (response.status === 200) {
                    navigate('/motor');
                    console.log(senddata);
                }
                console.log(response);
            });
        }
    };

    // time-data
    useEffect(() => {
        let traintime = number.noon ? number.number1 + 12 : number.number1
        setSenddata({
            hours: traintime,
            minutes: number.number2,
            Delay: number.delay
        });
    }, [number]);

    return (
        <Fragment>
            <div className="motorconfigbox">
                <Metadata title={"motorconfig"}></Metadata>
                <div class="myviewbox">
                    <div class="myoverlay"></div>
                    <img class="mybackground" src="/material/bg-4.jpg" alt="" />
                    <img className="backarrow" onClick={() => window.history.back(-1)} src="/material/back-arrow.png" alt="" />
                </div>
                <div class="time-selector">
                    <div class="dailtimer">
                        <div class="time-unit">
                            <svg class="decrement" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style={{ fill: "white", transform: "rotate(90deg)" }} onClick={pluse1}><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                            <div class="number">{number.number1 <= 9 ? 0 : null}{number.number1 > 12 ? setNumber.number1(number.number1 - 12) : number.number1}</div>
                            <svg class="increment" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style={{ fill: "white", transform: "rotate(270deg)" }} onClick={sub1}><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                        </div>
                        <span>:</span>
                        <div class="time-unit">
                            <svg class="decrement" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style={{ fill: "white", transform: "rotate(90deg)" }} onClick={pluse2}><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                            <div class="number">{number.number2 <= 9 ? 0 : null}{number.number2}</div>
                            <svg class="increment" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style={{ fill: "white", transform: "rotate(270deg)" }} onClick={sub2}><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                        </div>
                        <span>:</span>
                        <div class="time-unit">
                            <svg class="am" xmlns="http://www.w3.org/2000/svg" onClick={noonchanger} width="50" height="50" viewBox="0 0 24 24" style={{ fill: "white", transform: "rotate(90deg)" }}><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                            <div class="noon">{number.noon ? "PM" : "AM"}</div>
                            <svg class="pm" xmlns="http://www.w3.org/2000/svg" onClick={noonchanger} width="50" height="50" viewBox="0 0 24 24" style={{ fill: "white", transform: "rotate(270deg)" }}><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
                        </div>
                    </div>
                    <div className="delay-box">
                        <div className="delay">
                            <span>delay:</span>
                            <input onChange={inputhandler} placeholder="Typehere"></input>
                            <span>MIN</span>
                        </div>
                    </div>
                    <div className="error-register">
                        <span>
                            {error.input1
                                ? "Please enter the time."
                                : error.delay
                                    ? "Please enter the delay time."
                                    : error.hatch
                                        ? "Please enter all the details."
                                        : null}
                        </span>
                    </div>
                    <button className="mysave" onClick={time_upd}>
                        <span></span>save
                    </button>
                </div>
            </div>
        </Fragment>
    );
}