import React, { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './cashrecipt.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Converter, hiIN } from 'any-number-to-words';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Moment from 'moment-js';
import moment from 'moment';
import { serverInstance } from '../../../API/ServerInstance';
import { backendUrl } from '../../../config/config';

const converter = new Converter(hiIN);
const ModalMnaulReceipt = ({
  setopendashboard,
  setshowreciept,
  datasend,
  handleClose60,
}) => {
  const location = useLocation();
  const componentRef = useRef();
  const adminName = sessionStorage.getItem('adminName');

  const empName = sessionStorage.getItem('empName');
  const [isData, setisData] = React.useState(null);
  const navigation = useNavigate();
  const { user } = useSelector((state) => state.userReducer);

  const shareReceipt = () => {
    serverInstance(`user/donation-receipt?id=${isData?.id}`, 'get').then(
      (res) => {},
    );
  };
  function printDiv() {
    shareReceipt();
    navigation('/admin-panel/printContentmanul', {
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

  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  const convertTime = (today) => {
    const currDate = today
      .toLocaleDateString('en-IN', options)
      .replace(/-/g, ' ');
    const currTime = today.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    let dateAndTime = `${currDate}: ${currTime}`;

    return dateAndTime;
  };
  console.log(isData);
  useEffect(() => {
    setopendashboard(true);

    if (datasend) {
      setisData(datasend);
    }
  }, []);

  return (
    <>
      <div
        className="button_div_print_download"
        style={{ marginBottom: '2rem' }}
      >
        <button onClick={() => handleClose60()}>Back</button>
        {/* <button style={{ width: '17rem' }} onClick={() => shareReceipt()}>
          Share on whatsaap
        </button> */}
        <button style={{ width: '17rem' }} onClick={() => down()}>
          Download
        </button>
      </div>
      <div>
        <div
          style={{ width: '100%' }}
          className="main-certificate"
          id="receipt"
          ref={componentRef}
        >
          <div className="topinfo-flex">
            <p>E-mail:badebaba.kundalpur@gmail.com</p>
            <p>॥ श्री बड़े बाबा नम:॥</p>
            <p>Web:www.shreebadebaba.com</p>
          </div>
          <div className="main-head">
            <div className="main-head-container">
              <span className="hesad-sn">
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
            {isData?.LedgerNo ? (
              <>
                <div className="reciptbody" style={{ marginBottom: '1rem' }}>
                  <div className="leftdata">
                    <span className="leftitems">
                      <h2>
                        लेजर नं :
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </h2>
                      <h2 className="font_bold_in_donation">
                        {isData?.LedgerNo}
                      </h2>
                    </span>
                  </div>
                  <div className="rightdata">
                    <span className="rightitems">
                      <h2>दिनांक :</h2>
                      <h2 className="font_bold_in_donation">
                        {isData && isData?.manualItemDetails ? (
                          <>
                            {Moment(isData?.donation_date).format('DD-MM-YYYY')}
                            :
                            {moment(isData?.donation_time, 'HH:mm:ss').format(
                              'hh:mm A',
                            )}
                          </>
                        ) : (
                          <>
                            {Moment(isData?.DATE_OF_CHEQUE).format(
                              'DD-MM-YYYY',
                            )}
                            -
                          </>
                        )}
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
                            {isData && isData?.REMARK}
                          </h2>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="reciptbody">
                  <div className="leftdata">
                    <span className="leftitems">
                      <h2>दान रसीद नं : &nbsp;</h2>
                      <h2 className="font_bold_in_donation">
                        {isData?.RECEIPT_NO
                          ? isData?.RECEIPT_NO
                          : isData?.ReceiptNo}
                      </h2>
                    </span>
                  </div>

                  <div className="rightdata">
                    <span className="rightitems">
                      <h2>दिनांक :</h2>
                      <h2 className="font_bold_in_donation">
                        {isData && isData?.manualItemDetails ? (
                          <>
                            {Moment(isData?.donation_date).format('DD-MM-YYYY')}
                            :
                            {moment(isData?.donation_time, 'HH:mm:ss').format(
                              'hh:mm A',
                            )}
                          </>
                        ) : (
                          <>
                            {Moment(isData?.DATE_OF_CHEQUE).format(
                              'DD-MM-YYYY',
                            )}
                            -
                          </>
                        )}
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
                            {isData && isData?.REMARK}
                          </h2>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <span className="rightitems2 ">
                  <div className="dan_ka_mad">
                    <h2 style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                      दान दातार :
                    </h2>
                  </div>
                  <h2 className="font_bold_in_donation">
                    {isData && isData?.gender
                      ? isData && isData?.gender
                      : isData && isData?.GENDER}{' '}
                    &nbsp;
                    {isData?.NAME ? isData?.NAME : isData?.name}{' '}
                    {isData?.phoneNo && <>({isData?.phoneNo})</>}
                  </h2>
                </span>
              </>
            )}

            <span className="rightitems2 ">
              <div className="dan_ka_mad">
                <h2>स्थान :</h2>
              </div>
              <h2 className="font_bold_in_donation">
                {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}{' '}
              </h2>
            </span>
            {isData && isData?.modeOfDonation === '4' && (
              <span className="rightitems2 ">
                <div className="dan_ka_mad">
                  <h2>दान का मद :</h2>
                </div>
                <span className="center_receipt_format">
                  {isData && isData.manualItemDetails && (
                    <>
                      {console.log(isData.manualItemDetails)}
                      {isData.manualItemDetails.map((item) => {
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
            {isData && isData?.modeOfDonation === 4 && (
              <span className="rightitems2 ">
                <div className="dan_ka_mad">
                  <h2>दान का मद :</h2>
                </div>
                <span className="center_receipt_format">
                  {isData && isData.manualItemDetails && (
                    <>
                      {console.log(isData.manualItemDetails)}
                      {isData.manualItemDetails.map((item) => {
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

            {isData && isData?.modeOfDonation === '1' && (
              <span className="rightitems2 ">
                <div className="dan_ka_mad">
                  <h2>दान का मद :</h2>
                </div>
                <span className="center_receipt_format">
                  {isData && isData.manualItemDetails && (
                    <>
                      {console.log(isData.manualItemDetails)}
                      {isData.manualItemDetails.map((item) => {
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

            {isData && isData?.modeOfDonation === 1 && (
              <span className="rightitems2 ">
                <div className="dan_ka_mad">
                  <h2>दान का मद :</h2>
                </div>
                <span className="center_receipt_format">
                  {isData && isData.manualItemDetails && (
                    <>
                      {isData.manualItemDetails.map((item) => {
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
                  {isData && isData.manualItemDetails && (
                    <>
                      {isData.manualItemDetails.map((item) => {
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
                  {isData && isData.manualItemDetails && (
                    <>
                      {isData.manualItemDetails.map((item) => {
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
                  {isData && isData.manualItemDetails && (
                    <>
                      {isData.manualItemDetails.map((item) => {
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
                  {isData && isData.manualItemDetails && (
                    <>
                      {isData.manualItemDetails.map((item) => {
                        return (
                          <h2>
                            <b>{item.type}</b> -₹
                            {item.amount} /-
                          </h2>
                        );
                      })}
                    </>
                  )}
                </div>
              </span>
            )}
            {isData && isData?.modeOfDonation === '2' && (
              <span className="rightitems2 ">
                <h2 style={{ marginBottom: '1rem' }}>विवरण :</h2>

                <h2 className="font_bold_in_donation">
                  {isData && isData?.REMARK
                    ? isData?.REMARK
                    : isData &&
                      isData.manualItemDetails.map((item) => {
                        return <> {item?.remark}</>;
                      })}
                </h2>
              </span>
            )}
            {isData &&
              isData.manualItemDetails &&
              isData.modeOfDonation === 4 &&
              isData.manualItemDetails[0].itemType && (
                <>
                  <span className="rightitems2 ">
                    <h2 style={{ marginTop: '1rem', marginBottom: '1rem' }}>
                      विवरण :
                    </h2>

                    <h2 className="font_bold_in_donation">
                      {isData &&
                        isData.manualItemDetails &&
                        isData.manualItemDetails[0].remark}
                    </h2>
                  </span>
                </>
              )}

            {isData &&
              isData.manualItemDetails &&
              isData.modeOfDonation === '4' &&
              isData.manualItemDetails[0].amount && (
                <>
                  <span className="rightitems2 ">
                    <div className="dan_ka_mad">
                      <h2 style={{ marginBottom: '1rem' }}>विवरण :</h2>
                    </div>
                    <h2 className="font_bold_in_donation">
                      {isData && isData?.TYPE
                        ? isData?.TYPE
                        : isData &&
                          isData.manualItemDetails.map((item) => {
                            return (
                              <>
                                {item?.remark}
                                {item?.itemType && (
                                  <>
                                    ( {item?.itemType}-{item?.quantity}-
                                    {item?.size} {item?.unit})
                                  </>
                                )}
                              </>
                            );
                          })}
                    </h2>
                  </span>
                </>
              )}

            {isData &&
              isData.manualItemDetails &&
              isData.modeOfDonation === 4 &&
              isData.manualItemDetails[0].amount && (
                <>
                  <span className="rightitems">
                    <h2>विवरण :</h2>
                    <h2 className="font_bold_in_donation">
                      {isData && isData?.TYPE
                        ? isData?.TYPE
                        : isData &&
                          isData.manualItemDetails.map((item) => {
                            return (
                              <>
                                {item?.remark}
                                {item?.itemType && (
                                  <>
                                    ( {item?.itemType}-{item?.quantity}-
                                    {item?.size} {item?.unit})
                                  </>
                                )}
                              </>
                            );
                          })}
                    </h2>
                  </span>
                </>
              )}
            {isData && isData?.modeOfDonation === 2 && (
              <span className="rightitems2 ">
                <div className="dan_ka_mad">
                  <h2 style={{ marginBottom: '1rem' }}>विवरण :</h2>
                </div>
                <h2 className="font_bold_in_donation">
                  {isData && isData?.REMARK
                    ? isData?.REMARK
                    : isData &&
                      isData.manualItemDetails.map((item) => {
                        return <> {item?.remark}</>;
                      })}
                </h2>
              </span>
            )}

            {isData && isData?.modeOfDonation === '1' && (
              <span className="rightitems2 ">
                <div className="dan_ka_mad">
                  <h2 style={{ marginBottom: '1rem' }}>विवरण :</h2>
                </div>
                <h2 className="font_bold_in_donation">
                  {isData && isData?.REMARK
                    ? isData?.REMARK
                    : isData &&
                      isData.manualItemDetails.map((item) => {
                        return (
                          <>
                            {item?.remark}{' '}
                            {item?.BankName && <>({item?.BankName})</>}
                          </>
                        );
                      })}
                </h2>
              </span>
            )}

            {isData && isData?.modeOfDonation === 1 && (
              <span className="rightitems2 ">
                <div className="dan_ka_mad">
                  <h2 style={{ marginBottom: '1rem' }}>विवरण :</h2>
                </div>
                <h2 className="font_bold_in_donation">
                  {isData && isData?.REMARK
                    ? isData?.REMARK
                    : isData &&
                      isData.manualItemDetails.map((item) => {
                        return (
                          <>
                            {item?.remark}{' '}
                            {item?.BankName && <>({item?.BankName})</>}
                          </>
                        );
                      })}
                </h2>
              </span>
            )}

            {isData && isData?.modeOfDonation === '3' && (
              <span className="rightitems2 ">
                <div className="dan_ka_mad">
                  <h2 style={{ marginBottom: '1rem' }}>विवरण :</h2>
                </div>
                <h2 className="font_bold_in_donation">
                  {isData && isData?.REMARK
                    ? isData?.REMARK
                    : isData &&
                      isData.manualItemDetails.map((item) => {
                        return (
                          <>
                            {item?.remark}{' '}
                            {item?.BankName && (
                              <>
                                ({item?.BankName} {item?.ChequeNo})
                              </>
                            )}
                          </>
                        );
                      })}
                </h2>
              </span>
            )}

            {isData && isData?.modeOfDonation === 3 && (
              <span className="rightitems2 ">
                <div className="dan_ka_mad">
                  <h2 style={{ marginBottom: '1rem' }}>विवरण :</h2>
                </div>
                <h2 className="font_bold_in_donation">
                  {isData && isData?.REMARK
                    ? isData?.REMARK
                    : isData &&
                      isData.manualItemDetails.map((item) => {
                        return (
                          <>
                            {item?.remark}{' '}
                            {item?.BankName && (
                              <>
                                ({item?.BankName} {item?.ChequeNo})
                              </>
                            )}
                          </>
                        );
                      })}
                </h2>
              </span>
            )}
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
                            isData.manualItemDetails &&
                            isData.manualItemDetails.reduce(
                              (n, { amount }) =>
                                parseFloat(n) + parseFloat(amount),
                              0,
                            )}
                        </>
                      )}
                      /-
                    </h2>
                  </span>
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

                  {isData && isData.manualItemDetails && (
                    <>
                      <h2 className="font_bold_in_donation">
                        {converter.toWords(
                          isData?.AMOUNT
                            ? isData?.AMOUNT
                            : Number(
                                isData &&
                                  isData.manualItemDetails &&
                                  isData.manualItemDetails.reduce(
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
                        <h2> चैक द्वारा दान स्वरूप सधन्यवाद प्राप्त हुये।</h2>
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
              <p>हस्ताक्षर दानदातार</p>
            </div>

            <div className="main_div_signature">
              {isData?.createdBySignature && (
                <>
                  <img
                    src={`${backendUrl}uploads/images/${isData?.createdBySignature}`}
                    alt="signature"
                  />
                </>
              )}

              <p>हस्ताक्षर प्राप्तकर्ता,({isData?.CreatedBy})</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalMnaulReceipt;
