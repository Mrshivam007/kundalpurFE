// import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
// import "../../../../../../assets/styles/Table.css";
import {
  fetchSupplierReturnList,
  fetchSupplierReturnListUps,
  purchaseOrderSelector,
  setSelectedRow,
} from "../../../../../reducers/purchase_order/PurchaseOrderSlice";
import { Po_Return_Sup } from "../form/Po_Return_Sup";
import { View_PoSu } from "../view/View_PoSu";
export default function PurchaseOrderList() {
  const childRef = useRef();
  const dispatch = useDispatch();
  //const po = useSelector(poSelector);
  const po = useSelector((state) => state.purchaseOrder);
  const [poData, setPoData] = useState(null);

  const handleShowModal = () => {
    childRef.current.showAlert();
  };

  const selectedRow = (e) => {
    dispatch(setSelectedRow(e));
  };

  // const supplierData = useSelector(purchaseOrderSelector);
  // const { supplierReturnListsUp } = supplierData || {};

  // console.log("preturnpo", supplierReturnListsUp);
  // console.log("po", po);

  return (
    <>
      <div className="wrapper_abc">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Sn</th>
              <th>PO Code</th>
              <th>PO Date</th>
              <th>Supplier</th>
              <th>Item Count</th>
              <th>Amount</th>
              <th>Exp date</th>
              <th>Remark</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Paid</th>
              <th>Balance</th>
              <th className="sticky-col first-col" id="acts">
                Action
              </th>
            </tr>
          </thead>
          <tbody>            
            {po &&
              po.purchaseSupplierOrderList &&
              po.purchaseSupplierOrderList &&
              po.purchaseSupplierOrderList.map((po1, index) => (
                <tr id="{index}">
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        selectedRow(po1.id);
                      }}
                    />
                  </td>
                  <td>
                    {po?.rowPerPage === "20"
                      ? po?.currentPage * 20 - 20 + index + 1
                      : po?.currentPage * 15 - 15 + index + 1}
                  </td>
                  <td>{po1?.po_code}</td>
                  <td>{moment(po1?.created_at).format("DD-MM-YYYY")}</td>
                  <td>{po1?.supplier?.supplier_name}</td>
                  <td>{po1?.order_list?.length}</td>
                  <td>{po1?.grand_total}</td>
                  <td>{po1?.exp_arr_date}</td>
                  <td>{po1?.remark}</td>
                  <td>{po1?.po_status}</td>
                  <td>{po1?.created_by?.full_name}</td>
                  <td>
                    {po1.voucher
                      .reduce(
                        (n, { payment_amount }) =>
                          parseFloat(n) + parseFloat(payment_amount),
                        0
                      )
                      .toFixed(2)}
                  </td>
                  <td>
                    {po1.grand_total
                      ? parseFloat(
                          (
                            parseFloat(po1.grand_total) -
                            po1.voucher.reduce(
                              (n, { payment_amount }) =>
                                parseFloat(n) + parseFloat(payment_amount),
                              0
                            )
                          ).toFixed(4)
                        )
                      : "0"}
                  </td>
                  <td className="sticky-col first-col">
                    <div className="row">
                      <div className="col-md-2">
                        <View_PoSu po={po1} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {poData && <Po_Return_Sup po={poData} ref={childRef} />}
      </div>
    </>
  );
}
