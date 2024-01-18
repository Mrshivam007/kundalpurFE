import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { Formik } from "formik";
import * as Yup from "yup";

import "../../../../../assets/styles/Form.css";

import { authSelector } from "../../../../../reducers/auth/AuthSlice";
import {
	createSupplier,
	fetchSupplierList,
	fetchSupplierSearchList,
	supplierSelector,
} from "../../../../../reducers/master/supplier/SupplierSlice";

import { countrySelector } from "../../../../../reducers/master/country/CountrySlice";
import { stateSelector } from "../../../../../reducers/master/state/StateSlice";

import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Config from "../../../../../constants/Config";
import { citySelector } from "../../../../../reducers/master/city/CitySlice";
import InputBox from "../../../../../assets/common/InputBox";
import { sutypeSelector } from "../../../../../reducers/master/supplier_type/SutypeSlice";

const Schema = Yup.object().shape({
	title: Yup.string().ensure().required('Please Select Title'),
	supplier_name: Yup.string().max(40, 'Exceeded character limit').required('Please Enter Supplier Name'),
	// email: Yup.string()
	// 	.test('email', 'Invalid email', (email) => {
	// 		const tester =
	// 			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	// 		if (!email) return false
	// 		if (!tester.test(email.toLowerCase())) return false
	// 		return true
	// 	})
	// 	.max(45, 'Invalid Email')
	// 	.required('Please enter your Email'),
	// gstin: Yup.string().required("Please enter the GST No").matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST No"),
	// contact_no: Yup.string().required("Please enter the contact number").matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Invalid contact number').min(10, "Exceeded character limit").max(10, "Exceeded character limit"),
	place_of_supply: Yup.string().ensure().required('Please Select Place of Supply'),
	supplier_type: Yup.string().ensure().required('Please Select Supplier Type'),
	billing_name: Yup.string().max(40, 'Exceeded character limit').required('Please Enter Billing Name'),
	//street_h_n: Yup.string().required('Please enter your House no'),
	city: Yup.string().ensure().required('Please Select City'),
	country: Yup.string().ensure().required('Please Select Country'),
	postalcode: Yup.string().required('Please Enter postal Code').matches(/^[1-9][0-9]{5}$/, "Invalid postal code"),
	suppliers_product: Yup.string().required('Please Enter Product Name')
});

