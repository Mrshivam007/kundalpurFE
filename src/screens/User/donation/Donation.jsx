import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../API/ServerInstance';
import PaymentSuccessfull from './PaymentSuccessfull/PaymentSuccessfull';
import ChequeSuccessfull from './chequeSuccessfull/ChequeSuccessfull';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../../Redux/redux/action/AuthAction';
import donationLeft from '../../../assets/donation-left.png';
import donationRight from '../../../assets/donation-right.png';
import { backendApiUrl } from '../../../config/config';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import {
  Box,
  Button,
  ButtonBase,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Swal from 'sweetalert2';
const formData = new FormData();
import './Donation.css';
import { useJwt } from 'react-jwt';
import { useAuth } from '../../../Context/AuthContext';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Converter, hiIN } from 'any-number-to-words';

export const CustomInputLabel = styled(InputLabel)(() => ({
  fontSize: '1rem',
  lineHeight: '24px',
  color: '#05313B',
  fontFamily: 'Poppins',
  marginBlock: '0.1rem',
}));
const primaryColor = '#FA7401';

const CustomButton = styled(ButtonBase)(({ theme }) => ({
  padding: '0.4rem',
  borderRadius: '2em',
  display: 'flex',
  alignItems: 'center',
  width: '4.5rem',
  // borderRadius:'0.1em',
  // fontFamily: 'Aeonik',
  paddingBlock: '0.3em',
  span: {
    fontFamily: 'Inter',
    fontSize: '0.85rem',
    lineHeight: '24px',
  },
  boxShadow: 'none',
  border: '1px solid #B8B8B8',
}));

const CustomDonationButton = styled(ButtonBase)(({ theme }) => ({
  padding: '0.3rem 0.6rem',
  borderRadius: '0.2em',
  fontSize: '0.9rem',
  color: '#939393',
  width: '4.5rem',
}));

const CDBvariant = {
  selected: {
    backgroundColor: primaryColor,
    color: '#fff',
  },
  unselected: {
    backgroundColor: '#fff',
    color: '##939393',
  },
};
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

