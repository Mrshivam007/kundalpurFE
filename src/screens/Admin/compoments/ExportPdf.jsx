import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import Moment from 'moment-js';
import html2pdf from 'html2pdf.js';

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
      item?.manualItemDetails?.map((item) => {
        return item.type;
      }),
      item?.manualItemDetails?.reduce(
        (n, { amount }) => parseFloat(n) + parseFloat(amount),
        0,
      ),
      item?.CreatedBy,
      // format(new Date(item?.createdAt), 'yyyy-MM-dd'),
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

const ExportPdfmanulReport = (isData, fileName) => {
  // Create an HTML table to hold the data
  let htmlContent = `
      <style>
      table {
        width: 100%;
        border-collapse: collapse;
        font-family: 'Devanagari', sans-serif;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>
    <table>
      <thead>
        <tr>
          <th>Head Name</th>
          <th>Type</th>
          <th>Amount Cheque</th>
          <th>Amount Electronic</th>
          <th>Amount Item</th>
          <th>Amount Cash</th>
          <th>Amount Total</th>
        </tr>
      </thead>
      <tbody>`;

  isData.forEach((item) => {
    const totalAmount =
      (item?.cheque_TOTAL_AMOUNT || 0) +
      (item?.bank_TOTAL_AMOUNT || 0) +
      (item?.item_TOTAL_AMOUNT || 0) +
      (item?.cash_TOTAL_AMOUNT || 0);

    htmlContent += `
      <tr>
        <td>${item?.type ? item.type : item?.employeeName}</td>
        <td>${item?.donationType}</td>
        <td>${item?.cheque_TOTAL_AMOUNT}</td>
        <td>${item?.bank_TOTAL_AMOUNT}</td>
        <td>${item?.item_TOTAL_AMOUNT}</td>
        <td>${item?.cash_TOTAL_AMOUNT}</td>
        <td>${totalAmount}</td>
      </tr>`;
  });

  htmlContent += `</tbody></table>`;

  // Convert HTML content to PDF
  const opt = {
    margin: 0,
    filename: `${fileName}.pdf`,
    html2canvas: { scale: 2 },  // Higher scale for better quality
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(htmlContent).set(opt).save();
};

const ExportPdfonlineReport = (isData, fileName) => {
  // Create an HTML table to hold the data
  console.log("getting data on pdf ", isData);

  let htmlContent = `
    <table>
      <thead>
        <tr>
          <th>Head Name</th>
          <th>Type</th>
          <th>Online</th>
          <th>Cheque</th>
          <th>Amount Total</th>
        </tr>
      </thead>
      <tbody>`;

  isData.forEach((item) => {
    const totalAmount =
      (item?.online || 0) +
      (item?.cheque || 0);

    htmlContent += `
      <tr>
        <td>${item?.type ? item.type : item?.employeeName}</td>
        <td>${item?.donationType}</td>
        <td>${item?.online}</td>
        <td>${item?.cheque}</td>
        <td>${totalAmount}</td>
      </tr>`;
  });

  htmlContent += `</tbody></table>`;

  // Convert HTML content to PDF
  const opt = {
    margin: 0,
    filename: `${fileName}.pdf`,
    html2canvas: { scale: 2 },  // Higher scale for better quality
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().from(htmlContent).set(opt).save();
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
    'Phone',
    'Name',
    'Address',
    'Head/Item',
    'amout',
    'user',
    'remark',
  ];

  const tableRows = [];

  isData.forEach((item) => {
    const ticketData = [
      Moment(item.donation_date).format('DD/MM/YYYY'),
      item?.ReceiptNo,
      item?.phoneNo,
      item?.name,
      item?.address,
      item?.manualItemDetails.map((item) => {
        console.log("getting type daat ", item);
        return item.type;
      }),
      item?.manualItemDetails.reduce(
        (n, { amount }) => parseFloat(n) + parseFloat(amount),
        0,
      ),
      item?.CreatedBy,
      item?.manualItemDetails.map((item) => {
        return item.remark;
      }),
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
  ExportPdfmanulReport,
  ExportPdfonlineReport,
  ExportPdfUser,
  ExportPdfUserCheque,
  ExportPdfmanulElectronic,
  DonationConsolated,
};
