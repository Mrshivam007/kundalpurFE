import React from 'react';

function TotalAdvance({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        totalAmount = totalAmount + parseInt(item?.advanceAmount);
      });
  }

  return (
    <>
      <span>{'₹' + totalAmount}.00</span>
    </>
  );
}

export default TotalAdvance;
