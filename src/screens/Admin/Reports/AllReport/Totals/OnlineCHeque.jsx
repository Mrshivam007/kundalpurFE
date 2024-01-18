import React, { useEffect } from 'react';

function OnlineCHeque({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.cheque) {
          totalAmount = totalAmount + parseFloat(item.cheque);
        }
      });
  }

  return (
    <>
      <span>{totalAmount}</span>
    </>
  );
}

export default OnlineCHeque;
