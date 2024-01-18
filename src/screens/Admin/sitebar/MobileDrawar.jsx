import * as React from 'react';
import { styled } from '@mui/material/styles';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import SellIcon from '@mui/icons-material/Sell';
import Collapse from '@mui/material/Collapse';
import InterestsIcon from '@mui/icons-material/Interests';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import PublicIcon from '@mui/icons-material/Public';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HelpIcon from '@mui/icons-material/Help';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import logo from '../../../assets/logo.jpeg';
import logo1 from '../../../assets/logo1.jpeg';
import side1 from '../../../assets/side1.jpeg';
import side2 from '../../../assets/side2.jpeg';
import side3 from '../../../assets/side3.jpeg';
import side4 from '../../../assets/side4.jpeg';
import side5 from '../../../assets/side4.jpeg';
import side6 from '../../../assets/side5.jpeg';
import ExpandLess from '@mui/icons-material/ExpandLess';

// Styling File is here
// import HeadingLogo from "../../assets/png/logo.png";

const drawerWidth = 240;

const AccountRoute = [
  {
    routeName: 'Raise Ticket',
    routeIcon: <ConfirmationNumberIcon />,
  },
  {
    routeName: 'Feedback',
    routeIcon: <FeedbackIcon />,
  },
  {
    routeName: 'Help Desk',
    routeIcon: <HelpIcon />,
  },
  {
    routeName: 'Whatsapp Us',
    routeIcon: <WhatsAppIcon />,
  },
];
const navigationTabs = [
  {
    id: 1,
    name: 'Masters',
    active: false,
    icon: <img src={side2} style={{ width: '25px' }} />,
    subTabs: [
      {
        id: 1.1,
        name: 'Masters',
        link: 'master',
        active: false,
        icon: <StorefrontIcon />,
        subTabs: [],
      },
      {
        id: 1.2,
        name: 'Other Masters',
        link: 'sellAccount',
        active: false,
        icon: <SellIcon />,
        subTabs: [],
      },
    ],
  },
  {
    id: 2,
    name: 'Donation',
    active: false,
    icon: <img src={side6} style={{ width: '25px' }} />,
    subTabs: [
      {
        id: 2.1,
        name: 'Donation',
        link: 'donation',
        active: false,
        icon: <StorefrontIcon />,
        subTabs: [],
      },
      {
        id: 2.2,
        name: 'Manual Donation',
        link: 'manualdonation',
        active: false,
        icon: <SellIcon />,
        subTabs: [],
      },
    ],
  },
  {
    id: 3,
    name: 'System',
    active: false,
    icon: <img src={side5} style={{ width: '25px' }} />,
    subTabs: [
      {
        id: 3.1,
        name: 'User Management',
        link: 'usermanagement',
        active: false,
        icon: <PublicIcon />,
        subTabs: [],
      },
      {
        id: 3.2,
        name: 'Role Management',
        link: 'rolemanagement',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 3.3,
        name: 'Generate Voucher',
        link: 'vouchermanagement',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 3.4,
        name: 'Assign Voucher',
        link: 'assign',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
    ],
  },
];

const navigationTabs1 = [
  {
    id: 4,
    name: 'Reports',
    active: false,
    icon: <img src={side3} style={{ width: '25px' }} />,
    subTabs: [
      {
        id: 4.1,
        name: 'Manual Report',
        link: 'manualreports',
        active: false,
        icon: <PublicIcon />,
        subTabs: [],
      },
      {
        id: 4.2,
        name: 'Consolidated Cash',
        link: 'consolidated/report',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 4.3,
        name: 'Head Donation',
        link: 'head/report',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 4.4,
        name: 'Donations Report',
        link: 'reports/allreport',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 4.5,
        name: 'Cash',
        link: 'reports/manualcash',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 4.6,
        name: 'Electronic',
        link: 'reports/electronic',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 4.7,
        name: 'Cheque',
        link: 'reports/manualcheque',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 4.8,
        name: 'Item',
        link: 'reports/manualitem',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },

      {
        id: 4.9,
        name: 'Cheque donation',
        link: 'reports/cheque',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 5.1,
        name: 'Online donation',
        link: 'reports/online',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
    ],
  },
  {
    id: 5,
    name: 'Dharamshala',
    active: false,
    icon: <img src={side4} style={{ width: '25px' }} />,
    subTabs: [
      {
        id: 5.1,
        name: 'Dharamshala',
        link: 'promdoion',
        active: false,
        icon: <PublicIcon />,
        subTabs: [],
      },

      {
        id: 5.3,
        name: 'Category',
        link: 'sponsodrhip',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 5.4,
        name: 'Facilities',
        link: 'sponsodrip',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 5.4,
        name: 'Room',
        link: 'sponsodrip',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
    ],
  },

  {
    id: 6,
    name: 'Room Booking',
    active: false,
    icon: <img src={side4} style={{ width: '25px' }} />,
    subTabs: [
      {
        id: 6.1,
        name: 'Checkin',
        link: 'promdon',
        active: false,
        icon: <PublicIcon />,
        subTabs: [],
      },

      {
        id: 6.3,
        name: 'Hold',
        link: 'sponship',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 6.4,
        name: 'Room Shift',
        link: 'sponsodrip',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
      {
        id: 6.4,
        name: 'Room',
        link: 'sponsodrip',
        active: false,
        icon: <AccountBalanceIcon />,
        subTabs: [],
      },
    ],
  },
];
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const StyledListItemButton = styled(ListItemButton)(() => ({
  '&.Mui-selected': {
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 13,
      bottom: 0,
      background: '#44ce42',
      height: '24px',
      width: '4px',
    },
    backgroundColor: '#fff !important',
  },
}));
const MobileDrawer = ({ open, handleDrawerClose }) => {
  const styles = {
    listActive: {
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 13,
        bottom: 0,
        background: '#44ce42',
        height: '24px',
        width: '4px',
      },
      backgroundColor: '#fff !important',
    },
    ListText: {
      '&.MuiListItemText-root': {
        fontFamily: "'Nunito', sans-serif !important",
        fontWeight: 600,
        lineHeight: '20px',
      },
    },
    DrawerSecTitle: {
      textAlign: 'left',
      marginLeft: '25px !important',
      fontSize: '13px !important',
      color: 'rgb(111, 126, 140)',
      fontFamily: "'Nunito', sans-serif !important",
      textTransform: 'uppercase',
      fontWeight: 400,
      padding: '5px 0px',
    },
    ListButtonIcon: {
      transform: 'rotate(90deg)',
      transition: 'all 0.2s ease-out !important',
    },
    ListinBtnclose: {
      transform: 'rotate(0deg)',
      transition: 'all 0.2s ease-out !important',
    },
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  };

  const navigate = useNavigate();
  const [openedTab, setOpenedTab] = React.useState(0); // for opening subtabs
  const [activeTabId, setActiveTabId] = React.useState(1); // for showing tab as active

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <img
            src={logo1}
            style={{
              width: '180px',
              height: '50px',
              borderRadius: '50%',
            }}
            alt="Logo"
          />
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon htmlColor="#8e94a9" />
          </IconButton>
        </Box>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <StyledListItemButton
            // classes={{ selected: styles.listActive }}
            onClick={() => {
              handleDrawerClose();
              navigate('/admin-panel/dashboard');
            }}
            selected={activeTabId === 0}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <DashboardIcon htmlColor="#001737" />
            </ListItemIcon>
            <ListItemText
              classes={{ root: styles.ListText }}
              primary="Dashboard"
              sx={{ opacity: open ? 1 : 0 }}
            />
          </StyledListItemButton>
        </ListItem>
        <Divider style={{ padding: '5px 0px' }} />

        {navigationTabs.map((Tab) => (
          <>
            <StyledListItemButton
              // classes={{ selected: styles.listActive }}
              selected={Tab.id === activeTabId}
              onClick={() => {
                setActiveTabId(Tab.id);
                setOpenedTab(openedTab === Tab.id ? 0 : Tab.id);
              }}
            >
              <ListItemIcon>{Tab.icon}</ListItemIcon>
              <ListItemText primary={Tab.name} />
              {Tab.id === activeTabId && openedTab !== 0 ? (
                <ExpandLess />
              ) : (
                <ChevronRightIcon />
              )}

              {/* <ChevronRightIcon
                classes={{
                  root:
                    Tab.id === activeTabId && openedTab !== 0
                      ? styles.ListButtonIcon
                      : styles.ListinBtnclose,
                }}
              /> */}
            </StyledListItemButton>
            <Collapse in={Tab.id === openedTab} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Tab.subTabs.map((subTab) => (
                  <>
                    <StyledListItemButton
                      // classes={{ selected: styles.listActive }}
                      selected={subTab.id === activeTabId}
                      onClick={() => {
                        navigate('/admin-panel/' + subTab.link);
                        setActiveTabId(subTab.id);
                        handleDrawerClose();
                      }}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon>{subTab.icon}</ListItemIcon>
                      <ListItemText primary={subTab.name} />
                    </StyledListItemButton>
                  </>
                ))}
              </List>
            </Collapse>
          </>
        ))}
      </List>
      <Divider style={{ marginBottom: '10px' }} />

      <ListItem disablePadding sx={{ display: 'block' }}>
        <StyledListItemButton
          selected={activeTabId === 7}
          onClick={() => setActiveTabId(7)}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <img src={side6} style={{ width: '25px' }} />
          </ListItemIcon>
          <ListItemText
            classes={{ root: styles.ListText }}
            primary="Donated user"
            sx={{ opacity: open ? 1 : 0, ml: 1 }}
          />
        </StyledListItemButton>
      </ListItem>
      <List>
        {/* Navigation Tabs from here */}

        {navigationTabs1.map((Tab, i) => (
          <React.Fragment key={i}>
            <StyledListItemButton
              selected={Tab.id === activeTabId}
              onClick={() => {
                setActiveTabId(Tab.id);
                setOpenedTab(openedTab === Tab.id ? 0 : Tab.id);
              }}
            >
              <ListItemIcon>{Tab.icon}</ListItemIcon>
              <ListItemText primary={Tab.name} />

              {Tab.id === activeTabId && openedTab !== 0 ? (
                <ExpandLess />
              ) : (
                <ChevronRightIcon />
              )}
            </StyledListItemButton>

            <Collapse in={Tab.id === openedTab} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Tab.subTabs.map((subTab, index) => (
                  <React.Fragment key={index}>
                    <StyledListItemButton
                      selected={subTab.id === activeTabId}
                      onClick={() => {
                        navigate('/admin-panel/' + subTab.link);
                        setActiveTabId(subTab.id);
                        handleDrawerClose();
                      }}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon>{subTab.icon}</ListItemIcon>
                      <ListItemText primary={subTab.name} />
                    </StyledListItemButton>
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default MobileDrawer;
