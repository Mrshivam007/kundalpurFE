import axios from "axios";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Config from "../../../../../../constants/Config";

import { useDispatch, useSelector } from "react-redux";

import { authSelector } from "../../../../../../reducers/auth/AuthSlice";
import { stateSelector } from "../../../../../../reducers/master/state/StateSlice";
import { branchSelector } from "../../../../../../reducers/master/branch/BranchSlice";
import {
  fetchPurchaseBranchOrderList,
  fetchPurchaseBranchOrderSearchList,
  fetchPurchaseOrderSearchList,
  updatePurchaseBranchOrder,
} from "../../../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";
import { Field, FieldArray, Formik } from "formik";
import Create_Item from "../../../../../master/item/components/form/Create_Item";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { citySelector } from "../../../../../../reducers/master/city/CitySlice";
import { poSelector } from "../../../../../../reducers/purchase/po/PoSlice";
import { itemSelector } from "../../../../../../reducers/master/item/ItemSlice";
import { useEffect } from "react";

const Schema = Yup.object().shape({
  branch: Yup.string().required("Required"),
  order_list: Yup.array().of(
    Yup.object().shape({
      item_master: Yup.string().required("Required"),
      items_type: Yup.string().required("Required"),
      quantity: Yup.number().required("Required"),
      price: Yup.number().required("Required"),

    })
  ),
});

