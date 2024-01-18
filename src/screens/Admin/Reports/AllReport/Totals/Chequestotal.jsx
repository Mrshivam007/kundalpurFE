import React, { useEffect } from 'react';

function Chequestotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.cheque_TOTAL_AMOUNT) {
          totalAmount = totalAmount + cheque_TOTAL_AMOUNT;
        }
      });
  }

  return (
    <>
      <span>{totalAmount}</span>
    </>
  );
}

export default Chequestotal;
