import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import Table from './components/Table/Table'
import { serverInstance } from '../../../../../API/ServerInstance'

const Suppliers = () => {

  const [isData, setIsData] = useState('')

  const [searchData, setSearchData] = useState('')

  const handleCallback = (filteredData) => {
    getPR();
    // setSearchData(filteredData)
  }

  const handleApprover = (filteredData) => {
    getApprover();
    setSearchData(filteredData)
  }

  const getApprover = async () => {
    try {
      const res = await serverInstance('store/get-approver', 'get');
      setIsData(res.data);
      console.log('done')
      console.log('isData', isData)
    } catch (err) {
      console.log(err);
    }
  };


  // const getPR = async () => {
  //   try {
  //     const res = await serverInstance('store/get-purchaseRequisition', 'get')
  //     console.log(res.data)
  //     setIsData(res.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  useEffect(() => {
    // getPR();
    getApprover();
  }, [])


  return (
    <div>
      <SearchBar isData={isData} getApprover={handleApprover} />

      <Table approver={searchData ? searchData : isData} getApprover={handleApprover} />
    </div>
  )
}

export default Suppliers