import React  , {useState} from 'react'
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';

const style = {
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

const Add = () => {
    

    const [open , setOpen]  = useState(false)




  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    return (
        <div className='mainContainer' style={{margin:'2rem' , display:'flex' , justifyContent:'flex-end'}}>


            <button id="srcbtn" onClick={handleOpen}>
                +Add
            </button>

            <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <div>
              <form >
                <div className="add-div-close-div">
                  <h2 clssName="add_text_only">Add New User</h2>
                  <CloseIcon onClick={() => handleClose()} />
                </div>

                <div className="flex_div_main_add_user">
                  <div className="main-input-div1">
                    <div className="inner-input-divadd">
                      <label htmlFor="name">Full name</label>
                      <input
                        id="name"
                        text="text"
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                      />
                    </div>
                    <div className="inner-input-divadd">
                      <label htmlFor="phone">User Type</label>
                      <input
                        type="text"
                        id="phone"
                        required
                        name="phone"
                        
                      />
                    </div>
                    
                  </div>
                  <div className="main-input-div1">
                    <div className="inner-input-divadd">
                      <label htmlFor="email">Email</label>
                      <input
                        text="text"
                        id="email"
                        required
                        name="email"
                     
                      />

                      
                    </div>

                    <div className="inner-input-divadd">
                      <label htmlFor="password">Password</label>
                      <input
                        text="password"
                        id="password"
                        required
                        name="password"
                       
                      />
                    </div>
                  </div>
                </div>

                <div className="save-div-btn">
                  <button className="save-div-btn-btn" >
                    
                      Add User
                
                  </button>
                  <button
                    onClick={() => handleClose()}
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

export default Add