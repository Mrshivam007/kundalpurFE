import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import Config from "../../../../../../constants/Config";
import { authSelector } from "../../../../../../reducers/auth/AuthSlice";
import { Item_Accept } from "./Item_Accept";
export const View_PoSu = (props) => {
  
  const [index, setIndex] = useState(1);
  const [show, setShow] = useState(false);
  const auth = useSelector(authSelector);
  const [selectedSupplier, setSelectedSupplier] = useState({});

  const handleClose = () => {
    setShow(false);
    setIndex(1);
  };
  const handleShow = () =>
  {
    setShow(true);
    searchSupplier(props?.po?.supplier?.id);
  }

  const [gstOption, setGstOption] = useState({
    igst: false,
    cgst: false,
    sgst: false,
  });
  
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
        setSelectedSupplier(response.data);
      } catch (e) {}
    }
  };

  useEffect(() => {

    if (props?.po?.delivery_location?.id && selectedSupplier) {

      let fromState = selectedSupplier?.city?.state?.id.toString();

      let toState = props?.po?.delivery_location?.id;

      if (fromState == toState) {

        setGstOption({ igst: false, cgst: true, sgst: true });

      } else {

        setGstOption({ igst: true, cgst: false, sgst: false });
        
      }
    }
  }, [props?.po?.delivery_location?.id, selectedSupplier]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-eye-fill"
        viewBox="0 0 16 16"
        onClick={()=>handleShow()}
      >
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      </svg>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Purchase Order # {props?.po.po_code}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mainContainer">
            <ul class="nav nav-pills" id="navpillss_1">
              <li style={{ marginLeft: "1%" }}>
                <a
                  href="#Sp"
                  data-toggle="tab"
                  className={`${index === 1 ? "active-tab" : "is-hidden"}`}
                  onClick={() => {
                    setIndex(1);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-person-lines-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                  </svg>
                  &nbsp;Supplier Details
                </a>
              </li>

              <li>
                <a
                  href="#PO"
                  data-toggle="tab"
                  className={`${index === 2 ? "active-tab" : "is-hidden"}`}
                  onClick={() => {
                    setIndex(2);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                  &nbsp;Purchase Order
                </a>
              </li>

              <li>
                <a
                  href="#L"
                  data-toggle="tab"
                  className={`${index === 3 ? "active-tab" : "is-hidden"}`}
                  onClick={() => {
                    setIndex(3);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-file-earmark-zip-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 9.438V8.5h1v.938a1 1 0 0 0 .03.243l.4 1.598-.93.62-.93-.62.4-1.598a1 1 0 0 0 .03-.243z" />
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-4-.5V2h-1V1H6v1h1v1H6v1h1v1H6v1h1v1H5.5V6h-1V5h1V4h-1V3h1zm0 4.5h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.109 0l-.93-.62a1 1 0 0 1-.415-1.074l.4-1.599V8.5a1 1 0 0 1 1-1z" />
                  </svg>
                  &nbsp;Ledger
                </a>
              </li>
            </ul>
            <div class="tab-content clearfix">
              <div class="tab-pane active" id="Sp">
                <hr />
                <br />
                <div class="row">
                  <div class="col-md-12">
                    <strong>Supplier : </strong>
                    {props.po?.supplier?.supplier_name}
                  </div>
                  <div class="col-md-6">
                    <strong>Total Item : </strong>
                    {props?.po?.order_list?.length}
                  </div>
                  <div class="col-md-6">
                    <strong>Total Amount : </strong>
                    {props?.po?.grand_total}
                  </div>
                  <div class="col-md-6">
                    <strong>Expected arrival date : </strong>
                    {props?.po?.exp_arr_date}
                  </div>
                  <div class="col-md-6">
                    <strong>Status : </strong>
                    {props?.po?.po_status}
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="PO">
                <hr />
                <br />
                <div className="row-table">
                  <div className="view_prints">
                    <table>
                      <thead>
                        <tr>
                          <th>Sn</th>
                          <th>Inventory Type</th>
                          <th>Item Line No</th>
                          <th>Item</th>
                          <th>PO Quantity</th>
                          <th>Balance Quantity</th>
                          <th>Received Quantity</th>
                          <th>Base Price</th>
                          <th>Dis %</th>
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
                          <th>Projected Amount</th>
                          <th>Actual Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.po.order_list &&
                          props.po.order_list.map((item, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item?.item_master?.items_type}</td>
                              <td>{item?.id}</td>
                              <td>
                                {item?.item_master?.item_name}
                                {item?.finish_product?.fp_name}
                              </td>
                              <td>{item?.quantity}</td>
                              <td>
                                {item?.balance_quantity
                                  ? item?.balance_quantity
                                  : 0}
                              </td>
                              <td>
                                {item?.item_recieve.length > 0
                                  ? item?.item_recieve.map((x, i) => {
                                      return x.recieve_quantity + ",";
                                    })
                                  : "0"}
                              </td>

                              <td>{item?.price}</td>
                              <td>{item?.discount_percent}</td>
                              <td>{item?.discount_amount}</td>
                              {gstOption.igst == true ? (
                                <>
                                  <td>{item?.igst_percent}</td>
                                  <td>{item?.igst_amount}</td>
                                </>
                              ) : (
                                <>
                                  <td>{item?.sgst_percent}</td>
                                  <td>{item?.sgst_amount}</td>
                                  <td>{item?.cgst_percent}</td>
                                  <td>{item?.cgst_amount}</td>
                                </>
                              )}

                              <td>{item?.total_amount}</td>
                              <td>
                                {item?.actual_total_amount
                                  ? item?.actual_total_amount
                                  : 0}
                              </td>
                              <td>
                                <Item_Accept item={item} poData={props.po} />
                                {/* <Po_Return item={item} /> */}
                              </td>
                            </tr>
                          ))}
                        <tr>
                          <td colSpan={gstOption.igst == true ? 12 : 14}>
                            Projected Total Amount
                          </td>
                          <td>{props?.po?.grand_total}</td>
                          <td>{props?.po?.actual_grand_total}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="L">
                <hr />
                <br />
                <div className="row-table">
                  <div className="view_prints">
                    <table>
                      <thead>
                        <tr>
                          <th>Sn</th>
                          <th>Voucher Code</th>
                          <th>Payment Mode</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.po.voucher &&
                          props.po.voucher.map((voucher, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{voucher?.pv_code}</td>
                              <td>{voucher?.payment_type}</td>
                              <td>{voucher?.payment_amount}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
