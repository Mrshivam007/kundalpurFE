import React, { useEffect, useState, useRef } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import Table from './components/Table/Table'
import { serverInstance } from '../../../../../API/ServerInstance'
import { useReactToPrint } from 'react-to-print'


const Suppliers = () => {

  const [isData, setIsData] = useState('')
  const [searchData, setSearchData] = useState('')

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });


  const handleCallback = (filteredData) => {
    getGP()
    setSearchData(filteredData)
  }


  const getGP = async () => {
    try {
      const res = await serverInstance('store/get-gateEntry', 'get')
      if (res.status) {
        setIsData(res.data)
        console.log(isData)
      }
    } catch (err) {
      console.log(err)
    }
  }

  console.log(isData)


  useEffect(() => {
    getGP();
  }, [])

  return (
    <div>
      <SearchBar getGP={handleCallback} isData={isData} handlePrint={handlePrint} />
      <Table isData={searchData? searchData : isData} getGP={handleCallback} componentRef={componentRef}/>
    </div>
  )
}

export default Suppliers