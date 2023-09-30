import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROOM_GET, ROOM_PUT_ICON, ROOM_PUT_NAME } from "../scrvices/api/api-reader";
import { IOT_GET8, IOT_PUT6 } from "../scrvices/api/api-iot";
import Metadata from "../scrvices/metadata";

export function Room() {
    const [data, Setdata] = useState("");
    const [getdata, Setgetdata] = useState([]);
    const [btnClickCount, setBtnClickCount] = useState(0);
    const [tick, Settick] = useState(false);
    const [value, setvalue] = useState({
        name: "",
        icon: ""
    });
    const navigate = useNavigate();
    const { id } = useParams();

    const titlehandler = () => {
        Settick(true);
    };

    const clicked = (index) => () => {
        Settick(false);
        if (value.name.length > 0) {
            ROOM_PUT_NAME(value, id).then((response) => {
                console.log(response);
                if (response.status === 200) {
                    window.location.reload()
                }
            });
        }
        navigate('/room')
    }


    const selecthandler = () => {
        ROOM_PUT_ICON(value, id).then((response) => {
            console.log(response);
            if (response.status === 200) {
                window.location.reload()
            }
        })
        navigate('/room')
    }

    const inputhandler = (event) => {
        setvalue({ name: event.target.value });
    };

    const selectchange = (event) => {
        setvalue({ icon: event.target.value });
    };

    const generateAlphabet = (index) => {
        const alphabet = "bcdefghijklmnopqrstuvwxyz";
        if (index >= 0 && index < alphabet.length) {
            return alphabet[index];
        } else {
            return ""; // Return an empty string for out-of-range indices.
        }
    };

    const btnhandler = (dataON, dataOFF) => {
        console.log(dataON, dataOFF);
        if (data === dataON || data !== dataOFF) {
            IOT_PUT6(dataOFF, 36176317).then((response) => {
                console.log(response);
                setBtnClickCount((prevClickCount) => prevClickCount + 1);
            }).catch((err) => {
                console.log(err);
            });
        }
        if (data === dataOFF || data !== dataON) {
            IOT_PUT6(dataON, 36176317).then((response) => {
                console.log(response);
                setBtnClickCount((prevClickCount) => prevClickCount - 1);
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    const btnXhandler = (index) => {
        return () => {
            const alphabetChar = generateAlphabet(index);
            btnhandler(`ROOM_R1${alphabetChar}`, `ROOM_R1${alphabetChar.toUpperCase()}`);
        };
    };

    function classchanger(index) {
        if (data === `ROOM_R1${generateAlphabet(index)}` || data === "ROOM_R1a") {
            return "";
        }

        if (data === `ROOM_R1${generateAlphabet(index).toUpperCase()}` || data === "ROOM_R1A") {
            return "power-of";
        }

        return ""; // Return a default value if none of the conditions are met.
    }

    useEffect(() => {
        IOT_GET8(36176317).then((response) => {
            Setdata(response.data.command_string);
        });
    }, [btnClickCount]);

    useEffect(() => {
        ROOM_GET().then((response) => {
            Setgetdata(response.data);
        });
    }, []);

    return (
        <Fragment>
            <div className="roomviewpage" id="roomviewpage">
                <Metadata title={`room`}></Metadata>
                <div className="mycontent">
                    <div className="myoverlay"></div>
                    <img className="backarrow" onClick={() => window.history.back(-1)} src="/material/back-arrow.png" alt="" />
                    <img className="mybackground" src="/material/bg-8.jpg" alt="" />
                    <div className="mytitle"><span>ROOM_CONTROLLER</span></div>
                    <Link to={"config"}>
                        <button className="btnconfigure"><span></span>configure</button>
                    </Link>
                </div>
                <div className="box-content" id="foruse">
                    {getdata.map((dat, index) => (
                        <div className={`box ${classchanger(index)}`} key={index}>
                            <div className="details">
                                {!tick ?
                                    (<span className="btnname" onClick={titlehandler}><Link to={`edite/${dat._id}`}>{dat.name}</Link></span>) :
                                    (<input type="type" className="btnname" onChange={inputhandler} />)
                                }
                                {tick ?
                                    (<i className="fa fa-check" onClick={clicked(index)} id="checktitle"></i>) : null
                                }
                                <Link to={`edite/${dat._id}`}><select onChange={selectchange} onClick={selecthandler}>
                                    <option>none</option>
                                    <option>light</option>
                                    <option>fan</option>
                                    <option>Plug</option>
                                    <option>changer</option>
                                    <option>printer</option>
                                </select>
                                </Link>
                            </div>

                            <div className={`power-icon ${classchanger(index)}`} onClick={btnXhandler(index)}>

                                {
                                    dat.icon === "light" ? (<i className="fa-solid fa-lightbulb"></i>) :
                                        dat.icon === "fan" ? (<i className="fa-solid fa-fan"></i>) :
                                            dat.icon === "plug" ? (<i className="fa-solid fa-plug"></i>) :
                                                dat.icon === "changer" ? (<i className="fa-solid fa-plug"></i>) :
                                                    dat.icon === "printer" ? (<i className="fa-solid fa-print"></i>) :
                                                        (<i className="fa-solid fa-power-off"></i>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}
