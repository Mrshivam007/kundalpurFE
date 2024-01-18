import axios from "axios";
import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Create_Item from "../../../../../master/item/components/form/Create_Item";

import Config from "../../../../../../constants/Config";

import { useDispatch, useSelector } from "react-redux";

import { authSelector } from "../../../../../../reducers/auth/AuthSlice";
import { itemSelector } from "../../../../../../reducers/master/item/ItemSlice";
import { stateSelector } from "../../../../../../reducers/master/state/StateSlice";

import {
  fetchPurchaseSupplierOrderList,
  fetchPurchaseSupplierOrderSearchList,
} from "../../../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";

import { Field, FieldArray, Formik } from "formik";

import { toast } from "react-toastify";
import * as Yup from "yup";
import { citySelector } from "../../../../../../reducers/master/city/CitySlice";
import { createPurchaseSupplierOrder } from "../../../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";
import { supplierSelector } from "../../../../../../reducers/master/supplier/SupplierSlice";
import { poSelector } from "../../../../../../reducers/purchase/po/PoSlice";

const Schema = Yup.object().shape({
  supplier: Yup.string().required("Required"),

  order_list: Yup.array().of(
    Yup.object().shape({
      item_master: Yup.string().required("Required"),
      items_type: Yup.string().required("Required"),
      quantity: Yup.number().required("Required"),
      price: Yup.number().required("Required"),
    })
  ),
  exp_arr_date: Yup.date()
    .required("Please enter your delivery date")
    .nullable()
    .default(undefined),
  delivery_location: Yup.string()
    .ensure()
    .required("Please enter your delivery location"),
});

