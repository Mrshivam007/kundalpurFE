import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { Converter, hiIN } from 'any-number-to-words';
import Moment from 'moment-js';
import moment from 'moment';
import './PrintContent.css';
import { backendUrl } from '../../../config/config';
const converter = new Converter(hiIN);
function ModalOnlineContentent({
  setopendashboard,
  setshowreciept,
  handleClose50,
  datasend,
}) {
  const location = useLocation();
  const componentRef = useRef();
  const navigation = useNavigate();
  const adminName = sessionStorage.getItem('adminName');

  const empName = sessionStorage.getItem('empName');

  const [isData, setisData] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    setopendashboard(true);

    if (datasend) {
      setisData(datasend);
    }
    setTimeout(() => {
      handlePrint();
    }, 100);
  }, []);

  const shareReceipt = () => {
    serverInstance(`user/donation-receipt?id=${isData?.id}`, 'get').then(
      (res) => {},
    );
  };
  return (
    <>
      <div style={{ paddingLeft: '4rem', paddingRight: '4rem' }}>
        <div className="button_div_print_download">
          <button onClick={() => handleClose50()}>Back</button>
          {/* <button style={{ width: '17rem' }} onClick={() => shareReceipt()}>
          Share on whatsaap
        </button> */}
          <button
            style={{ width: '17rem' }}
            onClick={() => {
              handlePrint();
              shareReceipt();
            }}
          >
            Share on whatsaap
          </button>
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
                  {isData?.LedgerNo ? (
                    <>
                      <p className="common_margin_pp">
                        <span className="rd">
                          लेजर नं -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        </span>
                        <span className="hidelight" style={{ fontSize: 16 }}>
                          {isData?.LedgerNo}
                        </span>
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  <p className="common_margin_pp">
                    <span className="rd">
                      दान रसीद नं -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
                      {isData?.RECEIPT_NO
                        ? isData?.RECEIPT_NO
                        : isData?.ReceiptNo}
                    </span>
                  </p>

                  {isData && isData.CHEQUE_NO && (
                    <>
                      <p className="common_margin_pp">
                        <span className="grday-text">
                          दान का मद - &nbsp; &nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="hidelight" style={{ fontSize: 16 }}>
                          {isData && isData?.TYPE}
                        </span>
                      </p>
                    </>
                  )}

                  {isData && isData.CHEQUE_NO === '' && (
                    <>
                      <p className="common_margin_pp">
                        <span className="gdray-text">
                          दान का मद - &nbsp; &nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="hidelight" style={{ fontSize: 16 }}>
                          {isData && isData?.TYPE}
                        </span>
                      </p>
                    </>
                  )}
                </div>
                <div>
                  <p className="common_margin_pp">
                    <span className="grady-text">
                      दिनांक - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
                      {isData && isData?.manualItemDetails ? (
                        <>
                          {Moment(isData?.donation_date).format('DD-MM-YYYY')}:
                          {moment(isData?.donation_time, 'HH:mm:ss').format(
                            'hh:mm A',
                          )}
                        </>
                      ) : (
                        <>
                          {Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')}-
                        </>
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <div className="div_center_text_is">
                <div className="gray-text_div">
                  <p>दान दातार -</p>
                </div>
                <div className="wrap_div_child_div">
                  <span className="common_margin_pp hidelight">
                    {isData?.gender}&nbsp;
                    {isData?.NAME ? isData?.NAME : isData?.name}
                    {isData?.MobileNo ||
                      (isData && isData.phoneNo && (
                        <>
                          (
                          {isData && isData?.MobileNo
                            ? isData?.MobileNo
                            : isData && isData.phoneNo}
                          )
                        </>
                      ))}
                  </span>
                </div>
              </div>
              <div className="div_center_text_is">
                <div className="gray-text_div">
                  <p>स्थान -</p>
                </div>
                <div className="wrap_div_child_div">
                  <span className="common_margin_pp hidelight">
                    {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}
                  </span>
                </div>
              </div>

              {isData && isData?.modeOfDonation === '4' ? (
                <>
                  <p className="common_margin_pp">
                    <span className="grday-text">
                      विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
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
                    </span>
                  </p>
                </>
              ) : (
                <></>
              )}

              {isData && isData?.modeOfDonation === 4 ? (
                <>
                  <p className="common_margin_pp">
                    <span className="grday-text">
                      विवरण - &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
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
                    </span>
                  </p>
                </>
              ) : (
                <></>
              )}
              {isData &&
                isData.manualItemDetails &&
                isData.manualItemDetails[0].itemType && (
                  <>
                    <p
                      className="common_margin_pp"
                      style={{
                        marginBottom: '1.5rem',
                        marginTop: '1.5rem',
                      }}
                    >
                      <span className="grday-text">
                        उपहार का मद -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                      </span>
                      <span className="hidelight" style={{ fontSize: 16 }}>
                        {isData &&
                          isData.manualItemDetails &&
                          isData.manualItemDetails.map((item) => {
                            return <>{item?.type},</>;
                          })}
                      </span>
                    </p>
                  </>
                )}
              <div>
                {(isData && isData?.modeOfDonation === '4') ||
                (isData && isData?.modeOfDonation === 4) ? (
                  <>
                    {' '}
                    <p style={{ textAlign: 'center' }} className="grway-text">
                      आपके द्वारा प्रदत्त उपहार दान स्वरूप सधन्यवाद प्राप्त हुआ।
                    </p>
                  </>
                ) : (
                  <>
                    <div className="div_center_text_is">
                      {isData && isData?.manualItemDetails && (
                        <>
                          <div
                            className="gray-text_div"
                            style={{ width: '6rem' }}
                          >
                            <p>दान का मद -</p>
                          </div>
                          <div className="wrap_div_child_div">
                            {isData &&
                              isData?.manualItemDetails &&
                              isData?.manualItemDetails.map((item) => {
                                return (
                                  <p
                                    className="common_margin_pp hidelight"
                                    style={{ fontSize: 16 }}
                                  >
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
                            विवरण - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.manualItemDetails.map((item) => {
                                    return <> {item?.remark}</>;
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
                            विवरण - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.manualItemDetails.map((item) => {
                                    return <> {item?.remark}</>;
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
                            विवरण -&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
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
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    {isData && isData.modeOfDonation === 3 && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
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
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    {isData && isData.modeOfDonation === '1' && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.manualItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark}{' '}
                                        {item?.BankName && (
                                          <>({item?.BankName})</>
                                        )}
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
                            विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.manualItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark}{' '}
                                        {item?.BankName && (
                                          <>({item?.BankName})</>
                                        )}
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
                        <span className="grday-text">
                          दान राशि अंको में - &nbsp;
                        </span>
                        <span className="hidelight" style={{ fontSize: 16 }}>
                          ₹
                          {isData && isData?.AMOUNT
                            ? isData?.AMOUNT
                            : isData &&
                              isData.manualItemDetails.reduce(
                                (n, { amount }) =>
                                  parseFloat(n) + parseFloat(amount),
                                0,
                              )}
                          /-
                        </span>
                      </p>
                    </div>
                    <p className="common_margin_pp">
                      <span className="grday-text">
                        दान राशि शब्दों में - &nbsp;
                      </span>

                      {isData && isData.manualItemDetails ? (
                        <>
                          <span className="hidelight" style={{ fontSize: 16 }}>
                            {isData && isData?.AMOUNT
                              ? converter.toWords(
                                  isData?.AMOUNT ? isData?.AMOUNT : 0,
                                  {
                                    comma: true,
                                  },
                                )
                              : isData &&
                                converter.toWords(
                                  isData &&
                                    isData.manualItemDetails.reduce(
                                      (n, { amount }) =>
                                        parseFloat(n) + parseFloat(amount),
                                      0,
                                    )
                                    ? isData &&
                                        isData.manualItemDetails.reduce(
                                          (n, { amount }) =>
                                            parseFloat(n) + parseFloat(amount),
                                          0,
                                        )
                                    : 0,
                                  {
                                    comma: true,
                                  },
                                )}
                          </span>

                          {isData && isData?.modeOfDonation === '2' && (
                            <span className="grjhjay-text">
                              {' '}
                              &nbsp; रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === 2 && (
                            <span className="grssay-text">
                              {' '}
                              &nbsp; रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === '1' && (
                            <span className="gssray-text">
                              &nbsp; रूपये बैंक द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === 1 && (
                            <span className="gsray-text">
                              &nbsp; रूपये बैंक द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === '3' && (
                            <span className="grsay-text">
                              &nbsp; रूपये चैक द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === 3 && (
                            <span className="gsray-text">
                              &nbsp; रूपये चैक द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।{' '}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {isData && isData?.MODE_OF_DONATION === 'ONLINE' && (
                            <span className="grsay-text">
                              {isData && converter.toWords(isData?.AMOUNT)},
                              &nbsp; रूपये ऑनलाइन द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।
                            </span>
                          )}
                          {isData && isData?.MODE_OF_DONATION === 'CHEQUE' && (
                            <span span className="grsay-text">
                              {isData && converter.toWords(isData?.AMOUNT)},
                              &nbsp; रूपये ऑनलाइन चैक द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।
                            </span>
                          )}
                        </>
                      )}
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
                  isData.manualItemDetails &&
                  isData.manualItemDetails[0].itemType
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
                <p>
                  (
                  {isData?.CreatedBy
                    ? isData?.CreatedBy
                    : isData?.Creator_name?.Username}
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
              <div className="main_print_div" style={{ marginTop: '6rem' }}>
                <div>
                  {isData?.LedgerNo ? (
                    <>
                      <p className="common_margin_pp">
                        <span className="rd">
                          लेजर नं -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        </span>
                        <span className="hidelight" style={{ fontSize: 16 }}>
                          {isData?.LedgerNo}
                        </span>
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                  <p className="common_margin_pp">
                    <span className="rd">
                      दान रसीद नं -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
                      {isData?.RECEIPT_NO
                        ? isData?.RECEIPT_NO
                        : isData?.ReceiptNo}
                    </span>
                  </p>

                  {isData && isData.CHEQUE_NO && (
                    <>
                      <p className="common_margin_pp">
                        <span className="grday-text">
                          दान का मद - &nbsp; &nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="hidelight" style={{ fontSize: 16 }}>
                          {isData && isData?.TYPE}
                        </span>
                      </p>
                    </>
                  )}

                  {isData && isData.CHEQUE_NO === '' && (
                    <>
                      <p className="common_margin_pp">
                        <span className="gdray-text">
                          दान का मद - &nbsp; &nbsp;
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="hidelight" style={{ fontSize: 16 }}>
                          {isData && isData?.TYPE}
                        </span>
                      </p>
                    </>
                  )}
                </div>
                <div>
                  <p className="common_margin_pp">
                    <span className="grady-text">
                      दिनांक - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
                      {isData && isData?.manualItemDetails ? (
                        <>
                          {Moment(isData?.donation_date).format('DD-MM-YYYY')}:
                          {moment(isData?.donation_time, 'HH:mm:ss').format(
                            'hh:mm A',
                          )}
                        </>
                      ) : (
                        <>
                          {Moment(isData?.DATE_OF_CHEQUE).format('DD-MM-YYYY')}-
                        </>
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <div className="div_center_text_is">
                <div className="gray-text_div">
                  <p>दान दातार -</p>
                </div>
                <div className="wrap_div_child_div">
                  <span className="common_margin_pp hidelight">
                    {isData?.gender}&nbsp;
                    {isData?.NAME ? isData?.NAME : isData?.name}(
                    {isData && isData?.MobileNo
                      ? isData?.MobileNo
                      : isData && isData.phoneNo}
                    )
                  </span>
                </div>
              </div>
              <div className="div_center_text_is">
                <div className="gray-text_div">
                  <p>स्थान -</p>
                </div>
                <div className="wrap_div_child_div">
                  <span className="common_margin_pp hidelight">
                    {isData?.ADDRESS ? isData?.ADDRESS : isData?.address}
                  </span>
                </div>
              </div>

              {isData && isData?.modeOfDonation === '4' ? (
                <>
                  <p className="common_margin_pp">
                    <span className="grday-text">
                      विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
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
                    </span>
                  </p>
                </>
              ) : (
                <></>
              )}

              {isData && isData?.modeOfDonation === 4 ? (
                <>
                  <p className="common_margin_pp">
                    <span className="grday-text">
                      विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="hidelight" style={{ fontSize: 16 }}>
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
                    </span>
                  </p>
                </>
              ) : (
                <></>
              )}
              {isData &&
                isData.manualItemDetails &&
                isData.manualItemDetails[0].itemType && (
                  <>
                    <p
                      className="common_margin_pp"
                      style={{
                        marginBottom: '1.5rem',
                        marginTop: '1.5rem',
                      }}
                    >
                      <span className="grday-text">
                        उपहार का मद -&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                      </span>
                      <span className="hidelight" style={{ fontSize: 16 }}>
                        {isData &&
                          isData.manualItemDetails &&
                          isData.manualItemDetails.map((item) => {
                            return <>{item?.type},</>;
                          })}
                      </span>
                    </p>
                  </>
                )}
              <div>
                {(isData && isData?.modeOfDonation === '4') ||
                (isData && isData?.modeOfDonation === 4) ? (
                  <>
                    {' '}
                    <p style={{ textAlign: 'center' }} className="grway-text">
                      आपके द्वारा प्रदत्त उपहार दान स्वरूप सधन्यवाद प्राप्त हुआ।
                    </p>
                  </>
                ) : (
                  <>
                    <div className="div_center_text_is">
                      {isData && isData?.manualItemDetails && (
                        <>
                          <div
                            className="gray-text_div"
                            style={{ width: '6rem' }}
                          >
                            <p>दान का मद -</p>
                          </div>
                          <div className="wrap_div_child_div">
                            {isData &&
                              isData?.manualItemDetails &&
                              isData?.manualItemDetails.map((item) => {
                                return (
                                  <p
                                    className="common_margin_pp hidelight"
                                    style={{ fontSize: 16 }}
                                  >
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
                            विवरण - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.manualItemDetails.map((item) => {
                                    return <> {item?.remark}</>;
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
                            विवरण - &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            &nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.manualItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark && (
                                          <>{item?.item?.remark}</>
                                        )}
                                      </>
                                    );
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
                            विवरण -&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
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
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    {isData && isData.modeOfDonation === 3 && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
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
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    {isData && isData.modeOfDonation === '1' && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
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
                            </span>
                          </p>
                        </div>
                      </>
                    )}

                    {isData && isData.modeOfDonation === 1 && (
                      <>
                        <div>
                          <p className="common_margin_pp">
                            विवरण - &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <span
                              className="hidelight"
                              style={{ fontSize: 16 }}
                            >
                              {isData && isData?.REMARK
                                ? isData?.REMARK
                                : isData &&
                                  isData.manualItemDetails.map((item) => {
                                    return (
                                      <>
                                        {item?.remark}{' '}
                                        {item?.BankName && (
                                          <>({item?.BankName})</>
                                        )}
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
                        <span className="grday-text">
                          दान राशि अंको में - &nbsp;
                        </span>
                        <span className="hidelight" style={{ fontSize: 16 }}>
                          ₹
                          {isData && isData?.AMOUNT
                            ? isData?.AMOUNT
                            : isData &&
                              isData.manualItemDetails.reduce(
                                (n, { amount }) =>
                                  parseFloat(n) + parseFloat(amount),
                                0,
                              )}
                          /-
                        </span>
                      </p>
                    </div>
                    <p className="common_margin_pp">
                      <span className="grday-text">
                        दान राशि शब्दों में - &nbsp;
                      </span>

                      {isData && isData.manualItemDetails ? (
                        <>
                          <span className="hidelight" style={{ fontSize: 16 }}>
                            {isData && isData?.AMOUNT
                              ? converter.toWords(
                                  isData?.AMOUNT ? isData?.AMOUNT : 0,
                                  {
                                    comma: true,
                                  },
                                )
                              : isData &&
                                converter.toWords(
                                  isData &&
                                    isData.manualItemDetails.reduce(
                                      (n, { amount }) =>
                                        parseFloat(n) + parseFloat(amount),
                                      0,
                                    )
                                    ? isData &&
                                        isData.manualItemDetails.reduce(
                                          (n, { amount }) =>
                                            parseFloat(n) + parseFloat(amount),
                                          0,
                                        )
                                    : 0,
                                  {
                                    comma: true,
                                  },
                                )}
                          </span>

                          {isData && isData?.modeOfDonation === '2' && (
                            <span className="grjhjay-text">
                              {' '}
                              &nbsp; रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === 2 && (
                            <span className="grssay-text">
                              {' '}
                              &nbsp; रूपये नगद दान स्वरूप सधन्यवाद प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === '1' && (
                            <span className="gssray-text">
                              &nbsp; रूपये बैंक द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === 1 && (
                            <span className="gsray-text">
                              &nbsp; रूपये बैंक द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === '3' && (
                            <span className="grsay-text">
                              &nbsp; रूपये चैक द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।{' '}
                            </span>
                          )}
                          {isData && isData?.modeOfDonation === 3 && (
                            <span className="gsray-text">
                              &nbsp; रूपये चैक द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।{' '}
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          {isData && isData?.MODE_OF_DONATION === 'ONLINE' && (
                            <span className="grsay-text">
                              {isData && converter.toWords(isData?.AMOUNT)},
                              &nbsp; रूपये ऑनलाइन द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।
                            </span>
                          )}
                          {isData && isData?.MODE_OF_DONATION === 'CHEQUE' && (
                            <span span className="grsay-text">
                              {isData && converter.toWords(isData?.AMOUNT)},
                              &nbsp; रूपये ऑनलाइन चैक द्वारा दान स्वरूप सधन्यवाद
                              प्राप्त हुये।
                            </span>
                          )}
                        </>
                      )}
                    </p>
                  </>
                )}
              </div>
            </div>
            {isData?.manualItemDetails.length > 1 ? (
              <>
                {isData?.manualItemDetails[0]?.itemType ? (
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
                  </>
                )}
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

            <div className="text_alijdshfhd ">
              {isData?.createdBySignature ? (
                <>
                  <img
                    style={{ height: '20px', width: '80px' }}
                    src={`${backendUrl}uploads/images/${isData?.createdBySignature}`}
                    alt="signature"
                  />
                </>
              ) : (
                ''
              )}
              <p className="text_alijdshfhd">
                (
                {isData?.CreatedBy
                  ? isData?.CreatedBy
                  : isData?.Creator_name?.Username}
                )
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalOnlineContentent;
