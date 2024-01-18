import React, { useEffect, useState } from 'react'
import Tooltip from "@mui/material/Tooltip";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from 'sweetalert2';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material";
import { TablePagination, TableFooter } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Delete from '../../../../../../assets/Delete.png';
import Adjust from '../Add/Adjust'
import { serverInstance } from '../../../../../../API/ServerInstance';

const Tabl = ({ data, searchData, getStock , componentRef}) => {


    const [open, setOpen] = useState(false)

    const [stockData, setStockData] = useState('')

    const [openDelete, setOpenDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 25));

        setPage(0);
    };


    const deleteStock = () => {

        try {

            serverInstance(`store/delete-stock?id=${deleteId}`, 'delete').then((res) => {
                console.log(res)
                if (res.status === true) {
                    handleDeleteClose()
                    Swal.fire('Deleted!', res.message, 'success');
                }
                if (res.status === false) {
                    handleDeleteClose()
                    Swal.fire('Error!', res.message, 'failed');
                }
            })
        } catch (err) {
            console.log(err)
            setLoader(false);
        }

    };

    const handleDelete = (id) => {
        setOpenDelete(true);
        setDeleteId(id);
    }

    const handleDeleteClose = () => {
        setOpenDelete(false)
    }

    const handleStock = (item) => {
        setOpen(true);
        setStockData(item)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleCallback = () => {
        getStock();
    }

    useEffect(() => {

    }, [openDelete])

    return (

        <>


            <Dialog
                open={openDelete}
                onClose={handleDeleteClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Do you want to delete'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        After delete you cannot get again
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose}>Disagree</Button>
                    <Button onClick={deleteStock} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            {open && <Adjust stockData={stockData} open={open} close={handleClose} getStock={handleCallback} />}
            <div ref={componentRef}>

                <Table>
                    <TableHead>
                        <TableCell>S. No.</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Department Code</TableCell>
                        <TableCell>Department Name</TableCell>
                        <TableCell>Item Code</TableCell>
                        <TableCell>Item Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>UOM</TableCell>
                        <TableCell>Action</TableCell>
                    </TableHead>

                    <TableBody>
                        {
                            data && data.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            ).map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{moment(item?.Date).format('MM/DD/YYYY')}</TableCell>
                                    <TableCell>{item?.DepartmentCode}</TableCell>
                                    <TableCell>{item?.DepartmentName}</TableCell>
                                    <TableCell>{item?.ItemCode}</TableCell>
                                    <TableCell>{item?.ItemName}</TableCell>
                                    <TableCell>{item?.Quantity}</TableCell>
                                    <TableCell>{item?.UOM}</TableCell>
                                    <TableCell>
                                        {/* <Tooltip title="Adjust Stock">
                                            <AddCircleIcon
                                                onClick={() => handleStock(item)}
                                                alt="Adjust Stock"
                                                sx={{
                                                    width: '1.1rem',
                                                    marginRight: '0.5rem',
                                                    "&:hover": {
                                                        width: '1.3rem'
                                                    },
                                                }}

                                            />
                                        </Tooltip> */}

                                        <Tooltip title="Delete">
                                            <img
                                                onClick={() => handleDelete(item?.id)}
                                                src={Delete}
                                                alt="Delete"
                                                style={{ width: '20px' }}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        }

                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[25, 50, 100]}
                                labelRowsPerPage={<span>Rows:</span>}
                                labelDisplayedRows={({ page }) => {
                                    return `Page: ${page}`;
                                }}
                                backIconButtonProps={{
                                    color: 'secondary',
                                }}
                                nextIconButtonProps={{ color: 'secondary' }}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'page number',
                                    },
                                }}

                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </>
    )
}

export default Tabl