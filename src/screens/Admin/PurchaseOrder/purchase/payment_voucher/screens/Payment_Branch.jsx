// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Search from "../components/branch/search/Search";
import Pagination from "../components/branch/pagination/Pagination";
import Payment_list_Bra from "../components/branch/Table/Payment_list_Bra";
export default function Payment_Branch() {
	
	return (
		<>
			<Search />
			<hr />
			< Payment_list_Bra />
            <Pagination/>
		</>
	);
}
