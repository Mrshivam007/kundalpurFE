import React ,{useEffect}from 'react'
import InventorySubTab from './InventorySubTab'
import StoreTab from '../StoreTab'

const Inventory = ({ setopendashboard }) => {

  useEffect(() => {
    setopendashboard(true)
  }, [])
  
  return (
    <>
      <StoreTab />
      <div className='dashboarddiv'>

        <InventorySubTab setopendashboard={setopendashboard} />
      </div>
    </>
  )
}

export default Inventory