import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { serverInstance } from "../../../../API/ServerInstance";
import "./Donation.css";
function InfoElectronic({ setopendashboard }) {
  const { id } = useParams();
  const [isData, setisData] = React.useState(null);
  console.log(isData);
  const getinfo = () => {
    serverInstance(`user/get-elecdonation?id=${id}`, "get").then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal("Error", "somthing went  wrong", "error");
      }
    });
  };
  useEffect(() => {
    getinfo();
    setopendashboard(true);
  }, []);
  var d = new Date(isData ? isData.donation_date : "");

  var hours = d.getUTCHours();
  var minutes = d.getUTCMinutes();
  var ampm = hours >= 12 ? "AM" : "PM";
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  const time = `${hours}:${minutes}${ampm}`;

  const date = `${day}-${month}-${year}`;
  console.log(`${day}-${month}-${year}`); // Hours

  return (
    <>
      <div className="dashboarddiv">
        <div className="center_info_main">
          <div className="main_content_info">
            <div>
              <p style={{ marginBottom: "1rem" }}>Personal Details</p>
              <p>Name: {isData ? isData.name : ""}</p>
              <p>Phone No: {isData ? isData.phoneNo.slice(3) : ""}</p>
              <p>Address: {isData ? isData.address : ""}</p>
              <p>Donation Date: {isData ? date : ""}</p>
              <p>Donation Time: {isData ? time : ""}</p>
            </div>
            <div>
              <p style={{ marginTop: "2rem", marginBottom: "1rem" }}>
                No Of Donations
              </p>
              <div className="table_scrol_barrr">
                <table class="styled-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center", width: "21rem" }}>
                        Type of donation
                      </th>
                      <th style={{ textAlign: "center", width: "27rem" }}>
                        Amount
                      </th>
                      <th style={{ textAlign: "center" }}>Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isData &&
                      isData.elecItemDetails.map((item) => {
                        return (
                          <tr>
                            <td>{item.type}</td>
                            <td>{item.amount}</td>
                            <td>{item.remark}</td>
                          </tr>
                        );
                      })}

                    <tr>
                      <td>Total</td>
                      <td>
                        {" "}
                        {isData?.AMOUNT
                          ? isData?.AMOUNT
                          : isData &&
                            isData.elecItemDetails.reduce(
                              (n, { amount }) =>
                                parseFloat(n) + parseFloat(amount),
                              0
                            )}
                      </td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoElectronic;
