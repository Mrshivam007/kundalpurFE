import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import Moment from 'moment-js';
const ExportPdfmanul = (isData, fileName) => {
  const doc = new jsPDF();

  const tableColumn = [
    'Date',
    'Receipt',
    'Voucher',
    'Phone',
    'Name',
    'Address',
    'type',
    'amout',
    'staff',
  ];

  const tableRows = [];

  isData.forEach((item) => {
    const ticketData = [
      Moment(item.donation_date).format('DD/MM/YYYY'),
      item?.ReceiptNo,
      item?.voucherNo,
      item?.phoneNo,
      item?.name,
      item?.address,
      item?.elecItemDetails.map((item) => {
        return item.remark;
      }),
      item?.elecItemDetails.reduce(
        (n, { amount }) => parseFloat(n) + parseFloat(amount),
        0,
      ),
      item?.address,
      format(new Date(item.createdAt), 'yyyy-MM-dd'),
    ];

    tableRows.push(ticketData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(' ');

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.text(`Report of ${fileName}`, 8, 9);
  doc.setFont('Lato-Regular', 'normal');
  doc.setFontSize(28);
  doc.save(`${fileName}_${dateStr}.pdf`);
};

const DonationConsolated = (isData, fileName) => {
  const doc = new jsPDF();

  const tableColumn = ['staff', 'total'];

  const tableRows = [];

  isData.forEach((item) => {
    const ticketData = [
      // Moment(item?.donation_date).format('DD/MM/YYYY'),
      item?.name,
      item?.totalDonationAmount,
      format(new Date(item.createdAt), 'DD/MM/YYYY'),
    ];

    tableRows.push(ticketData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(' ');

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.text(`Report of ${fileName}`, 8, 9);
  doc.setFont('Lato-Regular', 'normal');
  doc.setFontSize(28);
  doc.save(`${fileName}_${dateStr}.pdf`);
};

const ExportPdfmanulElectronic = (isData, fileName) => {
  const doc = new jsPDF();

  const tableColumn = [
    'Date',
    'Receipt',
    'Voucher',
    'Phone',
    'Name',
    'Address',
    'type',
    'amout',
    'staff',
  ];

  const tableRows = [];

  isData.forEach((item) => {
    const ticketData = [
      Moment(item.donation_date).format('DD/MM/YYYY'),
      item?.ReceiptNo,
      item?.voucherNo,
      item?.phoneNo,
      item?.name,
      item?.address,
      item?.manualItemDetails.map((item) => {
        return item.remark;
      }),
      item?.manualItemDetails.reduce(
        (n, { amount }) => parseFloat(n) + parseFloat(amount),
        0,
      ),
      item?.CreatedBy,
      format(new Date(item.createdAt), 'yyyy-MM-dd'),
    ];

    tableRows.push(ticketData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(' ');

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.text(`Report of ${fileName}`, 8, 9);
  doc.setFont('Lato-Regular', 'normal');
  doc.setFontSize(28);
  doc.save(`${fileName}_${dateStr}.pdf`);
};

const ExportPdfUser = (isData, fileName) => {
  const doc = new jsPDF();

  const tableColumn = [
    'Date',
    'Receipt',
    'Phone',
    'Name',
    'Address',
    'type',
    'PAYMENT_ID',
    'amout',
  ];

  const tableRows = [];

  //   {
  //     "id": 1,
  //     "RECEIPT_NO": "ONLINE/2022-23/0000001",
  //     "MobileNo": "8805786956",
  //     "NAME": "Anil Babu",
  //     "IMG": "",
  //     "": "Dehradun",
  //     "MODE_OF_DONATION": "ONLINE",
  //     "TYPE": "कुण्डलपुर क्षेत्र विकास हेतु दान ",
  //     "REMARK": "good",
  //     "AMOUNT": 1111,
  //     "CHEQUE_NO": "",
  //     "DATE_OF_CHEQUE": "",
  //     "NAME_OF_BANK": "",
  //     "PAYMENT_ID": "new_id_pay_12",
  //     "PAYMENT_STATUS": false,
  //     "DATE_OF_DAAN": "2023-01-31T15:13:30.000Z",
  //     "ADDED_BY": 1,
  //     "active": "",
  //     "GENDER": "श्री",
  //     "rsn": null,
  //     "createdAt": "2023-01-31T15:13:30.000Z",
  //     "updatedAt": "2023-01-31T15:13:30.000Z"
  // }

  isData.forEach((item) => {
    const ticketData = [
      Moment(item.donation_date).format('DD/MM/YYYY'),
      item?.RECEIPT_NO,
      item?.MobileNo,
      item?.NAME,
      item?.ADDRESS,
      item?.REMARK,
      item?.PAYMENT_ID,
      item?.AMOUNT,

      format(new Date(item.createdAt), 'yyyy-MM-dd'),
    ];

    tableRows.push(ticketData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(' ');

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.text(`Report of ${fileName}`, 8, 9);
  doc.setFont('Lato-Regular', 'normal');
  doc.setFontSize(28);
  doc.save(`${fileName}_${dateStr}.pdf`);
};

const ExportPdfUserCheque = (isData, fileName) => {
  const doc = new jsPDF();

  const tableColumn = [
    'Date',
    'Phone',
    'Name',
    'Address',
    'type',
    'Bank',
    'cheNo',
    'amout',
  ];

  const tableRows = [];

  //   {
  //     "id": 1,
  //     "RECEIPT_NO": "ONLINE/2022-23/0000001",
  //     "MobileNo": "8805786956",
  //     "NAME": "Anil Babu",
  //     "IMG": "",
  //     "": "Dehradun",
  //     "MODE_OF_DONATION": "ONLINE",
  //     "TYPE": "कुण्डलपुर क्षेत्र विकास हेतु दान ",
  //     "REMARK": "good",
  //     "AMOUNT": 1111,
  //     "CHEQUE_NO": "",
  //     "DATE_OF_CHEQUE": "",
  //     "NAME_OF_BANK": "",
  //     "PAYMENT_ID": "new_id_pay_12",
  //     "PAYMENT_STATUS": false,
  //     "DATE_OF_DAAN": "2023-01-31T15:13:30.000Z",
  //     "ADDED_BY": 1,
  //     "active": "",
  //     "GENDER": "श्री",
  //     "rsn": null,
  //     "createdAt": "2023-01-31T15:13:30.000Z",
  //     "updatedAt": "2023-01-31T15:13:30.000Z"
  // }

  isData.forEach((item) => {
    const ticketData = [
      Moment(item.DATE_OF_DAAN).format('DD/MM/YYYY'),
      item?.MobileNo,
      item?.NAME,
      item?.ADDRESS,
      item?.REMARK,
      item?.NAME_OF_BANK,
      item?.CHEQUE_NO,
      item?.AMOUNT,
      format(new Date(item.createdAt), 'yyyy-MM-dd'),
    ];

    tableRows.push(ticketData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(' ');

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  doc.text(`Report of ${fileName}`, 8, 9);
  doc.setFont('Lato-Regular', 'normal');
  doc.setFontSize(28);
  doc.save(`${fileName}_${dateStr}.pdf`);
};

export {
  ExportPdfmanul,
  ExportPdfUser,
  ExportPdfUserCheque,
  ExportPdfmanulElectronic,
  DonationConsolated,
};
