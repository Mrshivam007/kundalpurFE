import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2'
import './InventoryList.css'
import { serverInstance } from '../../../../../../../API/ServerInstance'
import { MenuItem, Select } from '@mui/material'

const EditInventory = ({ updatedata, closeEdit, openEdit }) => {

    function addItem() {
        setdbItems([
            ...dbitems,
            {
                quantity: 0,
                price: 0,
                discount: 0,
                GST: 0,
                total: 0,
            },
        ]);
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        background: '#FFFFF',
        borderRadius: '15px',
        boxShadow: 24,
        p: 4,

    };

    const [departmentList, setDepartmentList] = useState([])

    const [show, setShow] = useState(false)
    const [showloader, setshowloader] = useState(false);
    const [step, setStep] = useState(1)
    const [supList, setSupList] = useState([])
    const [supCode, setSupCode] = useState('')
    const [supName, setSupName] = useState('')
    const [purchaseReq, setPurchaseReq] = useState('');
    const [PONo, setPONo] = useState('')
    const [deptName, setDeptName] = useState('');
    const [deptCode, setDeptCode] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [contactNoStaff, setContactNoStaff] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [remark, setRemark] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('')
    const [PODate, setPODate] = useState('')
    const [dbitems, setdbItems] = useState([
        {
            itemNo: '',
            itemName: '',
            HSN: '',
            UOM: '',
            quantity: '',
            price: '',
            discount: '',
            GST: '',
            total: '',
        }
    ])

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [fromDeptCode, setFromDeptCode] = useState("");
    const [fromDeptName, setFromDeptName] = useState("");
    const [toDeptCode, setToDeptCode] = useState("");
    const [toDeptName, setToDeptName] = useState("");
    const [supplierCode, setSupplierCode] = useState("");
    const [supplierName, setSupplierName] = useState("");
    const [gateEntryNo, setGateEntryNo] = useState("");
    const [challanNo, setChallanNo] = useState("");
    const [billNo, setBillNo] = useState("");
    const [staffName, setStaffName] = useState("");
    const [inventoryList, setInventoryList] = useState([]);

    const [UOMList, setUOMList] = useState([])
    const [itemList, setItemList] = useState([])

    const handleDeptCodeChange = (e) => {
        const selectedName = e.target.value;
        setToDeptName(selectedName);

        const selectedDepartment = departmentList.find(item => item.departmentName === selectedName);

        if (selectedDepartment) {
            setToDeptCode(selectedDepartment.departmentCode);
        } else {
            setToDeptName('');
        }
    };
    const handelSupplierChange = (e) => {
        const selectedName = e.target.value;
        setSupplierName(selectedName);

        const selectedDepartment = supList.find(item => item.supplierName === selectedName);

        if (selectedDepartment) {
            setSupplierCode(selectedDepartment.id);
        } else {
            setSupName('');
        }
    };

    const handleItemChange = (e) => {
        const selectedName = e.target.value;
        setItems(selectedName);
    };



    const [items, setItems] = useState([
        {
            quantity: 0,
            price: 0,
            discount: 0,
            GST: 0,
            total: 0,
        },
    ]);

    const initialItem = {
        quantity: 0,
        price: 0,
        discount: 0,
        GST: 0,
        total: 0,
    };

    const [Items, setInitialItems] = useState([initialItem]);


    const [next, setNext] = useState(false)




    const handleCancel = () => {
        setItems([initialItem]);
    };

    const handleClose = () => {
        setShow(false);
        setNext(false);
        handleCancel();
        setTotalAmount(0);

    };

    const handleShow = () => {
        setStep(1);
        setShow(true);
        setNext(false);
    };


    const getDepartment = async () => {
        try {
            const res = await serverInstance('store/get-departmentMaster', 'get')

            setDepartmentList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getSupplier = async () => {
        try {
            const res = await serverInstance('store/get-supplierMaster', 'get')

            setSupList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getUOM = async () => {
        try {
            const res = await serverInstance('admin/get-UOM', 'get')

            setUOMList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getItem = async () => {
        try {
            const res = await serverInstance('store/get-itemMaster', 'get')

            setItemList(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }



    const handleUpdate = (e) => {
        e.preventDefault();

        try {

            console.log(dbitems)

            const data = {
                purchaseRequisitonNo: purchaseReq,
                purchaseOrderNo: PONo,
                supplierCode: supCode,
                supplierName: supName,
                departmentCode: deptCode,
                contactPerson: contactNoStaff,
                contactName: contactPerson,
                departmentName: deptName,
                address: address,
                state: state,
                city: city,
                pincode: pincode,
                purchaseOrderDate: date,
                deliveryDate: deliveryDate,
                mobileNo: contactNo,
                remark: remark,
                purchaseOrderList: dbitems,
                id: updatedata?.id

            }

            serverInstance('store/edit-purchaseOrder', 'put', data).then((res) => {
                if (res.status) {
                    closeEdit()
                    console.log(res)
                    Swal.fire('Great!', res.msg, 'success')
                }

                if (res.status === false) {
                    closeEdit()
                    Swal.fire('Error!', res?.msg, 'error')
                }
            })
        } catch (err) {
            Swal.fire('Error!', res?.msg, 'error')
            console.log(err)
        }
    }




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
    // var date = today.toISOString().substring(0, 10);


    useEffect(() => {

        getDepartment();
        getSupplier();
        getUOM();
        getItem();
        if (updatedata) {
            setDate(updatedata?.Date || "");
            setTime(updatedata?.Time || "");
            setFromDeptCode(updatedata?.FromDepartmentCode || "");
            setFromDeptName(updatedata?.FromDepartmentName || "");
            setToDeptCode(updatedata?.ToDepartmentCode || "");
            setToDeptName(updatedata?.ToDepartmentName || "");
            setSupplierCode(updatedata?.SupplierCode || "");
            setSupplierName(updatedata?.SupplierName || "");
            setGateEntryNo(updatedata?.gateEntryNo || "");
            setChallanNo(updatedata?.challanNo || "");
            setBillNo(updatedata?.billNo || "");
            setStaffName(updatedata?.StaffName || "");
            setRemark(updatedata?.Remark || "");
            setInventoryList(updatedata?.inventoryLists ? [updatedata.inventoryLists] : []);
        }

    }, [openEdit])

    const handleInventoryChange = (index, field, value) => {
        const updatedInventory = [...inventoryList];
        updatedInventory[index][field] = value;
        setInventoryList(updatedInventory);
    };

    const updateInventoryList = (index, field, value) => {
        setInventoryList((prev) =>
            prev.map((item, idx) =>
                idx === index ? { ...item, [field]: value } : item
            )
        );
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedInventoryData = {
            id: updatedata.id,
            Date: date,
            Time: time,
            FromDepartmentCode: fromDeptCode,
            FromDepartmentName: fromDeptName,
            ToDepartmentCode: toDeptCode,
            ToDepartmentName: toDeptName,
            SupplierCode: supplierCode,
            SupplierName: supplierName,
            gateEntryNo: gateEntryNo,
            challanNo: challanNo,
            billNo: billNo,
            StaffName: staffName,
            Remark: remark,
            inventory_list: inventoryList,
        };
        console.log("Updated Inventory:", updatedInventoryData);

        serverInstance('store/edit-inventory', 'put', updatedInventoryData).then((res) => {
            if (res.status) {
                closeEdit()
                console.log(res)
                Swal.fire('Great!', res.msg, 'success')
            }

            if (res.status === false) {
                closeEdit()
                Swal.fire('Error!', res?.msg, 'error')
            }
        })
        // Perform the API call to update the inventory
        closeEdit();
    };


    return (
        <div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openEdit}
                onClose={closeEdit}
            >
                <Fade in={openEdit}>
                    <Box sx={style}>
                        <div>



                            <form onSubmit={handleSubmit}>
                                <div className="add-div-close-div">

                                    <h2 clssName="add_text_only">Purchase Order</h2>


                                    <CloseIcon onClick={() => closeEdit()} />

                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>


                                    <Typography variant="body2" color="primary" align="right">
                                        {currDate} / {currTime}
                                    </Typography>

                                </div>

                                <div className="flex_div_main_add_user">
                                    <div className="main-input-div1">
                                        <div className="inner-input-divadd">
                                            <label htmlFor="date">Date</label>
                                            <input
                                                type="date"
                                                required
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                        <div className="inner-input-divadd">
                                            <label htmlFor="time">Time</label>
                                            <input
                                                type="text"
                                                required
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                            />
                                        </div>
                                        <div className="inner-input-divadd">
                                            <label htmlFor="fromDeptCode">From Department Code</label>
                                            <input
                                                type="text"
                                                value={fromDeptCode}
                                                onChange={(e) => setFromDeptCode(e.target.value)}
                                            />
                                        </div>
                                        <div className="inner-input-divadd">
                                            <label htmlFor="fromDeptName">From Department Name</label>
                                            <input
                                                type="text"
                                                value={fromDeptName}
                                                onChange={(e) => setFromDeptName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="main-input-div2">
                                        <div className="inner-input-divadd">
                                            <label htmlFor="toDeptCode">To Department Code</label>
                                            <input
                                                type="text"
                                                value={toDeptCode}
                                                disabled
                                                onChange={(e) => setToDeptCode(e.target.value)}
                                            />
                                        </div>
                                        <div className="inner-input-divadd">
                                            <label htmlFor="Tally Head">Department Name</label>
                                            <Select
                                                sx={{
                                                    width: '18rem',
                                                    height: '2rem',
                                                    borderRadius: '0.5rem',
                                                    fontSize: 14,
                                                    '& .MuiSelect-select': {
                                                        padding: '1px',
                                                    },
                                                }}
                                                value={toDeptName}
                                                onChange={handleDeptCodeChange}
                                                displayEmpty
                                            >
                                                <MenuItem disabled value="">
                                                    Select Department
                                                </MenuItem>

                                                {departmentList &&
                                                    departmentList?.map((item, index) => (
                                                        <MenuItem
                                                            sx={{
                                                                fontSize: 14,
                                                            }}
                                                            key={item.id}
                                                            value={item?.departmentName}
                                                        >
                                                            {item?.departmentName}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </div>
                                        <div className="inner-input-divadd">
                                            <label htmlFor="supplierCode">Supplier Code</label>
                                            <input
                                                type="text"
                                                required
                                                disabled
                                                value={supplierCode}
                                                onChange={(e) => setSupplierCode(e.target.value)}
                                            />
                                        </div>
                                        <div className="inner-input-divadd">
                                            <label htmlFor="Tally Head">Supplier Name</label>
                                            <Select
                                                sx={{
                                                    width: '18rem',
                                                    height: '2rem',
                                                    borderRadius: '0.5rem',
                                                    fontSize: 14,
                                                    '& .MuiSelect-select': {
                                                        padding: '1px',
                                                    },
                                                }}
                                                value={supplierName}
                                                onChange={handelSupplierChange}
                                                displayEmpty
                                            >
                                                <MenuItem disabled value="">
                                                    Select Supplier
                                                </MenuItem>

                                                {supList &&
                                                    supList?.map((item, index) => (
                                                        <MenuItem
                                                            sx={{
                                                                fontSize: 14,
                                                            }}
                                                            key={item.id}
                                                            value={item?.supplierName}
                                                        >
                                                            {item?.supplierName}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="main-input-div3">
                                        <div className="inner-input-divadd">
                                            <label htmlFor="gateEntryNo">Gate Entry No</label>
                                            <input
                                                type="text"
                                                value={gateEntryNo}
                                                onChange={(e) => setGateEntryNo(e.target.value)}
                                            />
                                        </div>
                                        <div className="inner-input-divadd">
                                            <label htmlFor="challanNo">Challan No</label>
                                            <input
                                                type="text"
                                                value={challanNo}
                                                onChange={(e) => setChallanNo(e.target.value)}
                                            />
                                        </div>
                                        <div className="inner-input-divadd">
                                            <label htmlFor="billNo">Bill No</label>
                                            <input
                                                type="text"
                                                value={billNo}
                                                onChange={(e) => setBillNo(e.target.value)}
                                            />
                                        </div>
                                        <div className="inner-input-divadd">
                                            <label htmlFor="staffName">Staff Name</label>
                                            <input
                                                type="text"
                                                value={staffName}
                                                onChange={(e) => setStaffName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="main-input-div4">
                                        <div className="inner-input-divadd">
                                            <label htmlFor="remark">Remark</label>
                                            <input
                                                type="text"
                                                value={remark}
                                                onChange={(e) => setRemark(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>


                                <div className="inventory-list-section">
                                    <h3>Inventory List</h3>
                                    {inventoryList.map((item, index) => (
                                        <div key={index} className="inventory-item-row">
                                            <div className="inventory-item-field">
                                            <label htmlFor={`materialName-${index}`}>Item Name</label>
                                                <input
                                                    type="text"
                                                    id={`materialName-${index}`}
                                                    value={item.MaterialName || ""}
                                                    disabled
                                                    onChange={(e) =>
                                                        updateInventoryList(index, "MaterialName", e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="inventory-item-field">
                                                <label htmlFor={`uom-${index}`}>UOM</label>
                                                <input
                                                    type="text"
                                                    id={`uom-${index}`}
                                                    value={item.UOM || ""}
                                                    onChange={(e) =>
                                                        updateInventoryList(index, "UOM", e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="inventory-item-field">
                                                <label htmlFor={`openingStock-${index}`}>Opening Stock</label>
                                                <input
                                                    type="number"
                                                    id={`openingStock-${index}`}
                                                    value={item.OpeningStock || ""}
                                                    onChange={(e) =>
                                                        updateInventoryList(index, "OpeningStock", e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="inventory-item-field">
                                                <label htmlFor={`adjustStock-${index}`}>Current Stock</label>
                                                <input
                                                    type="number"
                                                    id={`adjustStock-${index}`}
                                                    value={item.AdjustStock || ""}
                                                    onChange={(e) =>
                                                        updateInventoryList(index, "AdjustStock", e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="inventory-item-field">
                                                <label htmlFor={`quantity-${index}`}>Quantity</label>
                                                <input
                                                    type="number"
                                                    id={`quantity-${index}`}
                                                    value={item.Quantity || ""}
                                                    onChange={(e) =>
                                                        updateInventoryList(index, "Quantity", e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="inventory-item-field">
                                                <label htmlFor={`issueQuantity-${index}`}>Issue Quantity</label>
                                                <input
                                                    type="number"
                                                    id={`issueQuantity-${index}`}
                                                    value={item.IssueQuantity || ""}
                                                    onChange={(e) =>
                                                        updateInventoryList(index, "IssueQuantity", e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="inventory-item-field">
                                                <label htmlFor={`returnQuantity-${index}`}>Return Quantity</label>
                                                <input
                                                    type="number"
                                                    id={`returnQuantity-${index}`}
                                                    value={item.ReturnQuantity || ""}
                                                    onChange={(e) =>
                                                        updateInventoryList(index, "ReturnQuantity", e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className="inventory-item-field">
                                                <label htmlFor={`returnQuantity-${index}`}>Total Amount</label>
                                                <input
                                                    type="number"
                                                    id={`returnQuantity-${index}`}
                                                    value={item.Amount || ""}
                                                    onChange={(e) =>
                                                        updateInventoryList(index, "Amount", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>


                                <div className="save-div-btn" style={{ marginTop: '5%' }}>
                                    <button className="save-div-btn-btn"
                                        style={{ cursor: 'pointer' }}

                                    >
                                        {showloader ? (
                                            <CircularProgress
                                                style={{
                                                    width: '21px',
                                                    height: '21px',
                                                    color: '#FE7600',
                                                }}
                                            />
                                        ) : (
                                            'Update'
                                        )}
                                    </button>
                                    <button
                                        type='button'
                                        onClick={closeEdit}
                                        className="save-div-btn-btn-cancel"
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </form>


                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default EditInventory