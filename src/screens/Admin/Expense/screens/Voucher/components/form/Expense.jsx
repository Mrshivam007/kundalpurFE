import React, { useEffect, useState } from 'react';
import { serverInstance } from '../../../../../../../API/ServerInstance';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Moment from 'moment-js';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import UnderlinedTab from '../../../../common/UnderlinedTab';

import Invoice from './Invoice';
import Payment from '../MainForm/Payment'
import Contra from '../MainForm/Contra'
import Journal from '../MainForm/Journal'
import Received from '../MainForm/Received'


import LoadingSpinner1 from '../../../../../../../components/Loading/LoadingSpinner1';
import './Expense.css'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 2,
  boxShadow: 24,
  borderRadius: '15px',
};



const colorTheme = {
  received: '#cc0066',
  payment: '#e6b800',
  journal: '#4d79ff',
  contra: '#ff5c33',
};



const Expense = ({ setopendashboard }) => {

  const navigate = useNavigate()

  const [loader, setloader] = useState(false);
  const [empid, setempid] = useState('');
  const [emproleid, setemproleid] = useState('');
  const [roleid, setroleid] = useState('');
  const [isData, setIsData] = useState('')
  const [open, setOpen] = React.useState(true);
  const [open3, setOpen3] = React.useState(false);

  const [open4, setOpen4] = useState(false);
  const [voucher, setVoucher] = useState('')

  const [donationTypes , setDonationTypes] = useState([])


  const handleInvoiceOpen = () => {
    navigate('/admin-panel/expense/uploadedInvoice')
  }


  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = React.useCallback(() => setOpen(false), []);

  const get_donation_tyeps = () => {
    try {
      serverInstance(`admin/get-boliHead`, 'get').then((res) => {
        if (res.status === true) {
          setDonationTypes(res.data);
        }
      });
    } catch (error) {}
  };

  console.log(donationTypes)


  const getExpenseVoucher = async () => {
    try {
      const res = await serverInstance('expense/get-expenseVoucher', 'get')
      if (res.status) {
        setIsData(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    
   
    const role = Number(sessionStorage.getItem('userrole'));
    setemproleid(Number(sessionStorage.getItem('empRoleid')));
    setroleid(Number(sessionStorage.getItem('userrole')));
    setempid(Number(sessionStorage.getItem('empid')));

  },);

  let tabs = [];





  {
    roleid === 3 && emproleid === 7 ? (
      <>
        {tabs.push(
          {
            label: 'Payment',
            component: (
              <Payment
                handleClose={handleClose}
                themeColor={colorTheme.payment}
                handleOpen4={handleOpen4}
                voucher={voucher}
                setopendashboard={setopendashboard}

              />
            ),
          },
          {
            label: 'Journal',
            component: (
              <Journal
                handleClose={handleClose}
                themeColor={colorTheme.journal}
                handleOpen4={handleOpen4}
                voucher={voucher}
                setopendashboard={setopendashboard}

              />
            ),
          },
        )}
      </>
    ) : (
      <>
        {tabs.push(
          {
            label: 'Received',
            component: (
              <Received
                handleClose={handleClose}
                themeColor={colorTheme.received}
                handleOpen4={handleOpen4}
                voucher={voucher}
                setopendashboard={setopendashboard}

              />
            ),
          },

          {
            label: 'Payment',
            component: (
              <Payment
                handleClose={handleClose}
                themeColor={colorTheme.payment}
                handleOpen4={handleOpen4}
                voucher={voucher}
                setopendashboard={setopendashboard}

              />
            ),
          },
          {
            label: 'Journal',
            component: (
              <Journal
                handleClose={handleClose}
                themeColor={colorTheme.journal}
                handleOpen4={handleOpen4}
                voucher={voucher}
                setopendashboard={setopendashboard}

              />
            ),
          },
          {
            label: 'Contra',
            component: (
              <Contra
                handleClose={handleClose}
                themeColor={colorTheme.contra}
                handleOpen4={handleOpen4}
                voucher={voucher}
                setopendashboard={setopendashboard}

              />
            ),
          },
        )}
      </>
    );
  }



  return (
    <>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>


        <Button variant="primary" onClick={handleInvoiceOpen} className="btn"
          sx={{
            marginRight: '1rem',
            borderRadius: '0.5rem',
            color: 'black',
            width: '10vw',
            height: '5vh',
            backgroundColor: '#fcbb82',

            ":hover": {
              bgcolor: '#f2ad6f'
            }
          }}
        >
          Upload Invoice
        </Button>

        <Button variant="primary" onClick={handleOpen} className="btn"
          sx={{
            marginRight: '1rem',
            borderRadius: '0.5rem',
            color: 'black',
            width: '10vw',
            backgroundColor: '#fcbb82',

            ":hover": {
              bgcolor: '#f2ad6f'
            }
          }}
        >
          +Add
        </Button>

      </div>



      <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box
              sx={{
                ...style,
                width: {
                  xs: '90%',
                  sm: '70%',
                  md: '70%',
                },
              }}
            >
              <UnderlinedTab
                tabs={tabs}
                handleClose={handleClose}
                themeColor={colorTheme}
              />
            </Box>
          </Fade>
        </Modal>
      </>

      {loader && <LoadingSpinner1 />}
    </>
  );
};

export default Expense;
