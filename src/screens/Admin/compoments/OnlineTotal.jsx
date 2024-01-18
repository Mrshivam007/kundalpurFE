import React from 'react';
const OnlineTotal = ({ data }) => {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        totalAmount = totalAmount + parseInt(item.AMOUNT);
      });
  }

  return (
    <>
      <span>{'₹' + totalAmount + '/-'}</span>
    </>
  );
};

export default OnlineTotal;
