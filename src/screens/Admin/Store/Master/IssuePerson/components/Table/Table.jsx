import React from "react";

export default function Table({ suppliers }) {  
  return (
    <div className="wrapper_abc">
      <table>
        <thead>
          <tr>
            <th>Sn</th>
            <th>Issue Person Name</th>
            <th>Added By</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier, index) => (
              <tr key={supplier.id}>
                <td>{index + 1}</td>
                <td>{supplier.issuePersonName}</td>
                <td>{supplier.ADDED_BY}</td>
                <td>{supplier.createdAt}</td>
                <td>
                  <button
                    onClick={() => {
                      console.log(`Edit supplier ${supplier.id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
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
              <td colSpan="6">No suppliers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
