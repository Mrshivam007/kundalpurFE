import { Formik } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import Config from "../../../../../constants/Config";
import { countrySelector } from "../../../../../reducers/master/country/CountrySlice";

import "../../../../../assets/styles/Form.css";

import { authSelector } from "../../../../../reducers/auth/AuthSlice";
import {
	fetchSupplierSearchList,
	supplierSelector,
	updateSupplier, 
} from "../../../../../reducers/master/supplier/SupplierSlice";
import { citySelector } from "../../../../../reducers/master/city/CitySlice";
import { stateSelector } from "../../../../../reducers/master/state/StateSlice";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sutypeSelector } from "../../../../../reducers/master/supplier_type/SutypeSlice";

const Schema = Yup.object().shape({
	supplier_name: Yup.string().required("Required"),
});
 
export const Update_Supplier = forwardRef((props, ref) => {
	const dispatch = useDispatch();
	const sutype = useSelector(sutypeSelector);
	const cntry = useSelector(countrySelector);
	const city = useSelector(citySelector);
	const [progress, setProgress] = useState(0);
	const [show, setShow] = useState(true);
	useImperativeHandle(ref, () => ({
		showPv() {
		  setShow(true);
		},
	  }));
	  const handleClose = () => {
		setShow(false); 
		setProgress(0); 
	  };

	  const handleShow = () => setShow(true);

	  const CompleteFormStep = (data) => {
		setProgress((cur) => cur + 1);
	  };

	  const PrevStep = (data) => {
		setProgress((cur) => cur - 1);
	  };
	const current = new Date();
	const date = `${current.getDate()}/${current.getMonth() + 1
		}/${current.getFullYear()}`;

	const auth = useSelector(authSelector);
	const supplier = useSelector(supplierSelector);
	const state = useSelector(stateSelector);;

	const update = (data) => {
		dispatch(updateSupplier({ data, toast })).then(() => {
			dispatch(fetchSupplierSearchList({ search_str: "" }))
		}
		);
		setShow(false);
		setProgress(0);
	};
	return (
		<>
			
			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<div className="title-subtitle">
						<Modal.Title> Update Supplier</Modal.Title>
						<div className="date">{date}</div>

					</div>
				</Modal.Header>
				<Formik
					initialValues={{
						id: props.supplier.id,
						supplier_code: props.supplier.supplier_code,
						supplier_name: props.supplier.supplier_name,
						supplier_type: props.supplier.supplier_type?.id,
						email: props.supplier.email,
						contact_no: props.supplier.contact_no,
						gstin: props.supplier.gstin,
						place_of_supply: props.supplier.place_of_supply.id,
						title: props.supplier.title,
						billing_name: props.supplier.billing_name,
						street_h_n: props.supplier.street_h_n,
						city: props.supplier.city.id,
						// city: props.supplier.city.state.id,
						postalcode: props.supplier.postalcode,
						country: props.supplier.country.id,
						remark: props.supplier.remark,
						description: props.supplier.description,
						suppliers_product: props.supplier.suppliers_product,
						created_by: auth.user.user_id,

					}}
					validationSchema={Schema}
					onSubmit={(values) => update(values)}
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
								{progress === 0 && (
									<section>

										<Modal.Body id="modalbd">
											<div className="nav-tab">
												<ul class="nav">
													<li class="nav-item">
														<p
															aria-current="page"
															href="#"
															style={{ color: "#07CD9E" }}
														>
															SupplierDetails
														</p>
													</li>
													<li class="nav-item">
														<p href="#" style={{ color: "black" }}>
															Address
														</p>
													</li>
													<li class="nav-item">
														<p href="#" style={{ color: "black" }}>
															ProductDetails
														</p>
													</li>
												</ul>
												<hr />
											</div>
											<div className="row">
												<div className="col-md-6">
													<div class="form-group">
														<label>Title *</label>
														<select
															name="title"
															placeholder="title"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.title}
															error={errors.title}
															class="form-control"
														>
															{Config.title_choice.map((choice, index) => (
																<option value={choice}>{choice}</option>
															))}
														</select>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Supplier Code</label>
														<input
															type="text"
															name="supplier_code"
															class="form-control"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.supplier_code}
															error={errors.supplier_code}
															readOnly
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Supplier Type *</label>

														<select
															name="supplier_type"
															placeholder="Supplier Type "
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.supplier_type}
															error={errors.supplier_type}
															class="form-control"
														>
															<option values="">Select Supplier Type</option>
															{sutype &&
																sutype.sutypeList &&
																sutype.sutypeList.map((sutype, _index) => (
																	<option id="{index}" value={sutype.id}>
																		{sutype.supplier_type}
																	</option>
																))}
														</select>
														{touched.supplier_type && errors.supplier_type && (
															<p className='text-danger text-sm'>{errors.supplier_type}</p>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Supplier Name *</label>
														<input
															type="text"
															name="supplier_name"
															class="form-control"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.supplier_name}
															error={errors.supplier_name}
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>GST No</label>
														<input
															type="text"
															class="form-control"
															name="gstin"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.gstin}
															error={errors.gstin}
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Contact No</label>
														<input
															type="text"
															class="form-control"
															name="contact_no"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.contact_no}
															error={errors.contact_no}
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Email Id</label>
														<input
															type="text"
															class="form-control"
															name="email"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.email}
															error={errors.email}
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Place of Supply *</label>

														<select
															name="place_of_supply"
															placeholder="Place of city"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.place_of_supply}
															error={errors.place_of_supply}
															class="form-control"
														>
															{state &&
																state.stateList &&
																state.stateList.map((state, _index) => (
																	<option id="{index}" value={state.id}>
																		{state.state_name}
																	</option>
																))}
														</select>
													</div>
												</div>

												{/* <div className="col-md-6">
													<div class="form-group">
														<label>Supplier Type *</label>
														<select
															name="supplier_type"
															placeholder="supplier type"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.supplier_type}
															error={errors.supplier_type}
															class="form-control"
														>
															{Config.supplier_type.map((type, index) => (
																<option value={type}>{type}</option>
															))}
														</select>
													</div>
												</div> */}
												<div className="col-md-6">
													<div class="form-group">
														<label>Created By</label>

														<input
															type="text"
															class="form-control"
															readonly
															value={auth.user.first_name}
														/>
													</div>
												</div>
											</div>
										</Modal.Body>

										<Modal.Footer>
											<div className="Btn">
												<Button
													variant="secondary"
													className="B1"
													onClick={handleClose}
												>
													Cancel
												</Button>
												<Button
													variant="primary"
													className="B2"
													onClick={() => CompleteFormStep(values)}
												>
													Next
												</Button>
											</div>
										</Modal.Footer>
									</section>
								)}

								{progress === 1 && (
									<section>
										<Modal.Body>
											<div className="nav-tab">
												<ul class="nav">
													<li class="nav-item">
														<p
															aria-current="page"
															href="#"
															style={{ color: "black" }}
														>
															SupplierDetails
														</p>
													</li>
													<li class="nav-item">
														<p href="#" style={{ color: "#07CD9E" }}>
															Address
														</p>
													</li>
													<li class="nav-item">
														<p href="#" style={{ color: "black" }}>
															Product Details
														</p>
													</li>
												</ul>
												<hr />
											</div>
											<div className="row" >
												<div className="col-md-1" style={{ marginLeft: "1rem" }}>
													<input type="checkbox" />
												</div>
												<div className="col-md-6" style={{ marginLeft: "-3rem" }}>
												Same as Supplier
												</div>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div class="form-group">
														<label>Billing name *</label>
														<input
															type="text"
															class="form-control"
															name="billing_name"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.billing_name}
															error={errors.billing_name}
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>House No. </label>
														<input
															type="text"
															name="street_h_n"
															class="form-control"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.street_h_n}
															error={errors.street_h_n}
														/>
													</div>
												</div>

												<div className="col-md-6">
													<div class="form-group">
														<label>Country *</label>
														<select
															name="country"
															placeholder="country"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.country}
															error={errors.country}
															class="form-control"
														>
															{cntry &&
																cntry.countrySearchList &&
																cntry.countrySearchList.results &&
																cntry.countrySearchList.results.map(
																	(cntry, _index) => (
																		<option id="{index}" value={cntry.id}>
																			{cntry.country}
																		</option>
																	),
																)}
														</select>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>City *</label>
														<select
															name="city"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.city}
															error={errors.city}
															class="form-control"
														>
															<option values="">Select city</option>
															{city &&
																city.cityList &&
																city.cityList.map((city, _index) => (
																	<option id="{index}" value={city.id}>
																		{city.city_name}
																	</option>
																))}
														</select>
														{touched.city && errors.city && (
															<p className='text-danger text-sm'>{errors.city}</p>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>State *</label>
														<select
															disabled
															name="city"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.city}
															error={errors.city}
															class="form-control"
														>
															{city &&
																city.cityList &&
																city.cityList.map((city, _index) => (
																	<option id="{index}" value={city.id}>
																		{city.state.state_name}
																	</option>
																))}
														</select>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Postal Code</label>
														<input
															type="text"
															class="form-control"
															name="postalcode"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.postalcode}
															error={errors.postalcode}
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Description</label>
														<input
															type="text"
															class="form-control"
															name="description"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.description}
															error={errors.description}
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Remark</label>
														<input
															type="text"
															class="form-control"
															name="remark"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.remark}
															error={errors.remark}
														/>
													</div>
												</div>
											</div>
										</Modal.Body>
										<Modal.Footer>
											<div className="Btn">
												<Button
													variant="secondary"
													className="B1"
													onClick={handleClose}
												>
													Back
												</Button>
												<Button
													className="B2"
													type="button"
													onClick={() => CompleteFormStep(values)}
												>
													Next
												</Button>
											</div>
										</Modal.Footer>
									</section>
								)}
								{/* {renderButton()} */}

								{progress === 2 && (
									<section>
										<Modal.Body>
											<div className="nav-tab">
												<ul class="nav">
													<li class="nav-item">
														<p
															aria-current="page"
															href="#"
															style={{ color: "black" }}
														>
															Supplier Details
														</p>
													</li>
													<li class="nav-item">
														<p href="#" style={{ color: "black" }}>
															Address
														</p>
													</li>
													<li class="nav-item">
														<p href="#" style={{ color: "#07CD9E" }}>
															Product Details
														</p>
													</li>
												</ul>
												<hr />
											</div>
											<div className="row">
												<div className="col-md-6">
													<div class="form-group">
														<label>Product Name *</label>
														<input
															type="text"
															name="suppliers_product"
															class="form-control"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.suppliers_product}
															error={errors.suppliers_product}
														/>
													</div>
												</div>
											</div>
										</Modal.Body>
										<Modal.Footer>
											<div className="Btn">
												<Button
													variant="secondary"
													className="B1"
													onClick={PrevStep}
												>
													Back
												</Button>
												<Button
													variant="primary"
													className="B2"
													onClick={handleSubmit}
												>
													Submit
												</Button>
											</div>
										</Modal.Footer>
									</section>
								)}
							</form>
						</>
					)}
				</Formik>
			</Modal>
		</>
	);
});
