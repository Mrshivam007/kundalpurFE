// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Pagination from "../components/supplier/pagination/Pagination";
import Search from "../components/supplier/search/Search";
import Ledger_list from "../components/supplier/Table/Ledger_list";

export default function Ledger_supplier() {

	return (
		<>
			<Search />
			<hr />
			<Ledger_list />
			<Pagination />
		</>
	);
}
