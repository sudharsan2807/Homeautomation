import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ID_GET, ID_REMOVER, ID_STORAGE } from '../scrvices/auth/storge';
import Auth from '../scrvices/auth/authitication';
import { MESS_SEND, PASS_GET } from '../scrvices/api/passAPI';

export default function Enterypass(props) {
    const [input, Setinput] = useState();
    const [data, Setdata] = useState([]);
    const [error, Seterror] = useState();
    const navigate = useNavigate();
    const inputhandler = (event) => {
        Setinput(event.target.value)
    }

    useEffect(() => {
        PASS_GET().then((response) => {
            console.log(response);
            Setdata(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const submitHandler = () => {
        const matchingData = data.find((item) => item.password === input);
        if (matchingData) {
            MESS_SEND("entery to Home-automation")
            const matchedId = matchingData._id;
            ID_STORAGE(matchedId); // Send the matched ID wherever you need it.
            if (Auth()) {
                return navigate('home');
            }
        } else {
            Seterror("Incorrect password");
            if (!matchingData && ID_GET() !== null) {
                ID_REMOVER();
            }
        }
    }

    return (
        <Fragment>
            <div className="blurbox"></div>
            <div className="enterypass">
                <i className="fa-solid fa-x" onClick={props.close}></i>
                <span>Please enter the password</span>
                <div className="inputbox">
                    <input type="text" onChange={inputhandler} />
                    <span>Enter Password</span>
                </div>
                <span className='error-register' style={{ fontSize: "1rem" }}>{error}</span>
                <button onClick={submitHandler}>Submit</button>
            </div>
        </Fragment>
    )
}
