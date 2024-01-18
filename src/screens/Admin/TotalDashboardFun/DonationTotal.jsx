import React from 'react';

function DonationTotal({ data }) {
  console.log('total calculate total', data);
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

export default DonationTotal;
