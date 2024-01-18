import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import Table from './components/Table/Table'
import { serverInstance } from '../../../../../API/ServerInstance'


const Suppliers = () => {


  const [isData, setIsData] = useState('')
  const [searchData, setSearchData] = useState('')

  const handleCallback = (filteredData) => {
    getPR();
    setSearchData(filteredData)
  }

  const getPR = async () => {
    try {
      const res = await serverInstance('store/get-purchaseRequisition', 'get')
      console.log(res)
      setIsData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPR();
  }, [])

  return (
    <div>
      <SearchBar isData={isData} getPR={handleCallback} />
      <Table isData={searchData ? searchData : isData} getPR={handleCallback} />
    </div>
  )
}

export default Suppliers