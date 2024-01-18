import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PrintBoli from './PrintBoli';
import PaymentBoli from './PaymentBoli';
import './Saveboli.css';

function Saveboli({ resdata, setOpen, boliheads, boliunits }) {
  const [showpayment, setshowpayment] = useState(false);
  const [showprint, setshowprint] = useState(false);
  return (
    <>
      {showpayment || showprint ? (
        ''
      ) : (
        <>
          <h1 style={{ textAlign: 'center' }}>Boli Added Successfully</h1>
          <p style={{ textAlign: 'center' }}>Boli ID : {resdata?.Boli_id}</p>
        </>
      )}

      <div
        style={{
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {showpayment || showprint ? (
          <></>
        ) : (
          <>
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
                onClick={() => {
                  setshowpayment(true);
                  setshowprint(false);
                }}
              >
                Enter Payment
              </Button>

              {/* <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                  boxShadow: 'none',
                }}
                variant="contained"
                type="submit"
                onClick={() => {
                  setshowprint(true);
                  setshowpayment(false);
                }}
              >
                Print Receipt
              </Button> */}

              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: 5,
                }}
                variant="contained"
                color="error"
                onClick={() => setOpen(false)}
                type="button"
              >
                Cancel
              </Button>
            </Box>
          </>
        )}

        {showpayment && (
          <>
            <PaymentBoli
              resdata={resdata}
              boliheads={boliheads}
              boliunits={boliunits}
              setshowpayment={setshowpayment}
              setshowprint={setshowprint}
            />
          </>
        )}

        {showprint && (
          <>
            <PrintBoli
              resdata={resdata}
              boliheads={boliheads}
              boliunits={boliunits}
              setshowpayment={setshowpayment}
              setshowprint={setshowprint}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Saveboli;
