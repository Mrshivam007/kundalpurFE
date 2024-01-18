import React, { useEffect } from 'react';

function ElecTotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.bank_TOTAL_AMOUNT) {
          totalAmount = totalAmount + parseFloat(item?.bank_TOTAL_AMOUNT);
        }
      });
  }

  return (
    <>
      <>{totalAmount}</>
    </>
  );
}

export default ElecTotal;
