import React from "react";

function Cancel({ handleClose }) {
  const handlesubmit = () => {
    handleClose();
  };
  return (
    <>
      <div>
        <div>
          <div className="Status_main_div">
            <label htmlFor="Payment id">Are you sure to cancel</label>
            <input
              type="text"
              name="paymentId"
              id="paymentId"
              //   value={paymentId}
              placeholder="Reason"
              //   onChange={(e) => setpaymentId(e.target.value)}
            />

            <button onClick={() => handlesubmit()}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cancel;
