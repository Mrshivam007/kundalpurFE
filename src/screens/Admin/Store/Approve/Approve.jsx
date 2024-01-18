import React ,{useEffect} from 'react'
import ApproveSubTab from './ApproveSubTab'
import StoreTab from '../StoreTab'

const Approve = ({ setopendashboard }) => {

  useEffect(() => {
    setopendashboard(true)
  }, [])


  return (

    <>
      <StoreTab />
      <div className='dashboarddiv'>

        <ApproveSubTab setopendashboard={setopendashboard} />
      </div>
    </>

  )
}

export default Approve