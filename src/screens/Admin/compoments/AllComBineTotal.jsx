import React from 'react';
const ElectronicTotal = ({ data }) => {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item.isActive === true) {
          totalAmount =
            totalAmount +
            item.details.reduce(
              (n, { amount }) => Number(n) + parseFloat(amount),
              0,
            );
        }
      });
  }

  return (
    <>
      <span>{'₹' + Math.floor(totalAmount) + '/-'}</span>
    </>
  );
};

export default ElectronicTotal;
