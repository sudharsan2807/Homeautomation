import { Fragment, useState } from "react";
import React from "react";

export function Erase(props) {
    const [input, Setinput] = useState({
        confirm: ""
    });

    const [error, setError] = useState(false)

    const confirm = (event) => {
        Setinput({ ...input, [event.target.name]: event.target.value })
    }

    const confirmHandler = (event) => {
        event.preventDefault();
        if (input.confirm === "ERASE") { // Compare input.confirm to "ERASE"
            setError(false);
            props.close();
            // You can't return a component like this, instead, you should conditionally render it in your JSX.
        } else {
            setError(true)
        }
    }

    return (
        <Fragment>
            <div className="blur-background"></div>
            <div className="pop-up" id="pop-up">
                <i className="fa fa-xmark" onClick={props.close()}></i>
                <div className="img-box">
                    <img src="/material/alert.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                </div>
                <h1>if you want to delete the data<br />please enter<span> "ERASE" </span>in the below box</h1>
                <form id="confirmform" autoComplete="off" onSubmit={confirmHandler} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <input type="text" id="confirm" className="confirm" placeholder="type ERASE" name="confirm" onChange={confirm} />
                    {error ? (<span className="error-register">Please enter "ERASE"</span>) : null}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </Fragment>
    )
}
