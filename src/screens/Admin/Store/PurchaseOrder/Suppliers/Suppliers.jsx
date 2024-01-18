import React, { useEffect, useState, useRef } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import Table from './components/Table/Table'
import { serverInstance } from '../../../../../API/ServerInstance'
import { useReactToPrint } from 'react-to-print'


const Suppliers = () => {

  const [isData, setIsData] = useState('')
  const [searchData, setSearchData] = useState('')
  const handleCallback = (filteredData) => {
    setSearchData(filteredData);
    getPO()
  };

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



  const getPO = async () => {
    try {
      const res = await serverInstance('store/get-purchaseOrder', 'get')
      console.log(res)
      setIsData(res.data)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPO();
  }, [])

  return (
    <div>
      <SearchBar isData={isData} getPO={handleCallback} handlePrint={handlePrint} />
      <Table isData={isData} searchData={searchData ? searchData : isData} getPO={handleCallback} componentRef={componentRef} />
    </div>
  )
}

export default Suppliers