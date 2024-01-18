import React, { useEffect, useState } from 'react'

import {
    Box,
    Button,
    Grid,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { CircularProgress } from '@mui/material';



import '../Bhojnayalay.css'
import { serverInstance } from '../../../../API/ServerInstance';
import axios from 'axios';

import { backendApiUrl } from '../../../../config/config';

export const CustomInput = styled(InputBase)(({ theme }) => ({
    width: '100%',
    fontFamily: 'Poppins',
    backgroundColor: '#fff',
    borderRadius: 6,
    '& .MuiInputBase-input': {
        border: '1px solid #B8B8B8',
        borderRadius: 6,
        width: '100%',
        fontSize: 15,
        padding: 8,
        paddingLeft: 12,
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

export const CustomInputLabel = styled(InputLabel)(() => ({
    fontSize: '1rem',
    lineHeight: '24px',
    color: '#05313B',
    fontFamily: 'Poppins',
    marginBlock: '0.1rem',
}));

const primaryColor = '#FA7401';
const theme = createTheme({
    typography: {
        fontFamily: 'Poppins',
    },
    palette: {
        primary: {
            main: primaryColor,
        },
    },
});

const genderoptions = [
    {
        id: 2,
        gender: 'श्रीमति',
    },
    {
        id: 3,
        gender: 'मे.',
    },
    {
        id: 4,
        gender: 'कु.',
    },
];


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


const Bhojnayalay = ({ setOpen, handleCallback, openEdit, closeEdit, updatedata }) => {



    const [showloader, setshowloader] = useState(false)
    const [showUpdateBtn, setshowUpdateBtn] = useState(false)

    const [receiptNo, setReceiptNo] = useState('')
    const [bookDate, setBookDate] = useState('')
    const [time, setTime] = useState('')
    const [name, setName] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [noOfPerson, setNoOfPerson] = useState('')
    const [type, setType] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [remark, setRemark] = useState('')
    const [timeError, setTimeError] = useState(false);
    const [genderp, setgenderp] = useState('श्री')

    const [typeList, setTypeList] = useState([])

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            axios.defaults.headers.post[
                'Authorization'
            ] = `Bearer ${sessionStorage.getItem('token')}`;

            const data = {

                DateOfBooking: bookDate,
                Time: time,
                // receiptNo: receiptNo,
                Name: name,
                MobileNo: mobileNo,
                Type: type,
                NoOfPerson: noOfPerson,
                TotalAmount: totalAmount,
                Remark: remark
            }

            const res = await axios.post(`${backendApiUrl}user/add-bhojnalay`, data)


            if (res.status) {
                handleCallback();
                handleClose()

                Swal.fire('Bhojnalay Booked!', res?.msg, 'success')
            }
            if (res.status === false) {
                Swal.fire("Error! Please Book Again", res?.msg, 'error')
            }
        } catch (err) {
            console.log(err)
            Swal.fire("Error! Please Book Again", res?.msg, 'error')
        }

    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        try {

            axios.defaults.headers.put[
                'Authorization'
            ] = `Bearer ${sessionStorage.getItem('token')}`;

            const data = {

                DateOfBooking: bookDate,
                Time: time,
                // receiptNo: receiptNo,
                Name: name,
                MobileNo: mobileNo,
                Type: type,
                NoOfPerson: noOfPerson,
                TotalAmount: totalAmount,
                Remark: remark,
                id: updatedata?.id
            }

            const res = await axios.put(`${backendApiUrl}user/edit-bhojnalay`, data)


            if (res.status) {

                closeEdit()

                Swal.fire('Bhojnalay Booked!', res?.msg, 'success')
            }
            if (res.status === false) {
                closeEdit()
                Swal.fire("Error! Please Book Again", res?.msg, 'error')
            }
        } catch (err) {
            console.log(err)
            Swal.fire("Error!", ' Please Book Again', 'error')
        }

    }

    const getType = async () => {
        try {
            const res = await serverInstance('admin/get-bhojnalayHead', 'get');
            console.log(res.data)
            setTypeList(res?.data)
        } catch (err) {
            console.log(err)
        }

    }

    const handleTypeChange = (selectedType) => {

        const selectedTypeData = typeList.find(item => item.type === selectedType);


        const selectedTypePrice = selectedTypeData ? selectedTypeData.price : '';


        setType(selectedType);
        setTotalAmount(selectedTypePrice * noOfPerson);
        console.log('type', type)
        console.log('price', totalAmount)
    };



    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();


        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        getType();

        if (updatedata) {
            setReceiptNo(updatedata?.ReceiptNo)
            setBookDate(updatedata?.DateOfBooking)
            setTime(updatedata?.Time)
            setName(updatedata?.Name)
            setMobileNo(updatedata?.MobileNo)
            setType(updatedata?.Type)
            setNoOfPerson(updatedata?.NoOfPerson)
            setTotalAmount(updatedata?.TotalAmount)
            setRemark(updatedata?.Remark)
        }
    }, [])

    useEffect(() => {

        const calculateTotalAmount = () => {
            const selectedTypeData = typeList.find(item => item.type === type);
            const selectedTypePrice = selectedTypeData ? selectedTypeData.price : '';
            setTotalAmount(selectedTypePrice * noOfPerson);
        };

        calculateTotalAmount();
    }, [type, noOfPerson, typeList]);


    return (
        <Box>
            <ThemeProvider theme={theme}>
                <form onSubmit={openEdit ? handleUpdate : handleSubmit}>
                    <Typography variant="h6" color={'primary'} align="center">
                        Book Bhojnalay
                    </Typography>
                    <Typography variant="body2" color="primary" align="right">
                        {currDate} / {currTime}
                    </Typography>
                    {/* <Typography variant="body2" my={1}>
              {updateData?.ReceiptNo ? 'Receipt No :' : ' Voucher No :'}
              {updateData?.ReceiptNo ? updateData?.ReceiptNo : receiptNo}
              &nbsp;&nbsp;
              {updateData ? 'Voucher No : ' : ''}
              {updateData ? updateData?.voucherNo : ''}
            </Typography> */}


                    <Grid container rowSpacing={2} columnSpacing={5}>

                        {/* <Grid item md={3} xs={12}>
                            <CustomInputLabel htmlFor="receiptNo">
                                Receipt Number
                            </CustomInputLabel>
                            <CustomInput
                                id="receiptNo"
                                name="receiptNo"
                                placeholder="Receipt Number"
                                value={receiptNo}
                                onChange={(e) => setReceiptNo(e.target.value)}
                            />

                        </Grid> */}

                        <Grid item md={3} xs={6}>
                            <CustomInputLabel htmlFor="date">
                                Date
                            </CustomInputLabel>
                            <CustomInput
                                id="date"
                                name="date"
                                placeholder="Date"
                                type='date'
                                value={bookDate}
                                onChange={(e) => setBookDate(e.target.value)}
                                required
                                {...(!openEdit ? { inputProps: { min: getCurrentDate() } } : {})}
                            />
                        </Grid>


                        <Grid item md={3} xs={12}>
                            <CustomInputLabel htmlFor="time">
                                Time
                            </CustomInputLabel>
                            <Select
                                required
                                sx={{
                                    width: '100%',
                                    fontSize: 14,
                                    '& .MuiSelect-select': {
                                        padding: '1px',
                                    },
                                    height: '60%',
                                    backgroundColor: "white"
                                }}
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem
                                    sx={{
                                        fontSize: 14,
                                    }}
                                    value=""
                                    disabled
                                >
                                    Select Time
                                </MenuItem>
                                <MenuItem value="11am-2pm">11am-2pm</MenuItem>
                                <MenuItem value="5pm-6pm">5pm-6pm</MenuItem>
                            </Select>

                        </Grid>
                        <Grid item xs={3} md={6}>
                            <CustomInputLabel htmlFor="name">
                                <Select
                                    required
                                    sx={{
                                        width: '20%',
                                        fontSize: 14,
                                        '& .MuiSelect-select': {
                                            padding: '1px',
                                        },
                                    }}
                                    value={genderp}
                                    onChange={(e) => setgenderp(e.target.value)}
                                >
                                    <MenuItem
                                        sx={{
                                            fontSize: 14,
                                        }}
                                        value={'श्री'}
                                    >
                                        श्री
                                    </MenuItem>
                                    {genderoptions.map((item, idx) => {
                                        return (
                                            <MenuItem
                                                sx={{
                                                    fontSize: 14,
                                                }}
                                                key={item.id}
                                                value={item.gender}
                                            >
                                                {item.gender}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                Name*
                            </CustomInputLabel>
                            <CustomInput
                                id="name"
                                name="name"
                                placeholder="Full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                        </Grid>


                        <Grid item md={3} xs={12}>
                            <CustomInputLabel htmlFor="mobileNo">
                                Mobile No.
                            </CustomInputLabel>
                            <CustomInput
                                id="mobileNo"
                                name="mobileNo"
                                placeholder="Enter Mobile No."
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                required
                            />

                        </Grid>

                        <Grid item md={3} xs={12}>
                            <CustomInputLabel htmlFor="type">
                                Type
                            </CustomInputLabel>
                            <Select
                                required
                                sx={{
                                    width: '17rem',
                                    height: '2.5rem',
                                    backgroundColor: 'white',
                                    borderRadius: '0.5rem',
                                    fontSize: 14,
                                    '& .MuiSelect-select': {
                                        padding: '1px',
                                    },
                                }}
                                value={type}

                                onChange={(e) => handleTypeChange(e.target.value)}
                                displayEmpty
                            >

                                <MenuItem value="" disabled>
                                    Select Type
                                </MenuItem>

                                {typeList && typeList?.map((item, index) => {
                                    return (
                                        <MenuItem
                                            sx={{
                                                fontSize: 14,

                                            }}
                                            key={item.id}
                                            value={item?.type}

                                        >
                                            {item?.type} ({item?.price} Rs.)
                                        </MenuItem>
                                    )
                                })}

                            </Select>

                        </Grid>

                        <Grid item md={2} xs={12}>
                            <CustomInputLabel htmlFor="noOfPerson">
                                No. Of Person
                            </CustomInputLabel>
                            <CustomInput
                                id="noOfPerson"
                                name="noOfPerson"
                                placeholder="Enter Number of Person"
                                type='number'
                                value={noOfPerson}
                                onChange={(e) => setNoOfPerson(e.target.value)}
                                required
                            />

                        </Grid>

                        <Grid item md={3} xs={12}>
                            <CustomInputLabel htmlFor="totalAmount">
                                Total Amount
                            </CustomInputLabel>
                            <CustomInput
                                disabled
                                id="totalAmount"
                                name="totalAmount"
                                value={totalAmount}
                                onChange={(e) => setTotalAmount(e.target.value)}
                            />

                        </Grid>

                        <Grid item md={6} xs={12} sx={{ marginBottom: '1rem' }}>
                            <CustomInputLabel htmlFor="remark">
                                Remark
                            </CustomInputLabel>
                            <CustomInput
                                id="remark"
                                name="Remark"
                                placeholder="Remark"
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
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
            </ThemeProvider>
        </Box>
    )
}

export default Bhojnayalay