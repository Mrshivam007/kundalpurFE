import { useDispatch } from "react-redux";


import Search from "./components/form/Search";

import VoucherTable from "./components/table/VoucherTable";
import ETab from "../../ETab";
import { useEffect, useState } from "react";
import Expense from './components/form/Expense'


export default function ExpenseVoucher({ setopendashboard }) {
  const dispatch = useDispatch();

 


  useEffect(() => {
    setopendashboard(true)
  }, [])

  return (
    <>
     
      <ETab setopendashboard={setopendashboard} />
      {/* <Search /> */}
     
  
      {/* <Create_Expense /> */}
      
      <VoucherTable />

    </>
  );
}
