
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

import Swal from "sweetalert2";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { TablePagination, TableFooter, TextField } from "@mui/material";
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
import InventoryIcon from '@mui/icons-material/Inventory';
import Logo from '../../../../../../../assets/POPrintLogo.png';
import Edit from '../../../../../../../assets/Edit.png';
import { serverInstance } from "../../../../../../../API/ServerInstance";
import Issue from "../SearchBar/Issue";
import EditInventory from "../Add/EditInventory";

export default function TableComponent({ 
  isData, 
  componentRef, 
  getInventory,
  currentPage, 
  totalRecords, 
  limit, 
  onPageChange,
  loading 
}) {

  // const [isData, setIsData] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [openDelete, setOpenDelete] = useState(false)
  const [openStock, setOpenStock] = useState(false)
  const [stockData, setStockData] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(limit);
  const [page, setPage] = useState(0);
  const [InventoryItem, setInventoryItem] = useState('')
  const [returnQuantity, setReturnQuantity] = useState('');
  const [inventoryShow, setInventoryShow] = useState(false)
  const [updatedata, setupdatedata] = useState('')
  const [openEdit, setOpenEdit] = useState(false)

  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [sortedField, setSortedField] = useState(null); // Field being sorted
  const [sortedData, setSortedData] = useState(isData); // Sorted data

  // Sorting function
  const sortData = (data, field, order) => {
    return [...data].sort((a, b) => {
      const aValue = field === 'Date' ? moment(a[field]) : a[field];
      const bValue = field === 'Date' ? moment(b[field]) : b[field];

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (field) => {
    const isAsc = sortedField === field && sortOrder === 'asc';
    const newSortOrder = isAsc ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortedField(field);

    const sorted = sortData(isData, field, newSortOrder);
    setSortedData(sorted);
  };

  // Default sorting on mount
  useEffect(() => {
    const defaultSortedData = sortData(isData, sortedField, sortOrder);
    setSortedData(defaultSortedData);
  }, [isData, sortedField, sortOrder]);

  const handleChangePage = (event, newPage) => {
    // Material-UI pagination is 0-indexed, our API is 1-indexed
    onPageChange(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    onPageChange(1, newRowsPerPage); // Reset to first page with new limit
  };

  const handleDelete = (id) => {
    setOpenDelete(true);
    setDeleteId(id);
  }

  const handleDeleteClose = () => {
    setOpenDelete(false)
  }

  const handleEdit = (data) => {
    setOpenEdit(true);
    setupdatedata(data)
  };

  const closeEdit = () => {
    setOpenEdit(false)
  }

  const handleInventoryShow = (item) => {
    setInventoryShow(true)
    setReturnQuantity('')
    setInventoryItem(item)
  }

  const handleInventoryClose = () => {
    setInventoryShow(false);
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

  const handleReturnSubmit = async () => {
    if (returnQuantity > 0 && returnQuantity <= InventoryItem?.inventoryLists?.IssueQuantity) {
      // Transform the inventory data
      const transformedData = {
        ...InventoryItem,
        Date: moment().format('YYYY-MM-DD'), // Set the current date
        Time: moment().format('HH:mm'), // Set the current time
        inventory_list: [
          {
            MaterialName: InventoryItem?.inventoryLists?.MaterialName,
            MaterialCode: InventoryItem?.inventoryLists?.MaterialCode,
            UOM: InventoryItem?.inventoryLists?.UOM,
            IssueQuantity: null,
            Quantity: '0', // Use the entered return quantity
            ReturnQuantity: returnQuantity,
            StockQuantity: InventoryItem?.inventoryLists?.IssueQuantity - returnQuantity, // Adjust stock quantity
            DepartmentCode: InventoryItem?.ToDepartmentCode, // Department where the item is returned
            DepartmentName: InventoryItem?.ToDepartmentName, // Department where the item is returned
            // CurrentQuantity: InventoryItem?.inventoryLists?.Quantity - returnQuantity, // Adjust current quantity
          },
        ],
      };

      try {
        // Send the transformed data to the server
        const res = await serverInstance('store/add-Inventory', 'post', transformedData);
        console.log(res);

        if (res.status) {
          getInventory(); // Fetch updated inventory
          close(); // Close the dialog or modal
          setInventoryShow(false); // Hide the inventory show state
          Swal.fire('Great', 'Quantity has been Adjusted', 'success');
        } else {
          Swal.fire('Error!', "Quantity Didn't Update", 'error');
        }
      } catch (error) {
        console.error(error);
        Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
      }
    } else {
      Swal.fire('Invalid return quantity');
    }
  };



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

      <EditInventory updatedata={updatedata} closeEdit={closeEdit} openEdit={openEdit} />

      {/* {inventoryShow && <Issue inventoryItem={InventoryItem} onClose={handleInventoryClose} inventoryShow={inventoryShow} />} */}

      <Dialog open={inventoryShow} onClose={() => setInventoryShow(false)}>
        <DialogTitle>Purchase Issue Return</DialogTitle>
        <DialogContent>
          {InventoryItem && (
            <>
              <TextField
                label="Item Code"
                value={InventoryItem?.inventoryLists?.MaterialCode}
                fullWidth
                disabled
                sx={{ marginBottom: '10px', marginTop: '10px' }}
              />
              <TextField
                label="Item Name"
                value={InventoryItem?.inventoryLists?.MaterialName}
                fullWidth
                disabled
                sx={{ marginBottom: '10px' }}
              />
              <TextField
                label="Issue Quantity"
                value={InventoryItem?.inventoryLists?.IssueQuantity}
                fullWidth
                disabled
                sx={{ marginBottom: '10px' }}
              />
              <TextField
                label="Return Quantity"
                type="number"
                value={returnQuantity}
                onChange={(e) => {
                  let value = e.target.value;

                  // Ensure returnQuantity is not negative
                  if (value < 0) {
                    value = 0;
                  }

                  // Ensure returnQuantity does not exceed IssueQuantity
                  if (value > InventoryItem?.inventoryLists?.IssueQuantity) {
                    value = InventoryItem?.inventoryLists?.IssueQuantity;
                  }

                  setReturnQuantity(value);
                }}
                fullWidth
                sx={{ marginBottom: '10px' }}
              />
            </>

          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInventoryShow(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleReturnSubmit()}
            color="primary"
            disabled={returnQuantity <= 0 || returnQuantity > InventoryItem?.inventoryLists?.IssueQuantity}
          >
            Submit Return
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
              <TableCell
                onClick={() => handleSort('Date')}
                style={{ cursor: 'pointer' }}
              >
                Date {sortedField === 'Date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableCell>
              <TableCell>Item Code</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Dept Code</TableCell>
              <TableCell>Dept Name</TableCell>
              <TableCell>Supp Code</TableCell>
              <TableCell>Supp Name</TableCell>
              <TableCell>Issue Person Name</TableCell>
              <TableCell>Issue Challan No</TableCell>
              <TableCell>Gate Entry No</TableCell>
              <TableCell>Bill No</TableCell>
              <TableCell>Challan No</TableCell>
              <TableCell>UOM</TableCell>
              <TableCell>Purchase Qty</TableCell>
              <TableCell>Opening Stock</TableCell>
              <TableCell>Issue Qty</TableCell>
              <TableCell>Issue Return Qty</TableCell>
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
            {sortedData &&
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, indexs) => (
                  <TableRow key={indexs}>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{indexs + 1}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{moment(item?.Date).format("DD/MM/YYYY")}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.inventoryLists?.MaterialCode}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.inventoryLists?.MaterialName}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>
                      {item?.FromDepartmentCode}
                      {item?.inventoryLists?.ReturnQuantity !== null
                        ? ' <--- ' + item?.ToDepartmentCode
                        : item?.ToDepartmentCode
                          ? ' ---> ' + item?.ToDepartmentCode
                          : ''}
                    </TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>
                      {item?.FromDepartmentName}
                      {item?.inventoryLists?.ReturnQuantity !== null
                        ? ' <--- ' + item?.ToDepartmentName
                        : item?.ToDepartmentName
                          ? ' ---> ' + item?.ToDepartmentName
                          : ''}
                    </TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.SupplierCode}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.SupplierName}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.StaffName}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.IssueChallanNo}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.gateEntryNo}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.billNo}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.challanNo}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.inventoryLists?.UOM}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.inventoryLists?.Quantity}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.inventoryLists?.OpeningStock}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.inventoryLists?.IssueQuantity}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.inventoryLists?.ReturnQuantity}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.inventoryLists?.AdjustStock}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.inventoryLists?.Amount}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.ADDED_BY}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>{item?.Remark}</TableCell>
                    <TableCell style={{padding: "4px 6px 4px 6px"}}>

                      <Tooltip title="Edit">
                        <img
                          onClick={() => handleEdit(item)}
                          src={Edit}
                          alt="Edit"
                          style={{ width: '20px', marginRight: '0.5rem' }}
                        />
                      </Tooltip>

                      <Tooltip title="Delete Inventory">
                        <img
                          onClick={() => handleDelete(item?.id)}
                          src={Delete}
                          alt="Delete"
                          style={{ width: '20px' }}
                        />
                      </Tooltip>
                      {item.StaffName && item?.inventoryLists?.IssueQuantity !== null && (
                        <Tooltip title="Purchase Issue Return">
                          <InventoryIcon
                            style={{ width: '30px', marginRight: '0.8%' }}
                            onClick={() => handleInventoryShow(item)}
                            alt="PaymentIn"
                          />
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
          <TableFooter>
          <TableRow>
                <TablePagination
                  rowsPerPageOptions={[25, 50, 100]}
                  colSpan={12}
                  count={totalRecords}
                  rowsPerPage={rowsPerPage}
                  page={currentPage - 1} // Convert to 0-based index for MUI
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage={<span>Rows:</span>}
                  labelDisplayedRows={({ from, to, count }) => {
                    return `${from}-${to} of ${count}`;
                  }}
                  backIconButtonProps={{
                    color: 'secondary',
                  }}
                  nextIconButtonProps={{ color: 'secondary' }}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
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
