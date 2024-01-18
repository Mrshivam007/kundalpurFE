import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Converter, hiIN } from 'any-number-to-words';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Moment from 'moment-js';
import moment from 'moment';
import { serverInstance } from '../../../API/ServerInstance';
import { backendUrl } from '../../../config/config';
import './cashrecipt.css';
const converter = new Converter(hiIN);
const OnlineReceipt = ({ setopendashboard, setshowreciept, onlineId }) => {
  const location = useLocation();
  const componentRef = useRef();
  const [isData, setisData] = React.useState(null);
  const navigation = useNavigate();
  const { user } = useSelector((state) => state.userReducer);

  const adminName = sessionStorage.getItem('adminName');

  const empName = sessionStorage.getItem('empName');

  function printDiv() {
    navigation('/admin-panel/reports/printcontent', {
      state: {
        data: isData,
      },
    });
  }

  function down() {
    console.log('cliii');
    const input = document.getElementById('receipt');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4', false);
      pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false);
      pdf.save('download.pdf');
    });
  }

  useEffect(() => {
    setopendashboard(false);
    setshowreciept(true);

    if (location.state) {
      setisData(location.state?.userdata);
    } else {
      serverInstance(`admin/donation-list?id=${onlineId}`, 'get').then(
        (res) => {
          if (res.status) {
            setisData(res.data[0]);
          }
        },
      );
    }

    console.log('data', isData);
  }, []);

  return (
    <>
      <div>
        <div
          className="button_div_print_download"
          style={{ marginBottom: '1rem' }}
        >
          <button onClick={() => navigation(-1)}>Back</button>

          <div />
        </div>
        <div
          className="main-certificate"
          id="receipt"
          ref={componentRef}
          style={{ marginTop: '1rem' }}
        >
          <div className="topinfo-flex">
            <p>E-mail:badebaba.kundalpur@gmail.com</p>
            <p>॥ श्री बड़े बाबा नम:॥</p>
            <p>Web:www.shreebadebaba.com</p>
          </div>
          <div className="main-head">
            <div className="main-head-container">
              <span className="hedad-sn">
                <p>&nbsp;</p>
                <h4>&nbsp;</h4>
              </span>
              <span className="head-name">
                <h2>श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि</h2>
                <p>(सार्व, न्यास क्रं. 17 - ह)</p>
                <h4>ग्राम- कुण्डलपुर, तह-पटेरा, जिला दमोह 470772 (म.प्र.)</h4>
              </span>
              <span className="head-contact">
                <p>7771835891</p>
                <p>7771834880</p>
                <p>दातार प्रति</p>
              </span>
            </div>
          </div>
          <div className="reciptimg">
            <div className="reciptbody">
              <div className="leftdata">
                <span className="leftitems">
                  <h2>दान रसीद नं : </h2>
                  <h2 className="font_bold_in_donation">
                    {isData?.RECEIPT_NO
                      ? isData?.RECEIPT_NO
                      : isData?.ReceiptNo}
                  </h2>
                </span>
                <span className="leftitems">
                  <h2>दान दातार :</h2>
                  <div>
                    <h2 className="font_bold_in_donation">
                      {isData && isData?.gender
                        ? isData && isData?.gender
                        : isData && isData?.GENDER}{' '}
                      &nbsp;
                      {isData?.NAME ? isData?.NAME : isData?.name}
                    </h2>
                  </div>
                </span>
                <span className="leftitems">
                  <h2>स्थान :</h2>

                  <div className="warp_text">
                    <h2 className="font_bold_in_donation">
                      {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}{' '}
                    </h2>
                  </div>
                </span>

                {isData && isData.modeOfDonation === '4' ? (
                  <>
                    {isData &&
                      isData.elecItemDetails &&
                      isData.modeOfDonation === '4' &&
                      isData.elecItemDetails[0].quantity && (
                        <>
                          <span className="leftitems ">
                            <h2>मद:</h2>
                            <h2 className="font_bold_in_donation">
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].type}
                            </h2>
                          </span>
                        </>
                      )}
                    {isData &&
                      isData.elecItemDetails &&
                      isData.modeOfDonation === '4' &&
                      isData.elecItemDetails[0].quantity && (
                        <>
                          <span className="leftitems ">
                            <h2>संख्या:</h2>
                            <h2 className="font_bold_in_donation">
                              {isData && isData?.TYPE
                                ? isData?.TYPE
                                : isData &&
                                  isData.elecItemDetails &&
                                  isData.elecItemDetails[0].quantity}
                            </h2>
                          </span>
                          <span className="leftitems ">
                            <h2>वजन:</h2>
                            <h2
                              className="font_bold_in_donation"
                              style={{ marginBottom: '1rem' }}
                            >
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].size}
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].unit}
                            </h2>
                          </span>
                        </>
                      )}
                  </>
                ) : (
                  <></>
                )}

                {isData && isData.modeOfDonation === 4 ? (
                  <>
                    {isData &&
                      isData.elecItemDetails &&
                      isData.modeOfDonation === 4 &&
                      isData.elecItemDetails[0].quantity && (
                        <>
                          <span className="leftitems ">
                            <h2>मद:</h2>
                            <h2 className="font_bold_in_donation">
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].type}
                            </h2>
                          </span>
                        </>
                      )}
                    {isData &&
                      isData.elecItemDetails &&
                      isData.modeOfDonation === 4 &&
                      isData.elecItemDetails[0].quantity && (
                        <>
                          <span className="leftitems ">
                            <h2>संख्या:</h2>
                            <h2 className="font_bold_in_donation">
                              {isData && isData?.TYPE
                                ? isData?.TYPE
                                : isData &&
                                  isData.elecItemDetails &&
                                  isData.elecItemDetails[0].quantity}
                            </h2>
                          </span>
                          <span className="leftitems ">
                            <h2>वजन:</h2>
                            <h2
                              className="font_bold_in_donation"
                              style={{ marginBottom: '1rem' }}
                            >
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].size}
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails[0].unit}
                            </h2>
                          </span>
                        </>
                      )}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="rightdata">
                <span className="rightitems">
                  <h2>दिनांक :</h2>
                  <h2 className="font_bold_in_donation">
                    {isData && isData?.elecItemDetails ? (
                      <>
                        {Moment(isData?.donation_date).format('DD-MM-YYYY')}:
                        {moment(isData?.donation_time, 'HH:mm:ss').format(
                          'hh:mm A',
                        )}
                      </>
                    ) : (
                      <>
                        {Moment(isData?.DATE_OF_DAAN).format('DD-MM-YYYY')}:
                        {moment(isData?.TIME_OF_DAAN, 'HH:mm:ss').format(
                          'hh:mm A',
                        )}
                      </>
                    )}
                  </h2>
                </span>

                <span className="rightitems">
                  <h2>मोबाइल नं :</h2>
                  <h2 className="font_bold_in_donation">
                    {isData?.phoneNo ? isData?.phoneNo : user?.mobileNo}
                  </h2>
                </span>
                {isData && isData.CHEQUE_NO && (
                  <>
                    <span className="rightitems">
                      <h2>विवरण :</h2>
                      <h2 className="font_bold_in_donation">
                        {isData && isData?.REMARK}
                      </h2>
                    </span>
                  </>
                )}
                {isData && isData.CHEQUE_NO === '' && (
                  <>
                    <span className="rightitems">
                      <h2>विवरण :</h2>
                      <h2 className="font_bold_in_donation">
                        {isData && isData?.REMARK} (
                        {isData?.PAN_CARD_No && (
                          <>Pan no : {isData?.PAN_CARD_No}</>
                        )}
                        )
                      </h2>
                    </span>
                  </>
                )}
                {isData &&
                  isData.elecItemDetails &&
                  isData.elecItemDetails[0].ChequeNo && (
                    <>
                      <span className="rightitems">
                        <h2>माध्यम :</h2>

                        <h2 className="font_bold_in_donation">
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].BankName}
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].ChequeNo}
                        </h2>
                      </span>
                    </>
                  )}

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === '1' &&
                  isData.elecItemDetails[0].BankName && (
                    <>
                      <span className="rightitems">
                        <h2>माध्यम:</h2>

                        <h2 className="font_bold_in_donation">
                          {isData && isData.elecItemDetails[0].BankName}
                        </h2>
                      </span>
                    </>
                  )}
                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === 1 &&
                  isData.elecItemDetails[0].BankName && (
                    <>
                      <span className="rightitems">
                        <h2>माध्यम:</h2>

                        <h2 className="font_bold_in_donation">
                          {isData && isData.elecItemDetails[0].BankName}
                        </h2>
                      </span>
                    </>
                  )}

                {isData && isData?.modeOfDonation === '2' && (
                  <span className="rightitems">
                    <h2>विवरण :</h2>
                    <h2 className="font_bold_in_donation">
                      {isData &&
                        isData.elecItemDetails &&
                        isData.elecItemDetails[0].remark}
                    </h2>
                  </span>
                )}

                {isData && isData?.modeOfDonation === 2 && (
                  <span className="rightitems">
                    <h2>विवरण :</h2>
                    <h2 className="font_bold_in_donation">
                      {isData &&
                        isData.elecItemDetails &&
                        isData.elecItemDetails[0].remark}
                    </h2>
                  </span>
                )}

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === '4' &&
                  isData.elecItemDetails[0].itemType && (
                    <>
                      <span className="rightitems">
                        <h2>सामग्री का नाम:</h2>
                        <h2 className="font_bold_in_donation">
                          {isData && isData?.TYPE
                            ? isData?.TYPE
                            : isData &&
                              isData.elecItemDetails &&
                              isData.elecItemDetails[0].itemType}
                        </h2>
                      </span>
                    </>
                  )}

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === 4 &&
                  isData.elecItemDetails[0].itemType && (
                    <>
                      <span className="rightitems">
                        <h2>सामग्री का नाम:</h2>
                        <h2 className="font_bold_in_donation">
                          {isData && isData?.TYPE
                            ? isData?.TYPE
                            : isData &&
                              isData.elecItemDetails &&
                              isData.elecItemDetails[0].itemType}
                        </h2>
                      </span>
                    </>
                  )}

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === '4' &&
                  isData.elecItemDetails[0].amount && (
                    <>
                      <span className="rightitems">
                        <h2>विवरण :</h2>
                        <h2 className="font_bold_in_donation">
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].remark}
                        </h2>
                      </span>
                    </>
                  )}

                {isData &&
                  isData.elecItemDetails &&
                  isData.modeOfDonation === 4 &&
                  isData.elecItemDetails[0].amount && (
                    <>
                      <span className="rightitems">
                        <h2>विवरण :</h2>
                        <h2 className="font_bold_in_donation">
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails[0].remark}
                        </h2>
                      </span>
                    </>
                  )}
              </div>
            </div>

            {(isData && isData?.modeOfDonation === '4') ||
            (isData && isData?.modeOfDonation === 4) ? (
              <>
                <span className="rightitems2 " style={{ width: '100%' }}>
                  <h2 style={{ textAlign: 'center' }}>
                    आपके द्वारा प्रदत्त उपहार दान स्वरूप सधन्यवाद प्राप्त हुआ।
                  </h2>
                </span>
              </>
            ) : (
              <>
                {isData && isData?.modeOfDonation === '1' && (
                  <span className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2>दान का मद :</h2>
                    </div>
                    <span className="center_receipt_format">
                      {isData && isData.elecItemDetails && (
                        <>
                          {isData.elecItemDetails.map((item) => {
                            return (
                              <h2>
                                <b>{item.type}</b> -₹{item.amount} /-
                              </h2>
                            );
                          })}
                        </>
                      )}
                    </span>
                  </span>
                )}
                {isData && isData.CHEQUE_NO === '' && (
                  <>
                    <span className="rightitems2 ">
                      <div className="dan_ka_mad">
                        <h2>दान का मद :</h2>
                      </div>
                      <span className="center_receipt_format">
                        {isData && (
                          <>
                            <h2>
                              <b>{isData.TYPE}</b>
                            </h2>
                          </>
                        )}
                      </span>
                    </span>
                  </>
                )}

                {isData && isData.CHEQUE_NO && (
                  <>
                    <span className="rightitems2 ">
                      <div className="dan_ka_mad">
                        <h2>दान का मद :</h2>
                      </div>
                      <span className="center_receipt_format">
                        {isData && (
                          <>
                            <h2>
                              <b>{isData.TYPE}</b>
                            </h2>
                          </>
                        )}
                      </span>
                    </span>
                  </>
                )}
                {isData && isData?.modeOfDonation === 1 && (
                  <span className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2>दान का मद :</h2>
                    </div>
                    <span className="center_receipt_format">
                      {isData && isData.elecItemDetails && (
                        <>
                          {isData.elecItemDetails.map((item) => {
                            return (
                              <h2>
                                <b>{item.type}</b> -₹{item.amount} /-
                              </h2>
                            );
                          })}
                        </>
                      )}
                    </span>
                  </span>
                )}

                {isData && isData?.modeOfDonation === '3' && (
                  <span className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2>दान का मद :</h2>
                    </div>
                    <span className="center_receipt_format">
                      {isData && isData.elecItemDetails && (
                        <>
                          {isData.elecItemDetails.map((item) => {
                            return (
                              <h2>
                                <b>{item.type}</b> -₹{item.amount} /-
                              </h2>
                            );
                          })}
                        </>
                      )}
                    </span>
                  </span>
                )}

                {isData && isData?.modeOfDonation === 3 && (
                  <span className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2>दान का मद :</h2>
                    </div>
                    <span className="center_receipt_format">
                      {isData && isData.elecItemDetails && (
                        <>
                          {isData.elecItemDetails.map((item) => {
                            return (
                              <h2>
                                <b>{item.type}</b> -₹{item.amount} /-
                              </h2>
                            );
                          })}
                        </>
                      )}
                    </span>
                  </span>
                )}

                {isData && isData?.modeOfDonation === '2' && (
                  <div className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2>दान का मद :</h2>
                    </div>
                    <span className="center_receipt_format">
                      {isData && isData.elecItemDetails && (
                        <>
                          {isData.elecItemDetails.map((item) => {
                            return (
                              <h2>
                                <b>{item.type}</b> -₹{item.amount} /-
                              </h2>
                            );
                          })}
                        </>
                      )}
                    </span>
                  </div>
                )}

                {isData && isData?.modeOfDonation === 2 && (
                  <span className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2>दान का मद :</h2>
                    </div>
                    <div className="center_receipt_format">
                      {isData && isData.elecItemDetails && (
                        <>
                          {isData.elecItemDetails.map((item) => {
                            return (
                              <h2>
                                <b>{item.type}</b> -₹{item.amount} /-
                              </h2>
                            );
                          })}
                        </>
                      )}
                    </div>
                  </span>
                )}
                <div className="main_div_center">
                  <span className="rightitems2 ">
                    <h2>दान राशि अंको में :</h2>
                    <h2 className="font_bold_in_donation">
                      ₹
                      {isData && isData.AMOUNT ? (
                        isData.AMOUNT
                      ) : (
                        <>
                          {isData &&
                            isData.elecItemDetails &&
                            isData.elecItemDetails.reduce(
                              (n, { amount }) =>
                                parseFloat(n) + parseFloat(amount),
                              0,
                            )}
                        </>
                      )}
                      /-
                    </h2>
                  </span>
                  {isData && isData?.modeOfDonation === '1' && (
                    <div className="rightitems2  margin_left_div">
                      <h2 style={{ marginLeft: '38%' }}>विवरण :</h2>
                      <h2 className="font_bold_in_donation">
                        {isData &&
                          isData.elecItemDetails &&
                          isData.elecItemDetails[0].remark}
                      </h2>
                    </div>
                  )}

                  {isData && isData?.modeOfDonation === 1 && (
                    <div className="rightitems2  margin_left_div">
                      <h2 style={{ marginLeft: '38%' }}>विवरण :</h2>
                      <h2 className="font_bold_in_donation">
                        {isData &&
                          isData.elecItemDetails &&
                          isData.elecItemDetails[0].remark}
                      </h2>
                    </div>
                  )}

                  {isData && isData?.modeOfDonation === '3' && (
                    <span className="rightitems2  margin_left_div">
                      <h2 style={{ marginLeft: '38%' }}>विवरण :</h2>
                      <h2 className="font_bold_in_donation">
                        {isData &&
                          isData.elecItemDetails &&
                          isData.elecItemDetails[0].remark}
                      </h2>
                    </span>
                  )}
                </div>

                <span className="rightitems2 ">
                  <h2>दान राशि शब्दों में :</h2>
                  {isData && isData?.MODE_OF_DONATION === 'ONLINE' && (
                    <>
                      <h2>
                        <span className="font_bold_in_donation">
                          {' '}
                          {isData && converter.toWords(isData?.AMOUNT)}{' '}
                        </span>
                        रूपये ऑनलाइन द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।
                      </h2>
                    </>
                  )}

                  {isData && isData?.MODE_OF_DONATION === 'CHEQUE' && (
                    <>
                      <h2>
                        <span className="font_bold_in_donation">
                          {isData && converter.toWords(isData?.AMOUNT)}
                        </span>
                        रूपये ऑनलाइन चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त
                        हुये।
                      </h2>
                    </>
                  )}

                  {isData && isData.elecItemDetails && (
                    <>
                      <h2 className="font_bold_in_donation">
                        {converter.toWords(
                          isData?.AMOUNT
                            ? isData?.AMOUNT
                            : Number(
                                isData &&
                                  isData.elecItemDetails &&
                                  isData.elecItemDetails.reduce(
                                    (n, { amount }) =>
                                      parseFloat(n) + parseFloat(amount),
                                    0,
                                  ),
                              ),
                          {
                            comma: true,
                          },
                        )}
                      </h2>
                      {isData && isData?.modeOfDonation === '2' && (
                        <h2> रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।</h2>
                      )}
                      {isData && isData?.modeOfDonation === 2 && (
                        <h2> रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।</h2>
                      )}
                      {isData && isData?.modeOfDonation === '1' && (
                        <h2>
                          रूपये बैंक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।
                        </h2>
                      )}

                      {isData && isData?.modeOfDonation === 1 && (
                        <h2>
                          रूपये बैंक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।
                        </h2>
                      )}
                      {isData && isData?.modeOfDonation === '3' && (
                        <h2>चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।</h2>
                      )}

                      {isData && isData?.modeOfDonation === 3 && (
                        <h2> चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।</h2>
                      )}
                    </>
                  )}
                </span>
              </>
            )}

            <div className="bankjankari">
              <h3>बैंक द्वारा राशि भेजने संबंधी जानकारी</h3>
            </div>
            <div className="bankdetail-container">
              <div className="bankdetails">
                <div className="banks1">
                  <h5>AXIS BANK, DAMOH</h5>
                  <h4>910010000535130</h4>
                  <p>UTIB0000770</p>
                </div>
                <div className="banks2">
                  <h5>HDFC BANK, DAMOH</h5>
                  <h4>50100160424129</h4>
                  <p>HDFC0000914</p>
                </div>
                <div className="banks3">
                  <h5>SBI BANK, ADB-DAMOH</h5>
                  <h4>10708180064</h4>
                  <p>SBIN0001832</p>
                </div>
              </div>
            </div>
          </div>

          <div className="note">
            <p>
              नोट: 1 यहां अतिशयकारी" बड़े बाबा" की 1500 वर्ष प्राचीन प्रतिमा है
              तथा 63 जिनालय है व अंतिम अनुबुद्ध केवली श्रीधर स्वामी का निर्वाण
              स्थल है। 2. यात्रियों / श्रावकों से क्षेत्र में जिनागम अनुकूल आचरण
              / चरित्र अपेक्षित है। 3. उपरोक्त प्राप्त दान राशि दिग. जैन
              तेरापंथी आम्नाओं अनुसार क्षेत्र के उद्देश्य की पूर्ति हेतु व्यय की
              जावेगी 14 क्षेत्र के अंतर्गत संचालित उदासीन आश्रम, औषधालय आदि अन्य
              चल/अचल सम्पतियाँ एवं प्राप्त दानराशि पर पूर्ण नियंत्रण व स्वामित्व
              केवल श्री दिग. जैन सिद्धक्षेत्र कुण्डलगिरि, कुण्डलपुर क्षेत्र
              ट्रस्ट का हैव रहेगा 15. क्षेत्र को दिये गये विशेष दान ट्रस्ट के
              कॉरपस फण्ड का हिस्सा रहेंगे।
            </p>
          </div>
          <div className="reciept-footer">
            <span>
              इस क्षेत्र को दिया गया दान धारा 80G (5) (VI) के अंतर्गत आयकर मुक्त
              है।
            </span>
            <p>PAN NO- AAHTS0546A</p>
          </div>

          <div className="signature-point">
            <div className="main_div_signature">
              {isData?.signature && (
                <>
                  <img
                    src={`${backendUrl}uploads/images/${isData?.signature}`}
                    alt="signature"
                  />
                </>
              )}
              <p>हस्ताक्षर दानदातार</p>
            </div>

            <div className="main_div_signature">
              {isData?.adminSignature && (
                <>
                  <img
                    src={`${backendUrl}uploads/images/${isData?.adminSignature}`}
                    alt="signature"
                  />
                </>
              )}

              <p>हस्ताक्षर प्राप्तकर्ता</p>
            </div>
          </div>
        </div>
      </div>
      <div className="button_div_print_download">
        <button onClick={() => down()}>Download</button>
        <p>&nbsp;</p>
      </div>
    </>
  );
};

export default OnlineReceipt;
