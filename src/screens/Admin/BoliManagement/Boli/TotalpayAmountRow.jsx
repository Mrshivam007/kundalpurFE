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

const TotalpayAmountRow = ({ donationItems }) => {
  let totalAmount = 0;

  if (donationItems[0]?.BoliAmount) {
    totalAmount = donationItems?.reduce(
      (n, { BoliAmount }) => parseFloat(n) + parseFloat(BoliAmount),
      0,
    );
  }

  const converter = new Converter(hiIN);
  return (
    <>
      {console.log('data is from total ', donationItems)}
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

export default TotalpayAmountRow;
