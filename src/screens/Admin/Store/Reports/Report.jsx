import React ,{useEffect}from 'react'
import InventorySubTab from './InventorySubTab'
import StoreTab from '../StoreTab'
import Suppliers from './Suppliers/PurchaseEntry'

const Reports = ({ setopendashboard }) => {

  useEffect(() => {
    setopendashboard(true)
  }, [])
  
  return (
    <>
      <StoreTab />
      <div className='dashboarddiv'>

        <InventorySubTab setopendashboard={setopendashboard} />
        {/* <Suppliers /> */}
      </div>
    </>
  )
}

export default Reports