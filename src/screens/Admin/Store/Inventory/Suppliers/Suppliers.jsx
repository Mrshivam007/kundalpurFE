import React, { useEffect, useState, useRef } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import Table from './components/Table/Table'
import { serverInstance } from '../../../../../API/ServerInstance'
import { useReactToPrint } from 'react-to-print'

const Suppliers = () => {
  const [isData, setIsData] = useState([])
  const [page, setPage] = useState(1) // Note: Changed to 1 to match backend
  const [limit, setLimit] = useState(25)
  const [totalRecords, setTotalRecords] = useState(0)
  const [searchData, setSearchData] = useState([])
  const [loading, setLoading] = useState(false)

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // const handleCallback = (filteredData) => {
  //   console.log("getting filtered data ", filteredData);
  //   setSearchData(filteredData)
  // }

  const handleCallback = (filterParams) => {
    console.log("getting filter params ", filterParams);
    // Reset to first page when applying new filters
    setPage(1);
    getInventory(1, limit, filterParams);
  }

  // const getInventory = async (page = 1, limit = 25) => {
  //   try {
  //     setLoading(true)
  //     const res = await serverInstance(`store/get-inventory?page=${page}&limit=${limit}`, 'get');
  //     setIsData(res.data.items);
  //     setTotalRecords(res.data.total);
  //     setLoading(false)
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false)
  //   }
  // };

  const getInventory = async (page = 1, limit = 25, filterParams = {}) => {
    try {
      setLoading(true);
      // Convert filter params to query string
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filterParams
      }).toString();
      
      const res = await serverInstance(`store/get-inventory?${queryParams}`, 'get');
      setIsData(res.data.items);
      setTotalRecords(res.data.total);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getInventory(page, limit);
  }, [page, limit]);

  const handlePageChange = (newPage, newLimit) => {
    if (newLimit !== limit) {
      setLimit(newLimit);
      setPage(1); // Reset to first page when changing page size
    } else {
      setPage(newPage);
    }
  };

  return (
    <div>
      <SearchBar 
        getInventory={handleCallback} 
        isData={isData} 
        handlePrint={handlePrint} 
      />
      <Table 
        getInventory={getInventory} 
        isData={searchData.length ? searchData : isData} 
        componentRef={componentRef} 
        currentPage={page}
        totalRecords={totalRecords}
        limit={limit}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  )
}

export default Suppliers