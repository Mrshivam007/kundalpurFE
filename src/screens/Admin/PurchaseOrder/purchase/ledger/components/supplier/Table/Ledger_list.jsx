// import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
// import "../../../../../../assets/styles/Table.css";
import { ledgerSelector } from "../../../../../reducers/ledger/LedgerSlice";
import { pvSelector } from "../../../../../reducers/pv/PvSlice";
export default function Ledger_list() {
  const pv = useSelector(ledgerSelector);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Sn.</th>
            <th>Party Name</th>
            <th>Voucher</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Credit</th>
            <th>Balance</th>
            <th>Remark</th>
          </tr>
        </thead>
        <tbody>
          {pv &&
            pv.ledgerSupplierList &&
            pv.ledgerSupplierList.length > 0 &&
            pv.ledgerSupplierList.map((pv1, index) => {

              // const type = pv1.payment_type;
              // let balance_amount = 0;
              // if (type === "Advance Payment") {
              //   balance_amount =
              //     parseFloat(pv1?.total_amount) -
              //     parseFloat(pv1?.payment_amount);
              // } else {
              //   balance_amount = pv1.balance_amount;
              // }
              return (
                <tr>
                  <td>
                    {pv?.rowPerPage === "20"
                      ? pv?.currentPage * 20 - 20 + index + 1
                      : pv?.currentPage * 15 - 15 + index + 1}
                  </td>
                  <td>{pv1?.purchase_order?.supplier?.supplier_name}</td>
                  <td>{pv1?.tally_data?.tally_name}</td>
                  <td>{moment(pv1?.created_at).format("DD-MM-YYYY")}</td>
                  <td>{pv1.balance_amount}</td>
                  <td>{pv1?.payment_amount}</td>
                  <td>{pv1?.actual_balance_amount}</td>
                  <td>{pv1?.remark}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
