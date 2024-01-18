import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
function EmployeeUserInfo({ setopendashboard }) {
  const location = useLocation();
  const navigation = useNavigate();
  const [isData, setisData] = React.useState(null);
  console.log('data form', isData);
  useEffect(() => {
    if (location.state) {
      setisData(location.state?.userdata);
    } else {
      navigation('/admin-panel/master');
    }
    setopendashboard(true);
  }, []);

  console.log(isData);

  useEffect(() => {}, []);
  return (
    <>
      <div className="dashboarddiv">
        <div className="main-user-info">
          <div className="Profile-main-div-master">
            <h2
              className="info_head_color"
              style={{ textAlign: 'center', marginBottom: '1rem' }}
            >
              Employee Details
            </h2>
            <div className="main_emep_info_innear_content">
              <div>
                <p className="info_head_color">Full Name</p>
                <p>{isData?.Username}</p>
                <p className="info_head_color">Email</p>
                <p>{isData?.Email}</p>

                <p className="info_head_color">Mobile Number</p>
                <p> {isData?.Mobile}</p>
                <p className="info_head_color">DmaxPTD</p>
                <p>{isData?.DmaxPTD}</p>
                <p className="info_head_color">Role</p>
                <p> {isData?.Role}</p>
                <p className="info_head_color">cancelCheckout</p>
                <p> {isData?.cancelCheckout ? 'Yes' : 'No'}</p>
              </div>

              <div>
                <p className="info_head_color">Address</p>
                <p> {isData?.Address}</p>
                <p className="info_head_color">Cashier</p>
                <p>{isData?.Cashier ? 'yes' : 'No'}</p>

                <p className="info_head_color">CreditAA</p>
                <p>{isData?.CreditAA}</p>
                <p className="info_head_color">DCreditAA</p>
                <p> {isData?.DCreditAA}</p>
                <p className="info_head_color">DebitAA</p>
                <p> {isData?.DebitAA}</p>
                <p className="info_head_color">MaxPDA</p>
                <p>{isData?.MaxPDA}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeUserInfo;
