import Search from "../components/supplier/form/Search";
import Pagination from "../components/supplier/pagination/Pagination";
import PurchaseOrderList from "../components/supplier/table/PurchaseOrderList";
export default function PR_Supplier() {

	return (
		<>
			
				<Search />
				<hr />
				<PurchaseOrderList />
				<Pagination />
		</>

	);
}
