import React, { useEffect, useState , useRef } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import Table from './components/Table/Table';
import { serverInstance } from '../../../../../API/ServerInstance';
import { useReactToPrint } from 'react-to-print';

const Suppliers = () => {
  const [isData, setIsData] = useState('');
  const [searchData, setSearchData] = useState('');
  const componentRef = useRef();

  const handleCallback = (filteredData) => {
    getPayment();
    setSearchData(filteredData);
  };

  const getPayment = async () => {
    try {
      const res = await serverInstance('store/get-paymentIn');
      setIsData(res.data);
      console.log('res', isData);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current, 
  });

  useEffect(() => {
    getPayment();
  }, []);

  return (
    <div>
      <SearchBar getPayment={handleCallback} isData={isData} handlePrint={handlePrint} componentRef={componentRef}/>
      <Table isData={searchData ? searchData : isData} getPayment={handleCallback} componentRef={componentRef}/>
    </div>
  );
};

export default Suppliers;
