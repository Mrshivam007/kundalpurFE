import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import Table from "./components/Table/Table";
import { serverInstance } from "../../../../../API/ServerInstance";

const Items = () => {
  const [isData, setIsData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const handleCallback = (filteredData) => {
    setSearchData(filteredData);
  };

  const getItem = async () => {
    try {
      const res = await serverInstance("store/get-itemMaster", "get");
      if (res.status) {
        setIsData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div>
      <SearchBar isData={isData} getItem={handleCallback} />
      <Table item={searchData.length > 0 ? searchData : isData} />
    </div>
  );
};

export default Items;
