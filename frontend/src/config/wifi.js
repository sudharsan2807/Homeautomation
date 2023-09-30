import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IOT_PUT6 } from '../scrvices/api/api-iot';
import Metadata from '../scrvices/metadata';

export default function Wifi() {
    const { controll } = useParams();
    const wifi = controll === "fan" ? "wifi3" : controll === "room" ? "wifi5" : controll === "tank" ? "wifi1 or wifi2" : controll === "motor" ? "wifi4" : null
    useEffect(() => {
        if (wifi) {
            setTimeout(() => {
                IOT_PUT6("wifiN", 36212004)
            }, 1000)
        }
    }, [])

    const [dots, setDots] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Increase the number of dots, and reset to 0 if it reaches 4
            setDots((dots) => (dots + 1) % 5);
        }, 500);

        return () => {
            clearInterval(intervalId); // Cleanup the interval on component unmount
        };
    }, []);

    // Generate the dots based on the 'dots' state
    const dotString = Array.from({ length: dots }, () => '.').join('');
    return (
        <Fragment>
            <div className='wificonfig'>
                <Metadata title={`wifi${controll}`}></Metadata>
                <div className="mycontent">
                    <div className="myoverlay"></div>
                    <img className="backarrow" onClick={() => window.history.back(-1)} src="/material/back-arrow.png" alt="" />
                    <img className="mybackground" src="/material/bg-1.jpg" alt="" />
                    <div className='mytitle'><span>{controll} Wifi</span></div>
                </div>
                <div className='wifimessage'>
                    <span>Please Connect your wifi to {wifi}<span>{dotString}</span></span><br />
                    <span>Please bring your device near you</span>
                </div>
            </div>
        </Fragment>
    )
}
