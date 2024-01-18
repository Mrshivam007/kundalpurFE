import React, { useEffect } from 'react';

function AllTotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.cash_TOTAL_AMOUNT) {
          totalAmount = totalAmount + parseFloat(item?.cash_TOTAL_AMOUNT);
        }

        if (item?.cheque_TOTAL_AMOUNT) {
          totalAmount = totalAmount + parseFloat(item?.cheque_TOTAL_AMOUNT);
        }

        if (item?.bank_TOTAL_AMOUNT) {
          totalAmount = totalAmount + parseFloat(item?.bank_TOTAL_AMOUNT);
        }

        if (item?.item_TOTAL_AMOUNT) {
          totalAmount = totalAmount + parseFloat(item?.item_TOTAL_AMOUNT);
        }
      });
  }

  return (
    <>
      <>{totalAmount}</>
    </>
  );
}

export default AllTotal;
