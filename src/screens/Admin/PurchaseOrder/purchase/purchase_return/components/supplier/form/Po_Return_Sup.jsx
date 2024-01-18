import axios from "axios";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Config from "../../../../../../../../config/config";

import { useDispatch, useSelector } from "react-redux";

// import { authSelector } from "../../../../../../reducers/auth/AuthSlice";
import { itemSelector } from "../../../../../reducers/item/ItemSlice";
// import { stateSelector } from "../../../../../../reducers/master/state/StateSlice";
import { supplierSelector } from "../../../../../reducers/supplier/SupplierSlice";

import {
  createPORetrun,
  fetchPurchaseSupplierOrderSearchList,
} from "../../../../../reducers/purchase_order/PurchaseOrderSlice";

import { Field, FieldArray, Formik } from "formik";

import { toast } from "react-toastify";
import * as Yup from "yup";
// import { citySelector } from "../../../../../reducers/city/CitySlice";
import { poSelector } from "../../../../../reducers/po/PoSlice";
import { updatePurchaseSupplierOrder } from "../../../../../reducers/purchase_order/PurchaseOrderSlice";

const Schema = Yup.object().shape({
  supplier: Yup.string().required("Required"),
  pretrunpo_date: Yup.date()
    .required("Please enter your delivery date")
    .nullable()
    .default(undefined),
  preturnpo: Yup.array().of(
    Yup.object().shape({
      return_quantity: Yup.number().required("Required"),
    })
  ),
});

