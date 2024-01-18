import React from "react";
import images from "../../../../assets/images.png";
import { useNavigate } from "react-router-dom";

function ChequeSuccessfull({ handleClose, useindonationhistory }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="PaymentSuccessfull-main-div">
        <div className="PaymentSuccessfull-main-div-innear">
          <img src={images} alt=" images " />
          <p style={{ textAlign: "center" }}>
            Cheque submitted successfully, Team will process to bank and release
            certificate after payment clearance.
          </p>

          <button
            onClick={() => {
              {
                useindonationhistory ? "" : navigate("/");
              }

              handleClose();
            }}
            className="ok_btn"
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
}

export default ChequeSuccessfull;
