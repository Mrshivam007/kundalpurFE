import React ,{useEffect} from 'react'
import POSubTab from './POSubTab'
import StoreTab from '../StoreTab'

const PO = ({ setopendashboard }) => {

  useEffect(() => {
    setopendashboard(true)
  }, [])

  return (
    <>
      <StoreTab />

      <div className='dashboarddiv'>

        <POSubTab setopendashboard={setopendashboard} />
      </div>
    </>
  )
}

export default PO