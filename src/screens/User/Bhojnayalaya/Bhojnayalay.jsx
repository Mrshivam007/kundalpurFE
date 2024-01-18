import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import donationLeft from '../../../assets/donation-left.png';
import donationRight from '../../../assets/donation-right.png';
import './Bhojnayalay.css'
import { serverInstance } from '../../../API/ServerInstance';
import axios from 'axios';
import { useAuth } from '../../../Context/AuthContext';
import { backendApiUrl } from '../../../config/config';


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




const Bhojnayalay = () => {



    const auth = useAuth()

    const { user } = useSelector((state) => state.userReducer);

    const [showloader, setshowloader] = useState(false)

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

    const [onlineId, setOnlineId] = useState('')

    const [typeList, setTypeList] = useState([])

    const navigate = useNavigate()

    if (!sessionStorage.getItem('token')) {
        navigate('/login');

    }

    const resetForm = () => {
        setReceiptNo('')
        setBookDate('')
        setTime('')
        setName('')
        setMobileNo('')
        setType('')
        setNoOfPerson('')
        setTotalAmount('')
        setRemark('')
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
                Name: name,
                MobileNo: mobileNo,
                Type: type,
                NoOfPerson: noOfPerson,
                TotalAmount: totalAmount,
                Remark: remark
            }

            const res = await axios.post(`${backendApiUrl}user/add-bhojnalay`, data)
            console.log(res.data.data.id)

            // const res = await serverInstance('user/add-bhojnalay', 'post', data)
            if (res.status) {

                window.location.href =
                    'https://paymentkundalpur.techjainsupport.co.in/bhojnalay?order_id=' +
                    res.data.data.id;

                setOnlineId(res.data.data.id);
            }
            if (res.status === false) {
                Swal.fire("Error! Please Book Again", res?.msg, 'error')
            }
        } catch (err) {
            console.log(err)
            Swal.fire("Error! Please Book Again", res?.msg, 'error')
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

    const getCurrentTime = () => {
        const today = new Date();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        return hours * 60 + minutes;
    };

    const today = new Date();

    const isToday = bookDate === getCurrentDate();


    const disableFirstOption = isToday && ( getCurrentTime() >= 13*60);   
    const disableSecondOption = isToday && (getCurrentTime() <= 13 * 60 || getCurrentTime() >= 18 * 60);



    useEffect(() => {
        getType();
        if (user) {
            setName(user?.name);
            setMobileNo(user?.mobileNo)
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


    return auth.verify ? (
        <div className='main-div'>

            <ThemeProvider theme={theme}>


                <Box
                    className="supper-inear-main-div"
                    sx={{
                        paddingX: {
                            xs: 2,
                            md: 0,
                        },
                    }}
                >
                    <Box
                        maxWidth={'sm'}
                        width={'100%'}
                        margin={'auto 2rem auto auto'}
                        marginY={1}
                        sx={{
                            background: 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(2px)',
                            borderRadius: '5px',
                            '& p': {
                                fontSize: '0.9rem',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#FFFFFFCC',
                                borderRadius: '5px 5px 0 0',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '0.3rem 1rem',
                                }}
                            >
                                <img src={donationLeft} alt="" height={40} />
                                <Typography
                                    variant="h5"
                                    fontWeight={500}
                                    color="primary"
                                    fontFamily={'PoetsenOne'}
                                    fontStyle={'italic'}
                                >
                                    Book Bhojnayalay
                                </Typography>
                            </Box>
                            <img src={donationRight} alt="" height={40} />
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Grid
                                container
                                rowSpacing={2}
                                columnSpacing={2}
                                mt={1}
                                sx={{
                                    paddingX: {
                                        xs: 3,
                                        md: '1rem',
                                    },
                                }}
                            >


                                <>
                                    <Grid item md={6} xs={12}>
                                        <CustomInputLabel htmlFor="date">
                                            Date
                                        </CustomInputLabel>
                                        <CustomInput
                                            id="date"
                                            name="date"
                                            placeholder="Date"
                                            type='date'
                                            inputProps={{ min: getCurrentDate() }}
                                            value={bookDate}
                                            onChange={(e) => setBookDate(e.target.value)}
                                            required
                                        />

                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <CustomInputLabel htmlFor="time">Time</CustomInputLabel>
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
                                            
                                            <MenuItem
                                                sx={{
                                                    fontSize: 14,
                                                }}
                                                value="11am-2pm"
                                                disabled={disableFirstOption}
                                            >
                                                11am-2pm
                                            </MenuItem>
                                            <MenuItem
                                                value="5pm-6pm"
                                                disabled={disableSecondOption}
                                            >
                                                5pm-6pm
                                            </MenuItem>

                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
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


                                    <Grid item md={6} xs={12}>
                                        <CustomInputLabel htmlFor="mobileNo">
                                            Mobile No.*
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

                                    <Grid item md={6} xs={12}>
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

                                    <Grid item md={6} xs={12}>
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

                                    <Grid item md={6} xs={12}>
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

                                </>

                            </Grid>

                            <Button
                                type='submit'
                                variant="contained"
                                sx={{
                                    color: '#fff',
                                    textTransform: 'capitalize',
                                    ml: 2,
                                    mb: 2,
                                    padding: '0.2rem 3rem',
                                    borderRadius: '2rem',
                                    fontSize: '1rem',
                                    fontFamily: 'Inter',
                                }}

                            >
                                Book Bhojnayalay
                            </Button>
                        </form>
                    </Box>
                </Box>
            </ThemeProvider>

        </div>
    ) : (
        <div>Loading ...</div>
    );
}

export default Bhojnayalay