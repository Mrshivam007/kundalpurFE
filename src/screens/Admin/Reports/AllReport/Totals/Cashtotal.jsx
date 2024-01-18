import React, { useEffect } from 'react';

function Cashtotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.cash_TOTAL_AMOUNT) {
          totalAmount = totalAmount + parseFloat(item?.cash_TOTAL_AMOUNT);
        }
      });
  }

  return (
    <>
      <>{totalAmount}</>
    </>
  );
}

export default Cashtotal;