export default function Create_PO() {
  const dispatch = useDispatch();

  /* Selectors */
  const auth = useSelector(authSelector);
  const po = useSelector(poSelector);

  const state = useSelector(stateSelector);
  const city = useSelector(citySelector);
  const supplier = useSelector(supplierSelector);
  const item = useSelector(itemSelector);
  //
  /* Popup state */
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(true);
  const [inAction, setAction] = useState(false);
  const [isLoad, setPlaceHolderLoader] = useState("");

  /* Multistep form state */
  const [progress, setProgress] = useState(0);

  /* Selected supplier state */
  const [selectedSupplier, setSelectedSupplier] = useState({});

  /* Selected items state */
  const [selectedItem, setSelectedItem] = useState([{}]);
  const [itemType, setItemType] = useState(null);

  /* GST option */
  const [gstOption, setGstOption] = useState({
    igst: true,
    cgst: false,
    sgst: false,
  });

  /* Handling popup start */
  const handleClose = () => {
    setShow(false);
    setProgress(0);
    setSelectedSupplier({});
    setSelectedItem([{}]);
  };
  const handleShow = () => setShow(true);
  /* Handling popup end */

  /* Handling multi step form start */
  const CompleteFormStep = () => {
    setProgress((cur) => cur + 1);
  };
  const prevStep = () => {
    setProgress((cur) => cur - 1);
  };

  const renderButton = () => {
    if (progress > 1) {
      return undefined;
    } else {
      return <Button onClick={CompleteFormStep} type="button"></Button>;
    }
  };
  /* Handling multi step form end */

  /* Today's date */
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const dateReverse = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  const dateCurrent = current.toLocaleDateString("en-CA");
  /* Searching selected supplier */
  const searchSupplier = async (supplierId) => {    
    setPlaceHolderLoader("Loading...");
    if (supplierId > 0) {

      try {
        const response = await axios.get(
          Config.apiUrl + "master/supplier/retrieve/" + supplierId,

          {
            headers: {
              Authorization: `Token ${auth.token}`,
            },
          }
        );

        setActive(false);
        setSelectedSupplier(response.data);
        setPlaceHolderLoader("");
      } catch (e) {
        setPlaceHolderLoader("");
      }
    } 
  };
  /* Searching selected supplier end */

  /* Searching selected item */
  const searchItem = async (id, index, p) => {
    if (id > 0) {
    
      let sItems = [...selectedItem];
      let sItem = { ...sItems[index] };

      try {
        const response = await axios.get(
          Config.apiUrl + "master/item/retrieve/" + id,

          {
            headers: {
              Authorization: `Token ${auth.token}`,
            },
          }
        );

        sItem = response.data;

        if (gstOption.igst == true) {
          p.setFieldValue(
            `order_list.${index}.igst_percent`,
            response.data.item_gst.gst_percent
          );
        } else {
          p.setFieldValue(
            `order_list.${index}.sgst_percent`,
            response.data.item_gst.gst_percent / 2
          );
          p.setFieldValue(
            `order_list.${index}.cgst_percent`,
            response.data.item_gst.gst_percent / 2
          );
        }
      } catch (e) {}

      sItems[index] = sItem;
      setSelectedItem(sItems);
    }
  };
  /* Searching selected item end */
  /* Searching selected item */
  const searchItems = async (id, index, p) => {
    selectedItem[index] = "";
    p.setFieldValue(`order_list.${index}.igst_percent`, "");
    p.setFieldValue(`order_list.${index}.igst_amount`, "");

    p.setFieldValue(`order_list.${index}.sgst_percent`, "");
    p.setFieldValue(`order_list.${index}.sgst_amount`, "");

    p.setFieldValue(`order_list.${index}.cgst_percent`, "");
    p.setFieldValue(`order_list.${index}.cgst_amount`, "");

    p.setFieldValue(`order_list.${index}.total_amount`, "");
    p.setFieldValue(`order_list.${index}.discount_amount`, "");
    p.setFieldValue(`order_list.${index}.quantity`, 0);
    p.setFieldValue(`order_list.${ index }.price`, "");
    p.setFieldValue(`order_list.${ index }.balance_quantity`, 0);

    p.setFieldValue(`order_list.${ index }.actual_grand_total`, 0);
    p.setFieldValue(`order_list.${index}.item_master`, "");
  };


  const setGSTOpt = (deliveryLocation, props) => {

    let fromState = selectedSupplier?.city?.state?.id.toString();

    let toState = deliveryLocation;

    if (fromState == toState) {

      setGstOption({ igst: false, cgst: true, sgst: true });
    } else {
      setGstOption({ igst: true, cgst: false, sgst: false });
    }
  };

  const create = (data) => {
    setAction(true);
    if (data.order_list.find((x) => x.item_master == null)) {
      setAction(false);
      toast("Please Select Item");
    } else {
      dispatch(createPurchaseSupplierOrder({ data, toast })).then(
        (response) => {
          if (response.payload != false) {
            setAction(false);
            dispatch(
              fetchPurchaseSupplierOrderSearchList({
                offset: 0,
                limit: 15,
                searchString: "",
              })
            );
            dispatch(fetchPurchaseSupplierOrderList());
            setSelectedSupplier({});
            setSelectedItem([{}]);
            setProgress(0);
            setShow(false);
          } else {
            toast.error("Something went to wrong");
            setAction(false);
          }
        }
      );
    }
  };

  /* Creating action end */

  /* Initial value */
  const initialValues = {
    order_list: [
      {
        item_master: null,
        items_type: null,
        quantity: null,
        price: null,
        discount_percent: 0,
        discount_amount: 0,
        igst_percent: 0,
        igst_amount: 0,
        cgst_percent: 0,
        cgst_amount: 0,
        sgst_percent: 0,
        sgst_amount: 0,
        total_amount: 0,       
      },
    ],
    grand_total: 0,
    remark: null,
    description: null,
    supplier: null,
    delivery_location: null,
    // exp_arr_date: dateReverse,
    exp_arr_date: null,
    created_by: auth && auth.user && auth.user.user_id,
  };

  const calculateByQuantity = (p, i, value) => {
    let qty = value;
    let price = p.values.order_list[i].price;
    let discount_percent = p.values.order_list[i].discount_percent;

    let total_amount = qty * price;

    let discount_amount = (total_amount / 100) * discount_percent;
    p.setFieldValue(`order_list.${i}.discount_amount`, discount_amount);

    total_amount = total_amount - discount_amount;

    if (gstOption.igst == true) {
      let igst_percent = p.values.order_list[i].igst_percent;
      let igst_amount = (total_amount / 100) * igst_percent;
      p.setFieldValue(`order_list.${i}.igst_amount`, igst_amount);
      total_amount = total_amount + igst_amount;
    } else {
      let cgst_percent = p.values.order_list[i].cgst_percent;
      let cgst_amount = (total_amount / 100) * cgst_percent;
      p.setFieldValue(`order_list.${i}.cgst_amount`, cgst_amount);
 
      let sgst_percent = p.values.order_list[i].sgst_percent;
      let sgst_amount = (total_amount / 100) * sgst_percent;
      p.setFieldValue(`order_list.${i}.sgst_amount`, sgst_amount);

      total_amount = total_amount + cgst_amount + sgst_amount;
    }

    p.setFieldValue(`order_list.${i}.total_amount`, total_amount);
  };

  const calculateByPrice = (p, i, value) => {
    let qty = p.values.order_list[i].quantity;
    let price = value;
    let discount_percent = p.values.order_list[i].discount_percent;

    /* Total amount */
    let total_amount = qty * price;

    /* Discount calculation */
    let discount_amount = (total_amount / 100) * discount_percent;
    p.setFieldValue(`order_list.${i}.discount_amount`, discount_amount);
    /* Total after discount */
    total_amount = total_amount - discount_amount;
    /* GST calculation */
    if (gstOption.igst == true) {
      let igst_percent = p.values.order_list[i].igst_percent;
      let igst_amount = (total_amount / 100) * igst_percent;
      p.setFieldValue(`order_list.${i}.igst_amount`, igst_amount);
      total_amount = total_amount + igst_amount;
    } else {
      let cgst_percent = p.values.order_list[i].cgst_percent;
      let cgst_amount = (total_amount / 100) * cgst_percent;
      p.setFieldValue(`order_list.${i}.cgst_amount`, cgst_amount);
      let sgst_percent = p.values.order_list[i].sgst_percent;
      let sgst_amount = (total_amount / 100) * sgst_percent;
      p.setFieldValue(`order_list.${i}.sgst_amount`, sgst_amount);
      total_amount = total_amount + cgst_amount + sgst_amount;
    }
    p.setFieldValue(`order_list.${i}.total_amount`, total_amount);
  };

  const calculateByDiscount = (p, i, value) => {
    let qty = p.values.order_list[i].quantity;
    let price = p.values.order_list[i].price;
    let discount_percent = value;
    let total_amount = qty * price;
    let discount_amount = (total_amount / 100) * discount_percent;
    p.setFieldValue(`order_list.${i}.discount_amount`, discount_amount);

    total_amount = total_amount - discount_amount;

    if (gstOption.igst == true) {
      let igst_percent = p.values.order_list[i].igst_percent;
      let igst_amount = (total_amount / 100) * igst_percent;
      p.setFieldValue(`order_list.${i}.igst_amount`, igst_amount);
      total_amount = total_amount + igst_amount;
    } else {
      let cgst_percent = p.values.order_list[i].cgst_percent;
      let cgst_amount = (total_amount / 100) * cgst_percent;
      p.setFieldValue(`order_list.${i}.cgst_amount`, cgst_amount);

      let sgst_percent = p.values.order_list[i].sgst_percent;
      let sgst_amount = (total_amount / 100) * sgst_percent;
      p.setFieldValue(`order_list.${i}.sgst_amount`, sgst_amount);

      total_amount = total_amount + cgst_amount + sgst_amount;
    }

    p.setFieldValue(`order_list.${i}.total_amount`, total_amount);
  };

  const calculateGrandTotal = (p) => {
    const grand_total = p.values.order_list.reduce((accumulator, object) => {
      return parseFloat(accumulator) + parseFloat(object.total_amount);
    }, 0);

    // p.setFieldValue("grand_total", grand_total.toFixed(2));
    p.setFieldValue("grand_total", grand_total);
  };

  let myPromise = new Promise(function (myResolve, myReject) {
    let x = 0;

    if (x == 0) {
      myResolve("OK");
    } else {
      myReject("Error");
    }
  });
  return (
    <>
      {/*    */}
      <Button
        variant="primary"
        onClick={handleShow}
        className="addbtn"
        style={{ background: "rgba(101, 61, 61, 0.75)", color: "white" }}
      >
        +Add
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={Schema}
          onSubmit={(values) => create(values)}
        >
          {(props) => (
            <>
              <form onSubmit={props.handleSubmit}>
                <Modal.Header closeButton>
                  <div className="title-subtitle">
                    <Modal.Title> Add New Purchase Order</Modal.Title>
                    <div className="date">{date}</div>
                  </div>
                </Modal.Header>
                {progress === 0 && (
                  <section>
                    <Modal.Body>
                      <div className="nav-tab">
                        <div className="POform">
                          <ul class="nav">
                            <li class="nav-item">
                              <p
                                aria-current="page"
                                href="#"
                                style={{
                                  color: "#07CD9E",
                                  marginLeft: "-2.5rem",
                                }}
                              >
                                Supplier Details
                              </p>
                            </li>

                            <li class="nav-item">
                              <p
                                href="#"
                                style={{
                                  color: "black",
                                  marginLeft: "-2.5rem",
                                }}
                              >
                                Inventory Details
                              </p>
                            </li>
                          </ul>
                          <hr />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>Supplier Name *</label>

                            <select
                              name="supplier"
                              placeholder="Supplier"
                              onChange={(e) => {
                                props.handleChange("supplier")(e);
                                searchSupplier(e.currentTarget.value);
                              }}
                              onBlur={props.handleBlur}
                              value={props.values.supplier}
                              error={props.errors.supplier}
                              class="form-control"
                            >
                              <option value="">Select Supplier</option>
                              {supplier &&
                                supplier.supplierList &&
                                supplier.supplierList.map((supplier, index) => (
                                  <option id="{index}" value={supplier.id}>
                                    {supplier.supplier_name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>Supplier Code</label>
                            <input
                              type="text"
                              placeholder={isLoad}
                              value={
                                selectedSupplier &&
                                selectedSupplier.supplier_code
                              }
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>Email</label>
                            <input
                              type="Email"
                              placeholder={isLoad}
                              value={selectedSupplier && selectedSupplier.email}
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>Contact No.</label>
                            <input
                              type="text"
                              placeholder={isLoad}
                              value={
                                selectedSupplier && selectedSupplier.contact_no
                              }
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>State</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder={isLoad}
                              value={
                                selectedSupplier &&
                                selectedSupplier.city &&
                                selectedSupplier.city?.state?.state_name
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>City</label>
                            <input
                              type="text"
                              placeholder={isLoad}
                              value={
                                selectedSupplier &&
                                selectedSupplier.city &&
                                selectedSupplier.city.city_name
                              }
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div class="form-group">
                            <label>Delivery Date *</label>
                            <input
                              min={dateCurrent}
                              type="date"
                              class="form-control"
                              name="exp_arr_date"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.exp_arr_date}
                              error={props.errors.exp_arr_date}
                            />
                            {props.touched.exp_arr_date &&
                              props.errors.exp_arr_date && (
                                <p className="text-danger text-sm">
                                  {props.errors.exp_arr_date}
                                </p>
                              )}
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div class="form-group">
                            <label>Delivery State *</label>
                            <select
                              class="form-control"
                              name="delivery_location"
                              placeholder="Delivey Location"
                              onBlur={props.handleBlur}
                              value={props.values.delivery_location}
                              onChange={(e) => {
                                props.handleChange("delivery_location")(e);
                                setGSTOpt(e.currentTarget.value, props);
                              }}
                              error={props.errors.delivery_location}
                            >
                              <option value="">Select Delivey State</option>
                              {state &&
                                state.stateList &&
                                state.stateList.map((state, index) => (
                                  <option id="{index}" value={state.id}>
                                    {state.state_name}
                                  </option>
                                ))}
                            </select>
                            {props.touched.delivery_location &&
                              props.errors.delivery_location && (
                                <p className="text-danger text-sm">
                                  {props.errors.delivery_location}
                                </p>
                              )}
                          </div>
                        </div>

                        <div className="col-md-4">
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
                      <div className="col-md-6">
                        <div class="form-group">
                          <label>Description</label>
                          <textarea
                            style={{ padding: "5px" }}
                            rows="2"
                            cols="60"
                            name="remark"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.remark}
                            error={props.errors.remark}
                          />
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
                          disabled={
                            props.values.supplier &&
                            props.values.delivery_location &&
                            props.values.exp_arr_date &&
                            !active
                              ? false
                              : true
                          }
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
                      <div className="row">
                        <div className="col-md-9">
                          <div className="POform">
                            <ul class="nav">
                              <li class="nav-item">
                                <p
                                  aria-current="page"
                                  href="#"
                                  style={{
                                    color: "black",
                                    marginLeft: "-2.5rem",
                                  }}
                                >
                                  Supplier Details
                                </p>
                              </li>

                              <li class="nav-item">
                                <p
                                  href="#"
                                  style={{
                                    color: "#07CD9E",
                                    marginLeft: "-1.50rem",
                                  }}
                                >
                                  Inventory Details
                                </p>
                              </li>
                            </ul>
                            <hr />
                          </div>
                        </div>
                        <div className="col-md-2" style={{}}>
                          <Create_Item />
                        </div>
                      </div>
                      <br />

                      <FieldArray
                        name="order_list"
                        render={(arrayHelpers) => (
                          <>
                            <div className="row-table">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>PO No</th>
                                    <th>Inventory Type*</th>
                                    <th>Inventory Name *</th>
                                    <th>Inventory Size</th>
                                    <th>Inventory Color</th>
                                    <th>UOM</th>

                                    <th>Inventory Qty*</th>
                                    <th> Price*</th>
                                    <th>Discount %</th>
                                    <th>Discount Amount</th>

                                    {gstOption.igst == true ? (
                                      <>
                                        <th>IGST %</th>
                                        <th>IGST Amount</th>
                                      </>
                                    ) : (
                                      <>
                                        <th>SGST %</th>
                                        <th>SGST Amount</th>

                                        <th>CGST %</th>
                                        <th>CGST Amount</th>
                                      </>
                                    )}

                                    <th>Total</th>
                                    <th>Remove</th>
                                  </tr>
                                </thead>
                                {props.values.order_list &&
                                  props.values.order_list.map(
                                    (order_list, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                          <select
                                            className="item_input"
                                            name={`order_list.${index}.items_type`}
                                            onChange={(e) => {
                                              props.handleChange(
                                                `order_list.${index}.items_type`
                                              )(e);
                                              searchItems(
                                                e.currentTarget.value,
                                                index,
                                                props
                                              );
                                            }}
                                          >
                                            <option values="">Select</option>
                                            {Config.Item_Type.map(
                                              (choice, index) => (
                                                <option value={choice}>
                                                  {choice}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </td>
                                        <td>
                                          <select
                                            className="item_input"
                                            name={`order_list.${index}.item_master`}
                                            value={
                                              props.values.order_list[index]
                                                .item_master
                                            }
                                            onChange={(e) => {
                                              props.handleChange(
                                                `order_list.${index}.item_master`
                                              )(e);
                                              searchItem(
                                                e.currentTarget.value,
                                                index,
                                                props
                                              );
                                            }}
                                          >
                                            <option value="">
                                              Select Item
                                            </option>
                                            {item &&
                                            props?.values?.order_list[index]
                                              .items_type == "Finished Products"
                                              ? item?.finisheditem?.map(
                                                  (item) => (
                                                    <option
                                                      id="{index}"
                                                      value={item?.id}
                                                    >
                                                      {item?.item_name}
                                                    </option>
                                                  )
                                                )
                                              : props.values.order_list[index]
                                                  .items_type == "Raw Materials"
                                              ? item?.rawitem?.map((item) => (
                                                  <option
                                                    id="{index}"
                                                    value={item?.id}
                                                  >
                                                    {item?.item_name}
                                                  </option>
                                                ))
                                                : props.values.order_list[index]
                                                  .items_type == "Semi Finished"
                                              ? item?.semiitem?.map((item) => (
                                                  <option
                                                    id="{index}"
                                                    value={item?.id}
                                                  >
                                                    {item?.item_name}
                                                  </option>
                                                ))
                                              : true}
                                          </select>
                                        </td>

                                        <td>
                                          <Field
                                            className="item_input"
                                            placeholder="Size"
                                            value={
                                              selectedItem[index] &&
                                              selectedItem[index].item_size
                                            }
                                          />
                                        </td>

                                        <td>
                                          <Field
                                            className="item_input"
                                            placeholder="Color"
                                            value={
                                              selectedItem[index] &&
                                              selectedItem[index].item_color &&
                                              selectedItem[index].item_color
                                                .color_name
                                            }
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            className="item_input"
                                            placeholder="UOM"
                                            value={
                                              selectedItem[index] &&
                                              selectedItem[index].item_unit &&
                                              selectedItem[index].item_unit.unit
                                            }
                                          />
                                        </td>

                                        <td>
                                          <Field
                                            className="item_input"
                                            name={`order_list.${index}.quantity`}
                                            onBlur={() =>
                                              calculateGrandTotal(props)
                                            }
                                            onChange={(e) => {
                                              props.handleChange(
                                                `order_list.${index}.quantity`
                                              )(e);

                                              calculateByQuantity(
                                                props,
                                                index,
                                                e.currentTarget.value
                                              );
                                            }}
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            className="item_input"
                                            name={`order_list.${index}.price`}
                                            onBlur={() =>
                                              calculateGrandTotal(props)
                                            }
                                            onChange={(e) => {
                                              props.handleChange(
                                                `order_list.${index}.price`
                                              )(e);
                                              calculateByPrice(
                                                props,
                                                index,
                                                e.currentTarget.value
                                              );
                                            }}
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            className="item_input"
                                            placeholder="Discount %"
                                            name={`order_list.${index}.discount_percent`}
                                            onBlur={() =>
                                              calculateGrandTotal(props)
                                            }
                                            onChange={(e) => {
                                              props.handleChange(
                                                `order_list.${index}.discount_percent`
                                              )(e);
                                              calculateByDiscount(
                                                props,
                                                index,
                                                e.currentTarget.value
                                              );
                                            }}
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            readonly="true"
                                            className="item_input"
                                            placeholder="Dis. Amt."
                                            name={`order_list.${index}.discount_amount`}
                                          />
                                        </td>

                                        {gstOption.igst == true ? (
                                          <>
                                            <td>
                                              <Field
                                                readonly="true"
                                                className="item_input"
                                                placeholder="IGST %"
                                                name={`order_list.${index}.igst_percent`}
                                                value={
                                                  props.values.order_list[index]
                                                    .igst_percent
                                                }
                                              />
                                            </td>
                                            <td>
                                              <Field
                                                readonly="true"
                                                className="item_input"
                                                placeholder="IGST Amount"
                                                name={`order_list.${index}.igst_amount`}
                                              />
                                            </td>
                                          </>
                                        ) : (
                                          <>
                                            <td>
                                              <Field
                                                readonly="true"
                                                className="item_input"
                                                placeholder="SGST %"
                                                name={`order_list.${index}.sgst_percent`}
                                                value={
                                                  props.values.order_list[index]
                                                    .sgst_percent
                                                }
                                              />
                                            </td>
                                            <td>
                                              <Field
                                                readonly="true"
                                                className="item_input"
                                                placeholder="SGST Amount"
                                                name={`order_list.${index}.sgst_amount`}
                                              />
                                            </td>

                                            <td>
                                              <Field
                                                readonly="true"
                                                className="item_input"
                                                placeholder="CGST %"
                                                name={`order_list.${index}.cgst_percent`}
                                                value={
                                                  props.values.order_list[index]
                                                    .cgst_percent
                                                }
                                              />
                                            </td>
                                            <td>
                                              <Field
                                                readonly="true"
                                                className="item_input"
                                                placeholder="CGST Amount"
                                                name={`order_list.${index}.cgst_amount`}
                                              />
                                            </td>
                                          </>
                                        )}

                                        <td>
                                          <Field
                                            readonly="true"
                                            className="item_input"
                                            placeholder="Total Amount"
                                            name={`order_list.${index}.total_amount`}
                                          />
                                        </td>

                                        <td>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            height="30"
                                            fill="currentColor"
                                            class="bi bi-trash3 "
                                            viewBox="0 0 16 16"
                                            onClick={() => {
                                              arrayHelpers.remove(index);
                                              props.setFieldValue(
                                                "grand_total",
                                                props.values.grand_total -
                                                  props.values.order_list[index]
                                                    .total_amount
                                              );
                                            }}
                                            id="remove_icon"
                                          >
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                          </svg>
                                        </td>
                                      </tr>
                                    )
                                  )}
                              </table>
                            </div>
                            <div className="row">
                              <div className="col-md-2">
                                <br />
                                <button
                                  className="Add_items"
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.insert(
                                      props.values.order_list.length,
                                      {
                                        item_master: null,
                                        quantity: null,
                                        price: null,
                                        discount_percent: 0,
                                        discount_amount: 0,
                                        igst_percent: 0,
                                        igst_amount: 0,
                                        cgst_percent: 0,
                                        cgst_amount: 0,
                                        sgst_percent: 0,
                                        sgst_amount: 0,
                                        total_amount: 0,
                                      }
                                    )
                                  }
                                >
                                  Add Item
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      />

                      <br />
                      <div id="pototal">
                        <label>Total Amount</label> &nbsp;
                        <input
                          type="text"
                          name="grand_total"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.grand_total}
                          error={props.errors.grand_total}
                        />
                      </div>
                      <br />
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
                          onClick={props.handleSubmit}
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
