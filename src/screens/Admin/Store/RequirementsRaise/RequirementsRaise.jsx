import React, { useEffect } from 'react'
import RequirementsRaiseSubTab from './RequirementsRaiseSubTab'
import StoreTab from '../StoreTab'


const RequirementsRaise = ({ setopendashboard }) => {

  useEffect(() => {
    setopendashboard(true)
  }, [])

  return (
    <>
      <StoreTab />
      <div className='dashboarddiv'>

        <RequirementsRaiseSubTab />
      </div>
    </>

  )
}

export default RequirementsRaise