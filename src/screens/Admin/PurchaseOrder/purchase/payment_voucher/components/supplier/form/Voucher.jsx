import axios from "axios";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";
import LoadingOverlay from 'react-loading-overlay';
import { useReactToPrint } from "react-to-print";
import Config from "../../../../../../constants/Config";
import { authSelector } from "../../../../../../reducers/auth/AuthSlice";
import { pvSelector } from "../../../../../../reducers/purchase/pv/PvSlice";
import "./paymen_voucher.css";
import { Link } from "react-router-dom";
function Voucher() {
	var a = ['', 'ONE ', 'TWO ', 'THREE ', 'FOUR ', 'FIVE ', 'SIX ', 'SEVEN ', 'EIGHT ', 'NINE ', 'TEN ', 'ELEVEB ', 'TWELVE ', 'THIRTEEN ', 'FOURTEEN ', 'FIFTEEN', 'SIXTEEN ', 'SEVENTEEN ', 'EIGHTEEN ', 'NINETEEN '];
	var b = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
	var n;
	const pv = useSelector(pvSelector);
	const auth = useSelector(authSelector);
	const [isLoading, setisLoading] = useState(false)
	const [purchaseVoucher, setPurchaseVoucher] = useState([]);
	const [words, setWord] = useState("");

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: "Storedata",
		onafterprint: () => alert("Print success"),
	});

	const exportPDF = () => {
		setisLoading(false)
		html2canvas(document.querySelector("#capture")).then(canvas => {
			// document.body.appendChild(canvas);  // if you want see your screenshot in body.
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF('l', 'px', 'letter');
			var width = pdf.internal.pageSize.getWidth();
			var height = pdf.internal.pageSize.getHeight();
			pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
			pdf.save("download.pdf");
		});

	};
	useEffect(() => { 
		(async () => {
			const res = await axios.get(
				Config.apiUrl + "purchase/pv/retrieve/" + pv.selectedRow,

				{
					headers: {
						Authorization: `Token ${auth.token}`,
					},
				},
			);
			setPurchaseVoucher(res.data);
			inWords(Math.round(res.data.payment_amount));
		})();
	}, []);

	const inWords = (num) => {
		if ((num = num.toString()).length > 9) return 'overflow';
		n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
		if (!n) return; var str = '';
		str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'CRORE ' : '';
		str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'LAKH ' : '';
		str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'THOUSAND ' : '';
		str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'HUNDRED ' : '';
		str += (n[5] != 0) ? ((str != '') ? 'AND ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
		setWord(str);
	}

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
					<div className="col-md-8" >
					</div>
					
					<div className="col-md-2">
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
				<div ref={componentRef} className="Vouch_print_main" >
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
						text='downloading...'>
						<div className="mainContainer" style={{ marginLeft: "1rem" }} id="capture">
							<div className="row" style={{marginTop:"3rem" }}>
								<div className="col-11">
									<h1 style={{ textAlign: "center", color: "#23395d", fontWeight: "bold" }}>प्रतिभामंडल न्यास</h1>
									<h6

										style={{ borderBottom: "none", color: "#23395d", textAlign: "center", width: "100%", fontWeight: "bold" }}
									>
										प्रतिभास्थली ज्ञानोदय विद्यापीठ परिसर , तिलवाराघाट , जबलपुर (
										म. प्र. )-482003
									</h6>
								</div>
							</div>
							<div style={{ marginTop: "1%" }}>
								<div className="row">
									<div className="col-3">
										<div className="form-group">
											<h6
												style={{ borderBottom: "none", color: "#23395d", textAlign: "center" }}
											>
												वाउचर क्रमांक : {purchaseVoucher && "PO" + purchaseVoucher.id}

											</h6>
										</div>
									</div>
									<div className="col-5">
										<div className="form-group">
											<h5
												style={{
													borderRadius: "10px",
													border: "solid 2px #23395d",
													textAlign: "center",
													paddingBottom: "5px",
													color: "#23395d",
													fontWeight: "bold",
												}}
											>
												भुगतान वाउचर
											</h5> 
										</div>
									</div>
									<div className="col-4">
										<div className="dotts-main" style={{ marginTop: "0.50rem", color: "#23395d" }}>
											<div className="withou-dotts_class_3" style={{ color: "#23395d", }}>
												दिनांक : </div><div className="dotts-class_4"> <h6>
													{purchaseVoucher && purchaseVoucher.bill_date && moment(purchaseVoucher.bill_date).format("DD-MM-YYYY")}
												</h6>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="vouprint_0" style={{ width: "100%", color: "#23395d" }}>
								<div className="vouprint_0_1">
									मुख्य खाता : {purchaseVoucher && purchaseVoucher.tally_data?.tally_name}
								</div>
								<div className="vouprintsss_2">
									<div className="vouprint_3">
										<div className="row" style={{ width: "100%", color: "#23395d" }} >
											<div className="col-12">
												<div className="form-group">
													<div className="dotts-main">
														<div className="withou-dotts_class_5" style={{ color: "#23395d", }}>
															प्रति , </div><div className="dotts-class_5">
															<h6 > &nbsp;&nbsp;{purchaseVoucher &&
																purchaseVoucher.purchase_order &&
																purchaseVoucher?.purchase_order?.supplier?.supplier_name}

															</h6>
														</div>
													</div>
												</div>
											</div>
											<div className="col-7">
												<div className="form-group">
													<div className="dotts-main">
														<div className="withou-dotts_class_1" style={{ color: "#23395d", }}>
															बिल क्रमांक </div><div className="dotts-class_2"> <h6 > {purchaseVoucher && purchaseVoucher.invoice_no} </h6>
														</div>
													</div>
												</div>
											</div>
											<div className="col-5">
												<div className="form-group">
													<div className="dotts-main">
														<div className="withou-dotts_class_3" style={{ color: "#23395d", }}>
															दिनांक : </div><div className="dotts-class_4"><h6 >
																
																{purchaseVoucher && purchaseVoucher.invoice_date && moment(purchaseVoucher.invoice_date).format("DD-MM-YYYY")}
															</h6>
														</div>
													</div>
												</div>
											</div>
											<div className="col-12">
												<div className="form-group">
													<div className="dotts-main">
														<div className="withou-dotts_class_v" style={{ color: "#23395d", }}>
															विवरण : </div><div className="dotts-class_v">
															<h6> {purchaseVoucher && purchaseVoucher.remark}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (&nbsp;{purchaseVoucher && purchaseVoucher.tally_data?.branch?.department_name}&nbsp;)</h6>
														</div>
													</div>
												</div>
											</div>
											<div className="col-12">
												<div className="form-group">
													<div className="dotts-main">
														<div className="withou-dotts_class" style={{ color: "#23395d", }}>
															शब्दों में (रू.) : </div><div className="dotts-class">
															<h6 style={{ marginTop: "0.20rem", padding: "5px", color: "#23395d" }}> {words} RUPEES ONLY </h6>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="vouprint_4">
										<div className="col-12">
											<label style={{
												background: "#D3D3D3", color: "#23395d",
												width: "100%", height: "100%", textAlign: "center"
											}}><spen style={{ fontWeight: "bold", color: "#23395d", }}> राशि  (रू.) </spen></label>
										</div>
										<h6 style={{ textAlign: "center",fontWeight: "bold", color: "#23395d", marginTop: "4rem" }}> {purchaseVoucher && purchaseVoucher.payment_amount}</h6>
									</div>
								</div>
							</div>
							<div className="row_1"  >
								<div className="col-3_0">
									<div className="form-group" style={{ color: "#23395d", }}>
										भुगतान
										माध्यम :  {purchaseVoucher && purchaseVoucher.payment_mode && purchaseVoucher.payment_mode?.payment_type}
									</div>
								</div>
								<div className="col-3_0_1_0">
									<div className="form-group" style={{ color: "#23395d", }}>

										ट्रांजेक्शन नं : {purchaseVoucher && purchaseVoucher.transaction_no}
									</div>
								</div>
								<div className="col-3_0_1">
									<div className="form-group" style={{ color: "#23395d", }}>

										दिनांक : {purchaseVoucher && purchaseVoucher.bill_date && moment(purchaseVoucher.bill_date).format("DD-MM-YYYY")}
									</div>
								</div>
								<div className="col-3_0_2" >
									<div className="form-group" style={{ fontWeight: "bold", color: "#23395d", }}>
										<spen style={{ fontWeight: "bold", color: "#23395d", }}> कुल योग : </spen >	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{purchaseVoucher && purchaseVoucher.payment_amount}
									</div>
								</div>
							</div>
							<br />
							<br />
							<br />
							<div className="vouprint_1_2" style={{ marginLeft: "8rem", color: "#23395d", fontWeight: "bold" }}>
								<div className="vouprint_5">
									अधिकृत
								</div>
								<div className="vouprint_5">
									स्वीकृतकर्ता
								</div>
								<div className="vouprint_5" >
									प्रदानकर्ता
								</div>
								<div className="vouprint_5">
									प्राप्तकर्ता
								</div>
							</div>
						</div>
					</LoadingOverlay>
				</div>
			</div>
		</>

	);
}

export default Voucher;



















