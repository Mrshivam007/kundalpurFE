import React, { useEffect, useState } from 'react'
import { Modal, Box, Fade, Button, Grid, Select, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import axios from 'axios';
import { CustomInput, CustomInputLabel, CustomTableInput } from '../../../../common';
import { backendApiUrl } from '../../../../../../../config/config';


const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  fontFamily: 'Poppins',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '15px',
};



const Invoice = ({ handleRefresh, openEdit, updatedata, closeEdit }) => {

  const [invoiceNo, setInvoiceNo] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [invoiceAmount, setInvoiceAmount] = useState('')
  const [invoiceUpload, setInvoiceUpload] = useState([])
  const [remark, setRemark] = useState('')


  const [open, setOpen] = useState(false)

  const resetForm = () => {
    setInvoiceAmount('')
    setInvoiceDate('')
    setInvoiceNo('')
    setInvoiceUpload('')
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    resetForm()
  }


  const handlesubmit = async (e) => {
    e.preventDefault();
    try {


      const data = {
        invoiceNo: invoiceNo,
        invoiceDate: invoiceDate,
        invoiceAmount: invoiceAmount,
        invoiceUpload: invoiceUpload,
        remark: remark
      };

      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }


      const res = await axios.post(`${backendApiUrl}expense/add-invoiceUpload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });



      if (res.data.status) {
        console.log(res.data.msg);


        Swal.fire('Great!', res.data.msg, 'success');
        handleRefresh();
        handleClose();

      } else {
        console.log(res.msg);
        handleClose()

        Swal.fire('Error', res.data.msg, 'error');
      }
    } catch (error) {
      console.log(error);
      handleClose();
      Swal.fire('Error!', error, 'error');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {


      const data = {
        invoiceNo: invoiceNo,
        invoiceDate: invoiceDate,
        invoiceAmount: invoiceAmount,

        remark: remark,
        id: updatedata?.id
      };

      if (invoiceUpload) {
        data.invoiceUpload = invoiceUpload;
      }

      console.log(data.invoiceUpload)
      console.log(updatedata?.id)

      const formData = new FormData();

      for (const key in data) {
        formData.append(key, data[key]);
      }


      const res = await axios.put(`${backendApiUrl}expense/edit-invoiceUpload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });



      if (res.data.status) {
        console.log(res.data.msg);


        Swal.fire('Great!', res.data.msg, 'success');

        closeEdit()

      } else {
        console.log(res.msg);
        closeEdit()

        Swal.fire('Error', res.data.msg, 'error');
      }
    } catch (error) {
      console.log(error);
      closeEdit()
      Swal.fire('Error!', error, 'error');
    }
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

  var date = today.toISOString().substring(0, 10);

  useEffect(() => {
    if (updatedata) {
      setInvoiceAmount(updatedata?.invoiceAmount)
      setInvoiceNo(updatedata?.invoiceNo)
      setInvoiceDate(updatedata?.invoiceDate)
      setRemark(updatedata?.remark)
      setInvoiceUpload(updatedata?.invoiceUpload)
    }
  }, [])

  return (
    <div>

      {

        !openEdit && (
          <Button

            onClick={handleOpen}

            sx={{
              marginRight: '1rem',
              borderRadius: '0.5rem',
              color: 'black',
              width: '10vw',
              backgroundColor: '#fcbb82',

              ":hover": {
                bgcolor: '#f2ad6f'
              }
            }}>
            Upload Invoice
          </Button>
        )
      }




      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openEdit ? openEdit : open}
          onClose={openEdit ? closeEdit : handleClose}
          closeAfterTransition
        >
          <Fade in={openEdit ? openEdit : open}>
            <Box
              sx={{
                ...style,
                width: {
                  xs: '90%',
                  sm: '70%',
                  md: '60%',
                },
                fontFamily: 'Poppins'
              }}
            >

              <div className='header' style={{ marginBottom: '3rem' }}>

                <CloseIcon
                  sx={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',

                    cursor: 'pointer',

                  }}
                  onClick={openEdit ? closeEdit : handleClose}
                />



                <div>
                  <Typography variant="h6" align="center">
                    Upload Invoice
                  </Typography>



                  <div>
                    <Typography variant="body2" color="primary" align="right">
                      {currDate} / {currTime}
                    </Typography>

                  </div>
                </div>
              </div>
              <form onSubmit={openEdit ? handleUpdate : handlesubmit}>

                <Grid container rowSpacing={2} columnSpacing={5} sx={{ padding: '1rem' }}>



                  <Grid item xs={12} md={3}>
                    <CustomInputLabel htmlFor="Date">
                      Invoice Number
                    </CustomInputLabel>
                    <CustomInput

                      required
                      type="text"
                      placeholder='Enter Invoice Number'
                      value={invoiceNo}
                      onChange={(e) => setInvoiceNo(e.target.value)}

                    />
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <CustomInputLabel htmlFor="invoiceDate">
                      Invoice Date
                    </CustomInputLabel>
                    <CustomInput
                      required
                      type='date'
                      placeholder='Enter Invoice Date'
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <CustomInputLabel htmlFor="invoiceAmount">
                      Invoice Amount
                    </CustomInputLabel>
                    <CustomInput
                      required
                      type="text"
                      placeholder='Enter Invoice Amount'
                      value={invoiceAmount}
                      onChange={(e) => setInvoiceAmount(e.target.value)}
                    />


                  </Grid>

                  <Grid item xs={12} md={4}>
                    <CustomInputLabel htmlFor="invoiceUpload">
                      Invoice Upload
                    </CustomInputLabel>
                    <CustomInput
                      type='file'
                      accept="image/*"
                      {...(!openEdit && { required: true })}

                      id="InvoiceUpload"
                      onChange={(e) => setInvoiceUpload(e.target.files[0])}
                      placeholder='Upload Invoice'
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <CustomInputLabel htmlFor="remark">
                      Remark
                    </CustomInputLabel>
                    <CustomInput
                      type='text'
                      placeholder='Enter Remark'
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    />
                  </Grid>

                </Grid>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>

                  {
                    openEdit ? (
                      <Button
                        type='submit'
                        variant="contained"
                        sx={{
                          textTransform: 'none',
                          paddingX: 5,
                          boxShadow: 'none',
                          backgroundColor: '#1b63ab',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#0f3f73',
                          },
                        }}>
                        Update
                      </Button>

                    ) :

                      (
                        <Button
                          type='submit'
                          variant="contained"
                          sx={{
                            textTransform: 'none',
                            paddingX: 5,
                            boxShadow: 'none',
                            backgroundColor: '#1b63ab',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#0f3f73',
                            },
                          }}>
                          Save
                        </Button>
                      )

                  }


                  <Button
                    type='button'
                    onClick={openEdit ? closeEdit : handleClose}
                    sx={{
                      textTransform: 'none',
                      paddingX: 5,
                      boxShadow: 'none',
                      color: 'white',
                      backgroundColor: '#e32020',
                      '&:hover': {
                        backgroundColor: '#ad1a1a',
                      },
                      marginLeft: '1rem'
                    }}>
                    Cancel
                  </Button>

                </div>

              </form>

            </Box>
          </Fade>
        </Modal>
      </>




    </div>
  )
}

export default Invoice