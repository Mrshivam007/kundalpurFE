import React, { useState } from "react";
import Select from "react-select";
import { supplierSelector } from "../../../../../../reducers/master/supplier/SupplierSlice";

import { setSearchString } from "../../../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";

import {
	fetchPurchaseBranchOrderSearchList,
	purchaseOrderSelector,
} from "../../../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";

import { branchSelector } from "../../../../../../reducers/master/branch/BranchSlice";
import { useDispatch, useSelector } from "react-redux";
import Pdf from "../form/Pdf"
import Excel from "../ExcelPO/Excel";
import { Link } from "react-router-dom";
import Config from "../../../../../../constants/Config";
export default function Search() {
	const dispatch = useDispatch();

	const supplier = useSelector(supplierSelector);
	const branch = useSelector(branchSelector);
	const purchaseOrder = useSelector(purchaseOrderSelector);
	/* Search */

	const [codeValue, setCode] = useState("0");
	const [statusValue, setStatus] = useState("");
	const [itemBranchValue, setItemBranch] = useState("");
	// const [itemNameValue, setItemName] = useState("");

	const setCodeValue = (e) => {
		if (e.value > 0) {
			setCode(e.label);
		} else {
			setCode("");
		}
	};
	const setStatusValue = (e) => {
		// console.log("=0-=-ghgh", e);
		if (e.value) {
			setStatus(e.label);
		}
	};



	const setItemBranchValue = (e) => {
		if (e.value > 0) {
			setItemBranch(e.label); 
		} else {
			setItemBranch("");
		}
	};

	const searchAction = () => {
		var search_str = "";
		if (codeValue != 0) {
			search_str += "&po_code=" + codeValue;
		}

		
		if (statusValue != 0) {
			search_str += "&po_status=" + statusValue;
		}


		if (itemBranchValue != 0) {
			search_str += "&branch_name=" + itemBranchValue;
		}

		dispatch(setSearchString(search_str)); 

		dispatch(
			fetchPurchaseBranchOrderSearchList({
				offset: 0,
				limit: 15,
				searchString: search_str,
			}),
		);

	};
	const myfunCtion = () => {
		dispatch(fetchPurchaseBranchOrderSearchList({ searchString: "" }));
		setCode("");
		setStatus("");
		// setItemName("");

	} 
	const statusArr = [{ value: "0", label: "Select Status" }];
	const poArr = [{ value: "0", label: "Select PO Code" }];

	{
		purchaseOrder &&
			purchaseOrder.PurchaseBranchDropList &&
			purchaseOrder.PurchaseBranchDropList.map((po, index) => {
				poArr.push({
					value: po.id,
					label: po.po_code,
				});
				statusArr.push({
					value: po.id,
					label: po.po_status,

				});
			});
	}

	const supplierArr = [{ value: "0", label: "Select Supplier Name" }];

	// {
	// 	supplier &&
	// 		supplier.supplierList &&
	// 		supplier.supplierList.map((supplier, index) => {
	// 			supplierArr.push({
	// 				value: supplier.id,
	// 				label: supplier.supplier_name,
	// 			});
	// 		});
	// }

	const itemBranchArr = [{ value: "0", label: "Select Status" }];

	{
		branch &&
			branch.branchList &&
			branch.branchList.map((item, index) => {
				itemBranchArr.push({
					value: item.id,
					label: item.branch_name,
				});
			});
	}

	return (
		<>
			<div className="bigcontainer">
				<div className="selecttabcontainer1">
					<Select
						value={poArr.filter(function (option) {
							return option.label === codeValue;
						})}
						placeholder="PO Code"
						className="selecttab"
						options={poArr}
						onChange={setCodeValue}
					/>
					<Select
						value={itemBranchArr.filter(function (option) {
							return option.label === itemBranchValue;
						})}
						placeholder="Branch Name"
						className="selecttab"
						options={itemBranchArr}
						onChange={setItemBranchValue}
					/>
					<Select
						// value={statusValue}

						placeholder="Status"
						className="selecttab"
						options={Config.STATUS_CHOICE_PO}
						onChange={setStatusValue}
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
						<Link to="PO_Prints">
							<svg
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
							</svg>
						</Link>
					</div>
					<div className="col-md-1">
						<Excel />
					</div>
					<div className="col-md-1">
						<Pdf />
					</div>
				</div>
			</div>
		</>
	);
}
