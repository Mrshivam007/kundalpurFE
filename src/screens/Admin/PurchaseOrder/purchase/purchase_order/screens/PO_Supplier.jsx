import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPvSupplierList } from "../../../../reducers/purchase/pv/PvSlice";
import Create_PO from "../components/supplier/form/Create_PO";
import Search from "../components/supplier/form/Search";
import Pagination from "../components/supplier/pagination/Pagination";
import PurchaseOrderList from "../components/supplier/table/PurchaseOrderList";
export default function PO_Supplier() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchPvSupplierList());
	}, []);
	return (
		<>
			
				<Search />
				<hr />
			    <Create_PO/>
				<br />
				<br />
				<hr />
				<PurchaseOrderList />
				<Pagination />
		</>

	);
}
