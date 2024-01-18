import React from 'react';
export const tableTotalCellStyles = {
  paddingInline: '10px',
  paddingBlock: '4px',
  outline: '1px solid #C4C4C4',
};

const TotalpayAmountRow = ({ donationItems }) => {
  let totalAmount = 0;
  console.log(donationItems[0].quantity, donationItems[0].approxValue);
  if (donationItems[0].quantity && donationItems[0].approxValue) {
    totalAmount = Array.isArray(donationItems)
      ? donationItems.reduce((acc, item) => {
          if (isNaN(parseInt(item.quantity) * parseInt(item.approxValue))) {
            return acc;
          }
          return acc + parseInt(item.approxValue);
        }, 0)
      : 0;
  } else {
    totalAmount = Array.isArray(donationItems)
      ? donationItems.reduce((acc, item) => {
          if (isNaN(parseInt(item.payamount))) {
            return acc;
          }
          return acc + parseInt(item.payamount);
        }, 0)
      : 0;
  }
  console.log(totalAmount);

  return (
    <>
      <span>{totalAmount}</span>
    </>
  );
};

export default TotalpayAmountRow;
