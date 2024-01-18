import React, { useEffect, useState , useRef} from 'react'
import Table from './Components/Table/Table'
import StoreTab from '../StoreTab'
import { serverInstance } from '../../../../API/ServerInstance'
import SearchBar from './Components/SearchBar/SearchBar'
import { useReactToPrint } from 'react-to-print'

const Stock = ({ setopendashboard }) => {

  const [data, setData] = useState('')
  const [searchData , setSearchData] = useState('')

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  const handleCallback = (filteredData) =>{
    setSearchData(filteredData)
    getStock();
  }

  const getStock = async () => {
    try {
      const res = await serverInstance('store/get-stock', 'get')
      if (res.status) {
        setData(res.data)
      
      }
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getStock();
    setopendashboard(true)
  }, [])

  return (
    <>
      <StoreTab  />
      <div className='dashboarddiv'>

        <SearchBar data={data} getStock={handleCallback} handlePrint={handlePrint}/>
        <Table data={searchData ? searchData :data}  getStock={handleCallback} componentRef={componentRef}/>
      </div>
    </>

  )
}

export default Stock