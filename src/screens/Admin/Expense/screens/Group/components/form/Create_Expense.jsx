import React, { useEffect, useState } from "react";

import { ReactTransliterate } from 'react-transliterate';
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {
  CustomInput,
  CustomInputLabel,
  CustomTableInput,
} from '../../../../common'

import Swal from "sweetalert2";

import "./Create_Expense.css"
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { serverInstance } from "../../../../../../../API/ServerInstance";
import LoadingSpinner1 from "../../../../../../../components/Loading/LoadingSpinner1";


export const Create_Expense = ({ closeEdit, openEdit, setopendashboard, themeColor, handleClose, refreshTable, updateData }) => {

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

  const custumstyle = {
    width: '100%',
    borderRadius: 6,
    position: 'relative',
    backgroundColor: '#fcfcfb',
    border: '1px solid #C8C6D3',
    fontSize: 14,
    padding: 9.5,
  };





  const [role, setrole] = useState('');

  const [city, setcity] = useState('');
  const [states, setstates] = useState('');
  const [pincode, setpincode] = useState('');
  const [country, setcountry] = useState('');


  const [loader, setLoader] = useState(false)

  const [newMember, setNewMember] = useState(false);

  const [showloader, setshowloader] = useState(false);


  const [next, setNext] = useState(false)




  const addGroup = (e) => {
    e.preventDefault();

    try {

      const data = {
        City: city,
        PinCode: pincode,
        State: states,
        Country: country
      }

      serverInstance('expense/add-expenseGroup', 'post', data).then((res) => {
        if (res.status) {
          handleClose();
          Swal.fire('Great!', res?.msg, 'success');
          refreshTable()
        }
        if (res.status == false) {
          handleClose();
          Swal.fire('Error', 'Something went wrong', 'Error')
        }
      })

    } catch (err) {
      Swal.fire('Error', 'Something went wrong', 'Error')
      console.log(err)
    }
  }


  const updateGroup = (e) => {
    e.preventDefault();

    try {

      const data = {
        City: city,
        PinCode: pincode,
        State: states,
        Country: country,
        id: updateData.id
      }

      serverInstance('expense/edit-expenseGroup', 'put', data).then((res) => {
        if (res.status) {
          closeEdit()
          Swal.fire('Updated!', res?.msg, 'success');

        }
        if (res.status == false) {
          closeEdit()
          Swal.fire('Error', 'Something went wrong', 'Error')
        }
      })

    } catch (err) {
      Swal.fire('Error', 'Something went wrong', 'Error')
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

  useEffect(() => {
    if (updateData) {
      setcity(updateData?.City)
      setpincode(updateData?.PinCode)
      setstates(updateData?.State)
      setcountry(updateData?.Country)
    }

  }, [])


  return (
    <>


      <Box>
        <ThemeProvider theme={theme}>
          <div>
            <Typography variant="h6" color={'#cc0066'} align="center">
              {openEdit ? 'Update Expense Group' : 'Add Expense Group'}
            </Typography>
            <Typography variant="body2" color="#cc0066" align="right">
              {currDate} / {currTime}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                my: 2,
              }}
            >
              <Typography variant="body1">Change language:</Typography>

              <Button
                variant={newMember ? 'outlined' : 'contained'}
                sx={{
                  borderColor: '#C8C8C8',
                  fontSize: 12,
                  minWidth: 100,
                  padding: 0.5,
                  color: newMember ? '#656565' : '#fff',

                }}
                onClick={() => setNewMember(false)}
              >
                Hindi
              </Button>
              <Button
                onClick={() => setNewMember(true)}
                variant={newMember ? 'contained' : 'outlined'}
                sx={{
                  borderColor: '#C8C8C8',
                  fontSize: 12,
                  minWidth: 100,
                  padding: 0.5,
                  color: newMember ? '#fff' : '#656565',
                }}
              >
                English
              </Button>
            </Box>
            <form onSubmit={openEdit ? updateGroup : addGroup}>
              <Grid container rowSpacing={2} columnSpacing={5}>
                <Grid item xs={12} md={4}>
                  {!newMember ? (
                    <>
                      City
                      <ReactTransliterate
                        style={custumstyle}
                        id="full-name"
                        required
                        value={city}
                        onChangeText={(city) => {
                          setcity(city);
                        }}
                        onChange={(e) => setcity(e.target.value)}
                        lang="hi"
                        placeholder="Enter City"
                      />
                    </>
                  ) : (
                    <>
                      <CustomInputLabel htmlFor="City">City</CustomInputLabel>
                      <CustomInput
                        disabled={role === 3 ? true : false}
                        type="text"
                        id="donation-date"
                        required
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setcity(e.target.value)}
                      />
                    </>
                  )}
                </Grid>

                <Grid item xs={6} md={3}>
                  <CustomInputLabel htmlFor="pincode">
                    Pincode
                  </CustomInputLabel>
                  <CustomInput
                    type="text"
                    id="pincode"
                    required
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setpincode(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <CustomInputLabel htmlFor="State">State</CustomInputLabel>
                  <CustomInput
                    disabled={role === 3 ? true : false}
                    type="text"
                    id='state'
                    required
                    placeholder="Enter State"
                    value={states}
                    onChange={(e) => setstates(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6} md={3}>
                  <CustomInputLabel htmlFor="city">Country</CustomInputLabel>
                  <CustomInput
                    type="text"
                    id="PAN"
                    required
                    placeholder="Enter Country "
                    value={country}
                    onChange={(e) => setcountry(e.target.value)}
                  />
                </Grid>
              </Grid>

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
                      backgroundColor: '#cc0066',
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

                {!openEdit ? (
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
                ) : <Button
                  sx={{
                    textTransform: 'none',
                    paddingX: 5,
                  }}
                  variant="contained"
                  color="error"
                  onClick={closeEdit}
                  type="button"
                >
                  Cancel
                </Button>
                }

              </Box>
            </form>
          </div>
        </ThemeProvider>
      </Box>
    </>


  );

  { loader && <LoadingSpinner1 /> }
};
