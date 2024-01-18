import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TotalAmountRow from './TotalpayAmountRow';
import Typography from '@mui/material/Typography';
import { ReactTransliterate } from 'react-transliterate';
import { CustomTableInput } from '../../Donation/Donation/common';
import { useNavigate } from 'react-router-dom';
import { backendApiUrl } from '../../../../config/config';
import Print from '../../../../assets/Print.png';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';
import './Saveboli.css';
const paymode = [
  {
    id: '1',
    type: 'online',
  },
  {
    id: '2',
    type: 'offline',
  },
];

const custommStyleInputTable = {
  width: '100%',
  position: 'relative',
  border: '1px solid #C8C6D3',
  fontSize: 14,
  padding: 9.5,
};
function PrintBoli({
  resdata,
  setOpen,
  boliheads,
  boliunits,
  setshowpayment,
  setshowprint,
  open,
}) {
  const navigation = useNavigate();
  const [newMember, setNewMember] = useState(false);
  const [showUpdateBtn, setshowUpdateBtn] = useState(false);
  const [isdata, setisdata] = useState([]);
  const [donationItems, setDonationItems] = useState([
    {
      Type: '',
      Unit: '',
      PendingAmount: '',
      ModeOfPayment: '',
      PayAmount: '',
      ChequeNo: '',
      Date: '',
      Time: '',
      Name: '',
      Address: '',
      NameOfBank: '',
      PaymentId: '',
      PrintAmount: null,
      Remark: '',
      type: '',
      amount: '',
      payamount: '',
      remark: '',
      pmode: '',
      Boli_id: '',
    },
  ]);

  function addDonationItem() {
    setDonationItems([
      ...donationItems,
      {
        type: '',
        amount: '',
        payamount: '',
        remark: '',
        pmode: '',
        Type: '',
        Unit: '',
        PendingAmount: '',
        PrintAmount: null,
        ModeOfPayment: '1',
        PayAmount: '',
        ChequeNo: '',
        Date: '',
        Time: '',
        Name: '',
        Address: '',
        NameOfBank: '',
        PaymentId: '',
        PaymentStatus: false,
        Remark: '',
        Boli_id: '',
      },
    ]);
  }

  function removeDonationItem(item) {
    setDonationItems(
      donationItems.filter((donationItem) => donationItem !== item),
    );
  }

  function handleDonationItemUpdate(originalDonationItem, key, value) {
    setDonationItems(
      donationItems.map((donationItem) =>
        donationItem === originalDonationItem
          ? {
              ...donationItem,
              [key]: value,
            }
          : donationItem,
      ),
    );
  }

  const addPayment = async (item) => {
    console.log('click');

    axios.defaults.headers.post[
      'Authorization'
    ] = `Bearer ${sessionStorage.getItem('token')}`;

    const res = await axios.post(`${backendApiUrl}boli/add-printBoli`, {
      Boli_id: item?.Boli_id,
      Type: item?.Type,
      Unit: item?.Unit,
      BoliAmount: item?.BoliAmount,
      ModeOfPayment: item?.ModeOfPayment,
      PayAmount: item?.PayAmount,
      ChequeNo: item?.ChequeNo,
      Date: item?.Date,
      TIme: item?.TIme,
      NameOfBank: item?.NameOfBank,
      PaymentId: item?.PaymentId,
      PaymentStatus: item?.PaymentStatus,
      Remark: item?.Remark,
      Name: item?.Name,
      Address: item?.Address,
    });

    if (res?.data?.status === true) {
      // if (!item?.printamount) {
      //   alert('You cannot print amount greater then paid Amount!!');
      // } else {
      //   navigation('/admin-panel/boli/certificate', {
      //     state: {
      //       data: item,
      //       alldata: resdata,
      //     },
      //   });
      // }

      navigation('/admin-panel/boli/certificate', {
        state: {
          data: item,
          alldata: resdata,
        },
      });
    } else {
      Swal.fire('Error!', 'Somthing went wrong!!', 'error');
    }
  };

  useEffect(() => {
    if (resdata) {
      // setDonationItems(resdata?.boliItem);
      setisdata(resdata);
    }
  }, []);

  return (
    <>
      <div
        style={{
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                my: 2,
              }}
            >
              <Typography variant="body1">Print Receipt</Typography>
              <Typography>{isdata?.Boli_id}</Typography>
            </Box>
            <TableContainer
              sx={{
                mt: 4,
              }}
            >
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
                    <TableCell>
                      <Box
                        sx={{
                          paddingInline: '10px',
                          minWidth: 100,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        Print No
                        <IconButton aria-label="add" size="small">
                          <AddBoxIcon
                            color="primary"
                            onClick={addDonationItem}
                          />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Full Name*
                    </TableCell>
                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Address*
                    </TableCell>

                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Boli Head*
                    </TableCell>
                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Boli Unit*
                    </TableCell>
                    {/* <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Paid Amount*
                    </TableCell> */}
                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Print Amount*
                    </TableCell>
                    {/* <TableCell >Pending Amount*</TableCell> */}
                    {/* <TableCell >Pint Date</TableCell> */}
                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Bank Name
                    </TableCell>
                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Transaction Id
                    </TableCell>
                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Remark
                    </TableCell>
                    {/* <TableCell  style={{ width: '3rem' }}>
                      Mark
                    </TableCell> */}
                    <TableCell style={{ width: '5rem', paddingLeft: '0.5rem' }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donationItems?.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <CustomTableInput
                          style={{ paddingLeft: '0.5rem' }}
                          required
                          type="text"
                          value={idx + 1}
                          onChange={(e) =>
                            handleDonationItemUpdate(
                              item,
                              'Boli_id',
                              e.target.value,
                            )
                          }
                        />
                      </TableCell>

                      <TableCell>
                        <CustomTableInput
                          style={{ paddingLeft: '0.5rem' }}
                          required
                          type="text"
                          value={item?.Address}
                          onChange={(e) =>
                            handleDonationItemUpdate(
                              item,
                              'Address',
                              e.target.value,
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <CustomTableInput
                          style={{ paddingLeft: '0.5rem' }}
                          required
                          type="text"
                          value={item?.Name}
                          onChange={(e) =>
                            handleDonationItemUpdate(
                              item,
                              'Name',
                              e.target.value,
                            )
                          }
                        />
                      </TableCell>
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
                            handleDonationItemUpdate(
                              item,
                              'Type',
                              e.target.value,
                            )
                          }
                          displayEmpty
                        >
                          <MenuItem
                            sx={{
                              fontSize: 14,
                            }}
                            value={''}
                          >
                            Please select
                          </MenuItem>
                          {boliheads &&
                            boliheads?.map((item, idx) => {
                              return (
                                <MenuItem
                                  sx={{
                                    fontSize: 14,
                                  }}
                                  key={item.id}
                                  value={item.boliHead_hi}
                                >
                                  {item.boliHead_hi}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </TableCell>
                      <TableCell>
                        <CustomTableInput
                          style={{ paddingLeft: '0.5rem' }}
                          required
                          type="text"
                          value={item.Unit}
                          onChange={(e) =>
                            handleDonationItemUpdate(
                              item,
                              'Unit',
                              e.target.value,
                            )
                          }
                        />
                      </TableCell>
                      {/* <TableCell>
                        <CustomTableInput
                          style={{ paddingLeft: '0.5rem' }}
                          required
                          disabled={true}
                          type="number"
                          value={item.PayAmount}
                          onChange={(e) =>
                            handleDonationItemUpdate(
                              item,
                              'PayAmount',
                              e.target.value,
                            )
                          }
                        />
                      </TableCell> */}
                      <TableCell>
                        <CustomTableInput
                          required
                          type="number"
                          value={item.PrintAmount}
                          onChange={(e) => {
                            handleDonationItemUpdate(
                              item,
                              'PrintAmount',
                              e.target.value,
                            );
                            // if (
                            //   Number(item.PrintAmount) > Number(item.PayAmount)
                            // ) {
                            //   alert(
                            //     'You cannot print amount greater then paid Amount!!',
                            //   );
                            // }
                          }}
                        />
                      </TableCell>
                      {/* <TableCell >
                        <CustomTableInput
                          required
                          disabled={true}
                          type="number"
                          value={
                            Number(item.BoliAmount) - Number(item.PayAmount)
                          }
                          onChange={(e) => {
                            handleDonationItemUpdate(
                              item,
                              'PendingAmount',
                              e.target.value,
                            );
                          }}
                        />
                      </TableCell> */}
                      {/* <TableCell >
                        <CustomTableInput
                          required
                          type="date"
                          value={item.Date}
                          onChange={(e) =>
                            handleDonationItemUpdate(
                              item,
                              'Date',
                              e.target.value,
                            )
                          }
                        />
                      </TableCell> */}

                      <TableCell>
                        <CustomTableInput
                          required
                          type="text"
                          value={item.NameOfBank}
                          onChange={(e) =>
                            handleDonationItemUpdate(
                              item,
                              'NameOfBank',
                              e.target.value,
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <CustomTableInput
                          required
                          type="number"
                          value={item.PaymentId}
                          onChange={(e) =>
                            handleDonationItemUpdate(
                              item,
                              'PaymentId',
                              e.target.value,
                            )
                          }
                        />
                      </TableCell>

                      <TableCell>
                        {!newMember ? (
                          <>
                            {showUpdateBtn ? (
                              <>
                                <div
                                  className="centerMain_remove_item"
                                  style={{ width: '35%' }}
                                >
                                  <ReactTransliterate
                                    style={custommStyleInputTable}
                                    value={item.Remark}
                                    onChangeText={(item) => {
                                      handleDonationItemUpdate(
                                        item,
                                        'Remark',
                                        e.target.value,
                                      );
                                    }}
                                    onChange={(e) =>
                                      handleDonationItemUpdate(
                                        item,
                                        'Remark',
                                        e.target.value,
                                      )
                                    }
                                    lang="hi"
                                  />
                                  <div className="centerMain_remove_item_overLay">
                                    {idx > 0 && (
                                      <IconButton
                                        sx={{
                                          padding: '4px',
                                        }}
                                        onClick={() => removeDonationItem(item)}
                                      >
                                        <RemoveCircleOutlineIcon
                                          color="primary"
                                          fontSize="small"
                                        />
                                      </IconButton>
                                    )}
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="centerMain_remove_item">
                                  <ReactTransliterate
                                    style={custommStyleInputTable}
                                    value={item.Remark}
                                    onChangeText={(hindiremark) => {
                                      sethindiremark(hindiremark);
                                    }}
                                    onChange={(e) =>
                                      handleDonationItemUpdate(
                                        item,
                                        'Remark',
                                        e.target.value,
                                      )
                                    }
                                    lang="hi"
                                  />
                                  <div className="centerMain_remove_item_overLay">
                                    {idx > 0 && (
                                      <IconButton
                                        sx={{
                                          padding: '4px',
                                        }}
                                        onClick={() => removeDonationItem(item)}
                                      >
                                        <RemoveCircleOutlineIcon
                                          color="primary"
                                          fontSize="small"
                                        />
                                      </IconButton>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <CustomTableInput
                              value={item.Remark}
                              onChange={(e) =>
                                handleDonationItemUpdate(
                                  item,
                                  'Remark',
                                  e.target.value,
                                )
                              }
                              endAdornment={
                                idx > 0 && (
                                  <InputAdornment position="start">
                                    <IconButton
                                      sx={{
                                        padding: '4px',
                                      }}
                                      onClick={() => removeDonationItem(item)}
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
                          </>
                        )}
                      </TableCell>
                      {/* <TableCell >
                        <input
                          type="checkbox"
                          value={idx}
                          onChange={(e) => {
                            let updatedList = [...idxarray];
                            if (e.target.checked) {
                              updatedList = [...idxarray, e.target.value];
                            } else {
                              updatedList.splice(
                                checked.indexOf(e.target.value),
                                1,
                              );
                            }
                            setidxarray(updatedList);
                            console.log('eddd', updatedList);
                          }}
                        />
                      </TableCell> */}
                      <TableCell>
                        <button
                          disabled={item?.PrintAmount ? false : true}
                          onClick={() => addPayment(item)}
                        >
                          <img
                            src={Print}
                            alt="Print"
                            style={{ width: '25px' }}
                          />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}

                  <TotalAmountRow donationItems={donationItems} />
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
              {/* <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                  boxShadow: 'none',
                }}
                variant="contained"
                type="submit"
                onClick={() => addPayment()}
              >
                Print
              </Button> */}

              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                }}
                variant="contained"
                color="error"
                onClick={() => {
                  if (open === true) {
                    setOpen(false);
                  } else {
                    setshowprint(false);
                    setshowpayment(false);
                  }
                }}
                type="button"
              >
                Cancel
              </Button>
            </Box>
          </div>
        </>
      </div>
    </>
  );
}

export default PrintBoli;
