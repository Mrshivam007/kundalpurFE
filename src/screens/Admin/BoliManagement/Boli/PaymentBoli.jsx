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
import TotalAmountRow from '../../Donation/Donation/common/TotalAmountRow';
import Typography from '@mui/material/Typography';
import { ReactTransliterate } from 'react-transliterate';
import { CustomTableInput } from '../../Donation/Donation/common';
import { backendApiUrl } from '../../../../config/config';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Swal from 'sweetalert2';
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
function PaymentBoli({
  resdata,
  setOpen,
  boliheads,
  boliunits,
  setshowpayment,
  setshowprint,
  open,
}) {
  const [checked, setChecked] = useState([]);
  const [idxarray, setidxarray] = useState([]);
  const [paymodeis, setpaymodeis] = useState('');
  const [showloader, setshowloader] = useState(false);
  const [newMember, setNewMember] = useState(false);
  const [showUpdateBtn, setshowUpdateBtn] = useState(false);
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
      NameOfBank: '',
      PaymentId: '',
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
        ModeOfPayment: '1',
        PayAmount: '',
        ChequeNo: '',
        Date: '',
        Time: '',
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

  const addPayment = async () => {
    let filterdata = idxarray?.map((item) => {
      return donationItems[item];
    });

    if (filterdata.length === 0) {
      alert('Please select boli item');
    }
    if (filterdata.length > 0) {
      setshowloader(true);
      const newArr = filterdata.map(
        ({
          Boli_id,
          Type,
          Unit,
          BoliAmount,
          ModeOfPayment,
          PayAmount,
          ChequeNo,
          Date,
          TIme,
          NameOfBank,
          PaymentId,
          PaymentStatus,
          Remark,
        }) => {
          return {
            Boli_id,
            Type,
            Unit,
            BoliAmount,
            ModeOfPayment,
            PayAmount,
            ChequeNo,
            Date,
            TIme,
            NameOfBank,
            PaymentId,
            PaymentStatus,
            Remark,
          };
        },
      );
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(`${backendApiUrl}boli/add-payment`, newArr);
      console.log('boli  payment res', res?.data);

      if (res?.data?.status === true) {
        setOpen(false);

        Swal.fire('Great!', res?.data?.msg, 'success');
      } else {
        Swal.fire('Error!', 'Somthing went wrong!!', 'error');
      }
    }
  };

  useEffect(() => {
    if (resdata) {
      setDonationItems(resdata?.boliItem);
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
              <Typography variant="body1">Make Payment</Typography>
              <Typography style={{ width: '10%' }}>Pay Mode</Typography>

              <Select
                required
                sx={{
                  width: '10%',
                  fontSize: 14,
                  '& .MuiSelect-select': {
                    padding: '1px',
                  },
                }}
                value={paymodeis}
                onChange={(e) => setpaymodeis(e.target.value)}
                displayEmpty
              >
                <MenuItem
                  sx={{
                    fontSize: 14,
                  }}
                  value={''}
                >
                  Select
                </MenuItem>
                {paymode &&
                  paymode.map((item, idx) => {
                    return (
                      <MenuItem
                        sx={{
                          fontSize: 14,
                        }}
                        key={item.id}
                        value={item.id}
                      >
                        {item.type}
                      </MenuItem>
                    );
                  })}
              </Select>
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
                          minWidth: 200,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        Boli Id
                        <IconButton aria-label="add" size="small">
                          <AddBoxIcon
                            color="primary"
                            onClick={addDonationItem}
                          />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Boli Head*
                    </TableCell>
                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Boli Unit*
                    </TableCell>
                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Boli Amount*
                    </TableCell>
                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Pay Amount*
                    </TableCell>
                    <TableCell style={{ width: '8rem', paddingLeft: '0.5rem' }}>
                      Pending Amount*
                    </TableCell>
                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Payment Date
                    </TableCell>

                    {paymodeis === '1' && (
                      <>
                        <TableCell style={{ paddingLeft: '0.5rem' }}>
                          Bank Name
                        </TableCell>
                        <TableCell style={{ paddingLeft: '0.5rem' }}>
                          Transaction Id
                        </TableCell>
                      </>
                    )}

                    <TableCell style={{ paddingLeft: '0.5rem' }}>
                      Remark
                    </TableCell>
                    <TableCell style={{ width: '5rem', paddingLeft: '0.5rem' }}>
                      Pay Full
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donationItems.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <CustomTableInput
                          required
                          type="text"
                          value={item.Boli_id}
                          onChange={(e) =>
                            handleDonationItemUpdate(
                              item,
                              'Boli_id',
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
                      <TableCell>
                        <CustomTableInput
                          required
                          type="number"
                          value={item.BoliAmount}
                          onChange={(e) =>
                            handleDonationItemUpdate(
                              item,
                              'BoliAmount',
                              e.target.value,
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <CustomTableInput
                          required
                          type="number"
                          value={item.PayAmount}
                          onChange={(e) => {
                            handleDonationItemUpdate(
                              item,
                              'PayAmount',
                              e.target.value,
                            );
                            if (
                              Number(item.PayAmount) > Number(item.BoliAmount)
                            ) {
                              alert(
                                'Pay Amount Cannot greater then Boli Amount!!',
                              );
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <CustomTableInput
                          required
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
                      </TableCell>
                      <TableCell>
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
                      </TableCell>

                      {paymodeis === '1' && (
                        <>
                          <TableCell>
                            <CustomTableInput
                              placeholder="Bank Name"
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
                              placeholder="transaction Id"
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
                        </>
                      )}

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
                                    placeholder="Enter Remark"
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
                              placeholder="Enter Remark"
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
                      <TableCell>
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
              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                  boxShadow: 'none',
                }}
                variant="contained"
                type="submit"
                onClick={() => addPayment()}
              >
                Save
              </Button>

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

export default PaymentBoli;
