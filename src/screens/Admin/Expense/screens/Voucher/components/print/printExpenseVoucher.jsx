import React, { useEffect, useState, useRef } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useReactToPrint } from 'react-to-print';
import { Table, TableHead, TableRow, TableBody, TableCell, TableFooter, TablePagination, Box } from '@mui/material'
import { IconButton } from '@mui/material';
import { serverInstance } from '../../../../../../../API/ServerInstance';
import { ReactTransliterate } from 'react-transliterate';
import { Converter, hiIN } from 'any-number-to-words';
import Print from '../../../../../../../assets/Print.png';
import './printExpenseVoucher.css'
import { CustomInputLabel } from '../../../../common';


const printExpenseVoucher = ({ setopendashboard }) => {
  const componentRef = useRef();
  const navigate = useNavigate()
  const converter = new Converter(hiIN);

  const [voucher, setVoucher] = useState('')
  const [isData, setIsData] = useState('')

  const handleBack = () => {
    navigate(-1)
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const totalAmount = isData && isData?.expenseVoucherList.reduce((acc, item) => acc + item.amount, 0);

  const getDetails = async () => {
    try {
      const res = await serverInstance('expense/get-expenseVoucher', 'get')
      if (res.status) {
        setIsData(res.data[0])
      }
    } catch (err) {
      console.log(err)
    }
  }

  console.log(isData)




  const getVoucher = () => {
    serverInstance('admin/voucher-get', 'get').then((res) => {
      if (res) {
        console.log('voucher', res.voucher);
        setVoucher(res.voucher);
      }
    });
  };


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

  const currentYear = today.getFullYear();
  const nextYear = currentYear + 1;
  const yearRange = `${currentYear}-${String(nextYear).substring(2)}`;

  var date = today.toISOString().substring(0, 10);

  useEffect(() => {
    setopendashboard(true)
    getDetails();
    getVoucher();
  }, [])


  return (
    <div className="dashboarddiv">
      <div style={{ marginLeft: '10rem', marginTop: '10rem', display: 'flex' }}>
        <div>
          <Button
            onClick={handleBack}

            sx={{
              width: '6rem',
              backgroundColor: '#f86d3b',
              "&:hover": {
                backgroundColor: ' #f97f53'
              },


            }}
            title="Go Back"
          >
            <ArrowBackIcon
              onClick={handleBack}
              sx={{
                color: 'white'
              }}
            />
          </Button>
        </div>


        <div className='printBox' ref={componentRef}>
          <div className='heading'>


            <h2 > श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि, कुण्डलपुर, दमोह (म.प्र.)</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

              <h6>No. : &nbsp;&nbsp;&nbsp;&nbsp; {isData.voucherNo}</h6>
              <h3>नगद भुगतानवाउचर</h3>
              <h6>दिनांकित :  &nbsp;&nbsp;&nbsp;{isData.expenseDate}</h6>
            </div>


          </div>
          <div className='subHeading'>


          </div>

          <div className="Table">



            <Table sx={{ backgroundColor: 'white' }}>
              <TableHead>

                <TableCell sx={{ width: '80%', textAlign: 'center' }}>खाता नाम</TableCell>

                <TableCell >भुगतान राशि</TableCell>
              </TableHead>


              <TableBody>

                {

                  isData &&
                  isData?.expenseVoucherList.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.Type}</TableCell>
                      <TableCell>{item.amount}</TableCell>

                    </TableRow>
                  ))}

                <TableRow >

                  <TableCell rowSpan={3} sx={{ fontSize: '1rem' }} >
                    विवरण :
                    {isData && isData?.expenseVoucherList.map((item, index) => (
                      <span>({item.remark})</span>
                    ))} </TableCell>
                </TableRow>

              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell sx={{ fontSize: '1rem' }}>
                    <span> कुल राशि शब्दों में:- {isData && converter.toWords(totalAmount)} रूपये नगद भुगतान।</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.9rem' }} colSpan={1}>
                    <span style={{ fontWeight: '500' }}>{totalAmount}</span>
                  </TableCell>

                </TableRow>



              </TableFooter>
            </Table>


            <div className='footer'>
              <div>
                प्राप्तकर्ता के हस्ताक्षर
              </div>
              <div>
                भुगतानकर्ता हस्ताक्षर
              </div>

              <div>अधिकृत हस्ताक्षरकर्ता</div>

            </div>
          </div>


        </div>

        <div>
          <IconButton onClick={handlePrint}>
            <img
              style={{ width: '30px' }}
              title="Print "
              src={Print}
              alt=" Print"
            />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default printExpenseVoucher