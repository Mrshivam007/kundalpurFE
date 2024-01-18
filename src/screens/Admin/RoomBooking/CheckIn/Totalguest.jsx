import React from 'react';

function Totalguest({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.child) {
          totalAmount = totalAmount + parseFloat(item?.child);
        }

        if (item?.female) {
          totalAmount = totalAmount + parseFloat(item?.female);
        }

        if (item?.electric_cheque_TOTAL_AMOUNT) {
          totalAmount =
            totalAmount + parseFloat(item?.electric_cheque_TOTAL_AMOUNT);
        }

        if (item?.male) {
          totalAmount = totalAmount + parseFloat(item?.male);
        }
      });
  }

  return (
    <>
      <span>{totalAmount}</span>
    </>
  );
}

export default Totalguest;
