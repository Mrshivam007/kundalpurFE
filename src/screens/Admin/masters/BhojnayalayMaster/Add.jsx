import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import { backendApiUrl } from '../../../../config/config';
import { ReactTransliterate } from 'react-transliterate';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    Box,

} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import '../TrustRegistrationMaster/Form.css';

import { serverInstance } from '../../../../API/ServerInstance';



export const CustomInput = styled(InputBase)(({ theme }) => ({
    width: '37.2rem',
    fontFamily: 'Poppins',
    backgroundColor: '#fff',
    borderRadius: 6,
    '& .MuiInputBase-input': {
        border: '1px solid #B8B8B8',
        borderRadius: 6,
        width: '100%',
        fontSize: 15,
        padding: 8,
        paddingLeft: 12,
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));
function BhojnayalayMasters({ setOpen, updatedata }) {

    const [type, setType] = useState('')
    const [price, setPrice] = useState('')
    const [showloader, setshowloader] = useState(false);
    const [remark, setRemark] = useState('')



    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            setshowloader(true);

            const data = {
                type: type,
                price: price,
                remark:remark

            };

            serverInstance('admin/add-bhojnalayHead', 'post', data).then((res) => {
                console.log(res)
                if (res.data) {
                    setOpen(false);
                    setshowloader(false);
                    Swal.fire('Great!', res.msg, 'success');
                }
                if (res.data === false) {
                    setOpen(false);
                    setshowloader(false);
                    Swal.fire('Error', res.msg, 'error');
                }
            })


        } catch (error) {
            Swal.fire('Error!', error, 'error');
        }
    };



    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    my: 2,
                    ml: 2,
                }}
            >

            </Box>
            <div>
                <div>
                    <form onSubmit={handlesubmit}>
                        <div className="form-div" style={{ marginBottom: '1rem' }}>
                            <div className="form-input-div_add_user">
                                <div className="inner-input-div2">
                                    <label
                                        style={{ marginBottom: '0.3rem' }}
                                        htmlFor="categoryname"
                                    >
                                        Type
                                    </label>
                                    <CustomInput
                                        required
                                        id="type"
                                        name="type"
                                        placeholder="Enter Type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="form-div" style={{ marginBottom: '1rem' }}>
                            <div className="inner-input-div2">
                                <label
                                    style={{ marginBottom: '0.3rem' }}
                                    htmlFor="categoryname"
                                >
                                    Price
                                </label>
                                <CustomInput
                                    required
                                    id="type"
                                    name="type"
                                    placeholder="Enter Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-div" style={{ marginBottom: '1rem' }}>
                            <div className="inner-input-div2">
                                <label
                                    style={{ marginBottom: '0.3rem' }}
                                    htmlFor="categoryname"
                                >
                                    Remark
                                </label>
                                <CustomInput
                                    required
                                    id="type"
                                    name="type"
                                    placeholder="Enter Remark"
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="save-div-btn">
                            <button className="save-div-btn-btn">
                                Save
                            </button>
                            <button
                                type='button'
                                onClick={() => setOpen(false)}
                                className="save-div-btn-btn-cancel"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default BhojnayalayMasters;
