import React, { useState, useEffect } from 'react';
import Topbar from './Topbar';
import croppedlogo from '../../../assets/croppedlogo.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { secondaryColor } from '../../../utils/colorVariables';
import { backendUrl, backendApiUrl } from '../../../config/config';
import { useLocation } from 'react-router-dom';
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
import './Navbar.css';

function Navbar1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navbar, setnavbar] = useState(false);
  const [isMobile, setisMobile] = useState(false);
  const [showmenu1, setshowmenu1] = useState(false);
  const [showmenu2, setshowmenu2] = useState(false);
  const [showmenu3, setshowmenu3] = useState(false);
  const [showmenu4, setshowmenu4] = useState(false);

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
  const changebackgrou = () => {
    if (window.scrollY >= 80) {
      setnavbar(true);
    } else {
      setnavbar(false);
    }
  };

  window.addEventListener('scroll', changebackgrou);
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
        <MenuItem onClick={() => navigate('/bookinghistory')}>
          <ListItemIcon>
            <BookmarkAddedIcon fontSize="small" />
          </ListItemIcon>
          Room Booking History
        </MenuItem>
        <MenuItem onClick={() => navigate('/PendingBoli')}>
          <ListItemIcon>
            <BookmarkAddedIcon fontSize="small" />
          </ListItemIcon>
          Pending Boli History
        </MenuItem>
        <MenuItem onClick={() => navigate('/bhojnalayhistory')}>
          <ListItemIcon>
            <BookmarkAddedIcon fontSize="small" />
          </ListItemIcon>
          Bhojnalay History
        </MenuItem>

        <Divider />
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <div className={navbar ? 'hideTop' : 'showtop'}>
        <Topbar />
      </div>

      <nav className={navbar ? 'main_div_header_scroll' : 'main_div_header'}>
        <NavLink to="/" onClick={() => setisMobile(false)}>
          <div>
            <img src={croppedlogo} alt="ss" />
          </div>
        </NavLink>

        <div className={isMobile ? 'main_div_header10' : 'main_div_header10'}>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'link_directActive' : 'link_direct'
            }
            to="/*"
          >
            श्री बड़े बाबा
          </NavLink>
          <div class="dropdown">
            <button class="dropbtn">
              कुण्डलपुर <KeyboardArrowDownIcon />
            </button>
            <div class="dropdown-content">
              <NavLink to="/">क्षेत्र परिचय</NavLink>
              <NavLink to="/">पहुंच मार्ग</NavLink>
              <NavLink to="/">अतिशय</NavLink>
              <NavLink to="/">नित्य कार्यक्रम</NavLink>
              <NavLink to="/">सूचना समाचार</NavLink>
              <NavLink to="/">Download pdf book</NavLink>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">
              उपलब्ध सुविधाएं <KeyboardArrowDownIcon />
            </button>
            <div class="dropdown-content">
              <NavLink to="/">आवास व्यवस्था</NavLink>
              <NavLink to="/">अन्य सुविधाएं</NavLink>
            </div>
          </div>
          <NavLink className="link_direct" to="/">
            योजनाएं
          </NavLink>
          <div class="dropdown">
            <button class="dropbtn">
              जैन धर्म <KeyboardArrowDownIcon />
            </button>
            <div class="dropdown-content">
              <NavLink to="/">परिचय</NavLink>
              <NavLink to="/">24 तीर्थंकर</NavLink>
              <NavLink to="/">कुण्डलपुर गैलरी</NavLink>
            </div>
          </div>
          <NavLink className="link_direct" to="/">
            आचार्य श्री
          </NavLink>
          <div class="dropdown">
            <button class="dropbtn">
              फोटो गैलरी <KeyboardArrowDownIcon />
            </button>
            <div class="dropdown-content">
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'link_directActive' : 'link_direct'
                }
                to="/"
              >
                कुण्डलपुर गैलरी
              </NavLink>
              <NavLink to="/">कुण्डलपुर जिनालय</NavLink>
              <NavLink to="/">आचार्य श्री गैलरी</NavLink>
              <NavLink to="/">मुनि संघ</NavLink>
              <NavLink to="/">आर्य का संघ</NavLink>
            </div>
          </div>
          <NavLink className="link_direct" to="/#">
            वीडियो गैलरी
          </NavLink>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <NavLink
            className={({ isActive }) =>
              isActive ? 'link_directActive' : 'link_direct'
            }
            to="/donation"
          >
            दान
          </NavLink>

          &nbsp;&nbsp; &nbsp;&nbsp;
          <NavLink
            className={({ isActive }) =>
              isActive ? 'link_directActive' : 'link_direct'
            }
            to="/roombooking"
          >
            आवास
          </NavLink>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <NavLink
            className={({ isActive }) =>
              isActive ? 'link_directActive' : 'link_direct'
            }
            to="/bhojnayalay"
          >
            भोजनालय
          </NavLink>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <NavLink
            className={({ isActive }) =>
              isActive ? 'link_directActive' : 'link_direct'
            }
            to="/*"
          >
            संपर्क
          </NavLink>
          &nbsp;&nbsp; &nbsp;&nbsp;
          {sessionStorage.getItem('token') ? (
            <div>
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
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'link_directActive' : 'link_direct'
                }
              >
                Login
              </NavLink>
            </>
          )}
        </div>
        <i
          className="main_div_is_hai_na"
          onClick={() => setisMobile(!isMobile)}
        >
          {isMobile ? (
            <>
              <CloseIcon style={{ height: '40px' }} className="burger" />
              MENU
            </>
          ) : (
            <>
              <MenuIcon style={{ height: '40px' }} className="burger" /> MENU
            </>
          )}
        </i>
      </nav>
      <nav className={isMobile ? 'mobile_navber' : 'mobile_navber_hide'}>
        <div className="mobile_navber_hide_INear_main">
          <HomeIcon />
          <NavLink
            className="link_directs mobile_navber_hide_INear_maina"
            style={{ marginBottom: '0.5rem' }}
            to="/*"
          >
            श्री बड़े बाबा
          </NavLink>
          <div
            onClick={() => setshowmenu1(!showmenu1)}
            className="add_icons_div"
          >
            <p> कुण्डलपुर</p> {showmenu1 ? <RemoveIcon /> : <AddIcon />}
          </div>
          <div className={showmenu1 ? 'menu_show' : 'menu_hide'}>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              क्षेत्र परिचय
            </NavLink>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              पहुंच मार्ग
            </NavLink>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              अतिशय
            </NavLink>
            <NavLink className="link_directs" to="/">
              नित्य कार्यक्रम
            </NavLink>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              सूचना समाचार
            </NavLink>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              Download pdf book
            </NavLink>
          </div>
          <div
            onClick={() => setshowmenu2(!showmenu2)}
            className="add_icons_div"
          >
            <p> उपलब्ध सुविधाएं</p> {showmenu2 ? <RemoveIcon /> : <AddIcon />}
          </div>
          <div className={showmenu2 ? 'menu_show' : 'menu_hide'}>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              आवास व्यवस्था
            </NavLink>
            <NavLink className="link_directs" to="/">
              अन्य सुविधाएं
            </NavLink>
          </div>
          <NavLink
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? 'link_directActive' : 'link_directs'
            }
            to="/*"
          >
            योजनाएं
          </NavLink>
          <div
            onClick={() => setshowmenu3(!showmenu3)}
            className="add_icons_div"
          >
            <p> जैन धर्म </p> {showmenu3 ? <RemoveIcon /> : <AddIcon />}
          </div>
          <div className={showmenu3 ? 'menu_show' : 'menu_hide'}>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              परिचय
            </NavLink>
            <a
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              24 तीर्थंकर
            </a>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              कुण्डलपुर गैलरी
            </NavLink>
          </div>
          <NavLink
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? 'link_directActive' : 'link_directs'
            }
            to="/*"
          >
            आचार्य श्री
          </NavLink>
          <div
            onClick={() => setshowmenu4(!showmenu4)}
            className="add_icons_div"
          >
            <p> फोटो गैलरी</p> {showmenu4 ? <RemoveIcon /> : <AddIcon />}
          </div>
          <div className={showmenu4 ? 'menu_show' : 'menu_hide'}>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              कुण्डलपुर गैलरी
            </NavLink>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              कुण्डलपुर जिनालय
            </NavLink>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              आचार्य श्री गैलरी
            </NavLink>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              मुनि संघ
            </NavLink>
            <NavLink
              onClick={() => setisMobile(!isMobile)}
              className={({ isActive }) =>
                isActive ? 'link_directActive' : 'link_directs'
              }
              to="/*"
            >
              आर्य का संघ
            </NavLink>
          </div>
          <NavLink
            onClick={() => setisMobile(!isMobile)}
            className={({ isActive }) =>
              isActive ? 'link_directActive' : 'link_directs'
            }
            to="/*"
          >
            वीडियो गैलरी
          </NavLink>
          <NavLink
            onClick={() => setisMobile(!isMobile)}
            style={{ marginBottom: '0.5rem' }}
            className={({ isActive }) =>
              isActive ? 'link_directActive' : 'link_direct'
            }
            to="/donation"
          >
            दान
          </NavLink>

          <NavLink
            onClick={() => setisMobile(!isMobile)}
            style={{ marginBottom: '0.5rem' }}
            className={({ isActive }) =>
              isActive ? 'link_directActive' : 'link_direct'
            }
            to="/roombooking"
          >
            आवास
          </NavLink>
          <NavLink
            onClick={() => setisMobile(!isMobile)}
            style={{ marginBottom: '0.5rem' }}
            className={({ isActive }) =>
              isActive ? 'link_directActive' : 'link_directs'
            }
            to="/*"
          >
            संपर्क
          </NavLink>
          {sessionStorage.getItem('token') ? (
            <>
              <NavLink
                onClick={() => setisMobile(!isMobile)}
                to="/profile"
                className={({ isActive }) =>
                  isActive ? 'link_directActive' : 'link_directs'
                }
              >
                Profile
              </NavLink>

              <NavLink
                onClick={() => setisMobile(!isMobile)}
                to="/changepassword"
                className={({ isActive }) =>
                  isActive ? 'link_directActive' : 'link_directs'
                }
              >
                Change password
              </NavLink>

              <NavLink
                onClick={() => setisMobile(!isMobile)}
                to="/donationhistory"
                className={({ isActive }) =>
                  isActive ? 'link_directActive' : 'link_directs'
                }
              >
                Donation History
              </NavLink>

              <p
                onClick={() => {
                  setisMobile(!isMobile);
                  logout();
                }}
                className="link_direct_logouttex"
              >
                Logout
              </p>
            </>
          ) : (
            <>
              <NavLink
                onClick={() => {
                  setisMobile(!isMobile);
                  setshowmenu1(!showmenu1);
                }}
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'link_directActive' : 'link_directs'
                }
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar1;
