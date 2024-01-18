import Select from "react-select";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categorySelector } from "../../../../../reducers/master/category/CategorySlice";
import { uomSelector } from "../../../../../reducers/master/uom/UomSlice";
import "../../../../../assets/styles/Table.css";
import {
	itemSelector,
	fetchItemSearchList,
} from "../../../../../reducers/master/item/ItemSlice";

import "../../../../../assets/styles/Search.css";
import Pdf from "../../components/form/Pdf";
import Excel from "../ExceItemMaster/Excel";

export default function Search() {
	const dispatch = useDispatch();
	const [codeValue, setCode] = useState("");
	const [nameValue, setName] = useState("");
	const [uomValue, setuom] = useState("");
	const [categoryValue, setcategory] = useState("");

	const item = useSelector(itemSelector);
	const uom = useSelector(uomSelector);
	const category = useSelector(categorySelector);
	const codeArr = [{ value: "0", label: "Select Inventory Code" }];
	const nameArr = [{ value: "0", label: "Select Inventory Name" }];
	const uomArr = [{ value: "0", label: "Select Inventory uom " }];
	const categoryArr = [{ value: "0", label: "Select ItemInventory category" }];
	item &&
		item.itemList &&
		item.itemList.map((item, index) => {
			codeArr.push({ value: item.id, label: item.item_code });
			nameArr.push({ value: item.id, label: item.item_name });
		});
	category &&
		category.categoryList &&
		category.categoryList.map((category, index) => {
			categoryArr.push({ value: category.id, label: category.category_name });
		});
	uom &&
		uom.uomList &&
		uom.uomList.map((uom, index) => {
			uomArr.push({ value: uom.id, label: uom.unit });
		});
	const setCodeValue = (e) => {
		if (e.value > 0) {
			setCode(e.label);
		} else {
			setCode("");
		}
	};
	const setNameValue = (e) => {
		if (e.value > 0) {
			setName(e.label);
		} else {
			setName("");
		}
	};

	const setuomValue = (e) => {
		if (e.value > 0) {
			setuom(e.label);
		} else {
			setuom("");
		}
	};

	const setcategoryValue = (e) => {
		if (e.value > 0) {
			setcategory(e.label);
		} else {
			setcategory("");
		}
	};

	const myfunCtion = () => {
		dispatch(fetchItemSearchList({ searchString: "" }));
		setCode("")
		setName("");
		setcategory("")
		setuom("")

	}
	const searchAction = () => {
		var search_str = "";
		if (codeValue !== 0) {
			search_str += "&item_code=" + codeValue;
		}

		if (nameValue !== 0) {
			search_str += "&item_name=" + nameValue;
		}

		if (uomValue !== 0) {
			search_str += "&item_unit=" + uomValue;
		}

		if (categoryValue !== 0) {
			search_str += "&item_category=" + categoryValue;
		}
		dispatch(fetchItemSearchList({ searchString: search_str }));
	};

	return (
		<>
			<div className="bigcontainer">
				<div className="selecttabcontainer1">
					<Select
					value={codeArr.filter(function (option) {
						return option.label === codeValue;
					})}
						placeholder="Code"
						className="selecttab"
						options={codeArr}
						onChange={setCodeValue}
					/>
					<Select
						value={nameArr.filter(function (option) {
							return option.label === nameValue;
						})}
						placeholder="Inventory Name"
						className="selecttab"
						options={nameArr}
						onChange={setNameValue}
					/>
					<Select
						value={uomArr.filter(function (option) {
							return option.label === uomValue;
						})}
						placeholder="UOM"
						className="selecttab"
						options={uomArr}
						onChange={setuomValue}
					/>
					<Select
						value={categoryArr.filter(function (option) {
							return option.label === categoryValue;
						})}
						placeholder="Category"
						className="selecttab"
						options={categoryArr}
						onChange={setcategoryValue}
					/>
					<button id="srcbtn" onClick={() => searchAction()}>
						Search
					</button>
					<button id="srcbtn" onClick={myfunCtion}>
						Reset
					</button>
				</div>

				<div className="selecttabcontainer2">
					<div className="col-md-1">
						<Excel />
						{/* <svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							fill="currentColor"
							id="sg"
							class="bi bi-printer-fill"
							viewBox="0 0 16 16"
						>
							<path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
							<path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
						</svg> */}
					</div>
					<div className="col-md-1">
						<Pdf />
					</div>
				</div>
			</div>
		</>
	);
}
