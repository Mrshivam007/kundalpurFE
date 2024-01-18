import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Fade, Box, Radio, RadioGroup, FormControlLabel, Input, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { CustomInputLabel, CustomInput } from '../../../../../Expense/common';
import { serverInstance } from '../../../../../../../API/ServerInstance';
import Swal from 'sweetalert2';
import RSelect from 'react-select';



const style = {
    width: '30%',
    height: 'auto',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    background: '#FFFFF',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
};

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
});

const Adjust = ({ stockData, open, close, getStock, isData, getInventory }) => {



    const [adjustmentType, setAdjustmentType] = useState('add');
    const [stockQuantity, setStockQuantity] = useState('')
    const [showQuantity, setShowQuantity] = useState('')
    const [quantity, setQuantity] = useState('')
    const [ID, setID] = useState('')
    const [invID, setInvID] = useState('')
    const [deptCode, setDeptCode] = useState('')
    const [openingQuantity, setOpeningQuantity] = useState('')
    const [deptName, setDeptName] = useState('')
    const [defaultAdjust, setDefaultAdjust] = useState('')


    const handleItemChange = (selectedOption) => {

        console.log(selectedOption?.data?.inventoryLists?.AdjustStock)
        setDefaultAdjust(selectedOption?.data?.inventoryLists?.AdjustStock)
        setShowQuantity(selectedOption?.data.inventoryLists.Quantity)
        setID(selectedOption?.data.inventoryLists?.id)
        setInvID(selectedOption?.data?.inventoryLists?.InventoryId)
        setDeptName(selectedOption?.data?.FromDepartmentName)
        setDeptCode(selectedOption?.data?.FromDepartmentCode)
        console.log('id', ID)
        console.log('InvId', invID)
    };

    const handleAdjustment = (e) => {
        e.preventDefault();
        const currentQuantity = parseInt(showQuantity, 10);
        const adjustedQuantity = parseInt(stockQuantity, 10);

        if (adjustmentType == 'add') {
            const newQuantity = Number(defaultAdjust) +Number(adjustedQuantity);

            handleAdjust(e, newQuantity)
            console.log(newQuantity)

        } else if (adjustmentType == 'reduce') {

            const newQuantity = defaultAdjust - adjustedQuantity;
            handleAdjust(e, newQuantity)

        }

    };

    const handleAdjust = async (e, newQuantity) => {
        try {

            console.log('api', quantity)
            const data = {
                id: invID,
                inventory_list: [
                    {
                        id: ID,
                        InventoryId: invID,
                        AdjustStock:  newQuantity ,
                        OpeningStock: openingQuantity
                    }
                ],

            }


            const res = await serverInstance('store/edit-Inventory', 'put', data)
            console.log(res)
            if (res.status) {
                getInventory();
                close()
                Swal.fire("Great", 'Quantity has been Adjusted', 'success')

            } if (res.status === false) {
                close()
                Swal.fire('Error!', "Quantity Didn't Update", 'error')
            }
        } catch (err) {
            Swal.fire('Error!', "Quantity Didn't Update", 'error')
            console.log(err)
        }

    }



    useEffect(() => {

    }, [isData])

    return (
        <ThemeProvider theme={theme}>
            <>
                <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={close}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3>Adjust Stock</h3>
                                        <CloseIcon onClick={close} />

                                    </div>
                                    <hr />

                                    <div style={{ marginTop: '1rem' }}>
                                        <span style={{ color: 'black' }}><b>ITEM NAME </b></span> <br />
                                        <RSelect

                                            placeholder="Select Item"
                                            className="selecttab"
                                            options={isData && isData.map((item) => ({
                                                label: item.inventoryLists?.MaterialName,
                                                value: item.inventoryLists?.MaterialName,
                                                data: item,
                                            }))}
                                            onChange={(selectedOption) => {
                                                handleItemChange(selectedOption);
                                                // displaySelectedItemDetails();
                                            }}
                                        />
                                        <div style={{ marginTop: '1rem', width: '50%' }}>
                                            <span style={{ color: 'black' }} ><b>DEPARTMENT NAME & CODE</b></span> <br />
                                            <CustomInput
                                                disabled
                                                type="text"
                                                placeholder="Department Name"
                                                value={`${deptName} (${deptCode})`}

                                            />
                                        </div>

                                        <div style={{ marginTop: '1rem' }}>
                                            <span><b>OPENING QUANTITY</b></span> <br />
                                            <div style={{ display: 'flex' }}>

                                                <CustomInput
                                                    required
                                                    type="text"
                                                    placeholder="Enter Opening Quantity"
                                                    value={openingQuantity}
                                                    onChange={(e) => setOpeningQuantity(e.target.value)}
                                                />

                                            </div>

                                        </div>
                                        <div style={{ marginTop: '2rem' }}>
                                            <span><b>ADD OR REDUCE STOCK</b></span>
                                            <RadioGroup
                                                row
                                                aria-label="add-reduce"
                                                name="add-reduce"
                                                value={adjustmentType}
                                                onChange={(e) => setAdjustmentType(e.target.value)}
                                            >
                                                <FormControlLabel
                                                    value="add"
                                                    control={<Radio color="primary" />}
                                                    label="Add"
                                                />
                                                <FormControlLabel
                                                    value="reduce"
                                                    control={<Radio color="primary" />}
                                                    label="Reduce"
                                                />
                                            </RadioGroup>
                                        </div>
                                        <div style={{ marginTop: '1rem' }}>
                                            <span><b>CURRENT STOCK QUANTITY</b></span><br />
                                            <span>{showQuantity}</span>
                                        </div>
                                        <form onSubmit={handleAdjustment}>
                                            <div style={{ marginTop: '1rem' }}>
                                                <span><b>STOCK QUANTITY</b></span> <br />
                                                <div style={{ display: 'flex' }}>

                                                    <CustomInput
                                                        required
                                                        type="text"
                                                        placeholder="Enter Stock Quantity"
                                                        value={stockQuantity}
                                                        onChange={(e) => setStockQuantity(e.target.value)}
                                                    />

                                                </div>

                                            </div>
                                            <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-evenly' }}>
                                                <Button sx={{
                                                    color: 'white',
                                                    backgroundColor: '#1dad20',
                                                    width: '10rem',
                                                    '&:hover': {
                                                        backgroundColor: '#178a19'
                                                    }
                                                }}
                                                    type='submit'
                                                >Save</Button>

                                                <Button sx={{
                                                    color: 'white',
                                                    backgroundColor: 'grey',
                                                    width: '10rem',
                                                    '&:hover': {
                                                        backgroundColor: '#404240'
                                                    }
                                                }}
                                                    onClick={close}
                                                >Cancel</Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Box>
                        </Fade>
                    </Modal>
                </div>
            </>
        </ThemeProvider>
    );
};

export default Adjust;
