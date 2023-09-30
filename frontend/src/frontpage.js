import React, { Fragment, useState } from 'react'
import Enterypass from './alert message/enterypass'

export default function Frontpage() {
    const [enterypage, Setenterpage] = useState(false)
    const enterhandler = () => {
        Setenterpage(!enterypage)
    }

    return (
        <Fragment>
            <div class="myfront" id="myfront">
                <div className="mycontent">
                    <div className="myoverlay"></div>
                    <img className="mybackground" src="/material/bg-1.jpg" alt="" />
                </div>
                <button class="myskip" type="submit" onClick={enterhandler}>skip</button>
                <div class="mycontenter">
                    <div class="typing-container">
                        <div class="line">HOME</div>
                        <div class="line2">AUTOMATION</div>
                    </div>
                    <div class="morebutton">
                        <div class="mybutton">
                            <button onClick={enterhandler}><span></span>View more</button>
                        </div>
                        <div class="mymore">
                            <button type="submit" onClick={enterhandler}><span></span>More information</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="otpbody">
                <div class="container">
                    <header>
                        <i class="bx bxs-check-shield"></i>
                    </header>
                    <h4>Enter Password</h4>
                    <form action="#" id="otp">
                        <div class="input-field">
                            <input type="number" class="otp-input" />
                            <input type="number" class="otp-input" disabled />
                            <input type="number" class="otp-input" disabled />
                            <input type="number" class="otp-input" disabled />
                        </div>
                        <button class="verify-button" disabled>Verify Password</button>
                    </form>
                    <div class="closebtn">
                        <i class="fa fa-times"></i>
                    </div>
                </div>
            </div>
            {
                enterypage ? <Enterypass close={enterhandler} /> : null
            }
        </Fragment>
    )
}
