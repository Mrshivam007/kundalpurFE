import React, { useEffect } from 'react';

function Itemtotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
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

export default Itemtotal;
