import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../../../assets/styles/Form.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { uomSelector } from "../../../../../reducers/master/uom/UomSlice";
import { authSelector } from "../../../../../reducers/auth/AuthSlice";
import { categorySelector } from "../../../../../reducers/master/category/CategorySlice";
import { gstSelector } from "../../../../../reducers/master/gst/GstSlice";
import { colorSelector } from "../../../../../reducers/master/color/ColorSlice";
import {
	updateItem,
	fetchItemSearchList,
	itemSelector,
} from "../../../../../reducers/master/item/ItemSlice";
import { useDispatch, useSelector } from "react-redux";
import Config from "../../../../../constants/Config"; 

const Schema = Yup.object().shape({
	item_name: Yup.string().required("Required"),
});
export const Edit_item  = forwardRef((props, ref) => {

	const dispatch = useDispatch();

	const [sellectedCategory, setSellectedCategory] = useState({});
	const [progress, setProgress] = useState(0);
	const [file_1, setFile_1] = useState()
	const [file_2, setFile_2] = useState()
	const [file_3, setFile_3] = useState()
	const [file_4, setFile_4] = useState()
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
	const item = useSelector(itemSelector);
	const category = useSelector(categorySelector);
	const gst = useSelector(gstSelector);
	const color = useSelector(colorSelector);
	const uom = useSelector(uomSelector);

	const [image, setImage] = useState(null);
	const [image_2, setImage_2] = useState(null);
	const [image_3, setImage_3] = useState(null);
	const [image_4, setImage_4] = useState(null);

	const handleFileUpload_1 = (event) => {
		if (event.target.files && event.target.files[0]) {
			setImage(URL.createObjectURL(event.target.files[0]));
			const selectedFile = event.target.files[0]
			setFile_1(selectedFile)
		}
	}
	const handleFileUpload_2 = (event) => {
		if (event.target.files && event.target.files[0]) {
			setImage_2(URL.createObjectURL(event.target.files[0]));
			const selectedFile = event.target.files[0]
			setFile_2(selectedFile)
		}
	}

	const handleFileUpload_3 = (event) => {
		if (event.target.files && event.target.files[0]) {
			setImage_3(URL.createObjectURL(event.target.files[0]));
			const selectedFile = event.target.files[0]
			setFile_3(selectedFile)
		}
	}

	const handleFileUpload_4 = (event) => {
		if (event.target.files && event.target.files[0]) {
			setImage_4(URL.createObjectURL(event.target.files[0]));
			const selectedFile = event.target.files[0]
			setFile_4(selectedFile)
		}
	}

	const update = (data) => {
		let formData = new FormData();
		file_1 && formData.append('item_image',
			file_1);
		file_2 && formData.append('item_image_2',
			file_2);
		file_3 && formData.append('item_image_3',
			file_3);
		file_4 && formData.append('item_image_4',
			file_4);
		formData.append('id',
			data.id);
		formData.append('item_name',
			data.item_name);
		formData.append('items_type',
			data.items_type);
		formData.append('item_color',
			data.item_color ? data.item_color : "");
		formData.append('item_unit',
			data.item_unit);
		formData.append('item_gst',
			data.item_gst);
		formData.append('item_category',
			data.item_category);
		formData.append('description',
			data.description ? data.description : "");
		formData.append('item_size',
			data.item_size ? data.item_size : "");
		// formData.append('opening_stock',
		// 	data.opening_stock ? data.opening_stock : "");
		formData.append('purchase_price',
			data.purchase_price ? data.purchase_price : "");
		formData.append('selling_price',
			data.selling_price?data.selling_price:"");
		formData.append('remark',
			data.remark ? data.remark : "");
		formData.append('created_by',
			data.created_by);
		dispatch(updateItem(formData)).then(() => {
			dispatch(fetchItemSearchList({ search_str: "" }))
		
		}
		);
		setShow(false);
		setProgress(0);
	};
	const searchcategory = (categoryID) => {
		if (categoryID > 0) {
			const cat = category.categoryList.find(
				(category) => category.id === parseInt(categoryID),
			);

			setSellectedCategory(cat);
		}
	};


	return (
		<>
		
			<Modal show={show} onHide={handleClose} animation={false}>
				{/* <p>{JSON.stringify(props)}</p> */}
				<Modal.Header closeButton>
					<div className="title-subtitle">
						<Modal.Title> Edit Inventory Master</Modal.Title>
						<div className="date">30 june 2022 / 12:05pm</div>
					</div>
				</Modal.Header>
				<Formik
					initialValues={{
						id: props?.item?.id,
						items_type: props?.item?.items_type,
						item_code: props?.item?.item_code,
						item_name: props?.item?.item_name,
						item_category: props?.item?.item_category?.id,
						hsn_code: props?.item?.item_category?.hsn_code,
						item_gst: props?.item?.item_gst?.id,
						item_color: props?.item?.item_color?.id,
						item_unit: props?.item?.item_unit?.id,
						description: props?.item?.description,
						remark: props?.item?.remark,
						// opening_stock: props?.item?.opening_stock,
						item_size: props?.item?.item_size,
						purchase_price: props?.item?.purchase_price,
						selling_price: props?.item?.selling_price,
						item_image: null,
						item_image_2: null,
						item_image_3: null,
						item_image_4: null,
						created_by: auth?.user?.user_id,
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
										<Modal.Body>
											<div className="nav-tab">
												<ul class="nav">
													<li class="nav-item">
														<p
															aria-current="page"
															href="#"
															style={{ color: "#07CD9E", marginLeft: "-2.5rem" }}
														>
															Item Details
														</p>
													</li>
													<li class="nav-item">
														<p

															href="#"
															style={{ color: "black", marginLeft: "-2.5rem" }}
														>
															Inventory Details
														</p>
													</li>
												</ul>
											</div>
											<div className="row">
												<div className="col-md-6">
													<div class="form-group">
														<label>Inventory Code</label>
														<input
															disabled
															type="text"
															name="item_name"
															class="form-control"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.item_code}
															error={errors.item_code}
															readOnly
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Inventory Type*</label>
														<select
															name="items_type"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.items_type}
															error={errors.items_type}
															class="form-control"
														>
															{Config.Item_Type.map((choice, index) => (
																<option value={choice}>{choice}</option>
															))}
														</select>
														{touched.items_type && errors.items_type && (
															<p className='text-danger text-sm'>{errors.items_type}</p>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Inventory Name *</label>
														<input
															type="text"
															name="item_name"
															class="form-control"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.item_name}
															error={errors.item_name}
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Color </label>

														<select
															name="item_color"
															placeholder="Place of city"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.item_color}
															error={errors.item_color}
															class="form-control"
														>
															<option value="">Select color</option>
															{color
																&& color.colorList &&
																color.colorList.map((color, _index) => (
																	<option id="{index}" value={color.id}>
																		{color.color_name}
																	</option>
																))}
														</select>
													</div>
												</div>

												<div className="col-md-6">
													<div class="form-group">
														<label>Size </label>
														<input
															type="text"
															class="form-control"
															name="item_size"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.item_size}
															error={errors.item_size}
														/>
													</div>
												</div>
												{/* <div className="col-md-6">
													<div class="form-group">
														<label>Opening stock </label>
														<input
															name="opening_stock"
															class="form-control"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.opening_stock}
															error={errors.opening_stock}
														/>
													</div>
												</div> */}
												<div className="col-md-6">
													<div class="form-group">
														<label>Purchase Price </label>
														<input
															type="text"
															class="form-control"
															name="purchase_price"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.purchase_price}
															error={errors.purchase_price}
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>Selling Price </label>
														<input
															type="text"
															class="form-control"
															name="selling_price"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.selling_price}
															error={errors.selling_price}
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>GST *</label>

														<select
															name="item_gst"
															placeholder="GST"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.item_gst}
															error={errors.item_gst}
															class="form-control"
														>
															{gst &&
																gst.gstList &&
																gst.gstList.map((gst, _index) => (
																	<option id="{index}" value={gst.id}>
																		{gst.gst_percent}
																	</option>
																))}
														</select>
													</div>
												</div>

												<div className="col-md-6">
													<div class="form-group">
														<label>Category *</label>

														<select
															class="form-control"
															name="item_category"
															onBlur={handleBlur}
															value={values.item_category}
															error={errors.item_category}
															onChange={(e) => {
																handleChange("item_category")(e);
																searchcategory(e.currentTarget.value);
															}}
														>
															{category &&
																category.categoryList &&
																category.categoryList.map(
																	(category, _index) => (
																		<option id="{index}" value={category.id}>
																			{category.category_name}
																		</option>
																	),
																)}
														</select>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>HSN Code *</label>

														<input
															readOnly
															name="hsn_code"
															type="text"
															value={sellectedCategory.hsn_code ? sellectedCategory.hsn_code : props.item.item_category.hsn_code}
															class="form-control"
														/>
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>UOM *</label>

														<select
															name="item_unit"
															placeholder="UOM"
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.item_unit}
															error={errors.item_unit}
															class="form-control"
														>
															{uom &&

																uom.uomList &&
																uom.uomList.map((uom, _index) => (
																	<option id="{index}" value={uom.id}>
																		{uom.unit}
																	</option>
																))}
														</select>
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
												<div className="col-md-6">
													<div class="form-group">
														<label>Created By</label>
														<input
															type="text"
															name="created_by"
															class="form-control"

															value={auth.user.first_name}
														/>
													</div>
												</div>

												<div className="col-md-6">
													<div class="form-group">
														<label>Created Date</label>
														<input
															type="text"
															class="form-control"

															value={date}
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
															style={{ color: "black", marginLeft: "-2.5rem" }}
														>
															Item Details
														</p>
													</li>
													<li class="nav-item">
														<p

															href="#"
															style={{ color: "#07CD9E", marginLeft: "-2.5rem" }}
														>
															Item Details
														</p>
													</li>
												</ul>
											</div>
											<div className="row">
												<div className="col-md-3">
													<div class="form-group">
														<label>Image 1</label>
														<img style={{ width: "100%", height: "30vh" }} src={image ? image : props?.item?.item_image} />
														<input
															type="File"
															class="form-control"
															name="item_image"
															onChange={handleFileUpload_1}
															onBlur={handleBlur}
															value={values.item_image}
															error={errors.item_image}
														/>

													</div>
												</div>
												<div className="col-md-3">
													<div class="form-group">
														<label>Image 2</label>
														<img style={{ width: "100%", height: "30vh" }} src={image_2 ? image_2 : props?.item?.item_image_2} />
														<input
															type="File"
															class="form-control"
															name="item_image_2"
															onChange={handleFileUpload_2}
															onBlur={handleBlur}
															value={values.item_image_2}
															error={errors.item_image_2}
														/>
													</div>
												</div>
												<div className="col-md-3">
													<div class="form-group">
														<label>Image 3</label>
														<img style={{ width: "100%", height: "30vh" }} src={image_3 ? image_3 : props?.item?.item_image_3} />
														<input
															type="File"
															class="form-control"
															name="item_image_3"
															onChange={handleFileUpload_3}
															onBlur={handleBlur}
															value={values.item_image_3}
															error={errors.item_image_3}
														/>
													</div>
												</div>
												<div className="col-md-3">
													<div class="form-group">
														<label>Image 4</label>
														<img style={{ width: "100%", height: "30vh" }} src={image_4 ? image_4 : props?.item?.item_image_4} />
														<input
															type="File"
															class="form-control"
															name="item_image_4"
															onChange={handleFileUpload_4}
															onBlur={handleBlur}
															value={values.item_image_4}
															error={errors.item_image_4}
														/>
													</div>
												</div>
											</div>
										</Modal.Body>
										<Modal.Footer>
											<div className="Btn">
												<Button variant="secondary" className="B1" onClick={PrevStep}>
													Back
												</Button>
												<Button
													className="B2"
													type="button"
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
