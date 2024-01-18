import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import "../../../../../assets/styles/Search.css";
import Excel from "../ExcelSupplierMaster/Excel";
import {
	fetchSupplierSearchList,
	supplierSelector
} from "../../../../../reducers/master/supplier/SupplierSlice";

import Pdf from "../form/Pdf";

export default function Search() {
	const dispatch = useDispatch();
	const [codeValue, setCode] = useState("");
	const [nameValue, setName] = useState("");
	const [contactValue, setContact] = useState("");
	const [gstValue, setGst] = useState("");
	const supplier = useSelector(supplierSelector);
	const codeArr = [{ value: "0", label: "Select Supplier Code" }];
	const nameArr = [{ value: "0", label: "Select Supplier Name" }];
	const contactArr = [{ value: "0", label: "Select Supplier Contact No" }];
	const gstArr = [{ value: "0", label: "Select Supplier's GST" }];
	supplier &&
		supplier.supplierList &&
		supplier.supplierList.map((supplier, index) => {
			codeArr.push({ value: supplier.id, label: supplier.supplier_code });
			nameArr.push({ value: supplier.id, label: supplier.supplier_name });
			contactArr.push({ value: supplier.id, label: supplier.contact_no });
			gstArr.push({ value: supplier.id, label: supplier.gstin });
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

	const setContactValue = (e) => {
		if (e.value > 0) {
			setContact(e.label);
		} else {
			setContact("");
		}
	};

	const setGstValue = (e) => {
		if (e.value > 0) {
			setGst(e.label);
		} else {
			setGst("");
		}
	};
	const myfunCtion = () => {
		dispatch(fetchSupplierSearchList({ searchString: "" }));
		setCode("");
		setName("");
		setContact("");
		setGst("");

	}
	const searchAction = () => {
		var search_str = "";
		if (codeValue != 0) {
			search_str += "&supplier_code=" + codeValue;
		}

		if (nameValue != 0) {
			search_str += "&supplier_name=" + nameValue;
		}

		if (contactValue != 0) {
			search_str += "&contact_no=" + contactValue;
		}

		if (gstValue != 0) {
			search_str += "&gstin=" + gstValue;
		}
		dispatch(fetchSupplierSearchList({ searchString: search_str }));
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
						placeholder="Supplier Name"
						className="selecttab"
						options={nameArr}
						onChange={setNameValue}
					/>
					{/* <Select
						value={contactArr.filter(function (option) {
							return option.label === contactValue;
						})}
						placeholder="Contact"
						className="selecttab"
						options={contactArr}
						onChange={setContactValue}
					/>
					<Select
						value={gstArr.filter(function (option) {
							return option.label === gstValue;
						})}
						placeholder="GST No"
						className="selecttab"
						options={gstArr}
						onChange={setGstValue}
					/> */}

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
