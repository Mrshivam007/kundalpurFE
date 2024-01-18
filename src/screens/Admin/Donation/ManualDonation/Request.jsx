import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { backendApiUrl } from "../../../../config/config";
import "./Request.css";
function Request({ handleClose }) {
  const handlesubmit = async () => {
    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;

    const res = await axios.get(`${backendApiUrl}user/req-voucher`);

    console.log(res);

    if (res.data.status === true) {
      handleClose();
      Swal.fire("Great!", res.data.data, "success");
    } else {
      Swal.fire("Error!", "Somthing went wrong!!", "error");
    }
  };
  return (
    <>
      <div>
        <div>
          <div className="Status_main_div_request">
            <p>Request for new Vouchers</p>
            <button onClick={() => handlesubmit()}>Request</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Request;
