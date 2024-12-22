
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import axios from "axios";
import { serverInstance } from "../../../../../../../API/ServerInstance";


export default function Table() {

  const [department, setDepartment] = useState([]);

  // Fetch supplier data from API
  const fetchDepartments = async () => {
    try {
      const response = await serverInstance("store/get-departmentMaster", "get"); // Adjust the endpoint as required
      if (response.status) {
        setDepartment(response.data);
      } else {
        console.error("Failed to fetch supplier data:", response.msg);
      }
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);


  return (
    <>
      <div className="wrapper_abc">
        <table>
          <thead>
            <tr>
              <th>Sn</th>
              <th>Department Code</th>
              <th>Department Name</th>
              <th>Department Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {department.length > 0 ? (
              department.map((supplier, index) => (
                <tr key={supplier.id}>
                  <td>{index + 1}</td>
                  <td>{supplier.departmentName}</td>
                  <td>{supplier.departmentCode}</td>
                  <td>{supplier.departmentAddress}</td>
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
                <td colSpan="12">No department found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
