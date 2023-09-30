import React, { Fragment, useState } from "react";
import Frontpage from "../compounds/frontpage";
import { useNavigate } from "react-router-dom";
import { passdataget } from "../scrvices/api";
import { storepass } from "../scrvices/storge";
import { authication } from "../scrvices/auth";

export function Optpass(props) {
    let navigate = useNavigate();
    const [prevPass, Setpass] = useState(new Array(4).fill(""));

    const passhandler = (element, index) => {
        if (isNaN(element.value)) return false;

        // Check if the value is empty

        Setpass(prevPass => {
            const newPass = [...prevPass];
            newPass[index] = element.value;
            return newPass;
        });

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    }

    const [submit, Setsubmit] = useState(false);
    const [error, Seterror] = useState({
        entery: { required: false },
        customerr: { required: false }
    });

    const prevent = (event) => {
        event.preventDefault();

        const password = parseInt(prevPass.join('')); // Calculate password here
        console.log(password);
        if (password == null) {
            Seterror({ ...error, entery: { required: true } });
        } else {
            passdataget()
                .then((response) => {
                    const passworddata = response.data[0].password;
                    console.log(passworddata);
                    if (password === passworddata) {
                        storepass(passworddata);
                        Setsubmit(true)
                    } else {
                        Seterror({ ...error, customerr: { required: true } });
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    if (authication()) {
        navigate('/home')
    }
    return (
        <Fragment>
            <div className="blur-background"></div>
            <div className="otpbody">
                <div className="container">
                    <i className="fa-solid fa-x" id="otp-close" onClick={props.otppass}></i>
                    <header>
                        <i className="bx bxs-check-shield"></i>
                    </header>
                    <h4>Enter password</h4>
                    <form action="#" onSubmit={prevent}>
                        <div className="input-field">
                            {prevPass.map((data, index) => {
                                return (
                                    <input
                                        type="number"
                                        value={data || ''}
                                        name="pass"
                                        minLength={1}
                                        key={index}
                                        onChange={e => passhandler(e.target, index)}
                                        onFocus={e => e.target.select()}
                                    />
                                )
                            })}
                        </div>
                        {error.entery.required ? (
                            <span className="error-register">Please enter password</span>
                        ) : null}
                        {error.customerr.required ? (
                            <span className="error-register">Password incorrect</span>
                        ) : null}
                        <button disabled={submit}>Verify password</button>
                    </form>
                </div>
            </div>
            <Frontpage></Frontpage>
        </Fragment>
    )
}