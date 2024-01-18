import React from 'react';

function OnlineTotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item?.online) {
          totalAmount = totalAmount + parseFloat(item?.online);
        }
      });
  }

  return (
    <>
      <span>{totalAmount}</span>
    </>
  );
}

export default OnlineTotal;
