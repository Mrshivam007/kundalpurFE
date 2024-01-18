import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material'
import styles from '../donationHistory/DonationHistory1.module.css'
import { serverInstance } from '../../../API/ServerInstance'
import moment from 'moment'

const BhojnalayHistory = () => {

    const [fromdate, setfromdate] = useState('')
    const [todate, settodate] = useState('')
    const [data, setData] = useState('')

    const getBhojnalayHistory = async () => {
        try {
            const res = await serverInstance('user/get-bhojnalayHistory', 'get')
            setData(res.data)
            console.log('res', res)
        } catch (err) {
            console.log(err)
        }
    }

    const reset = () => {
        getBhojnalayHistory()
    }


    const filterdata = async (e) => {
        e.preventDefault();

        try {
            if (fromdate && todate) {

                const response = await serverInstance(
                    `user/get-bhojnalay?fromDate=${fromdate}&toDate=${todate}`,
                    'get'
                );
                if (response.data) {
                    setData(response.data);

                }
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getBhojnalayHistory();
    }, [])

    return (
        <div >


            <div className={styles.topmenubar}>
                <div className={styles.searchoptiondiv}>
                    <div className={styles.searchoptiondiv}>
                        <label>From Date</label>
                        <input
                            className={styles.opensearchinput}
                            type="date"
                            value={fromdate}
                            name="fromdate"
                            onChange={(e) => setfromdate(e.target.value)}
                        />
                        <label>To Date</label>
                        <input
                            className={styles.opensearchinput}
                            type="date"
                            value={todate}
                            name="todate"
                            onChange={(e) => settodate(e.target.value)}
                        />

                        <button onClick={(e) => filterdata(e)}>Search</button>
                    </div>
                    <button onClick={() => reset()}>Reset</button>
                </div>
                <div className={styles.imgdivformat}>
                    <h>Bhojnalay History</h>
                </div>
            </div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>S. No.</TableCell>
                            <TableCell>Date Of Booking</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Mobile No.</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>No Of Person</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Remark</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data && data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{moment(item?.DateOfBooking).format('DD/MM/YYYY')}</TableCell>
                                    <TableCell>{item?.Time}</TableCell>
                                    <TableCell>{item?.Name}</TableCell>
                                    <TableCell>{item?.MobileNo}</TableCell>
                                    <TableCell>{item?.Type}</TableCell>
                                    <TableCell>{item?.NoOfPerson}</TableCell>
                                    <TableCell>{item?.TotalAmount}</TableCell>
                                    <TableCell>{item?.Remark}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default BhojnalayHistory