import React,{useEffect, useState} from 'react'
import InvoiceSubTab from './GPSubTab'
import StoreTab from '../StoreTab'




const GatePass = ({ setopendashboard }) => {



  useEffect(() => {
    setopendashboard(true)
  }, [])

  return (

    <>
      <StoreTab />

      <div className='dashboarddiv'>

        <InvoiceSubTab setopendashboard={setopendashboard} />
      </div>
    </>

  )
}

export default GatePass