// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Pagination from "../components/branch/pagination/Pagination";
import Search from "../components/branch/search/Search";
import Ledger_list from "../components/branch/Table/Ledger_list";
export default function Ledger_Branch() {
	
	return (
		<>
			<Search />
			<hr />
			<Ledger_list />
            <Pagination/>
		</>
	);
}
