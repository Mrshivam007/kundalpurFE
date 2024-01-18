
import moment from "moment";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";

export default function Table() {


  return (
    <>
      <div className="wrapper_abc">
        <table>
          <thead>
            <tr>

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
            <tr>
              <td>a</td>
              <td>2</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>9</td>
              <td>0</td>
              <td>9</td>
              <td>9</td>
              <td>8</td>
              <td>7</td>


            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
