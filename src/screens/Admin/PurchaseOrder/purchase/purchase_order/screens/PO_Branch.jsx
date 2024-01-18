import React, { useEffect} from "react";
import { useDispatch } from "react-redux";
import { fetchPurchaseBranchOrderList } from "../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";
import { fetchPvBranchList } from "../../../../reducers/purchase/pv/PvSlice";
import Create_FP from "../components/branch/form/Create_FP";
import Search from "../components/branch/form/Search";
import Pagination from "../components/branch/pagination/Pagination";
import PurchaseOrderList from "../components/branch/table/PurchaseOrderList";
export default function PO_Branch() {
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(fetchPvBranchList());
		
	}, []);

	return (
		<>
				<Search />
				<hr />
			    <Create_FP/>
				<br />
				<br />
				<hr />
				<PurchaseOrderList />
				<Pagination />
		</>

	);
}
