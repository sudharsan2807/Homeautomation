import React, { Fragment, useEffect, useState } from "react";
import { measuredataget } from "../scrvices/api/api-reader";
import { IOT_PUT7 } from "../scrvices/api/api-iot";
import { HIG_STORAGE, LOW_STORAGE } from "../scrvices/auth/storge";

export function Tankpopup(props) {
    let [loading, Setloading] = useState(false);
    let [result, Setresult] = useState(false);

    const loadinghandler = () => {
        Setloading(true);
        IOT_PUT7("read", 35861337);
    }

    if (loading) {
        setTimeout(() => {
            Setresult(true);
            Setloading(false);
        }, 2000);
    }

    const submithandler = () => {
        measuredataget().then((response) => {
            if (props.datapopup === "high") {
                const measurevaluehig = response.data[0].highvalue;
                HIG_STORAGE(measurevaluehig)
            }
            if (props.datapopup === "low") {
                const measurevaluelow = response.data[0].lowvalue;
                LOW_STORAGE(measurevaluelow)
            }
        });
        IOT_PUT7("stop", 35861337);
        window.location.reload();
    }

    const close = () => {
        window.location.reload();
    }
    return (
        <Fragment>
            <div className="blurbox"></div>
            <div className="mypopup" id="mypopup">
                <div className="pop-up" id="pop-up-low">
                    <i className="fa fa-xmark" onClick={props.popup}></i>
                    {loading ?
                        <Fragment>
                            <div className="loader"></div>
                            <p>Please wait for a second</p>
                        </Fragment> :
                        result ?
                            <Fragment>
                                <div class="pop-result" id="pop-result">
                                    <i class="fa fa-xmark" onClick={close}></i>
                                    <div class="img-box">
                                        <img src="/material/tick.png" alt="" />
                                    </div>
                                    <p>Data successfully taken</p>
                                    <button type="submit" onClick={submithandler}>Submit</button>
                                </div>
                            </Fragment> :
                            <Fragment>
                                <div className="img-box">
                                    <img src="/material/alert.png" alt="" />
                                </div>
                                <p>Make sure your tank is {props.datapopup === "high" ? "overflow" : "empty"}</p>
                                <button type="submit" onClick={loadinghandler}>ok</button>
                            </Fragment>
                    }
                </div>
            </div>
        </Fragment>
    )
}
