// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setTitle } from "../../../reducers/app/AppSlice";
import {fetchItemList} from "../../reducers/item/ItemSlice";
import { fetchSupplierList } from "../../reducers/supplier/SupplierSlice";
// import { fetchPaymentmodeList } from "../../../reducers/master/paymentmode/PaymentmodeSlice";
// import { fetchTallyList } from "../../../reducers/master/tally/TallySlice";
// import { fetchStateList } from "../../../reducers/master/state/StateSlice";
// import { fetchCityList } from "../../../reducers/master/city/CitySlice";
import { fetchPurchaseBranchDropList, fetchPurchaseSupplierDropList} from "../../reducers/purchase_order/PurchaseOrderSlice";

import { toast, ToastContainer } from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';
import "./Purchase.css";
import Invoice_po_order from "../purchase_order/screens/Invoice_po_order";
// import { fetchBranchList } from "../../../reducers/master/branch/BranchSlice";
import Po_Order_Py from "../payment_voucher/screens/Po_Order_Py";
import Po_Order_Lager from "../ledger/screens/Po_Order_Lager";
// import { fetchDepartmentList } from "../../../reducers/master/department/DepartmentSlice";
import Re_po_order from "../purchase_return/screens/Re_po_order";
function Purchase({setopendashboard}) {
	const [index, setIndex] = useState(1);
	const po = useSelector((state) => state.purchaseOrder);
	const dispatch = useDispatch();
	useEffect(() => {
		toast.dismiss()
		dispatch(setTitle("Purchase"));
		dispatch(fetchItemList());
		dispatch(fetchSupplierList());
		dispatch(fetchPaymentmodeList());
		dispatch(fetchTallyList());
		dispatch(fetchStateList());
		dispatch(fetchCityList());
		dispatch(fetchBranchList());
		dispatch(fetchDepartmentList()); 
		dispatch(fetchPurchaseSupplierDropList()); 
		dispatch(fetchPurchaseBranchDropList());
				
	}, []);
	
	useEffect(() => {
		setopendashboard(true);
	  }, []);


	return (
		<>
			<LoadingOverlay
				// active={po.inAction}
				spinner
				styles={{
					overlay: (base) => ({
						...base,
						background: 'rgb(240,240,240,0.6)',
						color: "#704B4B",
					}),
					spinner: (base) => ({
						...base,
						width: '50px',
						'& svg circle': {
							stroke: '#704B4B'
						}
					})
				}}
				text='Loading your content...'
			>
				  
				<div className="mainContainer">
					<ul class="nav nav-pills" id="navpillss_1">
						<li style={{ marginLeft: "1%" }}>
							<a
								className={`${index === 1 ? 'active-tab' : 'is-hidden'}`}
								href="#purchase_po"
								data-toggle="tab"
								onClick={() => {
									setIndex(1)
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									class="bi bi-exclude"
									viewBox="0 0 16 16"

								>

									<path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm12 2H5a1 1 0 0 0-1 1v7h7a1 1 0 0 0 1-1V4z" />
								</svg>
								&nbsp;Purchase Order
							</a>
						</li>
						<li>
							<a href="#payment" data-toggle="tab"
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
								&nbsp;Payment
							</a>
						</li>
						<li>
							<a href="#ledger" data-toggle="tab"
								className={`${index === 3 ? 'active-tab' : 'is-hidden'}`}
								onClick={() => {
									setIndex(3)
								}}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									class="bi bi-wallet2"
									viewBox="0 0 16 16"

								>
									<path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
								</svg>
								&nbsp;Ledger
							</a>
						</li>

						<li>
							<a href="#return " data-toggle="tab"
								className={`${index === 5 ? 'active-tab' : 'is-hidden'}`}
								onClick={() => {
									setIndex(5)
								}}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									fill="currentColor"
									class="bi bi-wallet2"
									viewBox="0 0 16 16"

								>
									<path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
								</svg>
								&nbsp;Purchase Return
							</a>
						</li>
					</ul>
					<div class="tab-content clearfix">
						<div class="tab-pane  active" id="purchase_po">
							<hr />
							<Invoice_po_order />
						</div>
						<div class="tab-pane" id="payment" >
							<hr />
							<Po_Order_Py />
						</div>
						<div class="tab-pane" id="ledger">
							<hr />
							<Po_Order_Lager />
						</div>
						<div class="tab-pane" id="return">
							<hr />
							<Re_po_order />
						</div>
					</div>
				</div>
			</LoadingOverlay>
		</>
	);
}

export default Purchase;