export default function Create_Supplier() {
	const dispatch = useDispatch();
	const sutype = useSelector(sutypeSelector);
	const [show, setShow] = useState(false);
	const [progress, setProgress] = useState(0);
	const handleClose = () => {
		setShow(false);
		setProgress(0);
	};
	const handleShow = () => setShow(true);

	const CompleteFormStep = () => {
		setProgress((cur) => cur + 1);
	};
	const prevStep = () => {
		setProgress((cur) => cur - 1);
	};
	const renderButton = () => {
		if (progress > 2) {
			return undefined;
		} else {
			return <Button onClick={CompleteFormStep} type="button"></Button>;
		}
	};

	const current = new Date();
	const date = `${current.getDate()}/${current.getMonth() + 1
		}/${current.getFullYear()}`;

	const auth = useSelector(authSelector);
	const supplier = useSelector(supplierSelector);
	const state = useSelector(stateSelector);
	const city = useSelector(citySelector);
	const cntry = useSelector(countrySelector);

	const create = (data) => {
		dispatch(createSupplier({ data, toast })).then(() => {
			dispatch(fetchSupplierSearchList({ search_str: "" }))
			dispatch(fetchSupplierList());
		}
		);
		setShow(false);
		setProgress(0);
	};

	const checkHandler = (setFieldValue, e, values) => {
		if (e.target.checked) {
			setFieldValue(`billing_name`, values.supplier_name);

		} else {
			setFieldValue(`billing_name`, "");

		}
	};
	return (
		<>
			<Button variant="primary" onClick={handleShow} className="addbtn">
				+Add
			</Button>
			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<div className="title-subtitle">
						<Modal.Title> Add New Supplier</Modal.Title>
						<div className="date">{date}</div>
					</div>
				</Modal.Header>
				<Formik
					initialValues={{
						supplier_name: "",
						email: "",
						contact_no: "",
						gstin: "",
						place_of_supply: "",
						title: "",
						billing_name: "",
						street_h_n: "",
						city: "",
						postalcode: "",
						country: 1,
						description: "",
						remark: "",
						supplier_type: "",
						suppliers_product: "",
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
						setFieldValue
					}) => (
						<>
							<form onSubmit={handleSubmit}>
								{progress === 0 && (

									<section>
										{/* <p>{JSON.stringify(supplier)}</p> */}
										<Modal.Body id="modalbd">
											<div className="nav-tab">
												<ul class="nav">
													<li class="nav-item">
														<p
															aria-current="page"
															href="#"
															style={{ color: "#07CD9E" }}
														>
															Supplier Details
														</p>
													</li>
													<li class="nav-item">
														<p style={{ color: "black" }}>
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
															<option values="">Select title</option>
															{Config.title_choice.map((choice, index) => (
																<option value={choice}>{choice}</option>
															))}
														</select>
														{touched.title && errors.title && (
															<p className='text-danger text-sm'>{errors.title}</p>
														)}
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
													<InputBox
														label="Supplier Name *"
														type="text"
														name="supplier_name"
													/>
												</div>
												<div className="col-md-6">
													<InputBox
														label="GST No."
														type="text"
														name="gstin"
													/>
												</div>

												<div className="col-md-6">
													<InputBox
														label="Contact Number"
														type="text"
														name="contact_no"
													/>
												</div>

												<div className="col-md-6">
													<InputBox
														label="Email Id"
														type="email"
														name="email"
													/>
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
															<option values="">Select place of city</option>
															{state &&
																state.stateList &&
																state.stateList.map((state, _index) => (
																	<option id="{index}" value={state.id}>
																		{state.state_name}
																	</option>
																))}
														</select>
														{touched.place_of_supply && errors.place_of_supply && (
															<p className='text-danger text-sm'>{errors.place_of_supply}</p>
														)}
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
															<option values="">Select supplier type</option>
															{Config.supplier_type.map((type, index) => (
																<option value={type} key={index}>{type}</option>
															))}
														</select>
														{touched.supplier_type && errors.supplier_type && (
															<p className='text-danger text-sm'>{errors.supplier_type}</p>
														)}
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
													onClick={CompleteFormStep}
													disabled={values.title && values.supplier_name && values.supplier_type && values.place_of_supply ? false : true}
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
															Supplier Details
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
													<input type="checkbox" onChange={(e) =>
														checkHandler(setFieldValue, e, values)
													} />
												</div>
												<div className="col-md-6" style={{ marginLeft: "-3rem" }}>
													Same as Supplier
												</div>
											</div>
											<div className="row">

												<div className="col-md-6">
													<InputBox
														type="text"
														name="billing_name"
														label="Billing Name *"
													/>

												</div>
												<div className="col-md-6">
													<InputBox
														type="text"
														name="street_h_n"
														label="House No. "
													/>
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
															<option values="">Select country</option>
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
														{touched.country && errors.country && (
															<p className='text-danger text-sm'>{errors.country}</p>
														)}
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
													<InputBox
														type="text"
														name="postalcode"
														label="Postal Code *"
													/>
												</div>
												<div className="col-md-6">
													<InputBox
														type="text"
														name="description"
														label="Description"
													/>
												</div>
												<div className="col-md-6">
													<InputBox
														type="text"
														name="remark"
														label="Remark"
													/>
												</div>
											</div>
										</Modal.Body>
										<Modal.Footer>
											<div className="Btn">
												<Button
													variant="secondary"
													className="B1"
													onClick={prevStep}
												>
													Back
												</Button>
												<Button
													className="B2"
													type="button"
													disabled={values.city && values.country && values.billing_name ? false : true}
													onClick={CompleteFormStep}
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
													<InputBox
														type="text"
														label="Product Name *"
														name="suppliers_product"
													/>
												</div>
											</div>
										</Modal.Body>
										<Modal.Footer>
											<div className="Btn">
												<Button
													variant="secondary"
													className="B1"
													onClick={prevStep}
												>
													Back
												</Button>
												<Button
													variant="primary"
													className="B2"
													disabled={values.suppliers_product ? false : true}
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
}
