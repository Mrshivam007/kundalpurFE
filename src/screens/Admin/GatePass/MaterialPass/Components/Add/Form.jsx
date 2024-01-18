import React, { useState } from 'react'

import moment from "moment";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Formik } from 'formik';

const Form = () => {


    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(0);


    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setProgress(0);
    };



    return (
        <div>

            <Button variant="primary" onClick={handleShow} className="addbtn">
                +Add
            </Button>

            <Modal show={show} nHide={handleClose} animation={false}>


                <Modal.Header closeButton>
                    <div className="title-subtitle">
                        <Modal.Title> Create New Expense</Modal.Title>
                        <div className="date">{moment().format("DD/MM/YYYY hh:mm A")}</div>
                    </div>
                </Modal.Header>


                <Formik
                    initialValues={{
                        tally_data: "",
                        bill_no: "",
                        seller: "",
                        payment_amount: "",
                        supplier_type: "",
                        supplier_name: "",
                        bill_date: "",
                        transaction_date: "",
                        payment_type: "",
                        transaction_no: "",
                        remark: "",
                        branch_choice: "",
                        department_name: "",
                        invoice_remark: "",
                        invoice_amount: "",
                        invoice_no: "",
                        invoice_date: "",
                        company_master: "",
                        invoice_file: null,
                        transport: "",
                        frieght: "",
                        dispatch_date: "",
                        delivery_date: "",
                        consignment_no: "",
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
                                                            Expense Details
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
                                                <div className="col-md-3">
                                                    <div class="form-group">
                                                        <label>Company Location*</label>
                                                        <select
                                                            type="text"
                                                            class="form-control"
                                                            name="company_master"
                                                            onChange={(e) => {
                                                                handleChange("company_master")(e);
                                                                companyMasterHandler(e.currentTarget.value);
                                                            }}
                                                            onBlur={handleBlur}
                                                            value={values.company_master}
                                                            error={errors.company_master}
                                                        >
                                                            <option value="">Select Location</option>
                                                            {expenseOrder &&
                                                                po?.poLocation &&
                                                                po?.poLocation?.company_master &&
                                                                po?.poLocation?.company_master?.map(
                                                                    (comp, index) => (
                                                                        <option id={index} value={comp?.id}>
                                                                            {comp?.company_code}
                                                                        </option>
                                                                    )
                                                                )}
                                                        </select>
                                                        {errors.company_master && touched.company_master ? (
                                                            <div className="text-danger">
                                                                {errors.company_master}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div class="form-group">
                                                        <label>Supplier Type *</label>
                                                        <select
                                                            name="supplier_type"
                                                            placeholder="supplier type"
                                                            onChange={(e) => {
                                                                handleChange("supplier_type")(e);
                                                                searchSup(
                                                                    e.currentTarget.value,
                                                                    values.supplier_name
                                                                );
                                                            }}
                                                            onBlur={handleBlur}
                                                            value={values.supplier_type}
                                                            error={errors.supplier_type}
                                                            class="form-control"
                                                        >
                                                            <option values="">Select supplier type</option>
                                                            {expenseOrder &&
                                                                expenseOrder.suptype &&
                                                                expenseOrder.suptype.map(
                                                                    (expenseOrder, index) => (
                                                                        <option
                                                                            id="{index}"
                                                                            value={expenseOrder.supplier_type}
                                                                        >
                                                                            {expenseOrder.supplier_type}
                                                                        </option>
                                                                    )
                                                                )}
                                                        </select>
                                                        {touched.supplier_type && errors.supplier_type && (
                                                            <p className="text-danger text-sm">
                                                                {errors.supplier_type}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div class="form-group">
                                                        <label>Supplier Name *</label>
                                                        <select
                                                            type="text"
                                                            class="form-control"
                                                            name="seller"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.seller}
                                                            error={errors.seller}
                                                        >
                                                            <option value="">
                                                                {isLoads
                                                                    ? isLoads
                                                                    : suppliers.length == 0
                                                                        ? "No Data"
                                                                        : "Select Supplier Data"}
                                                            </option>

                                                            {suppliers &&
                                                                suppliers.map((supplier, index) => (
                                                                    <option value={supplier.id}>
                                                                        {supplier.supplier_name}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
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
                                                            <option value="">Select Department</option>
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
                                                <div className="col-md-3">
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

                                                <div className="col-md-3">
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

                                                <div className="col-md-3">
                                                    <div class="form-group">
                                                        <label>Payable amount *</label>
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            name="payment_amount"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            error={errors.payment_amount}
                                                            value={values.payment_amount}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-md-3">
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
                                                    <div className="col-md-3">
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
                                                <div className="col-md-4">
                                                    <div class="form-group">
                                                        <label>Payment/Voucher Date </label>
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
                                                <div className="col-md-4">
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
                                                        values.tally_data && values.payment_amount
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
                                                            Expense Details
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
                                                <div className="col-md-3">
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
                                                <div className="col-md-3">
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
                                                <div className="col-md-3">
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

        </div>
    )
}

export default Form