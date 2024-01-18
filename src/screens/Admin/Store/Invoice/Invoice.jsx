import React ,{useEffect}from 'react'
import InvoiceSubTab from './InvoiceSubtab'
import StoreTab from '../StoreTab'

const Invoice = ({ setopendashboard }) => {

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

export default Invoice