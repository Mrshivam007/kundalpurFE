import React, { useEffect, useState, useRef } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useReactToPrint } from 'react-to-print';
import { Table, TableHead, TableRow, TableBody, TableCell, TableFooter, TablePagination, Box } from '@mui/material'
import { IconButton } from '@mui/material';



import Print from '../../../../../../../assets/Print.png';
import './printExpenseVoucher.css'
import { CustomInputLabel } from '../../../../common';



const printExpenseVoucher = ({ setopendashboard }) => {
  const componentRef = useRef();
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });




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

  console.log(yearRange)

  var date = today.toISOString().substring(0, 10);

  useEffect(() => {
    setopendashboard(true)
  }, [])


  return (
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
          <h2>श्री दिगम्बर जैन सिद्ध क्षेत्र कुण्डलपुर जी({yearRange})</h2>
          <h3>नगद भुगतानवाउचर</h3>

        </div>
        <div className='subHeading'>
          <h6>No. &nbsp;&nbsp;&nbsp;&nbsp;:  1</h6>
          <h6>दिनांकित :  &nbsp;&nbsp;&nbsp;{date}</h6>
        </div>

        <div className="Table">

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
            <CustomInputLabel>विवरण</CustomInputLabel>

            <CustomInputLabel sx={{ marginRight: '12%' }}>राशि</CustomInputLabel>
          </Box>


          <Table sx={{ backgroundColor: '#00de7e' }}>
<TableHead>
  <TableCell>विवरण</TableCell>
  <TableCell>राश</TableCell>
</TableHead>


            <TableBody>

              <TableRow>
                <TableCell
                  sx={{ fontSize: '0.9rem', background: 'white' }}
                  colSpan={4}
                >
                  खाता:
                </TableCell>

                <TableCell style={{ background: 'white' }} >

                </TableCell>

                <TableCell style={{ background: 'white' }} >

                </TableCell>

              </TableRow>


              <TableRow rowSpan={9}>
                <TableCell
                  sx={{ fontSize: '0.9rem', background: 'white' }}
                  colSpan={4}
                >
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; क्षेत्र व्यवस्था खाले
                </TableCell>

                <TableCell style={{ background: 'white' }} >

                </TableCell>

                <TableCell style={{ background: 'white' }} >
                  1000
                </TableCell>

              </TableRow>

              <TableRow >
                <TableCell
                  sx={{ fontSize: '0.9rem', background: 'white' }}
                  colSpan={4}
                >

                </TableCell>
                <TableCell style={{ background: 'white' }} >

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ background: 'white' }}>
                  के द्वारा:
                </TableCell>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ background: 'white' }}>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; रोकड़


                </TableCell>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
              </TableRow>


              <TableRow>
                <TableCell style={{ background: 'white' }}>


                  के खातेपर


                </TableCell>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
              </TableRow>

              <TableRow>
                <TableCell style={{ background: 'white' }}>


                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;बिन अनुसार सामान खरीद
                </TableCell>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
                <TableCell style={{ background: 'white' }}>

                </TableCell>
                <TableCell style={{ background: 'white' }}></TableCell>
              </TableRow>



            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell sx={{ fontSize: '0.9rem' }} colSpan={1}>

                </TableCell>
                <TableCell sx={{ fontWeight: '900' }}>

                </TableCell>
                <TableCell sx={{ fontWeight: '900' }}>
                  1000
                </TableCell>
              </TableRow>



            </TableFooter>
          </Table>


          <div className='footer'>
            <div>
              प्राप्तकर्ता के हस्ताक्षर
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

  )
}

export default printExpenseVoucher