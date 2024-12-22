
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

import Swal from "sweetalert2";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TablePagination, TableFooter } from "@mui/material";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import { Button } from "@mui/material";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Delete from '../../../../../../../assets/Delete.png';
import { Tooltip } from "@mui/material";
import Logo from '../../../../../../../assets/POPrintLogo.png';
import { serverInstance } from "../../../../../../../API/ServerInstance";

export default function Tabl({ isData, getInventory , componentRef }) {

  // const [isData, setIsData] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  const [openStock, setOpenStock] = useState(false)
  const [stockData, setStockData] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [InventoryItem, setInventoryItem] = useState('')
  const [inventoryShow, setInventoryShow] = useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 25));

    setPage(0);
  };

  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  const handleStock = (item) => {
    setOpenStock(true);
    setStockData({
      ...item,
      DepartmentCode: (item?.ToDepartmentCode ? item?.ToDepartmentCode : item?.FromDepartmentCode),
      DepartmentName: (item?.ToDepartmentName ? item?.ToDepartmentName : item?.FromDepartmentName),
      ItemCode: item?.inventoryLists?.MaterialCode,
      ItemName: item?.inventoryLists?.MaterialName,
      Quantity: item?.inventoryLists?.Quantity,
      UOM: item?.inventoryLists?.UOM
    });
  };

  const handleStockClose = () => {
    setOpenStock(false)
  }

  const sendStock = async () => {
    try {
      const res = await serverInstance('store/add-stock', 'post', stockData)
      handleStockClose();
      console.log(res)
      Swal.fire('Great!', 'Item sent to Stock', 'success')
    } catch (err) {
      Swal.fire('Error!', 'Item not sent to Stock', 'error')
    }
  }


  const deleteInventory = () => {

    try {

      serverInstance(`store/delete-inventory?id=${deleteId}`, 'delete').then((res) => {
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

  useEffect(() => {
    getInventory()
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
          <Button onClick={deleteInventory} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      
      <Dialog
        open={openStock}
        onClose={handleStockClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to send this item to Stock?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After agreeing you can see the item in Stock.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStockClose}
            sx={{
              backgroundColor: '#eb2f2f',
              color: 'white',
              '&:hover': {
                backgroundColor: '#c91212'
              }
            }}
          >Disagree</Button>
          <Button onClick={sendStock}
            sx={{
              backgroundColor: '#11d933',
              color: 'white',
              '&:hover': {
                backgroundColor: '#0fb82b'
              }
            }}
            autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <div className="wrapper_abc" ref={componentRef}>
      <div className="print-header">
                                <div className="main_po_1">
                                    <div className='headerPay'>
                                        <div className="main_po_2">
                                            <h4 style={{ textAlign: "center" }}><u>Inventory</u></h4>
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
                                                कुण्डलपुर ,470772,(म.प्र.)
                                            </h5>
                                        </p>
                                    </div>
                                </div>
                </div>
        <Table>
          <TableHead>
            <TableRow>

              <TableCell>Sn</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Item Code</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Department Code</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Supplier Code</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Issue Person Name</TableCell>
              <TableCell>Issue Challan No</TableCell>
              <TableCell>Bill No</TableCell>
              <TableCell>Challan No</TableCell>
              <TableCell>Issue Quantity</TableCell>
              <TableCell>UOM</TableCell>
              <TableCell>Purchase Quantity</TableCell>
              <TableCell>Opening Stock</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Added By</TableCell>
              <TableCell>Remark</TableCell>

              <TableCell className="sticky-col first-col" id="acts">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              isData && isData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((item, indexs) => (
                <TableRow key={indexs}>
                  <TableCell>{indexs + 1}</TableCell>
                  <TableCell>{moment(item?.Date).format("DD/MM/YYYY")}</TableCell>
                  <TableCell>{item?.Time}</TableCell>
                  <TableCell>{item?.inventoryLists?.MaterialCode}</TableCell>
                  <TableCell>{item?.inventoryLists?.MaterialName}</TableCell>
                  <TableCell>{item?.FromDepartmentCode}{item?.ToDepartmentCode ? '---> ' + (item?.ToDepartmentCode) : ''}</TableCell>
                  <TableCell>{item?.FromDepartmentName} {item?.ToDepartmentName ? '---> ' + (item?.ToDepartmentName) : ''}</TableCell>
                  <TableCell>{item?.SupplierCode}</TableCell>
                  <TableCell>{item?.SupplierName}</TableCell>
                  <TableCell>{item?.StaffName}</TableCell>
                  <TableCell>{item?.IssueChallanNo}</TableCell>
                  <TableCell>{item?.billNo}</TableCell>
                  <TableCell>{item?.challanNo}</TableCell>
                  <TableCell>{item?.inventoryLists?.IssueQuantity}</TableCell>
                  <TableCell>{item?.inventoryLists?.UOM}</TableCell>
                  <TableCell>{item?.inventoryLists?.Quantity}</TableCell>
                  <TableCell>{item?.inventoryLists?.OpeningStock}</TableCell>
                  <TableCell>{item?.inventoryLists?.AdjustStock}</TableCell>
                  <TableCell>{item?.inventoryLists?.Amount}</TableCell>
                  <TableCell>{item?.ADDED_BY}</TableCell>
                  <TableCell>{item?.Remark}</TableCell>
                  <TableCell>

                    <Tooltip title="Delete All In Same PO">
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
                count={isData.length}
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
      <style jsx="true">{`
                /* Hide header on the webpage */
                .print-header {
                    display: none;
                }

                /* Show the header only when printing */
                @media print {
                    .print-header {
                        display: block;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                }
            `}</style>
    </>
  );
}
