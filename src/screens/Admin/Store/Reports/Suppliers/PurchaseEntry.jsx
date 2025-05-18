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
    getInventory()
    setSearchData(filteredData)
  }

  const getInventory = async () => {
    try {
      const res = await serverInstance('store/get-inventory', 'get');
      setIsData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInventory();
  }, [])
  return (
    <div>
      <SearchBar getInventory={handleCallback} isData={isData} handlePrint={handlePrint} />
      <Table getInventory={handleCallback} isData={searchData ? searchData : isData} componentRef={componentRef} />
    </div>
  )
}

export default Suppliers