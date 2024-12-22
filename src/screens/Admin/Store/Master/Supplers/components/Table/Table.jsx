
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import axios from "axios";
import { serverInstance } from "../../../../../../../API/ServerInstance";


export default function Table() {

  const [suppliers, setSuppliers] = useState([]);

  // Fetch supplier data from API
  const fetchSuppliers = async () => {
    try {
      const response = await serverInstance("store/get-supplierMaster", "get"); // Adjust the endpoint as required
      if (response.status) {
        setSuppliers(response.data);
      } else {
        console.error("Failed to fetch supplier data:", response.msg);
      }
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchSuppliers();
  }, []);


  return (
    <>
      <div className="wrapper_abc">
        <table>
          <thead>
            <tr>
              <th>Sn</th>
              <th>Supplier Name</th>
              <th>Address</th>
              <th>Mobile No</th>
              <th>GST No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length > 0 ? (
              suppliers.map((supplier, index) => (
                <tr key={supplier.id}>
                  <td>{index + 1}</td>
                  <td>{supplier.supplierName}</td>
                  <td>{supplier.address}</td>
                  <td>{supplier.mobileNo}</td>
                  <td>{supplier.gstNo}</td>
                  <td>
                    <button
                      onClick={() => {
                        // Add your edit action here
                        console.log(`Edit supplier ${supplier.id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        // Add your delete action here
                        console.log(`Delete supplier ${supplier.id}`);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">No suppliers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
