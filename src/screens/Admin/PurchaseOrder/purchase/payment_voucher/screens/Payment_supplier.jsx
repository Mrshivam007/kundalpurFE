// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Search from "../components/supplier/search/Search";
import Pagination from "../components/supplier/pagination/Pagination";
import Payment_list_Sup from "../components/supplier/Table/Payment_list_Sup";
export default function Payment_supplier() {
	
	return (
		<>
			<Search />
			<hr />
			<Payment_list_Sup />
            <Pagination/>
		</>
	);
}
