import React, { Fragment } from 'react'
import { Motorview } from '../compounds/motor'
import { TIME_DEL } from '../scrvices/api/api-reader'
import { useParams } from 'react-router-dom'

export default function Delete() {
    const { id } = useParams();

    const deletehandler = () => {
        TIME_DEL(id).then((Response) => {
            console.log(Response);
            window.history.back(-1);
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <Fragment>
            <Motorview />
            <div className='blurbox'></div>
            <div className='deletebox'>
                <i className="fa fa-xmark" onClick={() => window.history.back(-1)}></i>
                <span>DELETE !</span>
                <p>Are you sure want to delete</p>
                <button onClick={deletehandler}>Confirm</button>
            </div>
        </Fragment>
    )
}
