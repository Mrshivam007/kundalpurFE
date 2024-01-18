import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import "../../../../../../assets/styles/Table.css";
import { Delete } from "../delete/Delete";
import { setSelectedRow } from "../../../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";
import { Create_Payment } from "../form/Create_Payment";
import { Update_PO } from "../form/Update_PO";
import { View_PoSu } from "../view/View_PoSu";
export default function PurchaseOrderList() {
  const childRef = useRef();
  const dispatch = useDispatch();
  //const po = useSelector(poSelector);
  const allpo = useSelector((state) => state.purchaseOrder);
  //  console.log("ghjgjhg=-9--=",allpo);
  const [poData, setPoData] = useState(null);

  const handleShowModal = () => {
    childRef.current.showAlert();
  };

  const selectedRow = (e) => {
    dispatch(setSelectedRow(e));
  };

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
              <th>Exp date</th>
              <th>Remark</th>
              <th>Status</th>
              <th>Created By</th>
              <th>Projected Amount</th>
              <th>Total Amount</th>
              <th>Paid</th>
              <th>Balance</th>
              <th className="sticky-col first-col" id="acts">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allpo &&
              allpo.purchaseSupplierOrderList &&
              allpo.purchaseSupplierOrderList &&
              allpo.purchaseSupplierOrderList.map((po, index) => {
                const newActualGrandTotal =
                  po?.actual_grand_total === null ? 0 : po?.actual_grand_total;
                return (
                  <tr id="{index}">
                    <td>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          selectedRow(po.id);
                        }}
                      />
                    </td>
                    <td>
                      {allpo?.rowPerPage === "20"
                        ? allpo?.currentPage * 20 - 20 + index + 1
                        : allpo?.currentPage * 15 - 15 + index + 1}
                    </td>
                    <td>{po?.po_code}</td>
                    <td>{moment(po?.created_at).format("DD-MM-YYYY")}</td>
                    <td>{po?.supplier?.supplier_name}</td>
                    <td>{po?.order_list?.length}</td>
                    <td>{po?.exp_arr_date}</td>
                    <td>{po?.remark}</td>
                    <td>{po?.po_status}</td>
                    <td>{po?.created_by?.full_name}</td>
                    <td>{po?.grand_total}</td>

                    <td>
                      {po?.actual_grand_total === null
                        ? 0
                        : po?.actual_grand_total}
                    </td>
                    <td>
                      {po.voucher
                        .reduce(
                          (n, { payment_amount }) =>
                            parseFloat(n) + parseFloat(payment_amount),
                          0
                        )
                        .toFixed(2)}
                    </td>
                    <td>
                      {parseFloat(
                        (
                          parseFloat(newActualGrandTotal) -
                          po.voucher.reduce(
                            (n, { payment_amount }) =>
                              parseFloat(n) + parseFloat(payment_amount),
                            0
                          )
                        ).toFixed(4)
                      )}
                    </td>
                    <td className="sticky-col first-col">
                      <div className="row">
                        <div className="col-md-1">
                          {po.grand_total ? (
                            parseFloat(po.grand_total) -
                              po.voucher.reduce(
                                (n, { payment_amount }) =>
                                  parseFloat(n) + parseFloat(payment_amount),
                                0
                              ) ===
                            0 ? null : (
                              <Create_Payment po={po} />
                            )
                          ) : null}
                        </div>

                        <div className="col-md-1">
                          <View_PoSu po={po} />
                        </div>

                        <div className="col-md-1">
                          <Update_PO po={po} ref={childRef} />
                        </div>

                        <div className="col-md-1">
                          <Delete po={po} />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
