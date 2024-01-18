import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Create_Supplier from "../components/form/Create_Supplier";
import Search from "../components/search/Search";
import SupplierList from "../components/Table/SupplierList";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchSupplierSearchList } from "../../../../reducers/master/supplier/SupplierSlice";
import Pagination from "../components/pagination/Pagination";
import { fetchCountrySearchList } from "../../../../reducers/master/country/CountrySlice";
import {fetchSutypeSearchList } from "../../../../reducers/master/supplier_type/SutypeSlice";
export default function Supplier() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSupplierSearchList({ search_str: "" }));
		dispatch(fetchCountrySearchList());
		dispatch(fetchSutypeSearchList());
	}, []);

	return (
		<>
			<Search />
			<hr />
			<Create_Supplier />
			<br />
			<br />
			<hr />
			<SupplierList />
			<Pagination />
		</>
	);
}
