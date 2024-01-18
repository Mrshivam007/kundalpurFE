import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { useReactToPrint } from 'react-to-print';
import { TableFooter } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { IconButton } from '@mui/material';

import Print from '../../../../../../../assets/Print.png';
import Logo from '../../../../../../../assets/POPrintLogo.png';

import './PrintPO.css'

const PrintPO = ({ setopendashboard }) => {

    const componentRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const itemData = location.state?.itemData || null;

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleBack = () => {
        navigate(-1);
    }

    const totalAmount = itemData
        ? itemData.purchaseOrderList.reduce(
            (total, orderItem) => total + orderItem.total,
            0
        )
        : 0;

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
        setopendashboard(true)
    }, [])

    return (

        <div className='dashboarddiv' style={{ marginLeft: '10rem', marginTop: '5rem', display: 'flex' }} >
            <div>

                <Button
                    onClick={handleBack}

                    sx={{
                        width: '6rem',
                        backgroundColor: '#f86d3b',
                        "&:hover": {
                            backgroundColor: ' #f97f53'
                        },
                        marginLeft: '15%',

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


            <div className='printContainer' ref={componentRef}>


                <div style={{ padding: '5rem' }} className="printcontainer" id="capture" >

                    <div>
                        <div className="print" >
                            <div className="main_po">
                                <div className="main_po_1">
                                    <div className='headerPay'>
                                        <div className="main_po_2">
                                            <h4 style={{ textAlign: "center" }}><u>Purchase Order</u></h4>
                                        </div>
                                        <div className="main_po_3" style={{ textAlign: "right" }}>
                                            GSTIN :23AADTP8230A1Z1
                                        </div>
                                    </div>
                                    <div className="printheader">

                                        <img style={{ marginLeft: '-3rem', width: '200px' }}
                                            src={Logo} alt="Kundalpur Logo" />
                                        <p style={{ marginLeft: '-5rem' }}>
                                            <h4 style={{ fontWeight: "bold", marginRight: "1rem", textAlign: 'center' }}>श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि कुण्डलपुर दमोह,  </h4>
                                            <h5 style={{ textAlign: 'center', fontWeight: "bold", marginLeft: '3rem' }}>
                                                कुण्डलपुर ,470772,(म.प्र.) Mobile No. - +91 8819088922
                                            </h5>
                                        </p>


                                    </div>
                                </div>


                                <div className="printbody" style={{ marginTop: '1rem' }}>
                                    <div className="printbody_1" >
                                        <div className="printbody_2"  >

                                            <h6 style={{ marginTop: '-0.8rem', fontSize: '0.9rem' }}>To,</h6>
                                            <div style={{ marginTop: '-3rem' }}>
                                                <h6 style={{ fontSize: '0.8rem', marginLeft: "1rem" }}>
                                                    <h3>Po code :- <span>
                                                        {itemData?.purchaseOrderNo}
                                                    </span></h3>
                                                    M/s :-
                                                    <span style={{ fontSize: '0.8rem' }}>
                                                        {itemData?.supplierName}
                                                    </span>
                                                </h6>
                                                <div>
                                                    {/* <h6 style={{ fontSize: '0.8rem', marginLeft: "1rem", marginTop: '-1rem' }}> GSTIN : </h6> */}
                                                    <h6 style={{ marginLeft: "1rem" }}>

                                                    </h6>

                                                    <h6 style={{ fontSize: '0.8rem', marginLeft: "1rem", marginTop: '-1rem' }}>
                                                        Contact :
                                                        {itemData?.mobileNo}

                                                    </h6>
                                                    <br />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="printbody_3">
                                            <div className="printbody_4">
                                                <span>Print Date: {currDate}</span>

                                            </div>
                                            <div className="printbody_5">
                                                <span>Contact Person</span>
                                                <span>{itemData?.contactName} </span>
                                                <span>
                                                    {itemData?.contactPerson}
                                                </span>
                                            </div>
                                            <div className="printbody_6">
                                                <span>Prepared By</span>
                                                <span>Staff</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <section style={{ padding: "10px", marginTop: '-3rem' }}>
                                    <h6>Dear Sir,</h6>
                                    <h6 style={{ marginTop: '-1rem' }}>KINDLY SUPPLY THE FOLLOWING ITEM AS PER ORDER SHEET</h6>
                                </section>

                                <Table sx={{ marginTop: '-1rem' }}>
                                    <TableHead  >
                                        <TableRow>
                                            <TableCell>Sn.</TableCell>

                                            <TableCell>PO Date</TableCell>
                                            <TableCell>ITEM No.</TableCell>
                                            <TableCell>ITEM</TableCell>
                                            <TableCell>Delivery Date</TableCell>

                                            <TableCell>UOM</TableCell>
                                            <TableCell>QTY</TableCell>
                                            <TableCell>PRICE</TableCell>
                                            <TableCell>GST %</TableCell>
                                            <TableCell>Discount %</TableCell>
                                            <TableCell>AMOUNT</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {
                                            itemData && itemData.purchaseOrderList.map((orderItem, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{itemData.purchaseOrderDate}</TableCell>
                                                    <TableCell>{orderItem.itemNo}</TableCell>
                                                    <TableCell>{orderItem.itemName}</TableCell>
                                                    <TableCell>{itemData.deliveryDate}</TableCell>
                                                    <TableCell>{orderItem.UOM}</TableCell>
                                                    <TableCell>{orderItem.quantity}</TableCell>
                                                    <TableCell>{orderItem.price}</TableCell>
                                                    <TableCell>{orderItem.GST}</TableCell>
                                                    <TableCell>{orderItem.discount}</TableCell>
                                                    <TableCell>{orderItem.total}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={10} style={{ textAlign: "right", fontSize: "12px", fontWeight: "900", }}>
                                                Total
                                            </TableCell>

                                            <TableCell>
                                                {totalAmount.toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>


                                <div className="terms" style={{ marginTop: '-1rem' }}>
                                    <h5>Terms and Conditions:</h5>
                                    <h6 style={{ marginLeft: '-1rem' }}>
                                        *In case of delay in supply of goods, following T&C will be applicable*
                                    </h6>

                                    <ol style={{ marginLeft: "-3rem" }}>
                                        <li>
                                            Supplier has to ensure the supply best quatity of goods as per original samples otherwise goods not be accepted.
                                        </li>
                                        <li>Delivery time within D.O.D</li>
                                        <li>Need testing pass raw material..</li>
                                        <li>
                                            Quote our P.O number in your invoice, packing list, Challan & Other documents.
                                        </li>
                                        <li>
                                            This Order is subject to approval of pre-production samples.
                                        </li>
                                        <li>All disputes are subject to Kundalpur jurisdiction.</li>
                                        <li>
                                            If the above T&C are not fulfilled then there will be penalty of 10% on undelivered goods.
                                        </li>
                                    </ol>
                                </div>
                                <br />	<br />
                                <footer style={{ marginTop: '-2rem' }}>
                                    <h6>SUPPLIER'S SIGNATURE </h6>
                                    <h6>AUTHORISED SIGNATURE </h6>
                                </footer>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
            <div className='funcButton'>
                <div style={{ marginRight: '1rem' }}>
                    <IconButton>
                        <img
                            style={{ width: '30px' }}
                            title="Print "
                            src={Print}
                            alt=" Print"
                            onClick={handlePrint}
                        />
                    </IconButton>
                </div>

            </div>
        </div>
    )
}

export default PrintPO