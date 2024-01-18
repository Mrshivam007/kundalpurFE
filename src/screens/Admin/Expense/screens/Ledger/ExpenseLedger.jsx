import { useDispatch } from "react-redux";
import { useState } from "react";
import Search from "./components/form/Search";

import LedgerTable from "./components/table/LedgerTable";
import Add from './components/form/Add'



import ETab from "../../ETab";
import { Create_Expense } from './components/form/Create_Expense';

export default function expenseLedger({ setopendashboard }) {
  const [refresh, setRefresh] = useState(false);

const handleRefreshTable = () => {
  setRefresh(!refresh); 
};
  const dispatch = useDispatch();
  return (
    <>


      <ETab setopendashboard={setopendashboard} />
      
         
      <LedgerTable refresh={refresh}/>

    </>
  );
}
