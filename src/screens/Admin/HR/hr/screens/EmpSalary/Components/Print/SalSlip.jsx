import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Print from '../../../../../../../../assets/Print.png';
import { Button } from '@mui/material'
import { Tooltip } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import './SalSlip.css'

const SalSlip = ({ setopendashboard }) => {

    const navigate = useNavigate()
    const location = useLocation();
    const itemData = location.state?.itemData || null;
    const componentRef = useRef();
    console.log(itemData)

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        setopendashboard(true)
    }, [])

    return (
        <div className='dashboarddiv'>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '8%' }}>
                <div className='back'>
                    <Button

                        sx={{
                            width: '6rem',
                            color: 'white',
                            backgroundColor: '#f86d3b',
                            "&:hover": {
                                backgroundColor: ' #f97f53'
                            },
                            marginLeft: '15%',

                        }}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                </div>

                <div className='container' ref={componentRef} >
                    <div className='header' >
                        <h3>          श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह (म.प्र.)   </h3>
                    </div>

                    <div className='date'>
                        Salary Slip for {itemData?.month}/{itemData?.year}
                    </div>

                    <div className='details' style={{ display: 'flex', justifyContent: 'space-evenly', gap: '10rem', marginTop: '1rem' }}>
                        <div >
                            <div className='field'>
                                <p>Employee ID : </p> &nbsp;&nbsp;
                                <p>{itemData?.employeeId}</p>
                            </div>
                            <div className='field'>
                                <p>  Name :</p> &nbsp;&nbsp;
                                <p>   {itemData?.employeeName}</p>
                            </div>
                            {/* <div className='field'>
                            <p>Department ID:</p>
                            <p>{departmentId}</p>
                        </div> */}
                            <div className='field'>
                                <p>   Department Name :   </p> &nbsp;&nbsp;
                                <p>  {itemData?.department}</p>
                            </div>
                        </div>
                        <div>


                            <div className='field'>
                                <p> Designation : </p> &nbsp;&nbsp;
                                <p> {itemData?.designation}</p>
                            </div>
                            <div className='field'>
                                <p> Amount Paid :</p> &nbsp;&nbsp;
                                <p> Rs.{itemData?.amountPaid}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='print'>
                    <Tooltip onClick={handlePrint}>
                        <img
                            style={{ width: '30px' }}
                            title="Print "
                            src={Print}
                            alt=" Print"
                        />
                    </Tooltip>
                </div>

            </div>
        </div>
    )
}

export default SalSlip