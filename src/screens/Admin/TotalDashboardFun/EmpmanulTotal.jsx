import React from 'react';

function EmpmanulTotal({ data }) {
  console.log('total employee nnanual total', data);
  return (
    <>
      <span>
        ₹
        {data
          ? data.reduce((n, { total }) => parseFloat(n) + parseFloat(total), 0)
          : '0'}.00
      </span>
    </>
  );
}

export default EmpmanulTotal;
