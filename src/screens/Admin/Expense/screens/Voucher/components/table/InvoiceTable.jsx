import moment from "moment";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { backendUrl } from "../../../../../../../config/config";
import { Table, TableHead, TableRow, TableBody, TableCell, TableFooter, TablePagination, Tooltip } from '@mui/material'
import { serverInstance } from "../../../../../../../API/ServerInstance";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Modal from '@mui/material/Modal'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button'
import Swal from "sweetalert2";

import Edit from '../../../../../../../assets/Edit.png';
import Delete from '../../../../../../../assets/Delete.png';
import Invoice from "../form/Invoice";
import LoadingSpinner1 from "../../../../../../../components/Loading/LoadingSpinner1";

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    p: 2,
    boxShadow: 24,
    borderRadius: '5px',
};


export default function InvoiceTable({ invoiceOpen, setopendashboard }) {


    const navigate = useNavigate()

    const [loader, setLoader] = useState(false)
    const [invoiceData, setInvocieData] = useState('')
    const [isData, setIsData] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [updateData, setupdatedata] = useState('')
    const [openDelete, setOpenDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [page, setPage] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openEdit, setOpenEdit] = useState(false)



    const handleEdit = (data) => {
        setOpenEdit(true);
        setupdatedata(data);
    };

    const closeEdit = () => {
        setOpenEdit(false)
    }


    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    const handleDelete = (id) => {
        setOpenDelete(true);
        setDeleteId(id);
    }

    const handleDeleteClose = () => {
        setOpenDelete(false)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));

        setPage(0);
    };


    const getUploadedInvoice = async () => {
        setLoader(true)

        try {
            const res = await serverInstance('expense/get-invoiceUpload', 'get')
            setIsData(res.data)
            if (refresh) {
                setRefresh(false);
            }
            setLoader(false)

        } catch (err) {
            console.log(err)
        }
    }

    const deleteInvoice = () => {
        setLoader(true)

        try {

            serverInstance(`expense/delete-invoiceUpload?id=${deleteId}`, 'delete').then((res) => {
                console.log(res)
                if (res.status === true) {
                    handleDeleteClose()
                    Swal.fire('Deleted!', res.message, 'success');
                    setLoader(false)
                }
                if (res.status === false) {
                    handleDeleteClose()
                    Swal.fire('Error!', res.message, 'failed');
                    setLoader(false)
                }
            })
        } catch (err) {
            console.log(err)
        }

    };



    useEffect(() => {

        setopendashboard(true)
        getUploadedInvoice(refresh);

    }, [openDelete, refresh, openEdit])



    return (
        <>
            <div className="dashboarddiv" style={{ margin: '1rem', marginTop: '8rem' }}>



                <div style={{ display: 'flex', justifyContent: "space-between" }}>

                    <Button sx={{
                        marginLeft: '10rem',
                        borderRadius: '0.5rem',
                        color: 'black',
                        width: '10vw',
                        backgroundColor: '#fcbb82',

                        ":hover": {
                            bgcolor: '#f2ad6f'
                        }
                    }}
                        onClick={() => navigate(-1)}>
                        Back
                    </Button>

                    <Invoice handleRefresh={handleRefresh} />

                </div>

                {
                    openEdit && <Invoice updatedata={updateData} openEdit={openEdit} closeEdit={closeEdit} />
                }


                <h3 style={{ textAlign: 'center' }}>Uploaded Invoice </h3>
                <div className="wrapper_abc">

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
                            <Button onClick={deleteInvoice} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <div className="table-div-maain" style={{ marginLeft: '3rem' }}>

                        <Table
                            sx={{ minWidth: 650, width: '95%' }}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>

                                    <TableCell>S No.</TableCell>
                                    <TableCell>Invoice Number</TableCell>
                                    <TableCell>Invoice Date</TableCell>
                                    <TableCell>Invoice Amount</TableCell>
                                    <TableCell>Invoice Upload</TableCell>
                                    <TableCell>Remarks</TableCell>


                                    <TableCell className="sticky-col first-col" id="acts">
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {isData && isData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item?.invoiceNo}</TableCell>
                                            <TableCell>{item?.invoiceDate}</TableCell>
                                            <TableCell>{item?.invoiceAmount}</TableCell>
                                            {selectedImage && (
                                                <Modal
                                                    open={selectedImage}
                                                    onClose={() => setSelectedImage(null)}
                                                >
                                                    <div style={style}>
                                                        <img
                                                            src={selectedImage}
                                                            alt="Invoice Photo"
                                                            style={{ width: '100%' }}
                                                        />
                                                    </div>
                                                </Modal>
                                            )}

                                            {console.log(item?.invoiceUpload)}
                                            <TableCell>
                                                {item?.invoiceUpload && (
                                                    <img
                                                        src={`${backendUrl}images/${item?.invoiceUpload}`}
                                                        alt={`Invoice Photo of ${item?.invoiceNo}`}
                                                        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                                                        onClick={() =>
                                                            setSelectedImage(`${backendUrl}images/${item?.invoiceUpload}`)
                                                        }
                                                    />
                                                )}
                                            </TableCell>

                                            <TableCell>{item?.remark}</TableCell>





                                            <TableCell>
                                                <Tooltip title="Edit">
                                                    <img
                                                        style={{ width: '20px', marginRight: '1rem' }}
                                                        onClick={() => handleEdit(item)}
                                                        src={Edit}
                                                        alt="Edit"
                                                    />
                                                </Tooltip>

                                                <Tooltip title="Delete">
                                                    <img
                                                        onClick={() => handleDelete(item?.id)}
                                                        src={Delete}
                                                        alt="Delete"
                                                        style={{ width: '20px' }} />
                                                </Tooltip>

                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>

                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        count={isData.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        rowsPerPageOptions={[50, 100, 200]}
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
                </div>
            </div>
            {loader && <LoadingSpinner1 />}
        </>
    );
}
