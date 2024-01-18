
import moment from "moment";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
// import './Tabl.css'

export default function Table() {


  return (
    <>
      <div className="wrapper_abc">
        <table>
          <thead>
            <tr>

              <th>Sn</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Emailid</th>
              <th>User Type</th>
            
             
              <th className="sticky-col first-col" id="acts">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>abc</td>
              <td>abc</td>
              <td>xyz</td>
              <td>qwe</td>
        
            </tr>
            
          </tbody>
        </table>
      </div>
    </>
  );
}
