import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
// import "../../../../../../assets/styles/Table.css";
import moment from "moment";
export const View_PayVo = ({ ...props }) => {
	// console.log("--=--fggh", props);
	const [show, setShow] = useState(false);
	const [index, setIndex] = useState(1);
	const handleShow = () => setShow(true);
	const handleClose = () => {
		setShow(false);
		setIndex(1)
	}
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				fill="currentColor"
				class="bi bi-eye-fill"
				viewBox="0 0 16 16"
				onClick={handleShow}
			>
				<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
				<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
			</svg>
			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Payment Voucher Details</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="mainContainer">
						<ul class="nav nav-pills" id="navpillss_1">
							<li style={{ marginLeft: "1%" }}>
								<a
									href="#paB"
									data-toggle="tab"
									className={`${index === 1 ? 'active-tab' : 'is-hidden'}`}
									onClick={() => {
										setIndex(1)
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										class="bi bi-file-earmark-zip-fill"
										viewBox="0 0 16 16"
									>
										<path d="M5.5 9.438V8.5h1v.938a1 1 0 0 0 .03.243l.4 1.598-.93.62-.93-.62.4-1.598a1 1 0 0 0 .03-.243z" />
										<path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-4-.5V2h-1V1H6v1h1v1H6v1h1v1H6v1h1v1h6.5V6h-1V5h1V4h-1V3h1zm0 4.5h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V8.5a1 1 0 0 1 1-1z" />
									</svg>
									&nbsp;Payment Details
								</a>
							</li>
							<li>
								<a href="#inB" data-toggle="tab"
									className={`${index === 2 ? 'active-tab' : 'is-hidden'}`}
									onClick={() => {
										setIndex(2)
									}}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										fill="currentColor"
										class="bi bi-person-fill"
										viewBox="0 0 16 16"
									>
										<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
									</svg>
									&nbsp;Invoice Details
								</a>
							</li>
						</ul>
						<div class="tab-content clearfix">
							<div class="tab-pane active" id="paB">
								<hr />
								<br />
								<div className="cont">
									{/* <p>{JSON.stringify(props)}</p> */}
									<h6>
										Payment Code :- <span>{props?.pv?.pv_code}</span>
									</h6>
									<h6>
										PO Code  :- <span>{props?.pv?.purchase_order?.po_code}</span>
									</h6>
									<h6>
										Branch :- <span>{props?.pv?.purchase_order?.branch?.branch_name}</span>
									</h6>
									<h6>Department Name :- <span>{props?.pv?.tally_data?.branch?.department_name}</span></h6>
									<h6>Branch Choice :- <span>{props?.pv?.tally_data?.branch_choice}</span></h6>
									<h6>Tally Name :- <span>{props?.pv?.tally_data?.tally_name}</span></h6>
									<h6>
										Payment Date :- <span>{moment(props?.pv?.created_at).format("DD-MM-YYYY")}</span>
									</h6>
									<h6>Payment Mode :- <span>{props?.pv?.payment_mode?.payment_type}</span></h6>

									<h6>
										Payment/Voucher Date :- <span>{props?.pv?.bill_date}</span>
									</h6>	<h6>
										Payment Amount :- <span>{props?.pv?.payment_amount} </span>
									</h6>
								</div>
							</div>
							<div class="tab-pane" id="inB">
								<hr />
								<br />
								<div className="row">
									<div className="col-md-7">
										<h4> Invoice Details</h4>
									</div>
									<div className="col-md-5">
										<h4>Transport  Details</h4>
									</div>
								</div>
								<hr />
								<div className="row">

									<div className="col-md-7">
										<div className="cont">

											<h6>Invoice Number :- <span>{props?.pv?.invoice_no}</span></h6>
											<h6>Invoice Date :- <span>{props?.pv?.invoice_date}</span></h6>
											<h6>Invoice Amount :- <span>{props?.pv?.invoice_amount}</span></h6>
											<h6> Invoice Remark :- <span>{props?.pv?.invoice_remark}</span></h6>
											<h6>Invoice File :- </h6>
											<img
												style={{ width: "70%", height: "70%" }}
												src={props?.pv?.invoice_file}
											/>
										</div>
									</div>
									<div className="col-md-5"   >

										<h6>Transport Name :- <span>{props?.pv?.transport?.transporter_name}</span></h6>
										<h6> Contact Number :- <span>{props?.pv?.transport?.contact_no}</span></h6>
										<h6>Frieght :- <span>{props?.pv?.frieght}</span></h6>
										<h6> Dispatch Date :- <span>{props?.pv?.dispatch_date}</span></h6>
										<h6>Delivery Date :- <span>{props?.pv?.delivery_date}</span></h6>
										<h6> Consignment Number. :- <span>{props?.pv?.consignment_no}</span></h6>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
