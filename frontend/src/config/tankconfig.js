import React, { Fragment, useEffect, useState } from "react";
import { Higlevel, Lowlevel } from "../scrvices/info/tankinfo";
import { Tankpopup } from "../alert message/tankconfigalert";
import { getmeasurehigh, getmeasurelow } from "../scrvices/auth/storge";
import { IOT_GET7, IOT_PUT4, IOT_PUT5 } from "../scrvices/api/api-iot";
import { Link, useNavigate } from "react-router-dom";
import Gapdetail from "../alert message/gapdetail";
import Metadata from "../scrvices/metadata";

export function Tankconfig() {
    const higread = Higlevel();
    const lowread = Lowlevel();
    let gethigread = getmeasurehigh();
    let getlowread = getmeasurelow();
    const navigate = useNavigate()

    const [dif, Setdif] = useState();
    const [catpopup, Setcatpopup] = useState("");
    const [popuppage, Setpopuppage] = useState(false);
    const [gappopup, Setgappopup] = useState(false);

    useEffect(() => {
        IOT_GET7(35845228).then((response) => {
            const print = response.data.command_string;
            Setdif(print)
            const numberMatch = print.match(/\d+/); // This regex matches one or more digits
            if (numberMatch) {
                const number = parseInt(numberMatch[0], 10); // Convert the matched string to an integer
                Setdif(number);
            }
        })
    }, [])

    const popup = () => {
        Setpopuppage(!popuppage);
    };

    const highpopup = () => {
        Setcatpopup("high");
        popup();
    };

    const lowpopup = () => {
        Setcatpopup("low");
        popup();
    };

    const datapopup = () => {
        if (catpopup === "high") {
            return "high";
        } else if (catpopup === "low") {
            return "low";
        } else {
            return null;
        }
    };

    const backpopup = () => {
        Setgappopup(!gappopup);
    }
    const updatevalue = () => {
        if (gethigread) {
            IOT_PUT4("HIG" + gethigread, 35655482)
        }
        if (getlowread) {
            IOT_PUT5("LOW" + getlowread, 35580181)
        }
        navigate('/tank')
    }
    console.log(higread);
    return (
        <Fragment>
            <div className="mycontent">
                <Metadata title={"tankconfig"}></Metadata>
                <img className="mybackground" src="/material/bg-5.jpg" alt="" />
                <div className="mytitle"><span>tank_alarm</span></div>
                <img className="backarrow" onClick={() => window.history.back(-1)} src="/material/back-arrow.png" alt="" />
                <div className="myoverlay"></div>
            </div>
            <div className="tankconfigbox">
                <div className="mybutton">
                    <button onClick={highpopup}><span></span>high water level reading <hr />{gethigread !== null ? gethigread : higread}cm</button>
                    <button onClick={lowpopup}><span></span>low water level reading <hr />{getlowread !== null ? getlowread : lowread}cm</button>
                    <button onClick={backpopup}><span></span>Gap between highlevel line and alarm line <hr />{dif}cm</button>
                    <button type="submit" className="submit" onClick={updatevalue} style={{ backgroundColor: '#009688', width: '12rem' }}>submit</button>
                </div>
                {popuppage ? <Tankpopup datapopup={datapopup()} popup={popup} /> : null}
            </div>
            {
                gappopup ? <Gapdetail close={backpopup()} /> : null
            }
        </Fragment>
    );
}