import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import { useReactToPrint } from "react-to-print";
import Config from "../../../../../../constants/Config";
import moment from "moment";
import logo from "../../../../../../assets/images/logo.png";
import LoadingOverlay from 'react-loading-overlay';
import { purchaseOrderSelector } from "../../../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";
import "./Print.css";
import { Link } from "react-router-dom";

function PO_Print() {
	const po = useSelector(purchaseOrderSelector);
	const [purchaseOrder, setPurchaseOrder] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: "Storedata",
		onafterprint: () => alert("Print success"),
	});

	const exportPDF = () => {

		setisLoading(true)
		html2canvas(document.querySelector("#capture")).then(canvas => {
			// document.body.appendChild(canvas);  // if you want see your screenshot in body.
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('p', 'px', 'a4');
			var width = pdf.internal.pageSize.getWidth();
			var height = pdf.internal.pageSize.getHeight();
			pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
			pdf.save("download.pdf");
			setisLoading(false)
		});

	};


	useEffect(() => {
		(async () => {
			const auth = localStorage.getItem("token");
			const purchaseOrder = await axios.get(
				Config.apiUrl + "purchase/po/retrieve/" + po.selectedRow,
				{
					headers: {
						Authorization: `Token ${auth}`,
					},
				},
			);

			setPurchaseOrder(purchaseOrder.data);
		})();
	}, []);
	return (
		<>
			<div className="mainContainer">
				<div className="row">
					<div className="col-md-2" >
						<Link to="/purchase">
							<h5 style={{ color: "#613916", 
							fontWeight: "bold" }}><svg
							 xmlns="http://www.w3.org/2000/svg" 
							 width="30" height="30" 
							 fill="currentColor"
							  class="bi bi-skip-backward" 
						
							   viewBox="0 0 16 16">
								<path d="M.5 3.5A.5.5 0 0 1 1 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" />
							</svg> Back</h5>
						</Link>
					</div>
					<div className="col-md-6" >
					</div>
					<div className="col-md-2" style={{ marginLeft: "20%" }}>
						<h5
							onClick={handlePrint}

							style={{ color: "#613916", fontWeight: "bold" }}>
								<svg
								xmlns="http://www.w3.org/2000/svg"
								width="30"
								height="30"
								fill="currentColor"
							
								class="bi bi-printer-fill"
								viewBox="0 0 16 16"
							>
								<path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
								<path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
							</svg>
							Print
						</h5>
					</div>
					<div className="col-md-2" style={{ marginLeft: "5%" }}>
						<h5
							onClick={exportPDF}

							style={{ color: "#613916", fontWeight: "bold" }}>
							<svg xmlns="http://www.w3.org/2000/svg"
								width="25" height="25" fill="currentColor"
								class="bi bi-cloud-arrow-down-fill"
								color="black"
								viewBox="0 0 16 16">
								<path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z" />
							</svg>Download
						</h5>
					</div>
				</div>
				<div ref={componentRef} style={{ marginLeft: "5%", paddingRight: "30px", paddingTop: "30px", paddingBottom: "20px", paddingLeft: "35px" }} className="printcontainer" id="capture" >
					<LoadingOverlay
						active={isLoading}
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
						text='downloading...'
					>
						<div >
							<div className="print" >
								<div className="main_po">
									<div className="main_po_1">
										<div className="main_po_2">
											<h4 style={{ textAlign: "center" }}><u>Purchase Order</u></h4>
										</div>
										<div className="main_po_3">
											GSTIN :23AADTP8230A1Z1
										</div>
									</div>
									<div className="printheader">

										<img src={logo} alt="" />
										<p>
											<h4 align="center" style={{ fontWeight: "bold", marginRight: "8rem" }}>CHAL CHARKHA </h4>
											<h5 style={{ fontWeight: "bold" }}>
												Pratibhamandal Nyas, Pratibhasthali Gyanodaya Vidyapeeth Campus,
												Tilwaraghat, Jabalpur (M.P) 482003, Mobile No. - +91 8819088922
											</h5>
										</p>


									</div>

									<div className="printbody">
										<div className="printbody_1">
											<div className="printbody_2">

												<h6>To,</h6>
												<h6 style={{ marginLeft: "1rem" }}>
													<h6>Po code :- <spen>{purchaseOrder?.po_code}</spen></h6>
													M/s :-
													<span>
														{purchaseOrder &&
															purchaseOrder.supplier &&
															purchaseOrder.supplier?.supplier_name}
														{/* {purchaseOrder &&
											purchaseOrder.branch &&
											purchaseOrder.branch?.branch_name} */}
													</span>
												</h6>
												<h6 style={{ marginLeft: "1rem" }}> GSTIN : {purchaseOrder &&
													purchaseOrder.supplier &&
													purchaseOrder?.supplier?.gstin}</h6>
												<h6 style={{ marginLeft: "1rem" }}>
													{purchaseOrder &&
														purchaseOrder.supplier &&
														purchaseOrder.supplier.street_h_n}{" "}
													,
													{purchaseOrder &&
														purchaseOrder.supplier &&
														purchaseOrder.supplier.city}{" "}
													,
													{purchaseOrder &&
														purchaseOrder.supplier &&
														purchaseOrder.supplier.postalcode}
												</h6>

												<h6 style={{ marginLeft: "1rem" }}>
													Contact :
													{purchaseOrder &&
														purchaseOrder.supplier &&
														purchaseOrder.supplier.contact_no}
												</h6>
												<br />

											</div>
											<div className="printbody_3">
												<div className="printbody_4">
													<h7>Print Date : -26 MAY-22-01:40 PM</h7>

												</div>
												<div className="printbody_5">
													<h7>Contact Person</h7>
													<h7>SUVI JAIN</h7>
													<h7>8349788827</h7>
												</div>
												<div className="printbody_6">
													<h7>Prepared By</h7>
													<h7>SUVI JAIN</h7>
												</div>
											</div>
										</div>
									</div>
									<br />
									<section style={{ padding: "10px" }}>
										<h6>Dear Sir,</h6>
										<h6>KINDLY SUPPLY THE FOLLOWING ITEM AS PER ORDER SHEET</h6>
									</section>

									<table >
										<thead>
											<tr>
												<th>Sn.</th>
												<th>PO.Date</th>
												<th>D.D</th>
												{/* <th>ORD.No</th> */}
												<th>ITEM</th>
												<th>QTY</th>
												<th>UOM</th>
												<th>PRICE</th>
												<th>GST %</th>
												<th>Discount %</th>
												<th>AMOUNT</th>
												{/* <th>AMOUNT</th> */}
											</tr>
										</thead>
										<tbody>
											{purchaseOrder &&
												purchaseOrder.order_list &&
												purchaseOrder.order_list.map((item, index) => (
													<tr>
														<td>{index + 1}</td>
														<td>{moment(purchaseOrder.created_at).format("DD-MM-YYYY")}</td>
														<td>{moment(purchaseOrder.exp_arr_date).format("DD-MM-YYYY")}</td>
														{/* <td>{item.id}</td> */}
														<td>{item?.item_master?.item_name ? item.item_master?.item_name : item.finish_product?.fp_name}</td>
														<td>{item.quantity}</td>
														<td>{item.item_master?.item_unit?.unit ? item.item_master?.item_unit?.unit : item.finish_product?.fp_unit?.unit}</td>
														<td>{item.price}</td>
														<td>{item.item_master?.item_gst?.gst_percent ? item.item_master?.item_gst?.gst_percent : item.finish_product?.fp_gst?.gst_percent}</td>
														<td>{item.discount_percent}</td>
														<td>{item.total_amount}</td>
													</tr>
												))}
											<tr>
												<td colSpan={9} style={{ textAlign: "right", fontSize: "12px", fontWeight: "900", }}>
													Total
												</td>

												<td>{purchaseOrder?.grand_total}</td>

											</tr>
										</tbody>
									</table>


									<div className="terms">
										<h5>Terms and Conditions:</h5>
										<h6>
											*In case of delay in supply of goods, following T&C will be applicable*
										</h6>

										<ol style={{ marginLeft: "-3rem" }}>
											<li>
												Supplier has to ensure the supply best quatity of goods as per original samples otherwise goods not be accepted.
											</li>
											<li>Delivery time within D.O.D</li>
											<li>Need testing pass raw material..</li>
											<li>
												Quote our P.O number in your invoice, packing list, Challan & Other documents.
											</li>
											<li>
												This Order is subject to approval of pre-production samples.
											</li>
											<li>All disputes are subject to jabalpur jurisdiction.</li>
											<li>
												If the above T&C are not fulfilled then there will be penalty of 10% on undelivered goods.
											</li>
										</ol>
									</div>
									<br />	<br />
									<footer>
										<h6>SUPPLIER'S SIGNATURE </h6>
										<h6>CHAL CHARKHA AUTHORISED SIGNATURE </h6>
									</footer>
								</div>
							</div>
						</div>
					</LoadingOverlay>
				</div>
			</div>
		</>
	);
}

export default PO_Print;
