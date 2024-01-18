// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { backendApiUrl } from '../../../../../../../config/config';
import { serverInstance } from '../../../../../../../API/ServerInstance';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Swal from 'sweetalert2';
import { CustomInput, CustomInputLabel, CustomTableInput } from '../../../../common';

import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import CircularProgress from '@material-ui/core/CircularProgress';

const Payment = ({
  handleClose,
  themeColor,
  updateData,
  openEdit,
  receiptNo,
  voucher,
  // donationTypes,
}) => {


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

  const navigate = useNavigate()

  const [voucherNo, setVoucherNo] = useState('')
  const [ledgerNo, setLedgerNo] = useState('')
  const [ledgerName, setLedgerName] = useState('')
  const [paymentMode, setPaymentMode] = useState('')
  const [paymentModeList, setPaymentModeList] = useState([])
  const [amount, setAmount] = useState('')
  const [narration, setNarration] = useState('')
  const [date, setDate] = useState('')
  const [expenseHead, setExpenseHead] = useState('')
  const [expenseHeadList, setExpenseHeadList] = useState([])
  const [newMember, setNewMember] = useState(false);

  const [remark, setRemark] = useState('')

  const [showloader, setshowloader] = useState(false);

  const [items, setItems] = useState([
    {
      Type: '',
      itemVoucherNo: '',
      itemAmount: '',
      remark: ''
    },
  ]);


  function handleItemUpdate(originalItem, key, value) {
    console.log(items.remark)
    setItems(
      items.map((voucherItem) =>
        voucherItem === originalItem
          ? {
            ...voucherItem,
            [key]: value,
          }
          : voucherItem,
      ),
    );
    console.log(items)
  }



  function addDonationItem() {
    setItems([
      ...items,
      {
        Type: '',
        itemVoucherNo: '',
        itemAmount: '',
        remark: ''
      },
    ]);
  }

  function removeItem(item) {
    setItems(
      items.filter((donationItem) => donationItem !== item),
    );
  }

  const getPaymentMode = async () => {
    const res = await serverInstance('admin/get-paymentMode', 'get')

    if (res.status) {
      setPaymentModeList(res.data)
    }
  }

  const getExpenseHead = async () => {

    const res = await serverInstance('admin/get-expenseHead', 'get')

    if (res.status) {
      setExpenseHeadList(res.data)
    }
  }


  const AddPayment = async (e) => {
    e.preventDefault()
    try {



      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}expense/add-expenseVoucher`, {
        expenseDate: date,
        voucherNo: voucherNo,
        paymentMode: paymentMode,
        LedgerNo: ledgerNo,
        LedgerName: ledgerName,
        amount:  items?.reduce(
          (n, { amount }) => parseFloat(n) + parseFloat(amount),
          0,
        )
          ? items?.reduce(
              (n, { amount }) => parseFloat(n) + parseFloat(amount),
              0,
            )
          : '',
        narration: narration,
        modeOfExpense: 2,
        expenseVoucherList: items
      })
      if (res.status) {
        handleClose();
        navigate('/admin-panel/expense/printExpenseVoucher')
        Swal.fire("Great!", res?.msg, 'success')

      }
      else {
        handleClose();
        Swal.fire('Error!', 'Something went wrong', 'error')
      }


    } catch (err) {
      handleClose();
      Swal.fire('Error!', 'Something went wrong', 'error')
      console.log(err)
    }
  }


  const editPayment = async (e) => {
    e.preventDefault()

    try {

      axios.defaults.headers.put[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.put(`${backendApiUrl}expense/edit-expenseVoucher`, {
        expenseDate: date,
        voucherNo: voucherNo,
        paymentMode: paymentMode,
        LedgerNo: ledgerNo,
        LedgerName: ledgerName,
        amount: items?.reduce(
          (n, { amount }) => parseFloat(n) + parseFloat(amount),
          0,
        )
          ? items?.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          )
          : '',
        narration: narration,
        expenseVoucherList: items,
        id: updateData?.id
      })
      if (res.status) {
        handleClose();
        Swal.fire("Updated!", res?.msg, 'success')

      }
      else {
        handleClose();
        Swal.fire('Error!', 'Something went wrong', 'error')
      }

    } catch (err) {
      handleClose();
      Swal.fire('Error!', 'Something went wrong', 'error')
      console.log(err)
    }
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

  useEffect(() => {
    getPaymentMode();
    getExpenseHead();

    if (updateData) {
      setDate(updateData?.expenseDate)
      setAmount(updateData?.amount)
      setLedgerName(updateData?.LedgerName)
      setNarration(updateData?.narration)
      setLedgerNo(updateData?.LedgerNo)
      setVoucherNo(updateData?.voucherNo)
      setPaymentMode(updateData?.paymentMode)
      setItems(updateData?.expenseVoucherList)
    }
  }, [])


  return (
    <Box>
      <ThemeProvider theme={theme}>
        <form onSubmit={AddPayment}>
          <Typography variant="h6" color={'primary'} align="center">
            Payment
          </Typography>
          <Typography variant="body2" color="primary" align="right">
            {currDate} / {currTime}
          </Typography>

          {console.log("voucher " + voucher)}
          <Typography variant="body2" my={1}>

          {voucherNo ? 'Voucher No : ' : ''}
            {voucherNo ? voucherNo : ''}
          </Typography>



          <Grid container rowSpacing={2} columnSpacing={5}>


            <Grid item xs={12} md={2}>
              <CustomInputLabel htmlFor="Date">
                Date
              </CustomInputLabel>
              <CustomInput
                required
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
                required
                placeholder='Enter Voucher No.'
                value={voucherNo}
                onChange={(e) => setVoucherNo(e.target.value)}

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
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                displayEmpty

              >
                <MenuItem value="" disabled>
                  Select Payment Mode
                </MenuItem>

                {paymentModeList && paymentModeList?.map((item, index) => {
                  return (
                    <MenuItem
                      sx={{
                        fontSize: 14,
                      }}
                      key={item.id}
                      value={item?.paymentMode}

                    >
                      {item?.paymentMode}
                    </MenuItem>
                  )
                })}

              </Select>

            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="ledgerNo">
                Ledger No.
              </CustomInputLabel>
              <CustomInput
                required
                id="mobile-no"
                placeholder='Enter Ledger No.'
                value={ledgerNo}
                onChange={(e) => setLedgerNo(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="ledgerName">
                Ledger Name
              </CustomInputLabel>
              <CustomInput
                required
                placeholder='Enter Ledger Name'
                value={ledgerName}
                onChange={(e) => setLedgerName(e.target.value)}
              />
            </Grid>


            <Grid item xs={12} md={3}>
              <CustomInputLabel htmlFor="Amount">
                Amount
              </CustomInputLabel>
              <CustomInput
              disabled={true}
                required
                id="address"
                value={
                  items?.reduce(
                    (n, { amount }) =>
                      parseFloat(n) + parseFloat(amount),
                    0,
                  )
                    ? items?.reduce(
                      (n, { amount }) =>
                        parseFloat(n) + parseFloat(amount),
                      0,
                    )
                    : ''
                }
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Initail Amount"
              />
            </Grid>


            <Grid item xs={12} md={6}>
              <CustomInputLabel htmlFor="narration">
                Narration
              </CustomInputLabel>
              <CustomInput
                required
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
                  <TableCell align='center'>Expense Head </TableCell>
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
                        paddingInline: 8,
                      }}
                    >
                      <Select
                        required
                        sx={{
                          width: '100%',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            padding: '1px',
                          },
                        }}
                        value={item.Type}
                        onChange={(e) =>
                          handleItemUpdate(item, 'Type', e.target.value)
                        }
                        displayEmpty
                      >
                        <MenuItem
                          sx={{
                            fontSize: 14,
                          }}
                          value=""
                          disabled
                        >
                          Please select
                        </MenuItem>

                        {expenseHeadList && expenseHeadList?.map((item, index) => {
                          return (
                            <MenuItem
                              sx={{
                                fontSize: 14,
                              }}
                              key={item.id}
                              value={item?.expenseHead_hi}

                            >
                              {item?.expenseHead_hi}
                            </MenuItem>
                          )
                        })}

                      </Select>
                    </TableCell>

                    <TableCell
                      style={{
                        paddingInline: 0,
                      }}
                    >
                      <CustomTableInput
                        // required
                        type="text"
                        value={item.voucherNo}
                        onChange={(e) =>
                          handleItemUpdate(item, 'voucherNo', e.target.value)
                        }
                      />
                    </TableCell>

                    <TableCell align="center">
                      <CustomTableInput
                        // required
                        type="text"
                        value={item.amount}
                        onChange={(e) =>
                          handleItemUpdate(item, 'amount', e.target.value)
                        }

                      />
                    </TableCell>

                    <TableCell align="center">
                      <CustomTableInput
                        // required
                        type="text"
                        value={item.remark}
                        onChange={(e) =>
                          handleItemUpdate(item, 'remark', e.target.value)
                        }
                      />
                    </TableCell>



                    {!newMember && <TableCell sx={{ width: '2rem' }}>
                      <CustomTableInput
                        disabled


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
            {openEdit ? (
              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                  boxShadow: 'none',
                }}
                variant="contained"
                type="submit"
                onClick={editPayment}
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
