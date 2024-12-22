import React ,{useEffect} from 'react'
import POSubTab from './POSubTab'
import StoreTab from '../StoreTab'
import Suppliers from './Suppliers/Suppliers'

const PO = ({ setopendashboard }) => {

  useEffect(() => {
    setopendashboard(true)
  }, [])

  return (
    <>
      <StoreTab />

      <div className='dashboarddiv'>
        
      <Suppliers />
        {/* <POSubTab setopendashboard={setopendashboard} /> */}
      </div>
    </>
  )
}

export default PO