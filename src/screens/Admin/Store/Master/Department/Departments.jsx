import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import Table from "./components/Table/Table";
import { serverInstance } from "../../../../../API/ServerInstance";

const Department = () => {
  const [isData, setIsData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const handleCallback = (filteredData) => {
    setSearchData(filteredData);
  };

  const getDepartment = async () => {
    try {
      const res = await serverInstance("store/get-departmentMaster", "get");
      if (res.status) {
        setIsData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <div>
      <SearchBar isData={isData} getDepartment={handleCallback} />
      <Table department={searchData.length > 0 ? searchData : isData} />
    </div>
  );
};

export default Department;
