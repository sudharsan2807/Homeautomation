import React, { Fragment } from 'react'

export default function Gapdetail(props) {
    const inputhandler = () => {

    }
    return (
        <Fragment>
            <div className='gapdetailbox'>
                <i className="fa fa-xmark" onClick={props.close()}></i>
                <span>Enter the gap value for alarm</span>
                <input onChange={inputhandler}></input>
                <button>Submit</button>
            </div>
        </Fragment>
    )
}
