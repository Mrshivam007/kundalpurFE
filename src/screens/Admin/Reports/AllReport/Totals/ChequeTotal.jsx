import React, { useEffect } from 'react';

function ChequeTotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.cheque_TOTAL_AMOUNT) {
          totalAmount = totalAmount + parseFloat(item?.cheque_TOTAL_AMOUNT);
        }
      });
  }

  return (
    <>
      <>{totalAmount}</>
    </>
  );
}

export default ChequeTotal;
