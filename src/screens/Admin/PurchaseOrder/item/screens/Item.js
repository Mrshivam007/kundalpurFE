import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux/es/exports";
import { fetchItemSearchList } from "../../../../reducers/master/item/ItemSlice";
import {fetchCategoryList} from "../../../../reducers/master/category/CategorySlice";
import Create_Item from "../components/form/Create_Item";
import Pagination from "../components/pagination/Pagination";
import Search from "../components/search/Search";
import Item_List from "../components/Table/Item_List";

export default function Item() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchItemSearchList({ search_str: "" }));
		dispatch(fetchCategoryList());
	}, []);

	return (
		<>
			<Search />
			<hr />
			<Create_Item />
			<br />
			<br />
			<hr />
			<Item_List />
			<Pagination />
		</>
	);
}
