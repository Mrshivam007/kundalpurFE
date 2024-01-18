import React, { useEffect, useState } from "react";
import Search from "../components/branch/form/Search";
import Pagination from "../components/branch/pagination/Pagination";
import Po_Return_list from "../components/branch/table/Po_Return_list";

export default function PR_Branch() {
	return (
		<>
				<Search />
				<hr />
				<Po_Return_list />
				<Pagination />
		</>

	);
}
