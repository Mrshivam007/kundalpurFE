import React, { useEffect } from 'react';

function OnlineAllTotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.cheque) {
          totalAmount = totalAmount + parseFloat(item?.cheque);
        }

        if (item?.online) {
          totalAmount = totalAmount + parseFloat(item?.online);
        }
      });
  }

  return (
    <>
      <>{totalAmount}</>
    </>
  );
}

export default OnlineAllTotal;
