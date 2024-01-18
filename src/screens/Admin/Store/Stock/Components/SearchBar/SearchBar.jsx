import React, { useState, useEffect } from 'react';
import Print from '../../../../../../assets/Print.png';
import ExportPdf from '../../../../../../assets/ExportPdf.png';
import ExportExcel from '../../../../../../assets/ExportExcel.png';
import { Tooltip, IconButton, Autocomplete, TextField, Button } from '@mui/material';
import { serverInstance } from '../../../../../../API/ServerInstance';



const SearchBar = ({ data, getStock, handlePrint }) => {

    const [deptCode, setDeptCode] = useState('');
    const [deptList, setDeptList] = useState([]);
    const [itemName, setItemName] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemList, setItemList] = useState([]);

    const getItem = async () => {
        try {
            const res = await serverInstance('admin/get-Item', 'get');
            setItemList(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getDept = async () => {
        try {
            const res = await serverInstance('admin/get-Department', 'get');
            setDeptList(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleReset = () => {
        getStock(data);
        setDeptCode('');
        setItemName('');
        setSelectedItems([]);
    };

    const handleSearch = () => {
        const filteredData = data.filter((item) => {
            const itemNameIncluded = selectedItems.some(
                (selectedItem) =>
                    item.ItemName.toLowerCase().includes(selectedItem.itemNameEnglish.toLowerCase())
            );

            return (
                itemNameIncluded &&
                item.DepartmentCode.toLowerCase().includes(deptCode.toLowerCase())
            );
        });
        getStock(filteredData);
    };


    useEffect(() => {
        getDept();
        getItem();
    }, []);

    return (
        <div style={{ display: 'flex', marginTop: '-2rem', alignItems: 'center' }}>
            <div className="selecttabcontainer1">
                <Autocomplete
                    sx={{
                        width: '18%',

                    }}
                    value={deptList.find((item) => item.department_code === deptCode) || null}
                    onChange={(_, newValue) => setDeptCode(newValue ? newValue.department_code : '')}
                    options={deptList}
                    getOptionLabel={(option) => option.department_code || ''}
                    isOptionEqualToValue={(option, value) => option.department_code === value.department_code}
                    renderInput={(params) => <TextField {...params} label="Select Department Code" size='small' />}
                />

                <Autocomplete
                    sx={{ width: '18%' }}
                    multiple
                    value={selectedItems}
                    onChange={(_, newValues) => setSelectedItems(newValues)}
                    options={itemList}
                    getOptionLabel={(option) => option.itemNameEnglish || ''}
                    isOptionEqualToValue={(option, value) =>
                        option.itemNameEnglish === value.itemNameEnglish
                    }
                    renderInput={(params) => <TextField {...params} label="Select Item" size='small' />}
                />

                <button id="srcbtn" onClick={handleSearch}>
                    Search
                </button>
                <button id="srcbtn" onClick={handleReset}>
                    Reset
                </button>
            </div>

            <div
                className="search-header-print"

            >
                <Tooltip title="Export Excel File">
                    <IconButton>
                        <img

                            src={ExportExcel}
                            alt="cc"
                            style={{ width: '30px', marginLeft: '0rem' }}
                        />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Export Pdf File">
                    <IconButton>
                        <img

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
            </div>
        </div>

    )
}

export default SearchBar