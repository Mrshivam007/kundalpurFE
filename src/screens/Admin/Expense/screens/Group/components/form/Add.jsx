import React, { useState } from 'react'

import { Create_Expense } from './Create_Expense';

import { Modal, Fade } from '@mui/material'
import { Box, Button } from '@mui/material';

const Add = ({ setopendashboard, refreshTable, openEdit,closeEdit,updateData }) => {

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


    const [open, setOpen] = useState(false)



    const handleShow = () => {
        setOpen(true);

    }

    

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            {!openEdit && <Button variant="primary" onClick={handleShow} className="btn"
                sx={{

                    marginRight: '1rem',
                    borderRadius: '0.5rem',
                    color: 'black',
                    width: '10vw',
                    backgroundColor: '#fcbb82',

                    ":hover": {
                        bgcolor: '#f2ad6f'
                    }
                }}
            >
                +Add
            </Button>}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openEdit?true:open}
                onClose={openEdit?false:handleClose}
                closeAfterTransition
            >
                <Fade in={openEdit?true:open}>
                    <Box
                        sx={{
                            ...style,
                            width: {
                                xs: '80%',
                                sm: '80%',
                                md: '80%',
                            },
                        }}
                    >
                        <Create_Expense
                            refreshTable={refreshTable}
                            setopendashboard={setopendashboard}
                            handleClose={handleClose}
                            themeColor='#cc0066'
                            closeEdit={closeEdit}
openEdit={openEdit}
updateData={updateData}
                        />
                    </Box>
                </Fade>
            </Modal>




        </div>
    )
}

export default Add