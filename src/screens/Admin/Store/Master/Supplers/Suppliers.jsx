import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import Table from "./components/Table/Table";
import { serverInstance } from "../../../../../API/ServerInstance";

const Suppliers = () => {
  const [isData, setIsData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const handleCallback = (filteredData) => {
    setSearchData(filteredData);
  };

  const getSupplier = async () => {
    try {
      const res = await serverInstance("store/get-supplierMaster", "get");
      if (res.status) {
        setIsData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSupplier();
  }, []);

  return (
    <div>
      <SearchBar isData={isData} getSupplier={handleCallback} />
      <Table suppliers={searchData.length > 0 ? searchData : isData} />
    </div>
  );
};

export default Suppliers;
