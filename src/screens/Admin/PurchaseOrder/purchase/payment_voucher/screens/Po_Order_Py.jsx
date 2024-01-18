// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
// import { setTitle } from "../../../../reducers/app/AppSlice";
import {fetchPvBranchDropList,fetchPvBranchSearchList, fetchPvSupplierDropList,fetchPvSupplierSearchList } from "../../../reducers/pv/PvSlice";
import Payment_Branch from "./Payment_Branch";
import Payment_supplier from "./Payment_supplier";
function Po_Order_Py() {
	const [index, setIndex] = useState(1);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTitle("Invoice"));
		dispatch(fetchPvSupplierDropList());
		dispatch(fetchPvBranchDropList());
		dispatch(fetchPvSupplierSearchList({search_str:""}));
		dispatch(fetchPvBranchSearchList({search_str:""}));
	}, []);
	return (
		<>
			{/*    */}
			<div className="mainContainer">
				<ul class="nav nav-pills" id="navpillss_1">
					<li style={{ marginLeft: "1%" }}>
						<a
							className={`${index === 1 ? 'active-tab' : 'is-hidden'}`}
							href="#paysup"
							data-toggle="tab"
							onClick={() => {
								setIndex(1)
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
								<path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
							</svg>
							&nbsp;Supplier
						</a>
					</li>
					<li>
						<a href="#paybra" data-toggle="tab"
							className={`${index === 2 ? 'active-tab' : 'is-hidden'}`}
							onClick={() => {
								setIndex(2)
							}}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								class="bi bi-credit-card-2-front-fill"
								viewBox="0 0 16 16"

							>
								<path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
							</svg>
							&nbsp;Branch
						</a>
					</li>
				</ul>
				<div class="tab-content clearfix">
					<div class="tab-pane  active" id="paysup">
						<hr />
						<Payment_supplier/>
					
					</div>
					<div class="tab-pane" id="paybra" >
						<hr />
						<Payment_Branch />
					</div>
				</div>
			</div>
		</>
	);
}

export default Po_Order_Py;
