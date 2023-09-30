import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Higlevel, Level_dif, Lowlevel, tankpercentage } from '../scrvices/info/tankinfo'
import { Erase } from '../alert message/erase'
import Metadata from '../scrvices/metadata';

export default function Tank() {
    const [erarse, Seterase] = useState(false);
    const [infoclose, Setinfoclose] = useState(false)
    const erasehandler = () => {
        Seterase(!erarse)
    }

    const infoclosehandler = () => {
        Setinfoclose(!infoclose)
    }
    return (
        <Fragment>
            <div className="tankviewbox">
                <Metadata title={"tank"}></Metadata>
                <div className="mycontent">
                    <div className="myoverlay"></div>
                    <img className="backarrow" onClick={() => window.history.back(-1)} src="/material/back-arrow.png" alt="" />
                    <img className="mybackground" src="/material/bg-1.jpg" alt="" />
                    <Link to={"config"}>
                        <button className="btnconfigure"><span></span>configure</button>
                    </Link>
                </div>
                <div className="tankpage">
                    <div className="mytankinfo">
                        <div className="levelinfo">
                            <p>{Higlevel()}cm ------</p>
                            <p>{Higlevel() - Level_dif()}cm --------</p>
                            <p>{Higlevel() / 2}cm --------</p>
                            <p>{Lowlevel() + Level_dif()}cm --------</p>
                            <p>{Lowlevel()}cm ---------</p>
                        </div>
                        <div className="mytank">
                            <div className="mytank-top"></div>
                            <div className="mytank-botm">
                                <div className="myloader"><span>{tankpercentage()}%</span></div>
                                <div className='wavebox'>
                                    <div className="mywave"></div>
                                    <div className='box' style={{ height: `${tankpercentage()}%` }}></div>
                                </div>
                                <div className="highline"></div>
                                <div className="lowline"></div>
                            </div>
                        </div>
                        <div className="statusinfo">
                            <p>---over-high</p>
                            <p>-----------high</p>
                            <p>---------medium</p>
                            <p>------------low</p>
                            <p>-------over-low</p>
                        </div>
                    </div>
                    <div className="infotable">
                        <div className="info-title">
                            <span>measurement</span>
                            <div className="end">
                                <span>statusinfo</span>
                                <i className="fa fa-arrow-down" id="tv-togglearrow" onClick={infoclosehandler} style={{ rotate: infoclose ? "0deg" : "270deg" }}></i>
                            </div>
                        </div>
                        <div className="infobox" style={{ display: infoclose ? "flex" : "none" }}>
                            <div className="levelinfo">
                                <span>{Higlevel()}cm ------</span>
                                <span>{Higlevel() - Level_dif()}cm --------</span>
                                <span>{Higlevel() / 2}cm --------</span>
                                <span>{Lowlevel() + Level_dif()}cm --------</span>
                                <span>{Lowlevel()}cm ---------</span>
                            </div>
                            <div className="dash">
                                <span>-</span>
                                <span>-</span>
                                <span>-</span>
                                <span>-</span>
                                <span>-</span>
                            </div>
                            <div className="statusinfo">
                                <span>over-high</span>
                                <span>high</span>
                                <span>medium</span>
                                <span>low</span>
                                <span>over-low</span>
                            </div>
                        </div>
                    </div>
                    <div className="mydata">
                        <div className="tankdata">
                            <div className="datastore">
                                <div className="upperdata">
                                    <div className="dataget">
                                        <span>dataget</span>
                                        <div className="slider">
                                            <input type="checkbox" id="slider-switch" />
                                            <label for="slider-switch" className="slider-label">
                                                <span className="on">ON</span>
                                                <span className="off">OF</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="erase">
                                        <button type="submit" onClick={erasehandler}>erarse</button>
                                    </div>
                                </div>
                                <div className="line"></div>
                                <div className="lowerdata">
                                    <div className="1line">power consumed  :  <span>1025</span><span>  unit</span></div>
                                    <div className="2line">water consumed  :  <span>250</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="alert">
                    <span>alert!</span>
                </div>
            </div>
            {
                erarse ? <Erase close={erasehandler} /> : null
            }
        </Fragment>
    )
}