const donationAmounts = [
  {
    label: '₹1,111',
    value: '1111',
  },
  {
    label: '₹2,121',
    value: '2121',
  },
  {
    label: '₹5,151',
    value: '5151',
  },
  {
    label: '₹11,111',
    value: '11111',
  },
  {
    label: '₹21,211',
    value: '21211',
  },
  {
    label: '₹51,511',
    value: '51511',
  },
  {
    label: 'other',
    value: '',
  },
];

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '12px',
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 2,
};
function Donation({ setshowreciept, paymentId, setonlineId }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const converter = new Converter(hiIN);

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
  const [ledgerno, setledgerno] = useState('');
  const [mode, setmode] = useState('Online');
  const [amount, setamount] = useState('');
  const [panno, setpanno] = useState('');
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [formerror, setFormerror] = useState({});
  const [isData, setisData] = React.useState([]);
  const [cheqing, setcheqing] = useState('');
  const [genderp, setgenderp] = useState('श्री');
  const [showloader, setshowloader] = useState(false);
  const [donationdata, setDonationdata] = useState({
    name: '',
    chequeno: '',
    date_of_sub: '',
    name_of_bank: '',
    Remark: '',
    donationtype: '',
    selected: '',
    amount: '',
    address: '',
  });

  const genderoptiins = [
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
  console.log(isData);

  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const auth = useAuth();
  const { user } = useSelector((state) => state.userReducer);

  if (donationdata.selected === 'yes1' && !user.name) {
    nagivate('/profile');
  }
  const onChange = (e) => {
    setDonationdata({ ...donationdata, [e.target.name]: e.target.value });
  };

  var today = new Date();

  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  const currTime = `${h}:${m}:${s}`;
  const handlesubmit = async (e) => {
    setFormerror(validate(donationdata));

    if (!formerror) {
      setshowloader(true);
    }
    formData.set(
      'NAME',
      donationdata.selected === 'yes1' && user.name
        ? user.name
        : donationdata.name,
    );
    formData.set('MODE_OF_DONATION', mode === 'Online' ? 1 : 2);
    formData.set('AMOUNT', amount);
    // formData.set("CHEQUE_NO", donationdata?.chequeno);
    formData.set('GENDER', genderp);
    formData.set('DATE_OF_CHEQUE', donationdata?.date_of_sub);
    formData.set('NAME_OF_BANK', donationdata?.name_of_bank);
    formData.set('DATE_OF_DAAN', new Date());
    formData.set('TYPE', donationdata?.donationtype);
    formData.set('REMARK', donationdata?.Remark);
    formData.set('ADDRESS', donationdata?.address);
    formData.set('CHEQUE_NO', donationdata?.chequeno);
    formData.set('chequeImg', cheqing);
    formData.set('MobileNo', user?.mobileNo);

    formData.set('TIME_OF_DAAN', currTime);
    formData.set('PAN_CARD_No', panno);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    // if (!sessionStorage.getItem('token')) {
    //   nagivate('/login');
    //   return false;
    // }

    if (!donationdata.address) {
      return;
    }
    if (!donationdata?.donationtype) {
      return;
    }
    if (mode === 'Online' && amount) {
      serverInstance('user/add-donation', 'POST', {
        GENDER: genderp,
        NAME:
          donationdata.selected === 'yes1' && user.name
            ? user.name
            : donationdata.name,
        MODE_OF_DONATION: 1,
        AMOUNT:Number(amount),
        CHEQUE_NO: donationdata?.chequeno,
        DATE_OF_CHEQUE: donationdata?.date_of_sub,
        NAME_OF_BANK: donationdata?.name_of_bank,
        DATE_OF_DAAN: new Date(),
        PAYMENT_ID: paymentId,
        LedgerNo: ledgerno,
        TYPE: donationdata?.donationtype,
        REMARK: donationdata?.Remark,
        ADDRESS: donationdata?.address,
        MobileNo: user?.mobileNo,
        PAN_CARD_No: panno,
        TIME_OF_DAAN: currTime,
      }).then((res) => {
        if (res.status === true) {
          setshowloader(false);
          window.location.href =
            'https://paymentkundalpur.techjainsupport.co.in/about?order_id=' +
            res.data.id;

          setonlineId(res.data.id);
        } else {
          Swal.fire('Error!', 'Somthing went wrong!!', 'error');
        }
      });
    }

    if (
      mode === 'Cheque' &&
      donationdata.chequeno &&
      cheqing &&
      amount &&
      donationdata.date_of_sub &&
      donationdata.name_of_bank
    ) {
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;

      const res = await axios.post(
        `${backendApiUrl}user/add-donation`,

        formData,
      );

      if (res.data.status === true) {
        handleOpen1();
        setshowloader(false);
        sendsms(res?.data?.data?.RECEIPT_NO);
      } else {
        Swal.fire('Error!', 'Mobile number already exist!!', 'error');
      }
    }
  };
  useEffect(() => {}, [formerror, donationdata]);

  console.log(useJwt(sessionStorage.getItem('token')));

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Please enter name';
    }
    if (donationdata.selected === 'yes1' && !user.name) {
      errors.namesecond = 'Please enter name';
    }
    if (!amount) {
      errors.amount = 'Please enter amount';
    }

    if (!values.address) {
      errors.address = 'Please enter address';
    }

    if (values.donationtype === 'Please Select') {
      errors.donationtype = 'Please selection donation type';
    }

    if (!values.selected) {
      errors.selected = 'Please donation for';
    }
    if (!values.chequeno) {
      errors.chequeno = 'Please enter cheque no';
    }
    if (!values.date_of_sub) {
      errors.date_of_sub = 'Plase enter date submission';
    }

    if (!values.name_of_bank) {
      errors.name_of_bank = 'Please enter name of bank';
    }

    if (!values.donationtype) {
      errors.donationtype = 'Please enter name of donation type';
    }

    if (mode === 'Cheque' && !cheqing) {
      errors.chequeImg = 'Upload cheque image';
    }

    return errors;
  };
  const gett = () => {
    dispatch(loadUser());
  };
  const getall_donatiions = () => {
    try {
      serverInstance(`admin/donation-type?type=1`, 'get').then((res) => {
        if (res.status === true) {
          setisData(res?.data);
        } else {
          Swal('Error', 'somthing went  wrong', 'error');
        }
        console.log('ss', res);
      });
    } catch (error) {
      Swal.fire('Error!', error, 'error');
    }
  };

  useEffect(() => {
    gett();
    getall_donatiions();
    setshowreciept(false);

    if (location?.state) {
      console.log('Boli Data Is ', location?.state?.bolidata);
      setledgerno(location?.state?.bolidata?.LedgerNo);
    }
  }, []);

  const sendsms = async (RECEIPT_NO) => {
    try {
      axios.defaults.headers.post[
        'Authorization'
      ] = `Bearer ${sessionStorage.getItem('token')}`;
      const res = await axios.post(`${backendApiUrl}user/sms`, {
        mobile: user?.mobileNo,
        amount: amount,
        rno: RECEIPT_NO,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return auth.verify ? (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <PaymentSuccessfull
              handleClose={handleClose}
              name={
                donationdata.selected === 'yes1' && user.name
                  ? user.name
                  : donationdata.name
              }
              amount={amount}
              address={donationdata.address}
              mat={donationdata.donationtype}
              remark={donationdata.Remark}
              recieptno={'1'}
            />
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
      >
        <Fade in={open1}>
          <Box sx={style}>
            <ChequeSuccessfull handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>

      <div className="supper-main-div">
        <ThemeProvider theme={theme}>
          {/* <div className="donation-top-img">
            <img src={badebaba} alt="badebaba" />
            <div className="donation-top-img-overlay">Donation</div>
          </div> */}

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
                    Online Donation {ledgerno && <> ({ledgerno}) </>}
                  </Typography>
                </Box>
                <img src={donationRight} alt="" height={40} />
              </Box>
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
                <Grid item md={6}>
                  <Typography component="legend" color="#05313B">
                    Donation For
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '1rem',
                      mt: 1,
                    }}
                  >
                    <CustomDonationButton
                      name="selected"
                      value="yes1"
                      onClick={onChange}
                      sx={
                        donationdata.selected === 'yes1'
                          ? CDBvariant.selected
                          : CDBvariant.unselected
                      }
                    >
                      Self
                    </CustomDonationButton>
                    <CustomDonationButton
                      name="selected"
                      value="yes2"
                      onClick={onChange}
                      sx={
                        donationdata.selected === 'yes2'
                          ? CDBvariant.selected
                          : CDBvariant.unselected
                      }
                    >
                      Someone
                    </CustomDonationButton>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Typography component="legend" color="#05313B">
                    Donation Mode
                  </Typography>
                  <Box mt={1}>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '1rem',
                      }}
                    >
                      <CustomDonationButton
                        onClick={() => setmode('Online')}
                        sx={
                          mode === 'Online'
                            ? CDBvariant.selected
                            : CDBvariant.unselected
                        }
                      >
                        Online
                      </CustomDonationButton>
                      <CustomDonationButton
                        onClick={() => setmode('Cheque')}
                        sx={
                          mode === 'Cheque'
                            ? CDBvariant.selected
                            : CDBvariant.unselected
                        }
                      >
                        Cheque
                      </CustomDonationButton>
                    </Box>
                    <p style={{ color: 'red', marginTop: '5px' }}>
                      {donationdata.selected &&
                        !mode &&
                        'Please select donation mode'}
                    </p>
                  </Box>
                </Grid>

                {mode && (
                  <>
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
                          {genderoptiins.map((item, idx) => {
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
                        placeholder="Full Name"
                        onChange={onChange}
                        value={
                          donationdata.selected === 'yes1' && user.name
                            ? user.name
                            : donationdata.name
                        }
                      />
                      {donationdata.selected === 'yes1' && user.name ? (
                        ''
                      ) : (
                        <p style={{ color: 'red', marginTop: '5px' }}>
                          {formerror.name}
                        </p>
                      )}
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <CustomInputLabel htmlFor="donation-type">
                        Donation Type*
                      </CustomInputLabel>

                      <Select
                        id="donation-type"
                        required
                        sx={{
                          width: '100%',
                          fontSize: 14,
                          '& .MuiSelect-select': {
                            borderColor: !!formerror.donationtype ? 'red' : '',
                            padding: '10px 0px 10px 10px',
                            background: '#fff',
                          },
                        }}
                        value={donationdata.donationtype}
                        name="donationtype"
                        onChange={onChange}
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
                        {isData &&
                          isData.map((item) => {
                            return (
                              <MenuItem
                                sx={{
                                  fontSize: 14,
                                }}
                                key={item.id}
                                value={item.type_hi}
                              >
                                {item.type_hi}
                              </MenuItem>
                            );
                          })}
                      </Select>
                      <p style={{ color: 'red', marginTop: '5px' }}>
                        {formerror.donationtype}
                      </p>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <CustomInputLabel htmlFor="address">
                        Address
                      </CustomInputLabel>
                      <CustomInput
                        id="address"
                        name="address"
                        placeholder="Address"
                        value={donationdata.address}
                        onChange={onChange}
                      />
                      <p style={{ color: 'red', marginTop: '5px' }}>
                        {formerror.address}
                      </p>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <CustomInputLabel htmlFor="remark">
                        Remark
                      </CustomInputLabel>
                      <CustomInput
                        id="remark"
                        name="Remark"
                        placeholder="Remark"
                        value={donationdata.Remark}
                        onChange={onChange}
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <CustomInputLabel htmlFor="donation-amount">
                        Donation Amount*
                      </CustomInputLabel>
                      <CustomInput
                        id="donation-amount"
                        name="donation-amount"
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setamount(e.target.value)}
                      />

                      <p style={{ color: 'red', marginTop: '5px' }}>
                        {formerror.amount}
                      </p>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <CustomInputLabel htmlFor="remark">
                        Pan no
                      </CustomInputLabel>
                      <CustomInput
                        id="remark"
                        name="Remark"
                        placeholder="To Rebate In Tax"
                        value={panno}
                        onChange={(e) => setpanno(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} container>
                      <Grid container item xs={12} columnSpacing={2}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body2" fontWeight={600}>
                            {amount && amount > 0
                              ? converter.toWords(amount) + ' रुपए मात्र'
                              : ''}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: {
                              md: 'wrap',
                              xs: 'wrap',
                            },
                            gap: '8px',
                            mt: 1,
                          }}
                        >
                          {donationAmounts.map((item) => (
                            <CustomButton
                              sx={{
                                border: 'none',
                                background:
                                  amount === item.value ? primaryColor : '#fff',
                                color:
                                  amount === item.value ? '#fff' : '#05313C',
                              }}
                              onClick={() => setamount(item.value)}
                            >
                              {/* <CurrencyRupeeIcon
                                sx={{
                                  fontSize: '0.9rem',
                                }}
                              /> */}
                              <span>{item.label}</span>
                            </CustomButton>
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                    {mode === 'Cheque' && (
                      <>
                        <Grid item xs={12}>
                          <CustomInputLabel htmlFor="cheque-no">
                            Cheque No*
                          </CustomInputLabel>
                          <CustomInput
                            id="cheque-no"
                            name="chequeno"
                            placeholder="Cheque No"
                            value={donationdata.chequeno}
                            onChange={onChange}
                          />
                          <p style={{ color: 'red', marginTop: '5px' }}>
                            {formerror.chequeno}
                          </p>
                        </Grid>
                        <Grid item xs={12}>
                          <CustomInputLabel htmlFor="bank-name">
                            Bank Name*
                          </CustomInputLabel>
                          <CustomInput
                            id="bank-name"
                            type="text"
                            name="name_of_bank"
                            placeholder="Enter Bank Name"
                            value={donationdata.name_of_bank}
                            onChange={onChange}
                          />
                          <p style={{ color: 'red', marginTop: '5px' }}>
                            {formerror.name_of_bank}
                          </p>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <CustomInputLabel htmlFor="cheque-date">
                            Date*
                          </CustomInputLabel>
                          <CustomInput
                            id="cheque-date"
                            type="date"
                            name="date_of_sub"
                            placeholder="DOB"
                            value={donationdata.date_of_sub}
                            onChange={onChange}
                          />
                          <p style={{ color: 'red', marginTop: '5px' }}>
                            {formerror.date_of_sub}
                          </p>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <CustomInputLabel htmlFor="cheque-upload">
                            Upload Cheque*
                          </CustomInputLabel>
                          <CustomInput
                            id="cheque-upload"
                            type="file"
                            accept="image/*"
                            name="chqque_img"
                            placeholder="Bank Name"
                            onChange={(e) => {
                              setcheqing(e.target.files[0]);
                              console.log(e.target.files[0]);
                            }}
                          />
                          <p style={{ color: 'red', marginTop: '5px' }}>
                            {formerror.chequeImg}
                          </p>
                        </Grid>
                      </>
                    )}
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        sx={{
                          color: '#fff',
                          textTransform: 'capitalize',
                          mt: mode === 'Cheque' ? 0 : 1,
                          mb: 2,
                          padding: '0.2rem 3rem',
                          borderRadius: '2rem',
                          fontSize: '1rem',
                          fontFamily: 'Inter',
                        }}
                        onClick={handlesubmit}
                      >
                        {mode === 'Cheque' ? (
                          showloader ? (
                            <>
                              <CircularProgress
                                style={{
                                  width: '21px',
                                  height: '21px',
                                  color: 'white',
                                }}
                              />
                            </>
                          ) : (
                            'Submit'
                          )
                        ) : showloader ? (
                          <>
                            <CircularProgress
                              style={{
                                width: '21px',
                                height: '21px',
                                color: 'white',
                              }}
                            />
                          </>
                        ) : (
                          'Donation Now'
                        )}
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    </>
  ) : (
    <div>Loading ...</div>
  );
}

export default Donation;
