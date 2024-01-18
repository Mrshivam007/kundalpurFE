import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../../../../assets/styles/Form.css";
import { toast } from "react-toastify";
import { pvSelector } from "../../../../../../reducers/purchase/pv/PvSlice";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { authSelector } from "../../../../../../reducers/auth/AuthSlice";
import { paymentmodeSelector } from "../../../../../../reducers/master/paymentmode/PaymentmodeSlice";
import { tallySelector } from "../../../../../../reducers/master/tally/TallySlice";
import {
  createPv,
  fetchPvSupplierSearchList,
} from "../../../../../../reducers/purchase/pv/PvSlice";
import Config from "../../../../../../constants/Config";
import { departmentSelector } from "../../../../../../reducers/master/department/DepartmentSlice";
import moment from "moment";
import axios from "axios";
import { citySelector } from "../../../../../../reducers/master/city/CitySlice";
import { transportSelector } from "../../../../../../reducers/master/transport/TransportSlice";
import {
  fetchPurchaseSupplierOrderList,
  getactualBalanceAmount,
  purchaseOrderSelector,
} from "../../../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";
import { fetchLedgerSupplierList } from "../../../../../../reducers/purchase/ledger/LedgerSlice";

export const Create_Payment = (props) =>
{
  const dispatch = useDispatch();
  const [file_1, setFile_1] = useState();
  /* Selectors */
  const auth = useSelector(authSelector);
  const transport = useSelector(transportSelector);
  const city = useSelector(citySelector);
  const pv = useSelector(pvSelector);
  const paymentMode = useSelector(paymentmodeSelector);
  const tallyData = useSelector(tallySelector);
  const department = useSelector(departmentSelector);
  const purchaseOrder = useSelector(purchaseOrderSelector);

  const [inAction, setAction] = useState(false);
  const [expense, setExpense] = useState([]);
  const [isLoad, setPlaceHolderLoader] = useState("");

  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showValue, setShowValue] = useState(false);
  const { actualBalanceAmount } = purchaseOrder || {};

  const Schema = Yup.object().shape({
    transaction_no: Yup.string().when("payment_mode", {
      is: true,
      then: Yup.string().required("Transaction No. is Required"),
    }),
    tally_data: Yup.string().ensure().required("Please enter your tally data"),
    bill_date: Yup.string().required("Please enter your billed date"),
    payment_amount: Yup.number().required("Please enter your payment amount"),
    payment_type: Yup.string()
      .ensure()
      .required("Please enter your payment type"),
  });

  const handleClose = () => {
    setShow(false);
    setProgress(0);
  };
  const handleShow = () => {
    const data = {
      id: props?.po?.id,
    };
    dispatch(getactualBalanceAmount(data));
    setShow(true);
  };

  const CompleteFormStep = (values) => {  

    if (!values.transaction_no && values.payment_mode != "1") {
      toast.error("Transaction Number Required ");
      return false;
    }

    if (
      parseFloat(values.payment_amount) > parseFloat(values.projected_amount) &&
      values.payment_type === "Advance Payment"
    ) {
      toast.error("Payment Amount can't me more than Projected Amount");
    } else if (
      parseFloat(values.payment_amount) > parseFloat(values.balance_amount) &&
      values.payment_type === "Current Payment"
    ) {
      toast.error("Payment Amount can't me more than balance Amount");
    } else {
      setProgress((cur) => cur + 1);
    }
  };
  const PrevStep = () => {
    setProgress((cur) => cur - 1);
  };
  const renderButton = () => {
    if (progress > 1) {
      return undefined;
    } else {
      return <Button onClick={CompleteFormStep} type="button"></Button>;
    }
  };
  const searchExp = async (type, dept) => {
    setPlaceHolderLoader("Loading...");
    if (type) {
      try {
        const response = await axios.get(
          Config.apiUrl +
            `master/tally/pv/list?branch__department_name__icontains=${dept}&branch_choice__iexact=` +
            type,
          {
            headers: {
              Authorization: `Token ${auth.token}`,
            },
          }
        );
        // setActive(false)
        setExpense(response?.data);
        setPlaceHolderLoader("");
      } catch (e) {
        setPlaceHolderLoader("");
      }
    }
  };
  const handleFileUpload_1 = (event) => {
    const selectedFile = event.target.files[0];
    setFile_1(selectedFile);
  };

  const create = (data) => {
    const floatPaymentamount = parseFloat(data.payment_amount);

    const floatInvoiceamount = data.invoice_amount
      ? parseFloat(data.invoice_amount)
      : 0;
    const floatFright = data.frieght ? parseFloat(data.frieght) : 0;
    if (inAction) {
      toast.warn("Already Submitted Please Wait");
      return;
    }
    if (parseFloat(data.invoice_amount) > parseFloat(data.total_amount)) {
      toast.error("Invoice Amount can't me more than Payable Amount");
    } else {
      let formData = new FormData();
      formData.append("tally_data", data.tally_data);
      // formData.append("bill_no", data.bill_no);
      formData.append("payment_amount", floatPaymentamount);
      formData.append("total_amount", data.total_amount);
      formData.append("balance_amount", data.balance_amount);
      formData.append("bill_date", data.bill_date);
      formData.append("department_name", data.department_name);
      formData.append("branch_choice", data.branch_choice);
      // formData.append("pv_code", data.pv_code);
      formData.append("payment_type", data.payment_type);
      formData.append("payment_mode", data.payment_mode);
      formData.append("transaction_no", data.transaction_no);
      formData.append("purchase_order", data.purchase_order);
      formData.append("remark", data.remark);
      formData.append("invoice_no", data.invoice_no);
      formData.append("invoice_date", data.invoice_date);
      formData.append("invoice_amount", floatInvoiceamount);
      file_1 && formData.append("invoice_file", file_1);
      formData.append("invoice_remark", data.invoice_remark);
      formData.append("consignment_no", data.consignment_no);
      formData.append("delivery_date", data.delivery_date);
      formData.append("dispatch_date", data.dispatch_date);
      formData.append("frieght", floatFright);
      formData.append("transport", data.transport);
      formData.append(
        "actual_balance_amount",
        actualBalanceAmount?.actual_balance_amount
      );

      // formData.append('contact_no',
      // 	data.contact_no);
      // formData.append('city_name',
      // 	data.city_name);
      formData.append("created_by", data.created_by);
      dispatch(createPv(formData)).then(() => {
        dispatch(fetchPvSupplierSearchList({ search_str: "" }));
        setShow(false);
        dispatch(fetchPurchaseSupplierOrderList());
        dispatch(fetchLedgerSupplierList());
        setProgress(0);
      });
    }
  };

  const newactualGrandTotal =
    props?.po?.actual_grand_total === null ? 0 : props?.po?.actual_grand_total;

  const paymentModeHandler = (e) => {
    if (e.target.value === "1") {
      setShowValue(true);
    } else {
      setShowValue(false);
    }
  };


  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-paypal"
        viewBox="0 0 16 16"
        onClick={handleShow}
      >
        <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.351.351 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91.379-.27.712-.603.993-1.005a4.942 4.942 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.687 2.687 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.695.695 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016c.217.124.4.27.548.438.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.873.873 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.352.352 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32.845-5.214Z" />
      </svg>
      <Modal show={show} onHide={handleClose} animation={false}>
        {/* <p>{JSON.stringify(item)}</p> */}
        <Modal.Header closeButton>
          <div className="title-subtitle">
            <Modal.Title> Create New Payment</Modal.Title>
            <div className="date">{moment().format("DD/MM/YYYY hh:mm A")}</div>
          </div>
        </Modal.Header>
        <Formik
          initialValues={{
            tally_data: "",
            // bill_no: "1",
            payment_amount: null,
            projected_amount: props?.po?.grand_total,
            total_amount: parseFloat(
              props?.po?.actual_grand_total === null
                ? 0
                : props?.po?.actual_grand_total
            ),
            balance_amount:
              parseFloat(newactualGrandTotal) -
              props.po.voucher.reduce(
                (n, { payment_amount }) =>
                  parseFloat(n) + parseFloat(payment_amount),
                0
              ),
            bill_date: "",
            Payment_Choice: "",
            payment_type: "",
            payment_mode: "",
            transaction_no: "",
            description: "",
            purchase_order: props?.po?.id,
            remark: "",
            branch_choice: "",
            department_name: "",
            invoice_remark: "",
            invoice_amount: "",
            invoice_no: "",
            invoice_date: "",
            invoice_file: null,
            transport: "",
            frieght: "",
            dispatch_date: "",
            delivery_date: "",
            consignment_no: "",
            actual_balance_amount: actualBalanceAmount?.actual_balance_amount,

            // contact_no: "",
            // city_name: "",
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
                              style={{
                                color: "#07CD9E",
                                marginLeft: "-2.5rem",
                              }}
                            >
                              Payment Details
                            </p>
                          </li>
                          <li class="nav-item">
                            <p
                              href="#"
                              style={{ color: "black", marginLeft: "-2.5rem" }}
                            >
                              Invoice Details
                            </p>
                          </li>
                        </ul>
                        <hr />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Payment Type *</label>
                            <select
                              name="payment_type"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.payment_type}
                              error={errors.payment_type}
                              class="form-control"
                            >
                              <option values="">Select Type</option>
                              {Config?.Payment_Choice?.map((choice, index) => (
                                <option
                                  value={choice}
                                  disabled={
                                    newactualGrandTotal === 0
                                      ? index === 0
                                      : "" || newactualGrandTotal > 0
                                      ? index === 1
                                      : ""
                                  }
                                >
                                  {choice}
                                </option>
                              ))}
                            </select>
                            {touched?.payment_type && errors?.payment_type && (
                              <p className="text-danger text-sm">
                                {errors?.payment_type}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Purchase Order Id</label>
                            <input
                              disabled
                              type="text"
                              class="form-control"
                              value={values.purchase_order}
                              readonly
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Supplier</label>
                            <input
                              disabled
                              type="text"
                              class="form-control"
                              value={props?.po?.supplier?.supplier_name}
                              readonly
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Department Name *</label>
                            <select
                              type="text"
                              class="form-control"
                              name="department_name"
                              onChange={(e) => {
                                handleChange("department_name")(e);
                                values.branch_choice = "";
                                setExpense([]);
                              }}
                              onBlur={handleBlur}
                              value={values.department_name}
                              error={errors.department_name}
                            >
                              <option value="">Select department</option>
                              {department &&
                                department.departmentList &&
                                department.departmentList.map(
                                  (department, index) => (
                                    <option
                                      id="{index}"
                                      value={department.department_name}
                                    >
                                      {department.department_name}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Expense Choice *</label>
                            <select
                              name="branch_choice"
                              onChange={(e) => {
                                handleChange("branch_choice")(e);
                                searchExp(
                                  e.currentTarget.value,
                                  values.department_name
                                );
                              }}
                              onBlur={handleBlur}
                              value={values.branch_choice}
                              error={errors.branch_choice}
                              class="form-control"
                            >
                              <option values="">Select Expense Choice</option>
                              {Config.Ledger_Choice.map((choice, index) => (
                                <option value={choice}>{choice}</option>
                              ))}
                            </select>
                            {touched.branch_choice && errors.branch_choice && (
                              <p className="text-danger text-sm">
                                {errors.branch_choice}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Tally Head *</label>
                            <select
                              class="form-control"
                              name="tally_data"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.tally_data}
                              error={errors.tally_data}
                            >
                              <option value="">
                                {isLoad
                                  ? isLoad
                                  : expense.length == 0
                                  ? "No Data"
                                  : "Select Tally Data"}
                              </option>
                              {expense &&
                                expense.map((tally, index) => (
                                  <option value={tally.id}>
                                    {tally.tally_name}
                                  </option>
                                ))}
                            </select>
                            {touched.tally_data && errors.tally_data && (
                              <p className="text-danger text-sm">
                                {errors.tally_data}
                              </p>
                            )}
                          </div>
                        </div>
                        {/* <div className="col-md-6">
                          <div class="form-group">
                            <label>Bill No</label>

                            <input
                              disabled
                              type="text"
                              class="form-control"
                              name="bill_no"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.bill_no}
                              error={errors.bill_no}
                            />
                          </div>
                        </div> */}
                        {values.payment_type === "Advance Payment" ? (
                          <div className="col-md-6">
                            <div class="form-group">
                              <label>Projected Amount</label>
                              <input
                                disabled
                                type="text"
                                class="form-control"
                                name="Projected_amount"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.projected_amount}
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Payable amount</label>
                            <input
                              disabled
                              type="text"
                              class="form-control"
                              name="total_amount"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.total_amount}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Balance amount</label>
                            <input
                              disabled
                              type="text"
                              class="form-control"
                              name="balance_amount"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.balance_amount}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Payment amount *</label>
                            <input
                              type="text"
                              class="form-control"
                              name="payment_amount"
                              onChange={(e) => {
                                handleChange("payment_amount")(e);
                              }}
                              onBlur={handleBlur}
                              value={values.payment_amount}
                              error={errors.payment_amount}
                            />
                            {touched.payment_amount &&
                              errors.payment_amount && (
                                <p className="text-danger text-sm">
                                  {errors.payment_amount}
                                </p>
                              )}
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Payment/Voucher Date *</label>
                            <input
                              type="date"
                              class="form-control"
                              name="bill_date"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.bill_date}
                              error={errors.bill_date}
                            />
                            {touched.bill_date && errors.bill_date && (
                              <p className="text-danger text-sm">
                                {errors.bill_date}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Payment Mode *</label>
                            <select
                              class="form-control"
                              name="payment_mode"
                              onChange={(e) => {
                                handleChange("payment_mode")(e);
                                paymentModeHandler(e);
                              }}
                              onBlur={handleBlur}
                              value={values.payment_mode}
                              error={errors.payment_mode}
                            >
                              <option value="">Select Payment Mode</option>
                              {paymentMode &&
                                paymentMode.paymentmodeList &&
                                paymentMode.paymentmodeList.map((pm, index) => (
                                  <option value={pm.id}>
                                    {pm.payment_type}
                                  </option>
                                ))}
                            </select>
                            {touched.payment_mode && errors.payment_mode && (
                              <p className="text-danger text-sm">
                                {errors.payment_mode}
                              </p>
                            )}
                          </div>
                        </div>
                        {showValue ? (
                          ""
                        ) : (
                          <div className="col-md-6">
                            <div class="form-group">
                              <label>Transaction Number *</label>
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
                        )}

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
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          className="B2"
                          onClick={() => CompleteFormStep(values)}
                          disabled={
                            values.tally_data &&
                            values.bill_date &&
                            values.payment_amount &&
                            values.payment_type
                              ? false
                              : true
                          }
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
                              Payment Details
                            </p>
                          </li>
                          <li class="nav-item">
                            <p
                              href="#"
                              style={{
                                color: "#07CD9E",
                                marginLeft: "-2.5rem",
                              }}
                            >
                              Invoice Details
                            </p>
                          </li>
                        </ul>
                        <hr />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Invoice Number</label>
                            <input
                              type="text"
                              class="form-control"
                              name="invoice_no"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.invoice_no}
                              error={errors.invoice_no}
                            />
                          </div>
                        </div>{" "}
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Invoice Date</label>
                            <input
                              type="date"
                              class="form-control"
                              name="invoice_date"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.invoice_date}
                              error={errors.invoice_date}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Invoice Amount</label>
                            <input
                              type="text"
                              class="form-control"
                              name="invoice_amount"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.invoice_amount}
                              error={errors.invoice_amount}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>File Upload</label>
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
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Remark</label>
                            <input
                              type="text"
                              class="form-control"
                              name="invoice_remark"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.invoice_remark}
                              error={errors.invoice_remark}
                            />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <h4>Transporter Details</h4>
                      <hr />

                      <div className="row">
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Transporter Name</label>
                            <select
                              type="text"
                              class="form-control"
                              name="transport"
                              onChange={(e) => {
                                handleChange("transport")(e);
                                values.to_city = "";
                                values.from_city = "";
                                values.contact_no = "";
                              }}
                              onBlur={handleBlur}
                              value={values.transport}
                              error={errors.transport}
                            >
                              <option value="">Select Transporter</option>
                              {transport.transportList &&
                                transport.transportList.results.map(
                                  (transport, index) => (
                                    <option id="{index}" value={transport.id}>
                                      {transport.transporter_name}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Contact Number</label>
                            <input
                              type="text"
                              disabled
                              value={
                                transport &&
                                values.transport &&
                                transport.transportList?.results.find(
                                  (x) => x.id == values.transport
                                ).contact_no
                              }
                              class="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>From City</label>
                            <input
                              type="text"
                              class="form-control"
                              value={
                                transport &&
                                values.transport &&
                                transport.transportList?.results.find(
                                  (x) => x.id == values.transport
                                )?.from_city?.city_name
                              }
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>To City</label>
                            <input
                              type="text"
                              disabled
                              class="form-control"
                              value={
                                transport &&
                                values.transport &&
                                transport.transportList?.results.find(
                                  (x) => x.id == values.transport
                                )?.to_city?.city_name
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Frieght</label>
                            <input
                              type="text"
                              class="form-control"
                              name="frieght"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.frieght}
                              error={errors.frieght}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Dispatch date</label>
                            <input
                              type="date"
                              class="form-control"
                              name="dispatch_date"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.dispatch_date}
                              error={errors.dispatch_date}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Delivery date</label>
                            <input
                              type="date"
                              class="form-control"
                              name="delivery_date"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.delivery_date}
                              error={errors.delivery_date}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Consignment Number</label>
                            <input
                              type="text"
                              class="form-control"
                              name="consignment_no"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.consignment_no}
                              error={errors.consignment_no}
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
};
