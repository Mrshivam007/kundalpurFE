import React, { useEffect } from 'react'
import RequirementsRaiseSubTab from './RequirementsRaiseSubTab'
import StoreTab from '../StoreTab'
import Suppliers from './Suppliers/Suppliers'


const RequirementsRaise = ({ setopendashboard }) => {

  useEffect(() => {
    setopendashboard(true)
  }, [])

  return (
    <>
      <StoreTab />
      <div className='dashboarddiv'>

        {/* <RequirementsRaiseSubTab /> */}
        <Suppliers />
      </div>
    </>

  )
}

export default RequirementsRaise