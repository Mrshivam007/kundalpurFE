import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Converter, hiIN } from 'any-number-to-words';
export const tableTotalCellStyles = {
  paddingInline: '10px',
  paddingBlock: '4px',
  outline: '1px solid #C4C4C4',
};

const TotalAmountRow = ({ donationItems }) => {
  let totalAmount = 0;

  if (donationItems[0].quantity && donationItems[0].approxValue) {
    totalAmount = Array.isArray(donationItems)
      ? donationItems.reduce((acc, item) => {
          if (isNaN(parseInt(item.quantity) * parseInt(item.approxValue))) {
            return acc;
          }
          return acc + parseInt(item.approxValue);
        }, 0)
      : 0;
  } else {
    totalAmount = Array.isArray(donationItems)
      ? donationItems.reduce((acc, item) => {
          if (isNaN(parseInt(item.amount))) {
            return acc;
          }
          return acc + parseInt(item.amount);
        }, 0)
      : 0;
  }

  const converter = new Converter(hiIN);
  return (
    <>
      <TableRow>
        <TableCell style={tableTotalCellStyles}>
          <Typography variant="body1" fontSize={14}>
            Total
          </Typography>
        </TableCell>
        <TableCell style={tableTotalCellStyles} colSpan={5}>
          <Typography variant="body1" fontSize={14}>
            {'₹' + totalAmount + '/-'}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={tableTotalCellStyles}>
          <Typography variant="body1" fontSize={14}>
            शब्दों में
          </Typography>
        </TableCell>
        <TableCell colSpan={5} style={tableTotalCellStyles}>
          <Typography variant="body1" fontSize={14}>
            {totalAmount && totalAmount > 0
              ? converter.toWords(totalAmount) + ' रुपए मात्र'
              : ''}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TotalAmountRow;