export const Update_PO_Br = forwardRef((props, ref) =>
{
  const dispatch = useDispatch();

  /* Selectors */
  const auth = useSelector(authSelector);
  const state = useSelector(stateSelector);
  const city = useSelector(citySelector);
  const branch = useSelector(branchSelector);
  const item = useSelector(itemSelector);
  const po = useSelector(poSelector);

  /* Popup state */
  const [show, setShow] = useState(false);

  // useImperativeHandle(ref, () => ({
  //   showAlert2() {
  //     setShow(true);
  //   },
  // }));

  const [active, setActive] = useState(true);
  const [isLoad, setPlaceHolderLoader] = useState("Loading...");

  /* Multistep form state */
  const [progress, setProgress] = useState(0);

  /* Selected supplier state */
  const [selectedBranch, setSelectedBranch] = useState({});

  /* Selected items state */
  const [selectedItem, setSelectedItem] = useState([{}]);

  /* GST option */
  const [gstOption, setGstOption] = useState({
    igst: false,
    cgst: false,
    sgst: false,
  });

  /* Handling popup start */
  const handleClose = () => {
    setShow(false);
    setProgress(0);

    setSelectedBranch({});
    setSelectedItem([{}]);
  };
  const handleShow = () => {
    setShow(true);
    searchSupplier(props?.po?.branch?.id);
  };

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
  /* Today's date end */

  const dateCurrent = current.toLocaleDateString("en-CA");
  /* Searching selected brnach */
  const searchSupplier = async (supplierId) => {
    if (supplierId > 0) {
      try {
        const response = await axios.get(
          Config.apiUrl + "master/branch/retrieve/" + supplierId,

          {
            headers: {
              Authorization: `Token ${auth.token}`,
            },
          }
        );

        setSelectedBranch(response.data);
        setActive(false);
        setPlaceHolderLoader("");
      } catch (e) {
        setPlaceHolderLoader("");
      }
      setPlaceHolderLoader("");
    }
  };
  /* Searching selected supplier end */

  // if (!selectedBranch.id) {
  //   searchSupplier(props.po.branch.id);
  // }

  /* Searching selected item */
  const searchItem = async (id, index, p) => {
    if (id > 0) {
      const si = item.itemList.find((item) => item.id === parseInt(id));

      let sFp = [...selectedItem];
      let sItem = { ...sFp[index] };

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

      sFp[index] = sItem;
      setSelectedItem(sFp);
    }
  };
  /* Searching selected item end */
  /* Searching selected item end */
  const searchItems = async (id, index, p) => {
    selectedItem[index] = "";
    p.setFieldValue(`order_list.${index}.igst_percent`, "");
    p.setFieldValue(`order_list.${index}.igst_amount`, "");

    p.setFieldValue(`order_list.${index}.sgst_percent`, "");
    p.setFieldValue(`order_list.${index}.sgst_amount`, "");

    p.setFieldValue(`order_list.${index}.cgst_percent`, "");
    p.setFieldValue(`order_list.${index}.cgst_amount`, "");
    p.setFieldValue(`order_list.${index}.total_amount`, "");
    p.setFieldValue(`order_list.${index}.discount_percent`, "");
    p.setFieldValue(`order_list.${index}.discount_amount`, "");
    p.setFieldValue(`order_list.${index}.quantity`, 0);
    p.setFieldValue(`order_list.${index}.price`, "");
    p.setFieldValue(`order_list.${index}.item_master`, 0);
    p.setFieldValue(`order_list.${index}.item_recieve`, []);
    p.setFieldValue(`order_list.${index}.item_return`, []);
    p.setFieldValue(`order_list.${index}.actual_grand_total`, 0);
  };

  useEffect(() =>
  {
    let fromState = selectedBranch?.branch_city?.state?.id.toString();
    // console.log("hfgh====",selectedSupplier);
    let toState = props?.po.delivery_location.id;
    // console.log("gst ======",fromState, toState);
    if (fromState == toState) {
      setGstOption({ igst: false, cgst: true, sgst: true });
    } else {
      setGstOption({ igst: true, cgst: false, sgst: false });
    }
  }, [props?.po.delivery_location.id, selectedBranch])
  /* Searching GST Opt */
  const setGSTOpt = (deliveryLocation, props) => {
    let fromState = selectedBranch.place_of_supply.id;

    let toState = deliveryLocation;

    if (fromState == toState) {
      setGstOption({ igst: false, cgst: true, sgst: true });
    } else {
      setGstOption({ igst: true, cgst: false, sgst: false });
    }
  };

  /* Creating action */
  const update = (payload) => {
    if (payload.order_list.find((x) => x.item_master == null)) {
      toast("Please Select Item");
    } else {
      dispatch(updatePurchaseBranchOrder({ payload, toast })).then(() =>
        dispatch(
          fetchPurchaseBranchOrderSearchList({
            offset: 0,
            limit: 15,
            searchString: "",
          })
        )
      );
      dispatch(fetchPurchaseBranchOrderList());

      setSelectedBranch({});
      setSelectedItem([{}]);

      setProgress(0);

      setShow(false);
    }
  };

  /* Creating action end */

  const order_list = [];
  {
    props?.po?.order_list.map((item, index) => {
      order_list.push({
        id: item?.id,
        item_master: item.item_master?.id,
        items_type: item.item_master?.items_type,
        item_size: item.item_master?.item_size,
        item_color: item.item_master?.item_color?.color_name,
        item_unit: item.item_master?.item_unit.unit,
        quantity: item?.quantity,
        price: item?.price,
        discount_percent: item?.discount_percent,
        discount_amount: item?.discount_amount,
        igst_percent: item?.igst_percent,
        igst_amount: item?.igst_amount,
        cgst_percent: item?.cgst_percent,
        cgst_amount: item?.cgst_amount,
        sgst_percent: item?.sgst_percent,
        sgst_amount: item?.sgst_amount,
        total_amount: item?.total_amount,
        actual_total_amount: item?.actual_total_amount,
        item_return: item?.item_return,
        item_recieve: item?.item_recieve,
        balance_quantity: item?.balance_quantity,
      });
    });
  }

  /* Initial value */
  const initialValues = {
    order_list: order_list,
    id: props?.po?.id,
    grand_total: props?.po.grand_total,
    actual_grand_total: props?.po?.actual_grand_total,
    remark: props?.po.remark,
    description: props?.po?.description,
    branch: props?.po?.branch.id,
    delivery_location: props?.po.delivery_location.id,
    exp_arr_date: props?.po.exp_arr_date,
    po_status: props?.po?.po_status,
    actual_date: props?.po?.actual_date,
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-pencil"
        viewBox="0 0 16 16"
        onClick={() => handleShow()}
      >
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
      </svg>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={Schema}
          onSubmit={(values) => update(values)}
        >
          {(props) => (
            <>
              <form onSubmit={props.handleSubmit}>
                <Modal.Header closeButton>
                  <div className="title-subtitle">
                    <Modal.Title> Update Purchase Order</Modal.Title>
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
                                Branch Details
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
                                Products Details
                              </p>
                            </li>
                          </ul>
                          <hr />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Branch Name</label>
                            <select
                              name="branch"
                              placeholder="Branch"
                              onChange={(e) => {
                                props.handleChange("branch")(e);
                                searchSupplier(e.currentTarget.value);
                              }}
                              onBlur={props.handleBlur}
                              value={props.values.branch}
                              error={props.errors.branch}
                              class="form-control"
                              disabled
                            >
                              <option value="">Select Branch</option>
                              {branch &&
                                branch.branchList &&
                                branch.branchList.map((branch, index) => (
                                  <option id="{index}" value={branch.id}>
                                    {branch.branch_name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Branch Code</label>
                            <input
                              type="text"
                              placeholder={isLoad}
                              value={selectedBranch.branch_code}
                              class="form-control"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Branch add</label>
                            <input
                              placeholder={isLoad}
                              type="text"
                              value={selectedBranch.branch_add}
                              class="form-control"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Contact No.</label>
                            <input
                              placeholder={isLoad}
                              type="text"
                              value={selectedBranch.contact_no}
                              class="form-control"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>State</label>

                            <input
                              placeholder={isLoad}
                              type="text"
                              class="form-control"
                              value={selectedBranch?.branch_city?.city_name}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>City</label>

                            <input
                              placeholder={isLoad}
                              type="text"
                              value={
                                selectedBranch?.branch_city?.state?.state_name
                              }
                              class="form-control"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Delivery Date</label>
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
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Delivery State</label>

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
                              disabled
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
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Created By</label>

                            <input
                              type="text"
                              class="form-control"
                              readonly
                              value={auth.user.first_name}
                              disabled
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
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.remark}
                              error={props.errors.remark}
                            />
                          </div>
                        </div>
                        {/* <div className="col-md-6">
													<div class="form-group">
														<label>Description</label>
														<textarea
															rows="2"
															cols="45"
															name="description"
															onChange={props.handleChange}
															onBlur={props.handleBlur}
															value={props.values.description}
															error={props.errors.description}
														/>
													</div>
												</div> */}

                        <div className="col-md-3">
                          <div class="form-group">
                            <label> Status</label>
                            <select
                              name="po_status"
                              placeholder="po_status"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props?.values.po_status}
                              error={props?.errors.po_status}
                              class="form-control"
                            >
                              {Config.STATUS_CHOICE.map((choice, index) => (
                                <option value={choice}>{choice}</option>
                              ))}
                            </select>
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
                          disabled={active}
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
                      <div className="row">
                        <div className="col-md-9">
                          <div className="POform">
                            <ul class="nav">
                              <li class="nav-item">
                                <p
                                  aria-current="page"
                                  style={{
                                    color: "black",
                                    marginLeft: "-2.5rem",
                                  }}
                                >
                                  Branch Details
                                </p>
                              </li>

                              <li class="nav-item">
                                <p
                                  style={{
                                    color: "#07CD9E",
                                    marginLeft: "-1.50rem",
                                  }}
                                >
                                  Products Details
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
                                    <th>Inventory Type *</th>
                                    <th>Inventory Name *</th>
                                    <th>Inventory Size</th>
                                    <th>Inventory Color</th>
                                    <th>UOM</th>
                                    <th>Item Qty *</th>
                                    <th>Item Price *</th>
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
                                    (order, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>
                                            <select
                                              disabled={
                                                order?.item_recieve?.length ||
                                                order?.item_recieve > 0
                                              }
                                              className="item_input"
                                              name={`order_list.${index}.items_type`}
                                              value={
                                                props.values.order_list[index]
                                                  .items_type
                                              }
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
                                              disabled={
                                                order?.item_recieve?.length ||
                                                order?.item_recieve > 0
                                              }
                                              id={"keys"}
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
                                              props.values.order_list[index]
                                                .items_type ==
                                                "Finished Products"
                                                ? item.finisheditem.map(
                                                    (item) => (
                                                      <option
                                                        id="{index}"
                                                        value={item.id}
                                                      >
                                                        {item.item_name}
                                                      </option>
                                                    )
                                                  )
                                                : item &&
                                                  props.values.order_list[index]
                                                    .items_type ==
                                                    "Raw Materials"
                                                ? item.rawitem.map((item) => (
                                                    <option
                                                      id="{index}"
                                                      value={item.id}
                                                    >
                                                      {item.item_name}
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
                                                : null}
                                            </select>
                                          </td>
                                          <td>
                                            <Field
                                              disabled={
                                                order?.item_recieve?.length ||
                                                order?.item_recieve > 0
                                              }
                                              className="item_input"
                                              placeholder="Size"
                                              value={
                                                selectedItem[index] &&
                                                selectedItem[index].item_size
                                                  ? selectedItem[index]
                                                      .item_size
                                                  : props.values.order_list[
                                                      index
                                                    ].item_size
                                              }
                                            />
                                          </td>
                                          <td>
                                            <Field
                                              disabled={
                                                order?.item_recieve?.length ||
                                                order?.item_recieve > 0
                                              }
                                              className="item_input"
                                              placeholder="Color"
                                              value={
                                                selectedItem[index] &&
                                                selectedItem[index].item_color
                                                  ? selectedItem[index]
                                                      .item_color.color_name
                                                  : props.values.order_list[
                                                      index
                                                    ].item_color
                                              }
                                            />
                                          </td>
                                          <td>
                                            <Field
                                              disabled={
                                                order?.item_recieve?.length ||
                                                order?.item_recieve > 0
                                              }
                                              className="item_input"
                                              placeholder="UOM"
                                              value={
                                                selectedItem[index] &&
                                                selectedItem[index].item_unit
                                                  ? selectedItem[index]
                                                      .item_unit.unit
                                                  : props.values.order_list[
                                                      index
                                                    ].item_unit
                                              }
                                            />
                                          </td>

                                          <td>
                                            <Field
                                              disabled={
                                                order?.item_recieve?.length ||
                                                order?.item_recieve > 0
                                              }
                                              className="item_input"
                                              placeholder="Quantity"
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
                                              disabled={
                                                order?.item_recieve?.length ||
                                                order?.item_recieve > 0
                                              }
                                              className="item_input"
                                              placeholder="Price"
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
                                              disabled={
                                                order?.item_recieve?.length ||
                                                order?.item_recieve > 0
                                              }
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
                                              disabled={
                                                order?.item_recieve?.length ||
                                                order?.item_recieve > 0
                                              }
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
                                                  disabled={
                                                    order?.item_recieve
                                                      ?.length ||
                                                    order?.item_recieve > 0
                                                  }
                                                  readonly="true"
                                                  className="item_input"
                                                  placeholder="IGST %"
                                                  name={`order_list.${index}.igst_percent`}
                                                  value={
                                                    props.values.order_list[
                                                      index
                                                    ].igst_percent
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  disabled={
                                                    order?.item_recieve
                                                      ?.length ||
                                                    order?.item_recieve > 0
                                                  }
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
                                                  disabled={
                                                    order?.item_recieve
                                                      ?.length ||
                                                    order?.item_recieve > 0
                                                  }
                                                  readonly="true"
                                                  className="item_input"
                                                  placeholder="SGST %"
                                                  name={`order_list.${index}.sgst_percent`}
                                                  value={
                                                    props.values.order_list[
                                                      index
                                                    ].sgst_percent
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  disabled={
                                                    order?.item_recieve
                                                      ?.length ||
                                                    order?.item_recieve > 0
                                                  }
                                                  readonly="true"
                                                  className="item_input"
                                                  placeholder="SGST Amount"
                                                  name={`order_list.${index}.sgst_amount`}
                                                />
                                              </td>

                                              <td>
                                                <Field
                                                  disabled={
                                                    order?.item_recieve
                                                      ?.length ||
                                                    order?.item_recieve > 0
                                                  }
                                                  readonly="true"
                                                  className="item_input"
                                                  placeholder="CGST %"
                                                  name={`order_list.${index}.cgst_percent`}
                                                  value={
                                                    props.values.order_list[
                                                      index
                                                    ].cgst_percent
                                                  }
                                                />
                                              </td>
                                              <td>
                                                <Field
                                                  disabled={
                                                    order?.item_recieve
                                                      ?.length ||
                                                    order?.item_recieve > 0
                                                  }
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
                                              disabled={
                                                order?.item_recieve?.length ||
                                                order?.item_recieve > 0
                                              }
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
                                                    props.values.order_list[
                                                      index
                                                    ].total_amount
                                                );
                                              }}
                                              id="remove_icon"
                                            >
                                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                            </svg>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                              </table>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <br />
                                <button
                                  className="Add_FP"
                                  type="button"
                                  onClick={() =>
                                    arrayHelpers.insert(
                                      props.values.order_list.length,
                                      {
                                        item_master: null,
                                        quantity: 0,
                                        price: 0,
                                        discount_percent: 0,
                                        discount_amount: 0,
                                        igst_percent: 0,
                                        igst_amount: 0,
                                        cgst_percent: 0,
                                        cgst_amount: 0,
                                        sgst_percent: 0,
                                        sgst_amount: 0,
                                        total_amount: 0,
                                        item_recieve: [],
                                        item_return: [],
                                        actual_total_amount: 0,
                                        balance_quantity: 0,
                                      }
                                    )
                                  }
                                >
                                  Add Product
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
});
