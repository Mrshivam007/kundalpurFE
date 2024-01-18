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

const TotalAmountRow = ({ totalAmount }) => {

  const converter = new Converter(hiIN);

  const total = totalAmount.toFixed(2)
  return (
    <>
      <TableRow>
        <TableCell style={tableTotalCellStyles}>
          <Typography variant="body1" fontSize={14}>
            Total
          </Typography>
        </TableCell>
        <TableCell style={tableTotalCellStyles} colSpan={12}>
          <Typography variant="body1" fontSize={14}>
            {'₹' + total+ '/-'}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={tableTotalCellStyles}>
          <Typography variant="body1" fontSize={14}>
            शब्दों में
          </Typography>
        </TableCell>
        <TableCell colSpan={12} style={tableTotalCellStyles}>
          <Typography variant="body1" fontSize={14}>
            {total && total > 0
              ? converter.toWords(total) + ' रुपए मात्र'
              : ''}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TotalAmountRow;
