import React, { useEffect, useState, useRef } from 'react'

import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Button, TableHead } from '@mui/material';
import Box from '@mui/material/Box';
import Moment from 'moment-js';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useReactToPrint } from 'react-to-print';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import moment from 'moment';
import Edit from '../../../../assets/Edit.png';
import Delete from '../../../../assets/Delete.png';
import Print from '../../../../assets/Print.png';
import ExportPdf from '../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../assets/ExportExcel.png';
import '../Bhojnayalay.css'
import Add from './Add'
import { serverInstance } from '../../../../API/ServerInstance';
import BhojnayalayTab from '../BhojnayalayTab';



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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,

    color: '#FDC99C',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',

    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    zIndex: 2,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    left: '11px',
    bottom: '0px',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        height: '17px',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Bhojnayalay = ({ setopendashboard }) => {


    const componentRef = useRef();

    const [datefrom, setdatefrom] = useState('')
    const [dateto, setdateto] = useState('')
    const [openDelete, setOpenDelete] = useState(false)
    const [isData, setIsData] = useState('')
    const [deleteId, setDeleteId] = useState('')
    const [open, setOpen] = useState(false)
    const [updatedata, setupdatedata] = useState('')
    const [openEdit, setOpenEdit] = useState(false)

    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [page, setPage] = useState(0);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = (id) => {
        setDeleteId(id);
        setOpenDelete(true)
    }

    const handleDeleteClose = () => {

        setOpenDelete(false)
    }

    const handleCallback = () => {
        getBhojnalay()
    }

    const handleEdit = (item) => {
        setupdatedata(item);
        setOpenEdit(true)
    }

    const closeEdit = () => {
        setOpenEdit(false)
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 50));

        setPage(0);
    };


    const getBhojnalay = async () => {
        try {
            const res = await serverInstance('user/get-currentOrder', 'get')
            setIsData(res.data)

        } catch (err) {
            console.log(err)
        }
    }

    const deleteBhojnalay = async () => {
        try {
            const res = await serverInstance(`user/delete-bhojnalay?id=${deleteId}`, 'delete')
            if (res.status) {
                handleDeleteClose()
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setopendashboard(true)

        getBhojnalay();
    }, [openDelete, openEdit])


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
                    <Button onClick={deleteBhojnalay} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

            <BhojnayalayTab setopendashboard={setopendashboard} />

            <div className='dashboarddiv' style={{ marginTop: '-0.5rem' }} >


                <div>
                    <div
                        className="search-header "
                        style={{ paddingLeft: '1.5%', paddingRight: '1.3rem' }}
                    >
                        <div className="search-inner-div-reports"></div>
                        <form className="search-inner-div-reports">
                            <div className="Center_main_dic_filetr">
                                <label htmlFor="donation-date">From Date</label>
                                <input
                                    id="donation-date"
                                    style={{ width: '100%' }}
                                    type="date"
                                    placeholder="From"
                                    value={datefrom}
                                    name="datefrom"
                                    onChange={(e) => {
                                        setdatefrom(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="Center_main_dic_filetr">
                                <label htmlFor="donation-date">To Date</label>
                                <input
                                    id="donation-date"
                                    style={{ width: '100%' }}
                                    type="date"
                                    placeholder="From"
                                    value={dateto}
                                    name="dateto"
                                    onChange={(e) => {
                                        setdateto(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="Center_main_dic_filetr">
                                <label>&nbsp;</label>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}

                                    />
                                </Search>
                            </div>

                            <div className="Center_main_dic_filetr">
                                <label>&nbsp;</label>
                                <button>Search</button>
                            </div>
                            <div className="Center_main_dic_filetr">
                                <label>&nbsp;</label>
                                <button onClick={() => getall_donation()}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>

                <hr />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div>
                        <Button

                            onClick={handleOpen}
                            sx={{

                                marginRight: '1rem',
                                borderRadius: '0.5rem',
                                color: 'black',
                                width: '10vw',
                                backgroundColor: '#fcbb82',

                                ":hover": {
                                    bgcolor: '#f2ad6f'
                                }
                            }}>
                            Add Bhojnalay
                        </Button>
                    </div>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openEdit ? openEdit : open}
                        onClose={openEdit ? closeEdit : handleClose}
                        closeAfterTransition
                    >
                        <Fade in={openEdit ? openEdit : open}>
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
                                <Add closeEdit={closeEdit} setOpen={setOpen} handleCallback={handleCallback} openEdit={openEdit} updatedata={updatedata} />
                            </Box>
                        </Fade>
                    </Modal>

                    <div
                        className="search-header-print"
                        style={{
                            paddingRight: '1.5%',

                            paddingLeft: '1.5%',
                        }}
                    >
                        <div
                            className="search-header-print"
                            style={{

                                width: '100%',

                                paddingTop: '1%',
                            }}
                        >
                            <Tooltip title="Export Excel File">
                                <IconButton>
                                    <img
                                        onClick={() => ExportToExcel()}
                                        src={ExportExcel}
                                        alt="cc"
                                        style={{ width: '30px', marginLeft: '0rem' }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Export Pdf File">
                                <IconButton>
                                    <img
                                        onClick={() => ExportPdfmanul(isData, 'Report')}
                                        src={ExportPdf}
                                        alt="cc"
                                        style={{ width: '30px' }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Print Report">
                                <IconButton>
                                    <img
                                        style={{ width: '30px' }}
                                        onClick={handlePrint}
                                        src={Print}
                                        alt=" Print"
                                    />
                                </IconButton>
                            </Tooltip>
                            &nbsp;&nbsp;
                        </div>
                    </div>
                </div>

                <hr />

                <div ref={componentRef}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S. No.</TableCell>
                                <TableCell>Receipt No.</TableCell>
                                <TableCell>Date Of Booking</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Mobile No.</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>No. Of Person</TableCell>
                                <TableCell>Total Amount</TableCell>
                                <TableCell>Remark</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {isData && isData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item?.ReceiptNo}</TableCell>
                                    <TableCell>{moment(item?.DateOfBooking).format("DD/MM/YYYY")}</TableCell>
                                    <TableCell>{item?.Time}</TableCell>
                                    <TableCell>{item?.Name}</TableCell>
                                    <TableCell>{item?.MobileNo}</TableCell>
                                    <TableCell>{item?.Type}</TableCell>
                                    <TableCell>{item?.NoOfPerson}</TableCell>
                                    <TableCell>{item?.TotalAmount}</TableCell>
                                    <TableCell>{item?.Remark}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit">

                                            <img
                                                onClick={() => handleEdit(item)}
                                                src={Edit}
                                                alt="Edit"

                                                style={{ width: '20px', marginRight: '0.5rem' }}
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
                            ))}
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
        </>

    )
}

export default Bhojnayalay