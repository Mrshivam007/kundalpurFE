// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../config/config';
import { serverInstance } from '../../../../API/ServerInstance';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { CustomInput, CustomInputLabel, CustomTableInput } from '../common';

import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import CircularProgress from '@material-ui/core/CircularProgress';

const Payment = ({
  handleClose,
  themeColor,
  updateData,
  showUpdateBtn,
  receiptNo,
  voucher,
  // donationTypes,
}) => {
  const navigation = useNavigate();
  const { t, i18n } = useTranslation();

  const relationshipOptions = [
    {
      id: 2,
      relation: 'Mother',
    },
    {
      id: 3,
      relation: 'Wife',
    },
    {
      id: 4,
      relation: 'Son',
    },
    {
      id: 5,
      relation: 'Daughter',
    },
  ];


  const trustTypeOptions = [
    {
      id: 2,
      type: 'Samiti',
    },
    {
      id: 3,
      type: 'Upsamiti',
    }
  ];

  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins',
    },
    palette: {
      primary: {
        main: themeColor,
      },
    },
  });



  const [voucherNo , setVoucherNo] = useState('')
 const [ ledgerNo, setLedgerNo]=useState('')
  const [ledgerName ,setLedgerName] = useState('')
 const[paymentMode , setPaymentMode] = useState('')
 const [ amount , setAmount] = useState('')
 const [narration ,setNarration] = useState('')
  const [ date , setDate] = useState('')

  const [newMember, setNewMember] = useState(false);

  const [remark , setRemark ] = useState('')

  const [showloader, setshowloader] = useState(false);

  const [items, setItems] = useState([
    {
      voucherNo,
      amount,
      remark
    },
  ]);

 



  function addDonationItem() {
    setItems([
      ...items,
      {
        voucherNo,
        amount,
        remark
      },
    ]);
  }

  function removeItem(item) {
    setItems(
      items.filter((donationItem) => donationItem !== item),
    );
  }




  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  var today = new Date();
  const currDate = today
    .toLocaleDateString('en-IN', options)
    .replace(/-/g, ' ');
  const currTime = today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  // var date = today.toISOString().substring(0, 10);


  return (
    <Box>
      <ThemeProvider theme={theme}>
        <form>
          <Typography variant="h6" color={'primary'} align="center">
            Received
          </Typography>
          <Typography variant="body2" color="primary" align="right">
            {currDate} / {currTime}
          </Typography>

          {console.log("voucher " + voucher)}
          <Typography variant="body2" my={1}>

            {voucher ? 'Voucher No : ' : ''}
            {voucher ? voucher : ''}
          </Typography>


        
          <Grid container rowSpacing={2} columnSpacing={5}>

          
            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="Date">
                Date
              </CustomInputLabel>
              <CustomInput
                type="date"
                placeholder='Enter Trust Code'
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}

              />
            </Grid>

            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="voucherNo">
                Voucher No.
              </CustomInputLabel>
              <CustomInput
                
                placeholder='Enter Voucher No.'
               
              
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="sadasyaType">
               Payment Mode
              </CustomInputLabel>

              <Select
                required
                sx={{
                  width: '100%',
                  height: '60%',
                  borderRadius: '1rem',
                  fontSize: 14,
                  '& .MuiSelect-select': {
                    padding: '1px',
                  },
                }}
            
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={'Adhyaksh'}
                >

                </MenuItem>
                {trustTypeOptions.map((item, idx) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      key={item.id}
                      value={item.type}
                    >
                      {item.type}
                    </MenuItem>
                  );
                })}
              </Select>

              
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="ledgerNo">
                Ledger No.
              </CustomInputLabel>
              <CustomInput
                id="mobile-no"
                placeholder='Enter Ledger No.'
                value = {ledgerNo}
                onChange={(e)=>setLedgerNo(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="ledgerName">
                Ledger Name
              </CustomInputLabel>
              <CustomInput
                placeholder='Enter Ledger Name'
               value={ledgerName}
                onChange={(e)=>setLedgerName(e.target.value)}
               />
            </Grid>

         
            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="Amount">
                Amount
              </CustomInputLabel>
              <CustomInput
                placeholder='Enter Amount'
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </Grid>


            <Grid item xs={12} md={6}>
              <CustomInputLabel htmlFor="narration">
                Narration
              </CustomInputLabel>
              <CustomInput
               placeholder='Enter Narration'
                value={narration}
                onChange={(e) => {
                  setNarration(e.target.value);
                }}
              />
            </Grid>




          
          </Grid>

          <TableContainer
            sx={{
              mt: 4,
            }}
          >

            <Box
              sx={{
                paddingInline: '10px',
                minWidth: 200,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Add Vouchers:

              <IconButton aria-label="add" size="small">
                <AddBoxIcon color="primary" onClick={addDonationItem} />
              </IconButton>
            </Box>


            <Table
              stickyHeader
              sx={{
                border: '1px solid #C4C4C4',
                '& th': {
                  padding: 0,
                  fontSize: 14,
                  fontWeight: 500,
                  backgroundColor: '#E4E3E3',
                  color: '#05313C',
                  outline: '1px solid #C4C4C4',
                },
                '& td': {
                  padding: 0,
                  fontSize: 14,
                },
              }}
              aria-label="customized table"
            >

              <TableHead>
                <TableRow>
                  <TableCell align="center">Voucher No.</TableCell>

                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Remark</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell
                      style={{
                        paddingInline: 0,
                      }}
                    >
                      <CustomTableInput
                        required
                        type="text"


                      />
                    </TableCell>

                    <TableCell align="center">
                      <CustomTableInput
                        required
                        type="text"


                      />
                    </TableCell>

                    <TableCell align="center">
                      <CustomTableInput
                        required
                        type="text"


                      />
                    </TableCell>


                    {!newMember && <TableCell sx={{ width: '2rem' }}>
                      <CustomTableInput
                        disabled
                        value={item.remark}

                        endAdornment={
                          idx > 0 && (
                            <InputAdornment position="start">
                              <IconButton
                                sx={{
                                  padding: '4px',
                                }}
                                onClick={() => removeItem(item)}
                              >
                                <RemoveCircleOutlineIcon
                                  color="primary"
                                  fontSize="small"
                                />
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                      />
                    </TableCell>}



                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>








          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              mt: 2,
            }}
          >
            {showUpdateBtn ? (
              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                  boxShadow: 'none',
                }}
                variant="contained"
                type="submit"
              >
                {showloader ? (
                  <CircularProgress
                    style={{
                      width: '21px',
                      height: '21px',
                      color: 'white',
                    }}
                  />
                ) : (
                  'Update'
                )}
              </Button>
            ) : (
              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                  boxShadow: 'none',
                }}
                variant="contained"
                type="submit"
              >
                {showloader ? (
                  <CircularProgress
                    style={{
                      width: '21px',
                      height: '21px',
                      color: 'white',
                    }}
                  />
                ) : (
                  'Save'
                )}
              </Button>
            )}

            <Button
              sx={{
                textTransform: 'none',
                paddingX: 5,
              }}
              variant="contained"
              color="error"
              onClick={handleClose}
              type="button"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </ThemeProvider>
    </Box>
  );
};
export default Payment;
