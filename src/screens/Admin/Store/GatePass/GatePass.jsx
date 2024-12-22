import React,{useEffect, useState} from 'react'
import InvoiceSubTab from './GPSubTab'
import StoreTab from '../StoreTab'
import Suppliers from './Suppliers/Suppliers'




const GatePass = ({ setopendashboard }) => {



  useEffect(() => {
    setopendashboard(true)
  }, [])

  return (

    <>
      <StoreTab />

      <div className='dashboarddiv'>

        {/* <InvoiceSubTab setopendashboard={setopendashboard} /> */}
        <Suppliers />
      </div>
    </>

  )
}

export default GatePass