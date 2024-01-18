import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
// import "../../../../../../assets/styles/Search.css";
// import { branchSelector } from "../../../../../reducers/branch/BranchSlice";
import { fetchLedgerBraSearchList, fetchLedgerSupplierList, ledgerSelector } from "../../../../../reducers/ledger/LedgerSlice";
export default function Search() {
	const dispatch = useDispatch();
	const branch = useSelector(branchSelector);
	const pv = useSelector(ledgerSelector);
	const [codeValue, setCode] = useState("");
	const [nameValue, setName] = useState("");

	const nameArr = [{ value: "0", label: "Select branch Name" }];
	const codeArr = [{ value: "0", label: "Select Code" }];

	{
		pv &&
			pv.ledgerBranchList &&
			pv?.ledgerBranchList.length > 0 &&
			pv.ledgerBranchList.map((pv, index) => {
				codeArr.push({ value: pv.id, label: pv.pv_code });

			});
	}

	{
		branch &&
			branch.branchList &&
			branch.branchList.map((branch) => {
				nameArr.push({ value: branch.id, label: branch.branch_name });

			});
	}
	// const setCodeValue = (e) => {
	// 	if (e.value > 0) {
	// 		setCode(e.label);
	// 	} else {
	// 		setCode("");
	// 	}
	// };
	const setNameValue = (e) => {
		if (e.value > 0) {
			setName(e.label);
		} else {
			setName("");
		}
	};

	const myfunCtion = () => {
		dispatch(fetchLedgerSupplierList({ searchString: "" }));
		setCode("")
		setName(""); 
	}

	const searchAction = () => {
		var search_str = "";
		if (codeValue != 0) {
			search_str += "&pv_code__icontains=" + codeValue;
		}

		if (nameValue != 0) {
			search_str += "&purchase_order__branch__branch_name__icontains=" + nameValue;
		}

		dispatch(
			fetchLedgerBraSearchList({
				offset: 0,
				limit: 15,
				searchString: search_str,
			}),
		);
	};

	return (
		<>
			<div className="bigcontainer">
				<div className="selecttabcontainer1">
					{/* <Select
						value={codeArr.filter(function (option) {
							return option.label === codeValue;
						})}
						placeholder="Code"
						className="selecttab"
						options={codeArr}
						onChange={setCodeValue}
					/> */}
					<Select
						value={nameArr.filter(function (option) {
							return option.label === nameValue;
						})}
						placeholder="Branch Name"
						className="selecttab"
						options={nameArr}
						onChange={setNameValue}
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
						{/* <Link to="voucher">
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
						</Link> */}
					</div>
					<div className="col-md-1">
						{/* <Excel /> */}
					</div>
					<div className="col-md-1">
						{/* <Pdf /> */}
					</div>
					<div className="col-md-1"></div>
				</div>
			</div>
		</>
	);
}
