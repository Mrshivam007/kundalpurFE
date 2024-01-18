import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Box from '@mui/material/Box';
import { CustomInputLabel } from '../../../../common/index';
import { serverInstance } from '../../../../../../../API/ServerInstance';
import './Tally.css';
import Button from '@mui/material/Button';
import Moment from 'moment-js';

const ExpenseTally = ({ setopendashboard }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isdata, setisdata] = useState('');
  const [maindata, setmaindata] = useState('');




  const handleDonation = () => {
    navigate('/admin-panel/donation', {
      state: {
        data: maindata,
      },
    });
  };

  const handleManualDonation = () => {
    navigate('/admin-panel/manualdonation', {
      state: {
        data: maindata,
      },
    });
  };


  useEffect(() => {
    setopendashboard(true);
    if (location?.state?.data) {
      console.log('data from tally', location?.state?.data?.LedgerNo);
      setmaindata(location?.state?.data);

      serverInstance(
        `expense/get-tally?LedgerNo=${location?.state?.data?.LedgerNo}`,
        'get',
      ).then((res) => {
        if (res.status) {
          setisdata(res?.data);
          console.log('particular ladeger get ', res);
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
      });
    }
  }, []);

  const totalamount = (data) => {
    let amount = 0;
    data?.map((item) => {
      amount = amount + item?.detail[0]?.amount;
    });

    return amount;
  };

  return (
    <div>
      <div
        style={{
          overflowX: 'auto',
          width: '92%',
          marginLeft: '6rem',
          marginTop: '4rem',
        }}
      >
        <Button
          sx={{
            borderRadius: '0.5rem',
            color: 'black',
            width: '10vw',
            backgroundColor: '#fcbb82',
            margin: '1rem',
            ':hover': {
              bgcolor: '#f2ad6f',
            },
          }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <div className="Table">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#01747e',
              padding: '0.5rem 1rem',
            }}
          >
            <h5 style={{ color: 'white' }}>Ledger Voucher</h5>

            <h5 style={{ color: 'white' }}>
              Shree Digamber Jain Siddh Kshetra Kundalpur Ji
            </h5>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#00de7e',
              padding: '0.5rem 1rem',
              color: 'white',
            }}
          >
            <CustomInputLabel>Name : {isdata?.Name}</CustomInputLabel>

            {/* <CustomInputLabel>1 January to 10 Feb</CustomInputLabel> */}
          </Box>

          <Table sx={{ backgroundColor: '#00de7e' }}>
            <TableHead>
              <TableRow style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <TableCell>Date</TableCell>
                <TableCell sx={{ width: '50%' }}>Particulars</TableCell>
                <TableCell>Voucher Type</TableCell>
                <TableCell>Voucher No.</TableCell>
                <TableCell>Debit</TableCell>
                <TableCell>Credit</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ fontSize: '0.9rem', background: 'white' }}
                  colSpan={4}
                >
                  Opening Balance:
                </TableCell>
                <TableCell style={{ background: 'white' }}>
                  {isdata?.OpeningBalance}
                </TableCell>
                <TableCell style={{ background: 'white' }}>&nbsp;</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ background: 'white' }}>
                  {Moment(
                    isdata?.voucherDetails &&
                    isdata?.voucherDetails[0]?.donation_date,
                  ).format('DD-MM-YYYY')}
                </TableCell>
                {console.log(isdata)}
                <TableCell style={{ background: 'white' }}>
                  {isdata?.voucherDetails &&
                    isdata?.voucherDetails[0]?.detail[0]?.type}
                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}>
                  {isdata?.TotalAmount}
                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
              </TableRow>
              {isdata?.voucherDetails?.map((item, index) => {
                return (
                  <TableRow key={index} style={{ background: 'lightgreen' }}>
                    <TableCell>
                      {Moment(item?.donation_date).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell style={{ background: 'lightgreen' }}>
                      {/* Kundalpur Kalas */}
                    </TableCell>
                    <TableCell style={{ background: 'lightgreen' }}>
                      {item?.detail[0]?.type}
                    </TableCell>
                    <TableCell style={{ background: 'lightgreen' }}>
                      {item?.ReceiptNo}
                    </TableCell>
                    <TableCell style={{ background: 'lightgreen' }}></TableCell>
                    <TableCell style={{ background: 'lightgreen' }}>
                      {item?.detail[0]?.amount}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }} colSpan={1}>
                  Current Total:
                </TableCell>
                <TableCell sx={{ fontWeight: '900' }}>
                  {Number(isdata?.OpeningBalance) + Number(isdata?.TotalAmount)}
                </TableCell>
                <TableCell sx={{ fontWeight: '900' }}>
                  {totalamount(isdata?.voucherDetails)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }} colSpan={1}>
                  <b>Closing Balance: </b>{' '}
                </TableCell>
                <TableCell
                  colSpan={2}
                  align="center"
                  sx={{ fontWeight: '900' }}
                >
                  {Number(isdata?.OpeningBalance) +
                    Number(isdata?.TotalAmount) -
                    totalamount(isdata?.voucherDetails)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        <div
          className="buttonsdiv"
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button
            sx={{
              borderRadius: '0.5rem',
              color: 'black',
              width: '10vw',
              backgroundColor: '#fcbb82',
              margin: '1rem',
              ':hover': {
                bgcolor: '#f2ad6f',
              },
            }}
            onClick={handleDonation}
          >
            Donation
          </Button>

          <Button
            sx={{
              borderRadius: '0.5rem',
              color: 'black',
              width: '10vw',
              backgroundColor: '#fcbb82',
              margin: '1rem',
              ':hover': {
                bgcolor: '#f2ad6f',
              },
            }}
            onClick={handleManualDonation}
          >
            Manual Donation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTally;
