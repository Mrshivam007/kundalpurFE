import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import "../../../../../assets/styles/Form.css";
import { Formik } from "formik";
import * as Yup from "yup";
// import { uomSelector } from "../../../../../reducers/master/uom/UomSlice";
// import { authSelector } from "../../../../../reducers/auth/AuthSlice";
// import { categorySelector } from "../../../../../reducers/master/category/CategorySlice";
// import { gstSelector } from "../../../../../reducers/master/gst/GstSlice";
// import { colorSelector } from "../../../../../reducers/master/color/ColorSlice";
import {
	createItem,
	fetchItemList,
	fetchItemSearchList,
	itemSelector,
} from "../../../reducers/item/ItemSlice";
import Config from "../../../../../../config/config"
import { useDispatch, useSelector } from "react-redux";
// import InputBox from "../../../../../assets/common/InputBox";

const Schema = Yup.object().shape({
	item_name: Yup.string().required('Please enter Inventory name'),

	item_category: Yup.string().ensure().required('Please select category'),
	item_gst: Yup.string().ensure().required('Please select gst'),
	// item_color: Yup.string().ensure().required('Please enter your item color'),
	item_unit: Yup.string().ensure().required('Please select Uom'),

});

export default function Create_Item() {
	const dispatch = useDispatch();

	const [sellectedCategory, setSellectedCategory] = useState({});

	const [show, setShow] = useState(false);
	const [progress, setProgress] = useState(0);
	const [file_1, setFile_1] = useState()
	const [file_2, setFile_2] = useState()
	const [file_3, setFile_3] = useState()
	const [file_4, setFile_4] = useState()

	const handleClose = () => {
		setShow(false);
		setProgress(0);
	};
	const handleShow = () => setShow(true);
	const CompleteFormStep = () => {
		setProgress((cur) => cur + 1);
	};
	const PrevStep = () => {
		setProgress((cur) => cur - 1);
	}
	const current = new Date();
	const date = `${current.getDate()}/${current.getMonth() + 1
		}/${current.getFullYear()}`;

	const auth = useSelector(authSelector);
	const item = useSelector(itemSelector);
	const category = useSelector(categorySelector);
	const gst = useSelector(gstSelector);
	const color = useSelector(colorSelector);
	const uom = useSelector(uomSelector);

	const handleFileUpload_1 = (event) => {
		const selectedFile = event.target.files[0]

		setFile_1(selectedFile)
	};

	const handleFileUpload_2 = (event) => {
		const selectedFile = event.target.files[0]
		setFile_2(selectedFile)
	};
	const handleFileUpload_3 = (event) => {
		const selectedFile = event.target.files[0]
		setFile_3(selectedFile)
	};

	const handleFileUpload_4 = (event) => {
		const selectedFile = event.target.files[0]
		setFile_4(selectedFile)
	};

	const create = (data) => {
		let formData = new FormData();
		file_1 && formData.append('item_image',
			file_1);
		file_2 && formData.append('item_image_2',
			file_2);
		file_3 && formData.append('item_image_3',
			file_3);
		file_4 && formData.append('item_image_4',
			file_4);
		formData.append('item_name',
			data.item_name);
		formData.append('items_type',
			data.items_type);
		formData.append('item_color',
			data.item_color);
		formData.append('item_unit',
			data.item_unit);
		formData.append('item_gst',
			data.item_gst);
		formData.append('item_category',
			data.item_category);
		formData.append('description',
			data.description);
		formData.append('item_size',
			data.item_size);
		// formData.append('opening_stock',
		// 	data.opening_stock);
		formData.append('purchase_price',
			data.purchase_price);
		formData.append('selling_price',
			data.selling_price);
		formData.append('remark',
			data.remark);
		formData.append('created_by',
			data.created_by);
		dispatch(createItem(formData)).then(() => {

			dispatch(fetchItemSearchList({ search_str: "" }))
			dispatch(fetchItemList());
		
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
			<Button variant="primary" onClick={handleShow} className="addbtn">
				+Add
			</Button>
			<Modal show={show} onHide={handleClose} animation={false}>
				{/* <p>{JSON.stringify(item)}</p> */}
				<Modal.Header closeButton>
					<div className="title-subtitle">
						<Modal.Title> Add New Inventory Master</Modal.Title>
						<div className="date">30 june 2022 / 12:05pm</div>
					</div>
				</Modal.Header>
				<Formik
					initialValues={{
						item_name: "",
						item_category: "",
						item_gst: "",
						item_color: "",
						item_unit: "",
						description: "",
						remark: "",
						// opening_stock: "",
						item_size: "",
						purchase_price: "",
						selling_price: "",
						items_type: "",
						item_image: null,
						item_image_2: null,
						item_image_3: null,
						item_image_4: null,
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
															Inventory Details
														</p>
													</li>
													<li class="nav-item">
														<p

															href="#"
															style={{ color: "black", marginLeft: "-2.5rem" }}
														>
															Image Details
														</p>
													</li>
												</ul>
												<hr />
											</div>
											<div className="row" style={{ marginLeft: "1rem" }}>
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
															<option values="">Select Inventory Type</option>
															{Config.Item_Type.map((choice, index) => (
																<option value={choice}>{choice}</option>
															))}
														</select>
														{touched.items_type && errors.items_type && (
															<p className='text-danger text-sm'>{errors.items_type}</p>
														)}
													</div>
												</div>

												<InputBox
													type="text"
													name="item_name"
													label="Inventory Name *"
												/>

												<div className="col-md-6">
													<div class="form-group">
														<label>Color </label>
														<select
															name="item_color"
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
														{/* {touched.item_color && errors.item_color && (
															<p className='text-danger text-sm'>{errors.item_color}</p>
														)} */}
													</div>
												</div>


												<InputBox
													label="Size "
													name="item_size"
													type="text"
												/>

												{/* <InputBox
													label="Opening stock "
													name="opening_stock"
													type="text"
												/> */}

												<InputBox
													label="Purchase Price "
													name="purchase_price"
													type="text"
												/>
												<InputBox
													label="Selling Price *"
													name="selling_price"
													type="text"
												/>
												<div className="col-md-6">
													<div class="form-group">
														<label>GST *</label>

														<select
															name="item_gst"

															onChange={handleChange}
															onBlur={handleBlur}
															value={values.item_gst}
															error={errors.item_gst}
															class="form-control"
														>
															<option value="">Select GST</option>
															{gst &&
																gst.gstList &&
																gst.gstList.map((gst, _index) => (
																	<option id="{index}" value={gst.id}>
																		{gst.gst_percent}
																	</option>
																))}
														</select>
														{touched.item_gst && errors.item_gst && (
															<p className='text-danger text-sm'>{errors.item_gst}</p>
														)}
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
															}}>
															<option value="">Select Category</option>
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
														{touched.item_category && errors.item_category && (
															<p className='text-danger text-sm'>{errors.item_category}</p>
														)}
													</div>
												</div>
												<div className="col-md-6">
													<div class="form-group">
														<label>HSN Code *</label>
														<input
															type="text"
															name="name"
															value={sellectedCategory.hsn_code}
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

															<option value="">Select UOM</option>
															{uom &&

																uom.uomList &&
																uom.uomList.map((uom, _index) => (
																	<option id="{index}" value={uom.id}>
																		{uom.unit}
																	</option>
																))}
														</select>
														{touched.item_unit && errors.item_unit && (
															<p className='text-danger text-sm'>{errors.item_unit}</p>
														)}
													</div>
												</div>

												<InputBox
													type="text"
													name="description"
													label="Description"
												/>

												<InputBox
													type="text"
													name="remark"
													label="Remark"
												/>

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
													disabled={values.item_name && values.item_category && values.item_gst && values.item_unit ? false : true}
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
															Image Details
														</p>
													</li>
												</ul>
												<hr />
											</div>
											<div className="row">
												<div className="col-md-3">
													<div class="form-group">
														<label>Image 1</label>
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
}
