import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Config from "../../../../../../../../config/config"
// import { authSelector } from "../../../../../../reducers/auth/AuthSlice";
import {
  fetchSupplierReturnList,
  purchaseOrderSelector,
} from "../../../../../reducers/purchase_order/PurchaseOrderSlice";
import { Po_Return } from "./Po_Return";

export const View_Pr_Bra = ({ ...props }) => {
  // console.log('props',props);
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(1);
  const [selectedBranch, setSelectedBranch] = useState({});
  const supplierData = useSelector(purchaseOrderSelector);
  const { supplierReturnList } = supplierData || {};
  const auth = useSelector(authSelector);
  const [gstOption, setGstOption] = useState({
    igst: false,
    cgst: false,
    sgst: false,
  });

  const handleClose = () =>
  {
    setShow(false);
    setIndex(1)
  }
  const dispatch = useDispatch();
  const handleShow = () =>
  {
    setShow(true);
    setIndex(1);
    searchSupplier(props?.po?.branch?.id);
    const payload = props?.po?.id;
    dispatch(fetchSupplierReturnList(payload));
  };

  const searchSupplier = async (supplierId) =>
  {
    if (supplierId > 0) {
      try {
        const response = await axios.get(
          Config.apiUrl + "master/branch/retrieve/" + supplierId,

          {
            headers: {
              Authorization: `Token ${ auth.token }`,
            },
          }
        );
        setSelectedBranch(response.data);
      } catch (e) { }
    }
  };
  useEffect(() =>
  {
    if (props?.po?.delivery_location?.id && selectedBranch) {
      let fromState = selectedBranch?.branch_city?.state?.id.toString();
      let toState = props?.po?.delivery_location?.id;
      if (fromState == toState) {
        setGstOption({ igst: false, cgst: true, sgst: true });
      } else {
        setGstOption({ igst: true, cgst: false, sgst: false });
      }
    }
  }, [props?.po?.delivery_location?.id, selectedBranch]);
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        class="bi bi-eye-fill"
        viewBox="0 0 16 16"
        onClick={handleShow}
      >
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      </svg>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Purchase Return Branch </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mainContainer">
            <ul class="nav nav-pills" id="navpillss_1">
              <li>
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
                  href="#Pr"
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
                  &nbsp;Purchase Return
                </a>
              </li>
            </ul>

            <div class="tab-content clearfix">
              <div class="tab-pane active" id="Sp">
                <hr />
                <br />
                <div class="row">
                  <div class="col-md-12">
                    <strong>Branch : </strong>
                    {props.po?.branch?.branch_name}
                  </div>
                  <div class="col-md-12">
                    <strong>Total Item : </strong>
                    {props?.po?.order_list?.length}
                  </div>
                  <div class="col-md-12">
                    <strong>Total Amount : </strong>
                    {props?.po?.grand_total}
                  </div>
                  <div class="col-md-12">
                    <strong>Expected arrival date : </strong>
                    {moment(props?.po?.exp_arr_date).format("DD-MM-YYYY")}  
                  </div>
                  <div class="col-md-12">
                    <strong>Status : </strong>
                    {props?.po?.po_status}
                  </div>
                </div>
              </div>

              <div class="tab-pane" id="Pr">
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
                          <th>Received Quantity</th>
                          <th>Return Quantity</th>
                          <th>Balance Quantity</th>
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
                          <th>Return Amount</th>
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

                              <td>
                                {item?.item_recieve.reduce(
                                  (n, { recieve_quantity }) =>
                                    n + recieve_quantity,
                                  0
                                )}
                              </td>
                              <td>
                                {item?.item_return?.length > 0
                                  ? item?.item_return.map((x, i) =>
                                  {
                                    return x.return_quantity + ",";
                                  })
                                  : "0"}
                              </td>
                              <td>
                                {item?.item_return.length > 0
                                  ? item?.item_recieve.reduce(
                                    (n, { recieve_quantity }) =>
                                      n + recieve_quantity,
                                    0
                                  ) -
                                  item?.item_return.reduce(
                                    (n, { return_quantity }) =>
                                      n + return_quantity,
                                    0
                                  )
                                  : 0}
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
                                {item?.return_amount
                                  ? item?.return_amount
                                  : 0.0}
                              </td>
                              <td>                              
                                <Po_Return item={item} />
                              </td>
                            </tr>
                          ))}
                        <tr>
                          <td colSpan={gstOption.igst == true ? 12 : 14}>Projected Total Amount</td>
                          <td>{props?.po?.grand_total}</td>
                          <td>{props?.po?.return_grand_total}</td>
                        </tr>
                        <tr></tr>
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
