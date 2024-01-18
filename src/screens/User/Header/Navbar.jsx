import React, { useState, useEffect } from 'react';
import style from './Navbar.module.css';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { secondaryColor } from '../../../utils/colorVariables';
import { NavLink, useNavigate } from 'react-router-dom';
import { backendUrl, backendApiUrl } from '../../../config/config';
import { useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Logout from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import UploadIcon from '@mui/icons-material/Upload';
import { loadUser } from '../../../Redux/redux/action/AuthAction';
import Logo from '../../../assets/croppedlogo.png';
const Navbar = ({ showRoomOptions }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMobile, setisMobile] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [profileimg, setprofileimg] = useState('');

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { user } = useSelector((state) => state.userReducer);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    dispatch(loadUser());
  }, [isMobile, token, profileimg]);

  const logout = () => {
    handleClose();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userrole');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  let userrole = sessionStorage.getItem('userrole');
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <Avatar /> Profile
        </MenuItem>

        <MenuItem onClick={() => navigate('/changepassword')}>
          <ListItemIcon>
            <LockOpenIcon fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem onClick={() => navigate('/donationhistory')}>
          <ListItemIcon>
            <VolunteerActivismIcon fontSize="small" />
          </ListItemIcon>
          Donation History
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BookmarkAddedIcon fontSize="small" />
          </ListItemIcon>
          Room Booking History
        </MenuItem>

        <Divider />
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <nav className={style.navbar}>
        <NavLink to="/">
          <div className={style.logo}>
            <img src={Logo} alt=" Logo" />
          </div>
        </NavLink>

        <ul
          className={isMobile ? style.mobilelinks : style.navlinks}
          onClick={() => setisMobile(false)}
        >
          {showRoomOptions ? (
            <>
              <li>
                <NavLink
                  to="/roombooking/servicesandfacilities"
                  className={({ isActive }) =>
                    isActive ? style.active : style.about
                  }
                >
                  Services & Facilities
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/roombooking/theaccommodation"
                  className={({ isActive }) =>
                    isActive ? style.active : style.about
                  }
                >
                  The Accommodation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/roombooking/tariffsandpolicies"
                  className={({ isActive }) =>
                    isActive ? style.active : style.about
                  }
                >
                  Tariffs & Policies
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/donation"
                  className={({ isActive }) =>
                    isActive ? style.active : style.about
                  }
                >
                  Donation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/roombooking"
                  className={({ isActive }) =>
                    isActive ? style.active : style.about
                  }
                >
                  Room Booking
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? style.active : style.about
                  }
                >
                  About us
                </NavLink>
              </li>
            </>
          )}

          {sessionStorage.getItem('token') ? (
            <li>
              <div className={style.profilemaindivheader}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    alt={user?.name}
                    src={`${backendUrl}uploads/images/${user?.profile_image}`}
                    sx={{
                      width: 35,
                      height: 35,
                    }}
                  />

                  <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-label="more"
                  >
                    <ArrowDropDownOutlinedIcon
                      size="large"
                      sx={{ color: secondaryColor }}
                    />
                  </IconButton>
                </Box>
              </div>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? style.active : style.login
                  }
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <i
          style={{ marginRight: '20px' }}
          onClick={() => setisMobile(!isMobile)}
          className={style.mobileMenuIcon}
        >
          {isMobile ? (
            <>
              <CloseIcon style={{ height: '40px' }} className={style.burger} />
            </>
          ) : (
            <>
              <MenuIcon style={{ height: '40px' }} className={style.burger} />
            </>
          )}
        </i>
      </nav>
    </>
  );
};

export default Navbar;
