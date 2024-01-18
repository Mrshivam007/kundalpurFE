import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import "../../../../../../assets/styles/Table.css";
import { setSelectedRow } from "../../../../../../reducers/purchase/purchase_order/PurchaseOrderSlice";
import { Delete } from "../delete/Delete";
import { Create_PaY_Bra } from "../form/Create_PaY_Bra";
import { Update_PO_Br } from "../form/Update_PO_Br";
import { View_PO_Br } from "../view/View_PO_Br";
export default function PurchaseOrderList() {
  const childRefTwo = useRef();
  const dispatch = useDispatch();
  const allpo = useSelector((state) => state.purchaseOrder);
  const [poData, setPoData] = useState(null);

  const handleShowModal = () => {
    childRefTwo.current.showAlert2();
  };
  const selectedRow = (e) => {
    dispatch(setSelectedRow(e));
  };
  return (
    <>
      {/* <p>{JSON.stringify(po)}</p> */}
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
              <th>Branch</th>
              {/* <th>Description</th> */}
              <th>Item Count</th>
              <th>Amount</th>
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
              allpo.purchaseBranchOrderList &&
              allpo.purchaseBranchOrderList &&
              allpo.purchaseBranchOrderList.map((po, index) =>     
              {
                const newActualGrandTotal = po?.actual_grand_total === null ? 0 : po?.actual_grand_total
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
                  <td>{moment(po.created_at).format("DD-MM-YYYY")}</td>
                  <td>{po?.branch?.branch_name}</td>
                  {/* <td>{po?.description}</td> */}
                  <td>{po?.order_list?.length}</td>
                  <td>{po?.grand_total}</td>
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
                    {po.voucher.reduce(
                      (n, { payment_amount }) =>
                        parseFloat(n) + parseFloat(payment_amount),
                      0
                    )}
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
                            <Create_PaY_Bra po={po} />
                          )
                        ) : null}
                      </div>

                      <div className="col-md-1">
                        <View_PO_Br po={po} />
                      </div>

                      <div className="col-md-1">
                            <Update_PO_Br po={po} />
                      </div>

                      <div className="col-md-1">
                        <Delete po={po} />
                      </div>
                    </div>
                  </td>
                </tr>
                )
              })}
          </tbody>
        </table>     
      </div>
    </>
  );
}
