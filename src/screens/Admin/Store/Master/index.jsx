import React, { useEffect } from 'react'
import StoreTab from '../StoreTab'
import MasterTab from './MasterTab'


const Master = ({ setopendashboard }) => {

    useEffect(() => {
        setopendashboard(true)
    }, [])

    return (
        <>
            <StoreTab />
            <div className='dashboarddiv'>
                <MasterTab />
            </div>
        </>

    )
}

export default Master