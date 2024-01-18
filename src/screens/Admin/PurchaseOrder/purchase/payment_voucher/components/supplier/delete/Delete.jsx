import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import "../../../../../../assets/styles/Form.css";
// import { AppSubmitInput } from "../../../../../../components/form/AppSubmitButton";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

// import { authSelector } from "../../../../../../reducers/auth/AuthSlice";
import {
	deletePv,
	fetchPvSupplierSearchList,
} from "../../../../../reducers/pv/PvSlice";

export const Delete = (props) => {
	const dispatch = useDispatch();

	/* Selectors */
	const auth = useSelector(authSelector);
	
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const Delete = (data) => {
		dispatch(deletePv({data,toast})).then(() =>
			dispatch(fetchPvSupplierSearchList({ search_str: "" }))
		);
		setShow(false);
	};

	return (
		<>
			{/*    */}
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16" onClick={handleShow}>
				<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
			</svg>
			<Modal show={show} onHide={handleClose} animation={false}>
				<Formik
					initialValues={{
						id: props?.pv?.id,
						// payment_type: props.pv.payment_type.id,
						// pv_code: props.pv.pv_code,
						// po_voucher: props.pv.po_voucher,
						// transaction_no: props.pv.transaction_no,
						// purchase_order: props.pv.purchase_order.id,
						// supplier: props?.pv?.purchase_order?.supplier?.id?props?.pv?.purchase_order?.supplier?.id:props?.pv?.purchase_order?.branch?.id,
						// tally_data: props.pv.tally_data.id,
						// bill_no: props.pv.bill_no,
						// bill_date: props.pv.bill_date,
						// remark: props.pv.remark,
						// created_by: auth.user.user_id,
					}}
					onSubmit={(values) => Delete(values)}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => (
						<>
							<form onSubmit={handleSubmit}>
								<Modal.Header closeButton>
									<Modal.Title className="deletetitle" > Delete this ?
										<p style={{ color: "black", marginLeft: "-5rem" }}>Are you sure want to delete this data?</p>
									</Modal.Title>
								</Modal.Header>
								<Modal.Body className="deletebody" >
									{/* <p>{JSON.stringify(props)}</p> */}
									<div className="row" style={{ borderLeft: "3px solid red", background: "#FDEFEC", borderRadius: "0px 5px 5px 0px", padding: "1rem" }}>
										<h5 style={{ fontWeight: "600", fontSize: "13px", lineHeight: "16px", color: "#DB0101" }}><svg xmlns="http://www.w3.org/2000/svg" color="yellow" width="16" height="16" fill="currentColor" class="bi bi-exclamation-diamond" viewBox="0 0 16 16">
											<path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
											<path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
										</svg>&nbsp;Warning</h5>
										<p>By delete this data you can't undo this action</p>
									</div>
								</Modal.Body>
								<br />
								<Modal.Footer>
									<div className="Btn">
										<Button variant="secondary" onClick={handleClose} className="B1">
											Cancel
										</Button>
										<AppSubmitInput
											className="deletebtn"
											type="submit"
											value="Delete"
										/>
									</div>
								</Modal.Footer>
							</form>
						</>
					)}
				</Formik>
			</Modal>
		</>
	);
}

