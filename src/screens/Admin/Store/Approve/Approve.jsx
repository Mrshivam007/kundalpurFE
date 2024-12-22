import React ,{useEffect} from 'react'
import ApproveSubTab from './ApproveSubTab'
import StoreTab from '../StoreTab'
import Suppliers from './Suppliers/Suppliers'

const Approve = ({ setopendashboard }) => {

  useEffect(() => {
    setopendashboard(true)
  }, [])


  return (

    <>
      <StoreTab />
      <div className='dashboarddiv'>

        {/* <ApproveSubTab setopendashboard={setopendashboard} /> */}
        <Suppliers />
      </div>
    </>

  )
}

export default Approve