import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import { IOT_PUT4 } from "../scrvices/api/api-iot";
import Metadata from "../scrvices/metadata";

export default function Config() {
    const urllocation = useLocation();
    const navigate = useNavigate();
    const { controll } = useParams();
    console.log(controll);
    const wifi = controll === "fan" ? "wifi3" : controll === "room" ? "wifi5" : controll === "motor" ? "wifi4" : null

    const linkwifi1 = () => {
        navigate('wifi')
        IOT_PUT4("wifi1", '	36212004')
    }

    const linkwifi2 = () => {
        navigate('wifi')
        IOT_PUT4("wifi2", '	36212004')
    }

    const linkwifi = () => {
        if (wifi) {
            navigate('wifi')
            IOT_PUT4(wifi, '	36212004')
        }
    }

    const datahandler = () => {
        if (controll === "tank") {
            navigate('/tank/tankconfig');
        }
        if (controll === "motor") {
            navigate('/motor/motorconfig')
        }
    }
    return (
        <Fragment>

            <div class="myconfig" id="myconfig">
                <Metadata title={`Config${controll}`}></Metadata>
                <div className="mycontent">
                    <div className="myoverlay"></div>
                    <img className="backarrow" onClick={() => window.history.back(-1)} src="/material/back-arrow.png" alt="" />
                    <img className="mybackground" src="/material/bg-1.jpg" alt="" />
                </div>
                <div class="mycontenter">
                    <div class="mytitle">
                        {controll === "tank" ? <span>tank_alarm</span> :
                            controll === 'fan' ? <span >Fan_Controller</span> :
                                controll === 'motor' ? (<span>Motor_controller</span>) :
                                    controll === 'room' ? (<spn>Room_controller</spn>) : null
                        }
                    </div>
                    <div class="mybutton">
                        {controll === "tank" ?
                            <Fragment>
                                <button onClick={linkwifi1}><span></span>Wifi configure Sender</button>
                                <button onClick={linkwifi2}><span></span>Wifi configure Recevier</button>
                            </Fragment>
                            :
                            <button onClick={linkwifi}><span></span>Wifi configure</button>
                        }
                        {controll === "fan" || controll === "room" ? null :
                            (<button onClick={datahandler}><span></span>data configure</button>)
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}