import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Converter, hiIN } from 'any-number-to-words';
import Moment from 'moment-js';
import moment from 'moment';
import { backendUrl } from '../../../../config/config';
const converter = new Converter(hiIN);
function BoliCertificatePrint({ setopendashboard, setshowreciept }) {
  const location = useLocation();
  const componentRef = useRef();
  const navigation = useNavigate();
  const [isData, setisData] = useState(null);
  const [alldata, setalldata] = useState(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    setopendashboard(true);
    if (location.state?.data) {
      setisData(location.state?.data);

      setalldata(location.state?.alldata);
    }
    setTimeout(() => {
      handlePrint();
    }, 50);
  }, []);

  console.log(isData);
  return (
    <>
      <div style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="button_div_print_download10">
          <button onClick={() => navigation(-1)}>Back</button>

          <div />
        </div>

        <div className="super_main_divsss" ref={componentRef}>
          <div>
            <div style={{ marginTop: '10%' }}>
              {isData?.active === '0' && (
                <>
                  <div className="cancel_text1">
                    <p>Cancelled </p>
                  </div>
                </>
              )}

              {isData?.isActive === false && (
                <>
                  <div className="cancel_text1">
                    <p>Cancelled </p>
                  </div>
                </>
              )}

              <div className="main_print_div">
                <div>
                  <p className="common_margin_pp">
                    <span className="gray-tedxt">
                      बोली रसीद नं -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
                      {alldata?.Boli_id ? alldata?.Boli_id : alldata?.Boli_id}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="common_margin_pp">
                    <span className="grady-text">
                      दिनांक - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
                      {Moment(new Date()).format('DD-MM-YYYY')}&nbsp;
                      {moment(new Date(), 'HH:mm:ss').format('hh:mm A')}
                    </span>
                  </p>
                </div>
              </div>
              <div className="div_center_text_is" style={{ width: '55rem' }}>
                <div className="gray-text_div">
                  <p>बोली दातार श्री -</p>
                </div>
                <div className="wrap_div_child_div">
                  <span
                    className="common_margin_pp hidelight"
                    style={{ fontSize: 16 }}
                  >
                    {isData?.Name}
                    {/* {alldata?.MobileNo} */}
                  </span>
                </div>
              </div>
              <div className="div_center_text_is">
                <div className="gray-text_div" style={{ width: '6.3rem' }}>
                  <p>स्थान -</p>
                </div>
                <div className="wrap_div_child_div">
                  <span
                    className="common_margin_pp hidelight"
                    style={{ fontSize: 16 }}
                  >
                    {isData?.Address}
                  </span>
                </div>
              </div>

              <p className="common_margin_pp">
                <span className="gray-dtext">
                  बोली का मद - &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span className="hidelight" style={{ fontSize: 16 }}>
                  {isData?.Type}-({isData?.Unit})
                </span>
              </p>

              {isData && isData.CHEQUE_NO === '' && (
                <>
                  <p className="common_margin_pp">
                    <span className="grady-text">
                      बोली का मद - &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
                      {isData && isData?.TYPE}
                    </span>
                  </p>
                </>
              )}

              {isData && isData.CHEQUE_NO && (
                <>
                  <p className="common_margin_pp">
                    <span className="grday-text">
                      विवरण - &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
                      {isData && isData?.REMARK}( {isData?.CHEQUE_NO}
                      {isData?.NAME_OF_BANK})
                    </span>
                  </p>
                </>
              )}
              {isData && isData.CHEQUE_NO === '' && (
                <>
                  <p className="common_margin_pp">
                    <span className="grday-text">
                      विवरण - &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
                      {isData && isData?.REMARK}
                    </span>
                  </p>
                </>
              )}
              {isData &&
                isData.elecItemDetails &&
                isData.elecItemDetails[0].itemType && (
                  <>
                    <div className="div_center_text_is">
                      {isData && isData.elecItemDetails && (
                        <>
                          <p
                            className="grday-text"
                            style={{ fontSize: '13px' }}
                          >
                            उपहार का मद -
                          </p>

                          <div className="wrap_div_child_div">
                            <span
                              className="common_margin_pp hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails.map((item) => {
                                  return <>{item?.type},</>;
                                })}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="div_center_text_is">
                      {isData && isData?.modeOfDonation === '4' && (
                        <>
                          <div className="gray-text_div">
                            <p>विवरण -</p>
                          </div>
                          <div className="wrap_div_child_div">
                            <span
                              className="common_margin_pp hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.TYPE
                                ? isData?.TYPE
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark}
                                        {item?.itemType && (
                                          <>
                                            ( {item?.itemType}-{item?.quantity}-
                                            {item?.size}
                                            {item?.unit})
                                          </>
                                        )}
                                      </>
                                    );
                                  })}
                            </span>
                          </div>
                        </>
                      )}
                      {isData && isData?.modeOfDonation === 4 && (
                        <>
                          <p className="grday-text">विवरण -</p>

                          <div className="wrap_div_child_div">
                            <span
                              className="common_margin_pp hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.TYPE
                                ? isData?.TYPE
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
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
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}

              <div>
                {(isData && isData?.modeOfDonation === '4') ||
                (isData && isData?.modeOfDonation === 4) ? (
                  <>
                    <p style={{ textAlign: 'center' }} className="grway-text">
                      आपके द्वारा प्रदत्त उपहार बोली स्वरूप सधन्यवाद प्राप्त
                      हुआ।
                    </p>
                  </>
                ) : (
                  <>
                    <div className="div_center_text_is">
                      {isData && isData?.elecItemDetails && (
                        <>
                          <div
                            className="gray-text_div"
                            style={{ width: '6rem' }}
                          >
                            <p>बोली का मद -</p>
                          </div>
                          <div className="wrap_div_child_div">
                            {isData &&
                              isData.elecItemDetails &&
                              isData.elecItemDetails.map((item) => {
                                return (
                                  <p
                                    className="common_margin_pp hidelight"
                                    style={{ fontSize: 16 }}
                                  >
                                    {' '}
                                    {item.type}-₹ {item.amount} /-
                                  </p>
                                );
                              })}
                          </div>
                        </>
                      )}
                    </div>

                    {isData && isData.modeOfDonation === '2' && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
                                    return <>( {item?.remark})</>;
                                  })}
                            </span>
                          </p>
                        </div>
                      </>
                    )}
                    {isData && isData.modeOfDonation === 2 && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.elecItemDetails.elecItemDetails.map(
                                    (item) => {
                                      return <>( {item?.remark})</>;
                                    },
                                  )}
                            </span>
                          </p>
                        </div>
                      </>
                    )}
                    {isData && isData.modeOfDonation === '3' && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark}{' '}
                                        {item?.BankName && (
                                          <>
                                            ({item?.BankName}
                                            {item?.ChequeNo})
                                          </>
                                        )}
                                      </>
                                    );
                                  })}
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    {isData && isData.modeOfDonation === 3 && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark}{' '}
                                        {item?.BankName && (
                                          <>
                                            ({item?.BankName}
                                            {item?.ChequeNo})
                                          </>
                                        )}
                                      </>
                                    );
                                  })}
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    {isData && isData.modeOfDonation === '1' && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark} ({item?.BankName})
                                      </>
                                    );
                                  })}
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    {isData && isData.modeOfDonation === 1 && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark} ({item?.BankName})
                                      </>
                                    );
                                  })}
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    <div className="handle_display_div">
                      <p className="common_margin_pp">
                        <span className="gray-tsext">
                          बोली राशि अंको में - &nbsp;
                        </span>
                        <span className="hidelight" style={{ fontSize: 16 }}>
                          ₹{isData?.PrintAmount}
                          /-
                        </span>
                      </p>
                    </div>
                    <p className="common_margin_pp">
                      <span className="gsray-text">
                        बोली राशि शब्दों में - &nbsp;
                      </span>
                      <span className="font_bold_in_donation">
                        {isData && converter.toWords(isData?.PrintAmount)},
                      </span>
                      रूपये बोली स्वरूप सधन्यवाद प्राप्त हुये।
                    </p>
                  </>
                )}
              </div>
            </div>

            <div
              className="gray-text-div10 extra_bottom_margin"
              style={{
                marginTop:
                  isData &&
                  isData.elecItemDetails &&
                  isData.elecItemDetails[0].itemType
                    ? '20%'
                    : '15%',
              }}
            >
              <div className="main_div_signature">
                {isData?.createdBySignature && (
                  <>
                    <img
                      style={{ height: '20px' }}
                      src={`${backendUrl}uploads/images/${isData?.createdBySignature}`}
                      alt="signature"
                    />
                  </>
                )}
                {isData?.creator_name?.signature && (
                  <img
                    style={{ height: '20px' }}
                    src={`${backendUrl}uploads/images/${isData?.creator_name?.signature}`}
                    alt="signature"
                  />
                )}
                <p>
                  (
                  {isData?.createdBy
                    ? isData?.createdBy
                    : isData?.creator_name?.Username}
                  )
                </p>
              </div>
            </div>
            <div>
              {isData?.active === '0' && (
                <>
                  <div className="cancel_text1">
                    <p>Cancelled </p>
                  </div>
                </>
              )}

              {isData?.isActive === false && (
                <>
                  <div className="cancel_text1">
                    <p>Cancelled </p>
                  </div>
                </>
              )}
              <div className="main_print_div" style={{ marginTop: '8rem' }}>
                <div>
                  <p className="common_margin_pp">
                    <span className="gray-tedxt">
                      बोली रसीद नं -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
                      {alldata?.Boli_id ? alldata?.Boli_id : alldata?.Boli_id}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="common_margin_pp">
                    <span className="grady-text">
                      दिनांक - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
                      {Moment(new Date()).format('DD-MM-YYYY')}&nbsp;
                      {moment(new Date(), 'HH:mm:ss').format('hh:mm A')}
                    </span>
                  </p>
                </div>
              </div>
              <div className="div_center_text_is" style={{ width: '60rem' }}>
                <div className="gray-text_div">
                  <p>बोली दातार श्री -</p>
                </div>
                <div className="wrap_div_child_div">
                  <span
                    className="common_margin_pp hidelight"
                    style={{ fontSize: 16 }}
                  >
                    {isData?.Name}
                    {/* {alldata?.MobileNo} */}
                  </span>
                </div>
              </div>
              <div
                className="div_center_text_is"
                style={{ paddingBottom: '1rem' }}
              >
                <div className="gray-text_div">
                  <p>स्थान -</p>
                </div>
                <div className="wrap_div_child_div">
                  <span
                    className="common_margin_pp hidelight"
                    style={{ fontSize: 16 }}
                  >
                    {isData?.Address}
                  </span>
                </div>
              </div>

              <p className="common_margin_pp">
                <span className="gray-dtext">
                  बोली का मद - &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span className="hidelight" style={{ fontSize: 16 }}>
                  {' '}
                  {isData?.Type}-({isData?.Unit})
                </span>
              </p>

              <p className="common_margin_pp">
                <span className="grday-text">
                  विवरण - &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span className="hidelight" style={{ fontSize: 16 }}>
                  {isData && isData?.Remark}
                </span>
              </p>

              {isData && isData.CHEQUE_NO === '' && (
                <>
                  <p className="common_margin_pp">
                    <span className="grday-text">
                      विवरण - &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
                      {isData && isData?.REMARK}
                    </span>
                  </p>
                </>
              )}
              {isData &&
                isData.elecItemDetails &&
                isData.elecItemDetails[0].itemType && (
                  <>
                    <div className="div_center_text_is">
                      {isData && isData.elecItemDetails && (
                        <>
                          <p
                            className="grday-text"
                            style={{ fontSize: '13px' }}
                          >
                            उपहार का मद -
                          </p>

                          <div className="wrap_div_child_div">
                            <span
                              className="common_margin_pp hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData &&
                                isData.elecItemDetails &&
                                isData.elecItemDetails.map((item) => {
                                  return <>{item?.type},</>;
                                })}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="div_center_text_is">
                      {isData && isData?.modeOfDonation === '4' && (
                        <>
                          <div className="gray-text_div">
                            <p>विवरण -</p>
                          </div>
                          <div className="wrap_div_child_div">
                            <span
                              className="common_margin_pp hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.TYPE
                                ? isData?.TYPE
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
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
                            </span>
                          </div>
                        </>
                      )}
                      {isData && isData?.modeOfDonation === 4 && (
                        <>
                          <p className="grday-text">विवरण -</p>

                          <div className="wrap_div_child_div">
                            <span
                              className="common_margin_pp hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.TYPE
                                ? isData?.TYPE
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
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
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}

              <div>
                {(isData && isData?.modeOfDonation === '4') ||
                (isData && isData?.modeOfDonation === 4) ? (
                  <>
                    <p style={{ textAlign: 'center' }} className="grway-text">
                      आपके द्वारा प्रदत्त उपहार बोली स्वरूप सधन्यवाद प्राप्त
                      हुआ।
                    </p>
                  </>
                ) : (
                  <>
                    <div className="div_center_text_is">
                      {isData && isData.elecItemDetails && (
                        <>
                          <div
                            className="gray-text_div"
                            style={{ width: '6rem' }}
                          >
                            <p>बोली का मद -</p>
                          </div>
                          <div className="wrap_div_child_div">
                            {isData &&
                              isData.elecItemDetails &&
                              isData.elecItemDetails.map((item) => {
                                return (
                                  <p
                                    className="common_margin_pp hidelight"
                                    style={{ fontSize: 16 }}
                                  >
                                    {' '}
                                    {item.type}-₹ {item.amount} /-
                                  </p>
                                );
                              })}
                          </div>
                        </>
                      )}
                    </div>

                    {isData && isData.modeOfDonation === '2' && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData?.elecItemDetails.map((item) => {
                                    return <>( {item?.remark})</>;
                                  })}
                            </span>
                          </p>
                        </div>
                      </>
                    )}
                    {isData && isData.modeOfDonation === 2 && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData?.elecItemDetails.map((item) => {
                                    return <>( {item?.remark})</>;
                                  })}
                            </span>
                          </p>
                        </div>
                      </>
                    )}
                    {isData && isData.modeOfDonation === '3' && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark}{' '}
                                        {item?.BankName && (
                                          <>
                                            ({item?.BankName}
                                            {item?.ChequeNo})
                                          </>
                                        )}
                                      </>
                                    );
                                  })}
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    {isData && isData.modeOfDonation === 3 && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark}{' '}
                                        {item?.BankName && (
                                          <>
                                            ({item?.BankName}
                                            {item?.ChequeNo})
                                          </>
                                        )}
                                      </>
                                    );
                                  })}
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    {isData && isData.modeOfDonation === '1' && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark} ({item?.BankName})
                                      </>
                                    );
                                  })}
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    {isData && isData.modeOfDonation === 1 && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.elecItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark} ({item?.BankName})
                                      </>
                                    );
                                  })}
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    <div className="handle_display_div">
                      <p className="common_margin_pp">
                        <span className="gray-tsext">
                          बोली राशि अंको में - &nbsp;
                        </span>
                        <span className="hidelight" style={{ fontSize: 16 }}>
                          ₹{isData?.printamount}
                          /-
                        </span>
                      </p>
                    </div>
                    <p className="common_margin_pp">
                      <span className="gsray-text">
                        बोली राशि शब्दों में - &nbsp;
                      </span>
                
                      <h2>
                        <span className="font_bold_in_donation">
                        {isData && converter.toWords(isData?.PrintAmount)}, ,
                        </span>
                        रूपये बोली स्वरूप सधन्यवाद प्राप्त हुये।
                      </h2>
                    </p>
                  </>
                )}
              </div>
            </div>

            {isData?.elecItemDetails && isData?.elecItemDetails.length > 1 ? (
              <>
                {isData?.elecItemDetails &&
                isData?.elecItemDetails[0]?.itemType ? (
                  <>
                    <p> &nbsp;</p>
                    <p> &nbsp;</p>
                    <p> &nbsp;</p>
                    <p> &nbsp;</p>
                    <p> &nbsp;</p>
                    <p> &nbsp;</p>
                    <p> &nbsp;</p>
                    <p> &nbsp;</p>
                  </>
                ) : (
                  <>
                    <p> &nbsp;</p>
                    <p> &nbsp;</p>
                    <p> &nbsp;</p>
                    <p> &nbsp;</p>
                    <p> &nbsp;</p>
                    <p> &nbsp;</p>
                  </>
                )}
              </>
            ) : (
              <>
                <p> &nbsp;</p>
                <p> &nbsp;</p>
                <p> &nbsp;</p>
                <p> &nbsp;</p>
              </>
            )}
            <div className="text_alijdshfhd ">
              {isData?.createdBySignature ? (
                <>
                  <img
                    style={{ height: '20px', width: '140px' }}
                    src={`${backendUrl}uploads/images/${isData?.createdBySignature}`}
                    alt="signature"
                  />
                </>
              ) : (
                ''
              )}
              {isData?.creator_name?.signature && (
                <img
                  style={{ height: '20px', width: '140px' }}
                  src={`${backendUrl}uploads/images/${isData?.creator_name?.signature}`}
                  alt="signature"
                />
              )}
              <p className="text_alijdshfhd">
                (
                {isData?.createdBy
                  ? isData?.createdBy
                  : isData?.creator_name?.Username}
                )
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoliCertificatePrint;
