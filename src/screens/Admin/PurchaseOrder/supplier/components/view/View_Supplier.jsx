import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchPaymentmodeList, paymentmodeSelector } from "../../../../../reducers/master/paymentmode/PaymentmodeSlice";

import "../../../../../assets/styles/Table.css";
import "../../../../../assets/styles/Table.css";
import { fetchSupplierById, fetchPoBySupplier } from '../../../../../reducers/master/supplier/SupplierSlice';
import { supplierSelector } from "../../../../../reducers/master/supplier/SupplierSlice";
import { tallySelector, fetchTallyList } from "../../../../../reducers/master/tally/TallySlice";

import moment from "moment";
export const View_Supplier = ({ ...props }) => {
  const [index, setIndex] = useState(1);
  const dispatch = useDispatch();
  const supplier = useSelector(supplierSelector);
  const paymentmode = useSelector(paymentmodeSelector);
  const tallyData = useSelector(tallySelector);
  const [show, setShow] = useState(false);
  const [po, setPoItem] = useState(null);
  const handleClose = () => {
    setShow(false)
    setIndex(1);
  };
  const handleShow = () => {
    dispatch(fetchPaymentmodeList());
    dispatch(fetchTallyList());
    dispatch(fetchPoBySupplier({ search_str: "&supplier_name=" + props.item.supplier_name }));
    setShow(true)
  }; 
  useEffect(() => {
    setPoItem(supplier?.supplierPoData?.results)
  }, [supplier]);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" onClick={handleShow}>
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      </svg>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Supplier Details</Modal.Title>
        </Modal.Header>
        <Modal.Body >

          <div className="mainContainer" >
            <ul class="nav nav-pills" id="navpillss_1">
              <li style={{ marginLeft: "1%" }} >
                <a href="#datiless" data-toggle="tab" 
                	className={`${index === 1 ? 'active-tab' : 'is-hidden'}`}
                  onClick={() => {
                    setIndex(1)
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                  </svg>&nbsp;Supplier Details</a>
              </li>
              <li>
                <a href="#poda" data-toggle="tab" 
                	className={`${index === 2 ? 'active-tab' : 'is-hidden'}`}
							onClick={() => {
								setIndex(2)
							}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>&nbsp;Purchase Order</a>
              </li>
              <li>
                <a href="#lager" data-toggle="tab" 
              	className={`${index === 3 ? 'active-tab' : 'is-hidden'}`}
							onClick={() => {
								setIndex(3)
							}} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-zip-fill" viewBox="0 0 16 16">
                  <path d="M5.5 9.438V8.5h1v.938a1 1 0 0 0 .03.243l.4 1.598-.93.62-.93-.62.4-1.598a1 1 0 0 0 .03-.243z" />
                  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-4-.5V2h-1V1H6v1h1v1H6v1h1v1H6v1h1v1H5.5V6h-1V5h1V4h-1V3h1zm0 4.5h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V8.5a1 1 0 0 1 1-1z" />
                </svg>&nbsp;Ledger</a>
              </li>
              {/* <li><a href="#payment" data-toggle="tab" style={{ color: "black" }} >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-paypal"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.351.351 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91.379-.27.712-.603.993-1.005a4.942 4.942 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.687 2.687 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.695.695 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016c.217.124.4.27.548.438.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.873.873 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.352.352 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32.845-5.214Z" />
                </svg>
                &nbsp;Payment</a>
              </li> */}
            </ul>
            <div class="tab-content clearfix">
              <div class="tab-pane active" id="datiless">
                <hr />
                <br/>
                <h6>Supplier Code  :- <span>{props?.item?.supplier_code}</span></h6>
                <h6>Title :- <span>{props?.item?.title}</span></h6>
                <h6>Supplier Name :- <span>{props?.item?.supplier_name}</span></h6>
                <h6>Email ID :- <span>{props?.item?.email}</span></h6>
                <h6>Contact No :-   <span>{props?.item?.contact_no}</span></h6>
                <h6>GSTIN No :-   <span>{props?.item?.gstin}</span></h6>
                <h6>Place of Supply :-   <span>{props?.item?.place_of_supply.state_name}</span></h6>
                <h6>Billing Address :-   <span>{props?.item?.billing_name}</span></h6>
                <h6>Street House No. :-   <span>{props?.item?.street_h_n}</span></h6>
                <h6>City :-   <span>{props?.item?.city.city_name}</span></h6>
                <h6>Postalcode :-   <span>{props?.item?.postalcode}</span></h6>
                <h6>Country :-   <span>{props?.item?.country.country}</span></h6>
                <h6>Suppliers Product :-   <span>{props?.item?.suppliers_product}</span></h6>
                <h6>Created Date :- <span>{moment(props?.item?.created_at).format("DD-MM-YYYY")} </span></h6>
                <h6>Created By :- <span>{props?.item?.created_by.email} </span></h6>
                <h6>Description :-   <span>{props?.item?.description}</span></h6>
                <h6>Remark :-   <span>{props?.item?.remark}</span></h6>
              </div>
              <div class="tab-pane" id="poda">
              <hr />
               
                {
                  po && po.map(x => {

                    return (
                      <>
                        {
                          x.order_list.map((item, index) => {
                            return (
                              <>
                              
                                <h4>Purchase Order :- {x.po_code} , &nbsp;&nbsp;Item ID :- {item?.id}</h4>

                                <table>
                                  <thead style={{ border: "1px solid #653D3DED" }}>

                                    <tr>

                                      <th>Item</th>
                                      <th>Quantity</th>
                                      <th>Base Price</th>
                                      <th>Dis %</th>
                                      <th>Discount Amount</th>
                                      <th>GST %	</th>
                                      <th>GST Amount</th>
                                      <th>Total Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody style={{ border: "1px solid #653D3DED" }}>
                                    <tr>
                                      <td>{item?.item_master.item_name}</td>
                                      <td>{item?.quantity}</td>
                                      <td>{item?.price}</td>
                                      <td>{item?.discount_percent}</td>
                                      <td>{item?.discount_amount}</td>
                                      <td>{item?.igst_percent}</td>
                                      <td>{item?.igst_amount}</td>
                                      <td>{item?.total_amount}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </>
                            )
                          })}</>)
                  })}
              </div>
              <div class="tab-pane" id="lager" >
              <hr />
                {
                  po && po.map(x => {
                    return (
                      <>
                        {
                          x.voucher.map((item, index) => {
                            return (
                              <>
                           
                                <h4>Ledger :- {item.pv_code} ,&nbsp;&nbsp;Date :- {moment(item.bill_date).format("DD-MM-YYYY")}  </h4>

                                <table>
                                  <thead style={{ border: "1px solid #653D3DED" }}>
                                    <tr>

                                      <th>Payment Type</th>
                                      <th>Transaction No.</th>
                                      <th>Department Name</th>
                                      <th>Expense</th>
                                      <th>Tally Head</th>
                                      <th>Bill No</th>
                                      <th>Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody style={{ border: "1px solid #653D3DED" }}>
                                    <tr>
                                      <td>{item?.payment_type}</td>
                                      <td>{item?.transaction_no}</td>
                                      <td>{item?.tally_data?.branch?.department_name}</td>
                                      <td>{item?.tally_data?.branch_choice}</td>
                                      <td>{item?.tally_data?.tally_name}</td>
                                      <td>{item?.bill_no}</td>
                                      <td>{item?.payment_amount}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </>)
                          })}
                      </>
                    )
                  })}

              </div>
              {/* <div class="tab-pane" id="payment">
                <hr />
                <h6>Payment Code  :- <span>{props?.item?.pv_code}</span></h6>
                <h6>Item :- <span></span></h6>
                <h6>Amount :- <span></span></h6>
                <h6>Supplier Name :- <span>{props?.item?.supplier_name}</span></h6>
                <h6>Remark :-   <span>{props?.item?.remark}</span></h6>
              </div> */}
            </div>
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
}