export const Po_Return_Sup = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  /* Selectors */
  const auth = useSelector(authSelector);
  const state = useSelector(stateSelector);
  const city = useSelector(citySelector);
  const supplier = useSelector(supplierSelector);
  const item = useSelector(itemSelector);
  const po = useSelector(poSelector);
  /* Popup state */
  const [show, setShow] = useState(true);

  useImperativeHandle(ref, () => ({
    showAlert() {
      setShow(true);
    },
  }));
  const [active, setActive] = useState(true);
  const [isLoad, setPlaceHolderLoader] = useState("Loading...");

  /* Multistep form state */
  const [progress, setProgress] = useState(0);

  /* Selected supplier state */
  const [selectedSupplier, setSelectedSupplier] = useState({});

  /* Selected items state */
  const [selectedItem, setSelectedItem] = useState([{}]);
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
  const handleShow = () => {
    setShow(true);
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
  /* Searching selected supplier */
  const searchSupplier = async (supplierId) => {
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
        setPlaceHolderLoader("");
        setSelectedSupplier(response.data);
        setActive(false);
      } catch (e) {
        setPlaceHolderLoader("");
      }
      setPlaceHolderLoader("");
    }
  };
  /* Searching selected supplier end */

  // if (!selectedSupplier.id) {
  //   searchSupplier(props?.po?.supplier?.id);
  // }
  /* Searching selected item */
  const searchItem = async (id, index, p) => {
    if (id > 0) {
      //const si = item.itemList.find((item) => item.id === parseInt(id));
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
            `preturnpo.${index}.igst_percent`,
            response.data.item_gst.gst_percent
          );
        } else {
          p.setFieldValue(
            `preturnpo.${index}.sgst_percent`,
            response.data.item_gst.gst_percent / 2
          );
          p.setFieldValue(
            `preturnpo.${index}.cgst_percent`,
            response.data.item_gst.gst_percent / 2
          );
        }
      } catch (e) {}

      sItems[index] = sItem;
      setSelectedItem(sItems);
    }
  };
  /* Searching selected item end */
  const searchItems = async (id, index, p) => {
    selectedItem[index] = "";
    p.setFieldValue(`preturnpo.${index}.igst_percent`, 0);
    p.setFieldValue(`preturnpo.${index}.igst_amount`, 0);

    p.setFieldValue(`preturnpo.${index}.sgst_percent`, 0);
    p.setFieldValue(`preturnpo.${index}.sgst_amount`, 0);

    p.setFieldValue(`preturnpo.${index}.cgst_percent`, 0);
    p.setFieldValue(`preturnpo.${index}.cgst_amount`, 0);
    p.setFieldValue(`preturnpo.${index}.total_amount`, 0);
    p.setFieldValue(`preturnpo.${index}.discount_amount`, 0);
    p.setFieldValue(`preturnpo.${index}.item_recieve`, 0);
    p.setFieldValue(`preturnpo.${index}.price`, 0);
    p.setFieldValue(`preturnpo.${index}.item_master`, "");
  };
  /* Searching GST Opt */
  const setGSTOpt = (deliveryLocation, props) => {
    let fromState = selectedSupplier.place_of_supply?.id;

    let toState = deliveryLocation;

    if (fromState == toState) {
      setGstOption({ igst: false, cgst: true, sgst: true });
    } else {
      setGstOption({ igst: true, cgst: false, sgst: false });
    }
  };

  /* Creating action */
  const create = (data) => {
    dispatch(createPORetrun({ data, toast })).then(() =>
      dispatch(
        fetchPurchaseSupplierOrderSearchList({
          offset: 0,
          limit: 15,
          searchString: "",
        })
      )
    );

    setSelectedSupplier({});
    setSelectedItem([{}]);

    setProgress(0);

    setShow(false);
  };
  /* Creating action end */

  const order_list = [];

  {
    props?.po?.order_list?.map((item, index) => {
      order_list.push({
        items: item?.item_master?.id,
        items_type: item.item_master?.items_type,
        item_size: item.item_master?.item_size,
        item_color: item.item_master?.item_color?.color_name,
        item_unit: item.item_master?.item_unit?.unit,
        // quantity: item?.quantity,
        item_recieve: item?.item_recieve?.reduce(
          (previousValue, currentValue, index) =>
            previousValue + currentValue.recieve_quantity,
          0
        ),
        price: item?.price,
        discount_percent: item?.discount_percent,
        discount_amount: item?.discount_amount,
        igst_percent: item?.igst_percent,
        igst_amount: item?.igst_amount,
        cgst_percent: item?.cgst_percent,
        cgst_amount: item?.cgst_amount,
        sgst_percent: item?.sgst_percent,
        sgst_amount: item?.sgst_amount,
        total_amount: 0,
        return_quantity: item?.return_quantity,
      });
    });
  }
  const initialValues = {
    preturnpo: order_list,
    purchaseorder: props?.po?.id,
    grand_total: 0,
    remark: props?.po?.remark,
    description: props?.po?.description,
    supplier: props?.po?.supplier?.id,
    delivery_location: props?.po?.delivery_location?.id,
    pretrunpo_date: props?.po?.pretrunpo_date,
    po_status: props?.po?.po_status,
    created_by: auth && auth.user && auth.user?.user_id,
  };

  const calculateByQuantity = (p, i, value) => {  

    if (value > p?.values?.preturnpo[i]?.item_recieve) {
      toast.error("Return qty can't be more than Receive qty");
      p.setFieldValue(`preturnpo.${ i }.total_amount`, 0);
    } else {
      let qty = value;
      let price = p.values.preturnpo[i].price;
      let discount_percent = p.values.preturnpo[i].discount_percent;

      let total_amount = qty * price;

      let discount_amount = (total_amount / 100) * discount_percent;
      p.setFieldValue(`preturnpo.${i}.discount_amount`, discount_amount);

      total_amount = total_amount - discount_amount;

      if (gstOption.igst == true) {
        let igst_percent = p.values.preturnpo[i].igst_percent;
        let igst_amount = (total_amount / 100) * igst_percent;
        p.setFieldValue(`preturnpo.${i}.igst_amount`, igst_amount);
        total_amount = total_amount + igst_amount;
      } else {
        let cgst_percent = p.values.preturnpo[i].cgst_percent;
        let cgst_amount = (total_amount / 100) * cgst_percent;
        p.setFieldValue(`preturnpo.${i}.cgst_amount`, cgst_amount);

        let sgst_percent = p.values.preturnpo[i].sgst_percent;
        let sgst_amount = (total_amount / 100) * sgst_percent;
        p.setFieldValue(`preturnpo.${i}.sgst_amount`, sgst_amount);

        total_amount = total_amount + cgst_amount + sgst_amount;
      }

      p.setFieldValue(`preturnpo.${i}.total_amount`, total_amount);
    }
  };

  const calculateByPrice = (p, i, value) =>
  {   
  
      let qty = p.values.preturnpo[i].return_quantity;
      let price = value;
      let discount_percent = p.values.preturnpo[i].discount_percent;

      /* Total amount */
      let total_amount = qty * price;

      /* Discount calculation */
      let discount_amount = (total_amount / 100) * discount_percent;
      p.setFieldValue(`preturnpo.${ i }.discount_amount`, discount_amount);

      /* Total after discount */
      total_amount = total_amount - discount_amount;

      /* GST calculation */
      if (gstOption.igst == true) {
        let igst_percent = p.values.preturnpo[i].igst_percent;
        let igst_amount = (total_amount / 100) * igst_percent;
        p.setFieldValue(`preturnpo.${ i }.igst_amount`, igst_amount);
        total_amount = total_amount + igst_amount;
      } else {
        let cgst_percent = p.values.preturnpo[i].cgst_percent;
        let cgst_amount = (total_amount / 100) * cgst_percent;
        p.setFieldValue(`preturnpo.${ i }.cgst_amount`, cgst_amount);

        let sgst_percent = p.values.preturnpo[i].sgst_percent;
        let sgst_amount = (total_amount / 100) * sgst_percent;
        p.setFieldValue(`preturnpo.${ i }.sgst_amount`, sgst_amount);

        total_amount = total_amount + cgst_amount + sgst_amount;
      }

      p.setFieldValue(`preturnpo.${ i }.total_amount`, total_amount);
    
    
  };

  const calculateByDiscount = (p, i, value) => {
    let qty = p.values.preturnpo[i].item_recieve;
    let price = p.values.preturnpo[i].price;
    let discount_percent = value;
    let total_amount = qty * price;

    let discount_amount = (total_amount / 100) * discount_percent;
    p.setFieldValue(`preturnpo.${i}.discount_amount`, discount_amount);

    total_amount = total_amount - discount_amount;

    if (gstOption.igst == true) {
      let igst_percent = p.values.preturnpo[i].igst_percent;
      let igst_amount = (total_amount / 100) * igst_percent;
      p.setFieldValue(`preturnpo.${i}.igst_amount`, igst_amount);
      total_amount = total_amount + igst_amount;
    } else {
      let cgst_percent = p.values.preturnpo[i].cgst_percent;
      let cgst_amount = (total_amount / 100) * cgst_percent;
      p.setFieldValue(`preturnpo.${i}.cgst_amount`, cgst_amount);

      let sgst_percent = p.values.preturnpo[i].sgst_percent;
      let sgst_amount = (total_amount / 100) * sgst_percent;
      p.setFieldValue(`preturnpo.${i}.sgst_amount`, sgst_amount);

      total_amount = total_amount + cgst_amount + sgst_amount;
    }

    p.setFieldValue(`preturnpo.${i}.total_amount`, total_amount);
  };

  const calculateGrandTotal = (p) => {
    const grand_total = p.values.preturnpo.reduce((accumulator, object) => {
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

  const handlerBlur = (props, index, e) => {
    // if (e.target.value > props?.values?.preturnpo[index]?.item_recieve) {
    //   toast.error("Return qty can't be more than Receive qty");
    // }
    // else if (props?.values?.preturnpo[index]?.item_recieve > 0) {
    //   const updateqty =
    //     props?.values?.preturnpo[index]?.item_recieve - e.target.value;
    //   props.setFieldValue(`preturnpo.${index}.item_recieve`, updateqty);
    //   calculateByQuantity(props, index, updateqty);
    // }
  };
  return (
    <>
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
                    <Modal.Title> Return Purchase Order</Modal.Title>
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
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Supplier Name</label>
                            <select
                              disabled
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
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Supplier Code</label>
                            <input
                              disabled
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
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Email</label>
                            <input
                              disabled
                              type="Email"
                              placeholder={isLoad}
                              value={selectedSupplier && selectedSupplier.email}
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Contact No.</label>
                            <input
                              disabled
                              type="text"
                              placeholder={isLoad}
                              value={
                                selectedSupplier && selectedSupplier.contact_no
                              }
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>State</label>

                            <input
                              disabled
                              type="text"
                              placeholder={isLoad}
                              class="form-control"
                              value={
                                selectedSupplier &&
                                selectedSupplier.city &&
                                selectedSupplier.city?.state?.state_name
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>City</label>
                            <input
                              disabled
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
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Return Date *</label>
                            <input
                              min={dateCurrent}
                              type="date"
                              class="form-control"
                              name="pretrunpo_date"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.pretrunpo_date}
                              error={props.errors.pretrunpo_date}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Delivery State</label>
                            <select
                              disabled
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
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Created By</label>
                            <input
                              disabled
                              type="text"
                              class="form-control"
                              readonly
                              value={auth.user.first_name}
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
                        <div className="col-md-3">
                          <div class="form-group">
                            <label> Status</label>
                            <select
                              disabled
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
                          disabled={
                            props?.values?.pretrunpo_date && !active
                              ? false
                              : true
                          }
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
                        {/* <div className="col-md-2" style={{}}>
													<Create_Item />
												</div> */}
                      </div>
                      <br />

                      <FieldArray
                        name="preturnpo"
                        render={(arrayHelpers) => (
                          <>
                            <div className="row-table">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>PO No</th>
                                    <th>Inventory Type</th>
                                    <th>Inventory Name</th>
                                    <th>Inventory Size</th>
                                    <th>Inventory Color</th>
                                    <th>UOM</th>
                                    <th>Received Qty</th>
                                    <th>Item Price</th>
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
                                    <th>Return Quantity *</th>
                                  </tr>
                                </thead>
                                {props?.values?.preturnpo &&
                                  props?.values?.preturnpo?.map(
                                    (preturnpo, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                          <select
                                            disabled
                                            className="item_input"
                                            name={`preturnpo.${index}.items_type`}
                                            value={
                                              props.values.preturnpo[index]
                                                .items_type
                                            }
                                            onChange={(e) => {
                                              props.handleChange(
                                                `preturnpo.${index}.items_type`
                                              )(e);
                                              searchItems(
                                                e.currentTarget.value,
                                                index,
                                                props
                                              );
                                            }}
                                          >
                                            <option values="">Select</option>
                                            {Config.Item_Type?.map(
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
                                            disabled
                                            id={"keys"}
                                            className="item_input"
                                            name={`preturnpo.${index}.item_master`}
                                            value={
                                              props.values.preturnpo[index]
                                                .items
                                            }
                                            onChange={(e) => {
                                              props.handleChange(
                                                `preturnpo.${index}.item_master`
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
                                            props.values.preturnpo[index]
                                              .items_type == "Finished Products"
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
                                                props.values.preturnpo[index]
                                                  .items_type == "Raw Materials"
                                              ? item.rawitem.map((item) => (
                                                  <option
                                                    id="{index}"
                                                    value={item.id}
                                                  >
                                                    {item.item_name}
                                                  </option>
                                                ))
                                              : null}
                                          </select>
                                        </td>
                                        <td>
                                          <Field
                                            disabled
                                            className="item_input"
                                            placeholder="Size"
                                            value={
                                              selectedItem[index] &&
                                              selectedItem[index].item_size
                                                ? selectedItem[index].item_size
                                                : props.values.preturnpo[index]
                                                    .item_size
                                            }
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            disabled
                                            className="item_input"
                                            placeholder="Color"
                                            value={
                                              selectedItem[index] &&
                                              selectedItem[index].item_color
                                                ? selectedItem[index].item_color
                                                    .color_name
                                                : props.values.preturnpo[index]
                                                    .item_color
                                            }
                                          />
                                        </td>
                                        <td>
                                          <Field
                                            disabled
                                            className="item_input"
                                            placeholder="UOM"
                                            value={
                                              selectedItem[index] &&
                                              selectedItem[index].item_unit
                                                ? selectedItem[index].item_unit
                                                    .unit
                                                : props.values.preturnpo[index]
                                                    .item_unit
                                            }
                                          />
                                        </td>

                                        <td>
                                          <Field
                                            disabled
                                            className="item_input"
                                            placeholder="Quantity"
                                            name={`preturnpo.${index}.item_recieve`}
                                            onBlur={() =>
                                              calculateGrandTotal(props)
                                            }
                                            onChange={(e) => {
                                              props.handleChange(
                                                `preturnpo.${index}.item_recieve`
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
                                            disabled
                                            className="item_input"
                                            placeholder="Price"
                                            name={`preturnpo.${index}.price`}
                                            onBlur={() =>
                                              calculateGrandTotal(props)
                                            }
                                            onChange={(e) => {
                                              props.handleChange(
                                                `preturnpo.${index}.price`
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
                                            disabled
                                            className="item_input"
                                            placeholder="Discount %"
                                            name={`preturnpo.${index}.discount_percent`}
                                            onBlur={() =>
                                              calculateGrandTotal(props)
                                            }
                                            onChange={(e) => {
                                              props.handleChange(
                                                `preturnpo.${index}.discount_percent`
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
                                            disabled
                                            readonly="true"
                                            className="item_input"
                                            placeholder="Dis. Amt."
                                            name={`preturnpo.${index}.discount_amount`}
                                          />
                                        </td>

                                        {gstOption.igst == true ? (
                                          <>
                                            <td>
                                              <Field
                                                disabled
                                                readonly="true"
                                                className="item_input"
                                                placeholder="IGST %"
                                                name={`preturnpo.${index}.igst_percent`}
                                                value={
                                                  props.values.preturnpo[index]
                                                    .igst_percent
                                                }
                                              />
                                            </td>
                                            <td>
                                              <Field
                                                disabled
                                                readonly="true"
                                                className="item_input"
                                                placeholder="IGST Amount"
                                                name={`preturnpo.${index}.igst_amount`}
                                              />
                                            </td>
                                          </>
                                        ) : (
                                          <>
                                            <td>
                                              <Field
                                                disabled
                                                readonly="true"
                                                className="item_input"
                                                placeholder="SGST %"
                                                name={`preturnpo.${index}.sgst_percent`}
                                                value={
                                                  props.values.preturnpo[index]
                                                    .sgst_percent
                                                }
                                              />
                                            </td>
                                            <td>
                                              <Field
                                                disabled
                                                readonly="true"
                                                className="item_input"
                                                placeholder="SGST Amount"
                                                name={`preturnpo.${index}.sgst_amount`}
                                              />
                                            </td>

                                            <td>
                                              <Field
                                                disabled
                                                readonly="true"
                                                className="item_input"
                                                placeholder="CGST %"
                                                name={`preturnpo.${index}.cgst_percent`}
                                                value={
                                                  props.values.preturnpo[index]
                                                    .cgst_percent
                                                }
                                              />
                                            </td>
                                            <td>
                                              <Field
                                                disabled
                                                readonly="true"
                                                className="item_input"
                                                placeholder="CGST Amount"
                                                name={`preturnpo.${index}.cgst_amount`}
                                              />
                                            </td>
                                          </>
                                        )}

                                        <td>
                                          <Field
                                            disabled
                                            readonly="true"
                                            className="item_input"
                                            placeholder="Total Amount"
                                            name={`preturnpo.${index}.total_amount`}
                                          />
                                        </td>

                                        <td>
                                          <Field
                                            className="item_input"
                                            placeholder="Return Qty"
                                            name={`preturnpo.${index}.return_quantity`}
                                            onChange={(e) => {
                                              props.handleChange(
                                                `preturnpo.${index}.return_quantity`
                                              )(e);
                                              handlerBlur(props, index, e);
                                              calculateByQuantity(
                                                props,
                                                index,
                                                e.currentTarget.value
                                              );
                                            }}
                                            onBlur={(e) =>
                                              calculateGrandTotal(props)
                                            }
                                          />
                                        </td>
                                      </tr>
                                    )
                                  )}
                              </table>
                            </div>
                          </>
                        )}
                      />

                      <br />
                      <div id="pototal">
                        <label>Total Amount</label> &nbsp;
                        <input
                          disabled
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
