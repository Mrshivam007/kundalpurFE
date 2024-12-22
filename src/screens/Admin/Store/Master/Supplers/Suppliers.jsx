import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import Table from './components/Table/Table'
import { serverInstance } from '../../../../../API/ServerInstance'


const Suppliers = () => {


  const [isData, setIsData] = useState('')
  const [searchData, setSearchData] = useState('')

  const handleCallback = (filteredData) => {
    getSupplier();
    setSearchData(filteredData)
  }

  const getSupplier = async () => {
    try {
      const res = await serverInstance('store/get-supplierMaster', 'get')
      console.log(res)
      setIsData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getSupplier();
  }, [])

  return (
    <div>
      <SearchBar isData={isData} getSupplier={handleCallback} />
      <Table isData={searchData ? searchData : isData} getSupplier={handleCallback} />
    </div>
  )
}

export default Suppliers