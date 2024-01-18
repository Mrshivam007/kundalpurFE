import React, { useState, forwardRef, useImperativeHandle } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import "../../../../../../assets/styles/Form.css";
import { toast } from "react-toastify";
import { updatePv } from "../../../../../reducers/pv/PvSlice";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
// import { authSelector } from "../../../../../../reducers/auth/AuthSlice";
// import { paymentmodeSelector } from "../../../../../../reducers/master/paymentmode/PaymentmodeSlice";
import { fetchPvSupplierSearchList } from "../../../../../reducers/pv/PvSlice";
import Config from "../../../../../../../../constants/Config";
// import { departmentSelector } from "../../../../../../reducers/master/department/DepartmentSlice";
import axios from "axios";
import { useEffect } from "react";
// import { transportSelector } from "../../../../../../reducers/master/transport/TransportSlice";

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

export const Update_Payment_Sup = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [file_1, setFile_1] = useState();
  /* Selectors */
  const auth = useSelector(authSelector);
  const paymentMode = useSelector(paymentmodeSelector);
  const transport = useSelector(transportSelector);
  const department = useSelector(departmentSelector);
  const [inAction, setAction] = useState(false);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(true);
  const [expense, setExpense] = useState([]);
  const [isLoad, setPlaceHolderLoader] = useState("");
  const [progress, setProgress] = useState(0);
  
  const [showValue, setShowValue] = useState(false);

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
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const handleFileUpload_1 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      const selectedFile = event.target.files[0];
      setFile_1(selectedFile);
    }
  };

  useEffect(() => {
    searchExp(
      props?.pv?.tally_data?.branch_choice,
      props?.pv?.tally_data?.branch?.department_name
    );
  }, [props]);

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
        //setActive(false)
        setExpense(response?.data);
        setPlaceHolderLoader("");
      } catch (e) {
        setPlaceHolderLoader("");
      }
    }
  };
  if (
    props?.pv?.tally_data?.branch?.department_name &&
    props?.pv?.tally_data?.branch_choice
  ) {
  }
  const Update = (data) => {
    if (inAction) {
      toast.warn("Already Submitted Please Wait");
      return;
    }

    if (parseFloat(data.invoice_amount) > parseFloat(data.payment_amount)) {
      toast.error("Invoice amount cannot be more than Payment Amount");
    } else {
      let formData = new FormData();
      formData.append("id", data.id);
      formData.append("payment_type", data.payment_type);
      formData.append("tally_data", data.tally_data);
      formData.append("payment_amount", data.payment_amount);
      formData.append("grand_total", data.grand_total);
      formData.append("total_amount", data.total_amount);
      formData.append("balance_amount", data.balance_amount);
      formData.append("bill_date", data.bill_date);
      formData.append("transaction_date", data.transaction_date);
      formData.append("payment_mode", data.payment_mode);
      formData.append("transaction_no", data.transaction_no);
      formData.append("purchase_order", data.purchase_order);
      formData.append("remark", data.remark);
      formData.append("invoice_no", data.invoice_no ? data.invoice_no : "");
      formData.append(
        "invoice_date",
        data.invoice_date ? data.invoice_date : ""
      );
      formData.append(
        "invoice_amount",
        data.invoice_amount ? data.invoice_amount : ""
      );
      file_1 && formData.append("invoice_file", file_1);
      formData.append(
        "invoice_remark",
        data.invoice_remark ? data.invoice_remark : ""
      );
      formData.append("transport", data.transport ? data.transport : "");
      formData.append("frieght", data.frieght ? data.frieght : "");
      formData.append(
        "dispatch_date",
        data.dispatch_date ? data.dispatch_date : ""
      );
      formData.append(
        "delivery_date",
        data.delivery_date ? data.delivery_date : ""
      );
      formData.append(
        "consignment_no",
        data.consignment_no ? data.consignment_no : ""
      );
      formData.append("created_by", data.created_by);
      dispatch(updatePv(formData)).then(() => {
        dispatch(fetchPvSupplierSearchList({ search_str: "" }));
        setShow(false);
        setProgress(0);
      });
    }
  };

  useEffect(() => {
    if (props?.pv?.payment_mode?.id === 1) {
      setShowValue(true);
    } else {
      setShowValue(false);
    }
  }, []);

  return (
    <>
      {/*    */}

      <Modal show={show} onHide={handleClose} animation={false}>
        {/* <p>{JSON.stringify(pv)}</p> */}
        <Modal.Header closeButton>
          <div className="title-subtitle">
            <Modal.Title> Payment</Modal.Title>
            <div className="date">30 june 2022 / 12:05pm</div>
          </div>
        </Modal.Header>
        <Formik
          initialValues={{
            id: props.pv?.id,
            tally_data: props?.pv?.tally_data?.id,
            // bill_no: props.pv?.bill_no,
            balance_amount: props?.pv?.balance_amount,
            payment_amount: props?.pv?.payment_amount,
            total_amount: props?.pv?.total_amount,
            grand_total: props?.pv?.purchase_order?.grand_total,
            bill_date: props?.pv?.bill_date,
            payment_type: props?.pv?.payment_type,
            payment_mode: props?.pv?.payment_mode?.id,
            transaction_no: props?.pv?.transaction_no,
            purchase_order: props.pv?.purchase_order?.id,
            remark: props?.pv?.remark,
            supplier_name: props?.pv?.purchase_order?.supplier.supplier_name,
            branch_choice: props?.pv?.tally_data?.branch_choice,
            department_name: props?.pv?.tally_data?.branch?.department_name,
            invoice_remark: props?.pv?.invoice_remark,
            invoice_amount: props?.pv?.invoice_amount,
            invoice_no: props?.pv?.invoice_no,
            invoice_date: props?.pv?.invoice_date,
            // invoice_file: props?.pv?.invoice_file,
            transport: props?.pv?.transport?.id,
            transaction_date: props?.pv?.transaction_date,
            frieght: props?.pv?.frieght,
            delivery_date: props?.pv?.delivery_date,
            dispatch_date: props?.pv?.dispatch_date,
            consignment_no: props?.pv?.consignment_no,
            created_by: auth && auth.user && auth.user.user_id,
          }}
          validationSchema={Schema}
          onSubmit={(values) => Update(values)}
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
                            <label>Payment Type</label>
                            <select
                              name="payment_type"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.payment_type}
                              error={errors.payment_type}
                              class="form-control"
                              disabled
                            >
                              <option values="">Select Type</option>
                              {Config.Payment_Choice.map((choice, index) => (
                                <option value={choice}>{choice}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Purchase Order Id</label>
                            <input
                              type="text"
                              name="purchase_order"
                              class="form-control"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.purchase_order}
                              error={errors.purchase_order}
                              readonly
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Supplier</label>
                            <input
                              type="text"
                              name="supplier_name"
                              class="form-control"
                              value={values.supplier_name}
                              error={errors.supplier_name}
                              readonly
                              disabled
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
                              value={values.department_name}
                              onBlur={handleBlur}
                              disabled
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
                            <label>Expense Choice*</label>
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
                              disabled
                            >
                              {Config.Ledger_Choice.map((choice, index) => (
                                <option value={choice}>{choice}</option>
                              ))}
                            </select>
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
                              disabled
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
                          </div>
                        </div>
                        {values.payment_type === "Advance Payment" ? (
                          <div className="col-md-6">
                            <div class="form-group">
                              <label>Projected Amount</label>
                              <input
                                disabled
                                type="text"
                                class="form-control"
                                name="grand_total"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.grand_total}
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
                              error={errors.total_amount}
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
                              error={errors.balance_amount}
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
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.payment_amount}
                              error={errors.payment_amount}
                              disabled
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div class="form-group">
                            <label>Payment/Voucher Date*</label>
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
                            <label>Payment Mode *</label>
                            <select
                              class="form-control"
                              name="payment_mode"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.payment_mode}
                              error={errors.payment_mode}
                              disabled
                            >
                              {paymentMode &&
                                paymentMode.paymentmodeList &&
                                paymentMode.paymentmodeList.map((pm, index) => (
                                  <option value={pm.id}>
                                    {pm.payment_type}
                                  </option>
                                ))}
                            </select>
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
                                disabled
                              />
                            </div>
                          </div>
                        )}
                        <div className="col-md-3">
                          <div class="form-group">
                            <label>Transaction date</label>
                            <input
                              type="date"
                              class="form-control"
                              name="transaction_date"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.transaction_date}
                              error={errors.transaction_date}
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
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.remark}
                              error={errors.remark}
                              disabled
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
                            <img
                              style={{ width: "100%", height: "10vh" }}
                              src={image ? image : props?.pv?.invoice_file}
                            />
                            <input
                              type="File"
                              class="form-control"
                              name="invoice_file"
                              onChange={handleFileUpload_1}
                              onBlur={handleBlur}
                              value={values.invoice_file}
                              error={errors.invoice_file}
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
                            <label>Contact Number*</label>
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
                            <label>From City*</label>
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
                            <label>To City*</label>
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
});
