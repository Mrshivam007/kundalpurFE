import { useDispatch } from "react-redux";
import { useState } from "react";


import GroupTable from "./components/table/GroupTable";
import Add from './components/form/Add'



import ETab from "../../ETab";
import { Create_Expense } from './components/form/Create_Expense';

export default function ExpenseOrder({ setopendashboard }) {
  const [refresh, setRefresh] = useState(false);

const handleRefreshTable = () => {
  setRefresh(!refresh); 
};

  const dispatch = useDispatch();
  return (
    <>


      <ETab setopendashboard={setopendashboard} />
     
      <GroupTable refresh={refresh}/>

    </>
  );
}
