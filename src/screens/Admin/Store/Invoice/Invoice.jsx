import React ,{useEffect}from 'react'
import InvoiceSubTab from './InvoiceSubtab'
import StoreTab from '../StoreTab'
import Suppliers from './Suppliers/Suppliers'

const Invoice = ({ setopendashboard }) => {

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

export default Invoice