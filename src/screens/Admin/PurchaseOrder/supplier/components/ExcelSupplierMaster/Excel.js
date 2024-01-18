import React, { Component } from 'react';
import { useSelector } from "react-redux";
import exportFromJSON from 'export-from-json'
import { supplierSelector } from "../../../../../reducers/master/supplier/SupplierSlice";
import moment from "moment";

const fileName = 'download'
const exportType = 'xls'
export default function Excel() {
  const supplier = useSelector(supplierSelector);
  const ExportToExcel = () => {
    var data = [];
    supplier.supplierSearchList.results.map((supplier, index) => {
      data.push({
        "Supplier Code": supplier?.supplier_code,
        "Title": supplier?.title,
        "Supplier Name": supplier?.supplier_name,
        "Mobile NO": supplier?.contact_no,
        "Supplier GST": supplier?.gstin,
        "Email": supplier?.email,
         "Place Of Supply": supplier?.place_of_supply.state_name,
        "Billing Name": supplier?.billing_name,
        "Street/House": supplier?.street_h_n,
        "City": supplier?.city.city_name,
        "State": supplier?.city.state.state_name,
        "Postal Code": supplier?.postalcode,
        "Country": supplier?.country.country,
        "Suppliers Product": supplier?.suppliers_product,
        // "Description": supplier?.description,
        "Remark": supplier?.remark,
        "Created By": supplier?.created_by.full_name,
        "Created Date":moment(supplier?.created_at).format("DD-MM-YYYY hh:mm a") ,
      });
    });
    exportFromJSON({ data, fileName, exportType })
  }

  return (
    <div className="App">
      <header className="App-header" style={{ textAlign: 'center' }}>

        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" id='sg' class="bi bi-file-earmark-spreadsheet-fill" viewBox="0 0 16 16" onClick={()=>ExportToExcel()}>
          <path d="M6 12v-2h3v2H6z" />
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3V9z" />
        </svg>
      </header>
    </div>
  );
}