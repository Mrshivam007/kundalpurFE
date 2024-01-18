import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import "../../../../../assets/styles/Form.css";

import { toast, ToastContainer } from "react-toastify";
import { fetchPvBranchList, pvSelector } from "../../../../../reducers/pv/PvSlice";

import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
// import { authSelector } from "../../../../../../reducers/auth/AuthSlice";
import { poSelector } from "../../../../../reducers/po/PoSlice";

import {
	clearFlag,
	createPv,
	fetchPvBranchSearchList,
} from "../../../../../reducers/pv/PvSlice";

const Schema = Yup.object().shape({
	supplier_name: Yup.string().required("Required"),
});

export default function Create_Payment() {
	const dispatch = useDispatch();

	/* Selectors */
	const auth = useSelector(authSelector);
	const po = useSelector(poSelector);
	const pv = useSelector(pvSelector);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const create = (data) => {
		dispatch(createPv(data));

		if (pv.error === false) {
			toast.success("Successfully Created");
			clearFlag();
		    dispatch(fetchPvBranchList());
			dispatch(fetchPvBranchSearchList({ search_str: "" }));
		}
		if (pv.error === true) {
			toast("Unable to create.");
			clearFlag();
		}
	};
	return (
		<>
			<Button variant="primary" onClick={handleShow} className="addbtn">
				+Add
			</Button>
			<Modal show={show} onHide={handleClose} animation={false}>
				<Formik
					initialValues={{
						supplier_name: 1,
						tally_data: "1",
						bill_no: "1",
						payment_amount: 3333,
						bill_date: "2022-07-07",
						payment_type: 1,
						transaction_no: "1",
						description: "FFRTTRR",
						purchase_order: 2,
						remark: "ok",
						created_by: auth && auth.user && auth.user.user_id,
					}}
					validationSchema={Schema}
					onSubmit={(values) => create(values)}
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
									<Modal.Title>Add New Payment Voucher</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<div className="row">
										<div className="col-md-6">
											<div class="form-group">
												<label>Purchase Id</label>
												<select
													class="form-control"
													name="purchase_order"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.purchase_order}
													error={errors.purchase_order}
												></select>
											</div>
										</div>
										<div className="col-md-6">
											<div class="form-group">
												<label>Suplier Name</label>
												<input
													type="text"
													class="form-control"
													name="supplier_name"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.supplier_name}
													error={errors.supplier_name}
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div class="form-group">
												<label>Tally data</label>
												<input
													type="text"
													class="form-control"
													name="tally_data"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.tally_data}
													error={errors.tally_data}
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div class="form-group">
												<label>Bill No</label>
												<input
													type="text"
													class="form-control"
													name="bill_no"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.bill_no}
													error={errors.bill_no}
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div class="form-group">
												<label>Payment amount</label>
												<input
													type="text"
													class="form-control"
													name="bill_no"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.payment_amount}
													error={errors.payment_amount}
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div class="form-group">
												<label>Billed Date</label>
												<input
													type="date"
													class="form-control"
													name="bill_date"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.bill_date}
													error={errors.bill_date}
												/>
											</div>
										</div>
										<div className="col-md-6">
											<div class="form-group">
												<label>Payment type</label>
												<select class="form-control">
													<option value="volvo">Select</option>
													<option value="saab">upi</option>
													<option value="audi">phonepy</option>
													<option value="fiat">gpy</option>
												</select>
											</div>
										</div>
										<div className="col-md-6">
											<div class="form-group">
												<label>Transaction Number*</label>
												<input
													type="text"
													class="form-control"
													name="transaction_no"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.transaction_no}
													error={errors.transaction_no}
												/>
											</div>
										</div>
										<div className="col-md-10">
											<div class="form-group">
												<label>Description</label>
												<textarea
													rows="2"
													cols="60"
													class="form-control"
													name="description"
													onChange={handleChange}
													onBlur={handleBlur}
													value={values.description}
													error={errors.description}
												/>
											</div>
										</div>
									</div>
								</Modal.Body>
								<Modal.Footer>
									<div className="Btn">
										<Button
											variant="secondary"
											onClick={handleClose}
											className="B1"
										>
											
											Cancel
										</Button>
										<Button
										
											onClick={handleSubmit}
											className="B2"
										>
											Submit
										</Button>
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
