import React from 'react';
const ManualTotal = ({ data }) => {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        totalAmount =
          totalAmount +
          item.manualItemDetails.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          );
      });
  }
  return (
    <>
      <span>{'₹' + totalAmount + '/-'}</span>
    </>
  );
};

export default ManualTotal;
