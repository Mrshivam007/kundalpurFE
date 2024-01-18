import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SellIcon from '@mui/icons-material/Sell';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Box } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { serverInstance } from '../../../API/ServerInstance';
import f1 from '../../../assets/f1.png';
import f2 from '../../../assets/f2.png';
import f3 from '../../../assets/f3.png';
import f4 from '../../../assets/f4.png';
import f5 from '../../../assets/f5.png';
import f6 from '../../../assets/f6.png';
import logo1 from '../../../assets/logo1.png';
import croppedlogo from '../../../assets/croppedlogo.png';
import ExpandLess from '@mui/icons-material/ExpandLess';

const drawerWidth = '17%';

const openedMixin = (theme) => ({
  width: drawerWidth,
  minWidth: '240px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  // width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: '5%',
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DesktopDrawar = ({ open, handleDrawerClose, handleDrawerOpen }) => {
  const stylesag = {
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
  const [activeTabId, setActiveTabId] = React.useState(0); // for showing tab as active
  const [userrole, setuserrole] = React.useState('');
  const [empid, setempid] = React.useState('');
  const [emproleid, setemproleid] = React.useState('');
  const [profiledata, setprofiledata] = useState('');
  console.log('employee profile', profiledata);
  const getprofile = () => {
    serverInstance('admin/update-employee-prof', 'get').then((res) => {
      if (res) {
        setprofiledata(res);
      }
    });
  };

  useEffect(() => {
    getprofile();
  }, []);

  const navigationTabs = [];

  const navigationreportTabs = [
    {
      id: 4,
      name: 'Reports',
      active: false,
      icon: <img src={f2} alt="f2" style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 4.6,
          name: 'All Reports',
          link: 'allreport/allhead',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },
        {
          id: 4.5,
          name: 'Donation',
          link: 'electronic/report/cash',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },
        {
          id: 4.1,
          name: 'Manual Donation',
          link: 'manual/report/cash',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },
        {
          id: 4.9,
          name: 'Online donation',
          link: 'online/report/online',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },

        {
          id: 12.3,
          name: 'Combine Report',
          link: 'DonationCombine',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },
      ],
    },
  ];

  const navigationboliTabs = [
    {
      id: 12,
      name: 'Boli Management',
      active: false,
      icon: <img src={f2} alt="f2" style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 12.4,
          name: 'Boli Ledger',
          link: 'boli/BoliGroup',
          active: false,
          icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
          subTabs: [],
        },
      ],
    },
  ];

  let navigationEmpTabs = [];
  {
    userrole === 3 && emproleid === 7 && (
      <>
        {navigationEmpTabs.push({
          id: 1,
          name: 'Donation',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 1.1,
              name: 'Donation',
              link: 'donation',
              active: false,
              icon: <StorefrontIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 6 && (
      <>
        {navigationEmpTabs.push({
          id: 1,
          name: 'Donation',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 2.2,
              name: 'Manual Donation',
              link: 'manualdonation',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 1 && (
      <>
        {navigationEmpTabs.push({
          id: 1,
          name: 'Donation',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 1.1,
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
        })}
      </>
    );
  }

  const navigationTabs1 = [
    {
      id: 2,
      name: 'Donation',
      active: false,
      icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
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
  ];

  let navigationEmpTabs1 = [];
  {
    userrole === 3 && emproleid === 7 && (
      <>
        {navigationEmpTabs1.push({
          id: 4,
          name: 'Reports',
          active: false,
          icon: <img src={f2} alt="f2" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 4.6,
              name: 'All Reports',
              link: 'allreport/allconsolidated',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
            {
              id: 4.1,
              name: 'Donation',
              link: 'electronic/report/elec',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
            {
              id: 4.2,
              name: 'Combine Report',
              link: 'DonationCombine',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 6 && (
      <>
        {navigationEmpTabs1.push({
          id: 4,
          name: 'Reports',
          active: false,
          icon: <img src={f2} alt="f2" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 4.6,
              name: 'All Reports',
              link: 'allreport/allconsolidated',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
            {
              id: 4.1,
              name: 'Manual Donation',
              link: 'manual/report/cash',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
            {
              id: 4.2,
              name: 'Combine Report',
              link: 'DonationCombine',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 1 && (
      <>
        {navigationEmpTabs1.push({
          id: 4,
          name: 'Reports',
          active: false,
          icon: <img src={f2} alt="f2" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 4.6,
              name: 'All Reports',
              link: 'allreport/allconsolidated',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
            {
              id: 4.5,
              name: 'Donation',
              link: 'electronic/report/cash',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
            {
              id: 4.1,
              name: 'Manual Donation',
              link: 'manual/report/cash',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
            {
              id: 4.8,
              name: 'Combine Report',
              link: 'DonationCombine',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 3 && (
      <>
        {navigationEmpTabs1.push({
          id: 4,
          name: 'Reports',
          active: false,
          icon: <img src={f2} alt="f2" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 4.6,
              name: 'All Reports',
              link: 'allreport/allhead',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
            {
              id: 4.5,
              name: 'Donation',
              link: 'electronic/report/cash',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
            {
              id: 4.1,
              name: 'Manual Donation',
              link: 'manual/report/cash',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
            {
              id: 4.9,
              name: 'Online donation',
              link: 'online/report/online',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
            {
              id: 4.11,
              name: 'Combine Report',
              link: 'DonationCombine',
              active: false,
              icon: <img src={f4} alt="f2" style={{ width: '25px' }} />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  let navigationDirectoryTabs = [];
  {
    userrole === 3 && emproleid === 7 && (
      <>
        {navigationDirectoryTabs.push({
          id: 1,
          name: 'User Directory',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 1.1,
              name: 'User Directory',
              link: 'User Directory',
              active: false,
              icon: <StorefrontIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 6 && (
      <>
        {navigationDirectoryTabs.push({
          id: 1,
          name: 'User Directory',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 2.2,
              name: 'Payment History',
              link: 'paymenthistory',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 1 && (
      <>
        {navigationDirectoryTabs.push({
          id: 1,
          name: 'User Directory',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 1.1,
              name: 'Sadsay Directory',
              link: 'sadsaydirectory',
              active: false,
              icon: <StorefrontIcon />,
              subTabs: [],
            },
            {
              id: 2.2,
              name: 'Payment History',
              link: 'paymenthistory',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  const navigationTabs3 = [
    {
      id: 2,
      name: 'User Directory',
      active: false,
      icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 2.1,
          name: 'Sadsay Directory',
          link: 'sadsaydirectory',
          active: false,
          icon: <StorefrontIcon />,
          subTabs: [],
        },
        {
          id: 2.2,
          name: 'Payment History',
          link: 'paymenthistory',
          active: false,
          icon: <SellIcon />,
          subTabs: [],
        },
      ],
    },
  ];

  let navigationHrTabs = [];
  {
    userrole === 3 && emproleid === 7 && (
      <>
        {navigationHrTabs.push({
          id: 1,
          name: 'HR',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 1.1,
              name: 'HR',
              link: 'HR',
              active: false,
              icon: <StorefrontIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 6 && (
      <>
        {navigationHrTabs.push({
          id: 1,
          name: 'HR',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 2.2,
              name: 'Company',
              link: 'Company',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 1 && (
      <>
        {navigationHrTabs.push({
          id: 1,
          name: 'HR',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 1.1,
              name: 'HR',
              link: 'hr',
              active: false,
              icon: <StorefrontIcon />,
              subTabs: [],
            },
            {
              id: 2.2,
              name: 'Company',
              link: 'company',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  const navigationTabsHr = [
    {
      id: 3,
      name: 'HR',
      active: false,
      icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 3.1,
          name: 'HR',
          link: 'hr',
          active: false,
          icon: <StorefrontIcon />,
          subTabs: [],
        },
        {
          id: 3.2,
          name: 'Company',
          link: 'company',
          active: false,
          icon: <SellIcon />,
          subTabs: [],
        },
      ],
    },
  ];

  let navigationComDirectoryTabs = [];
  {
    userrole === 1 ||
      (userrole === 3 && emproleid === 10 && (
        <>
          {navigationComDirectoryTabs.push({
            id: 19,
            name: 'Directory',
            active: false,
            icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
            subTabs: [
              {
                id: 19.1,
                name: 'Committee Directory',
                link: 'committeedirectory',
                active: false,
                icon: <StorefrontIcon />,
                subTabs: [],
              },
            ],
          })}
        </>
      ));
  }

  {
    userrole === 1 ||
      (userrole === 3 && emproleid === 10 && (
        <>
          {navigationComDirectoryTabs.push({
            id: 20,
            name: 'Directory',
            active: false,
            icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
            subTabs: [
              {
                id: 20.2,
                name: 'Family Directory',
                link: 'familydirectory',
                active: false,
                icon: <SellIcon />,
                subTabs: [],
              },
              {
                id: 20.3,
                name: 'Special Occasion Members',
                link: 'specialoccasion',
                active: false,
                icon: <SellIcon />,
                subTabs: [],
              },
            ],
          })}
        </>
      ));
  }

  {
    userrole === 1 ||
      (userrole === 3 && emproleid === 10 && (
        <>
          {navigationComDirectoryTabs.push({
            id: 2,
            name: 'Directory',
            active: false,
            icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
            subTabs: [
              {
                id: 2.1,
                name: 'Committee Directory',
                link: 'committeedirectory',
                active: false,
                icon: <StorefrontIcon />,
                subTabs: [],
              },
              {
                id: 3.2,
                name: 'Family Directory',
                link: 'familydirectory',
                active: false,
                icon: <SellIcon />,
                subTabs: [],
              },
              {
                id: 3.3,
                name: 'Special Occasion Members',
                link: 'specialoccasion',
                active: false,
                icon: <SellIcon />,
                subTabs: [],
              },
            ],
          })}
        </>
      ));
  }

  {
    userrole === 1 ||
      (userrole === 3 && emproleid === 10 && (
        <>
          {navigationComDirectoryTabs.push({
            id: 2,
            name: 'Directory',
            active: false,
            icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
            subTabs: [
              {
                id: 2.1,
                name: 'Committee Directory',
                link: 'committeedirectory',
                active: false,
                icon: <StorefrontIcon />,
                subTabs: [],
              },
              {
                id: 3.2,
                name: 'Family Directory',
                link: 'familydirectory',
                active: false,
                icon: <SellIcon />,
                subTabs: [],
              },
              {
                id: 3.3,
                name: 'Special Occasion Members',
                link: 'specialoccasion',
                active: false,
                icon: <SellIcon />,
                subTabs: [],
              },
            ],
          })}
        </>
      ));
  }

  const navigationComDirTabs = [
    {
      id: 3,
      name: 'Directory',
      active: false,
      icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 3.1,
          name: 'Committee Directory',
          link: 'committeedirectory',
          active: false,
          icon: <StorefrontIcon />,
          subTabs: [],
        },
        {
          id: 3.2,
          name: 'Family Directory',
          link: 'familydirectory',
          active: false,
          icon: <SellIcon />,
          subTabs: [],
        },
        {
          id: 3.3,
          name: 'Special Occasion Members',
          link: 'specialoccasion',
          active: false,
          icon: <SellIcon />,
          subTabs: [],
        },
      ],
    },
  ];

  // master

  let navigationMasterTabs = [];
  {
    userrole === 3 && emproleid === 7 && (
      <>
        {navigationMasterTabs.push({
          id: 1,
          name: 'Masters',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 1.1,
              name: 'Masters',
              link: 'masters',
              active: false,
              icon: <StorefrontIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 6 && (
      <>
        {navigationMasterTabs.push({
          id: 2,
          name: 'Masters',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 3.2,
              name: 'Masters',
              link: 'masters',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
            {
              id: 3.3,
              name: 'Directory',
              link: 'directorymasters',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
            {
              id: 3.4,
              name: 'Gate Pass',
              link: 'gatepassmasters',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
            {
              id: 3.5,
              name: 'Expenses',
              link: 'expensesmasters',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
            {
              id: 3.6,
              name: 'HR',
              link: 'hrmasters',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 8 && (
      <>
        {navigationMasterTabs.push({
          id: 2,
          name: 'Masters',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 3.4,
              name: 'Gate Pass',
              link: 'gatepassmasters',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 10 && (
      <>
        {navigationMasterTabs.push({
          id: 2,
          name: 'Masters',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 3.3,
              name: 'Directory',
              link: 'directorymasters',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }
  {
    userrole === 3 && emproleid === 1 && (
      <>
        {navigationMasterTabs.push({
          id: 2,
          name: 'Masters',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 2.1,
              name: 'Masters',
              link: 'masters',
              active: false,
              icon: <StorefrontIcon />,
              subTabs: [],
            },
            {
              id: 3.2,
              name: 'Directory',
              link: 'familydirectory',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
            {
              id: 3.3,
              name: 'Directory',
              link: 'familydirectory',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  const navigationMasterDirTabs = [
    {
      id: 15,
      name: 'Masters',
      active: false,
      icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 15.1,
          name: 'Masters',
          link: 'masters',
          active: false,
          icon: <StorefrontIcon />,
          subTabs: [],
        },
        {
          id: 15.2,
          name: 'Directory',
          link: 'directorymasters',
          active: false,
          icon: <SellIcon />,
          subTabs: [],
        },
        {
          id: 15.3,
          name: 'Gate Pass',
          link: 'gatepassmasters',
          active: false,
          icon: <SellIcon />,
          subTabs: [],
        },
        {
          id: 15.4,
          name: 'Expenses',
          link: 'expensesmasters',
          active: false,
          icon: <SellIcon />,
          subTabs: [],
        },
        {
          id: 15.5,
          name: 'HR',
          link: 'hrmasters',
          active: false,
          icon: <SellIcon />,
          subTabs: [],
        },
      ],
    },
  ];

  // gatepass

  let navigationGPTabs = [];
  // {
  //   userrole === 3 && emproleid === 8 && (
  //     <>
  //       {navigationGPTabs.push({
  //         id: 1,
  //         name: 'Gate Pass',
  //         active: false,
  //         icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
  //         subTabs: [
  //           {
  //             id: 1.1,
  //             name: 'Gate Pass',
  //             link: 'vehiclepass',
  //             active: false,
  //             icon: <StorefrontIcon />,
  //             subTabs: [],
  //           },
  //         ],
  //       })}
  //     </>
  //   );
  // }

  {
    userrole === 3 && emproleid === 8 && (
      <>
        {navigationGPTabs.push({
          id: 2,
          name: 'Gate Pass',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 3.2,
              name: 'Gate Pass',
              link: 'gatepass',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
            {
              id: 3.3,
              name: 'Material Gate Pass',
              link: 'materialpass',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 8 && (
      <>
        {navigationGPTabs.push({
          id: 2,
          name: 'Gate Pass',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 2.1,
              name: 'Vehicle Gate Pass',
              link: 'vehiclepass',
              active: false,
              icon: <StorefrontIcon />,
              subTabs: [],
            },
            {
              id: 3.2,
              name: 'Material Gate Pass',
              link: 'materialpass',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  {
    userrole === 3 && emproleid === 8 && (
      <>
        {navigationGPTabs.push({
          id: 2000,
          name: 'Gate Pass',
          active: false,
          icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
          subTabs: [
            {
              id: 13.1,
              name: 'Vehicle Pass',
              link: 'vehiclepass',
              active: false,
              icon: <StorefrontIcon />,
              subTabs: [],
            },
            {
              id: 13.2,
              name: 'Gate Out',
              link: 'vehicle/GateOut1',
              active: false,
              icon: <StorefrontIcon />,
              subTabs: [],
            },
            {
              id: 13.3,
              name: 'Gate Pass History',
              link: 'vehicle/GateoutHistory',
              active: false,
              icon: <StorefrontIcon />,
              subTabs: [],
            },
            {
              id: 13.4,
              name: 'Material Gate Pass',
              link: 'materialpass',
              active: false,
              icon: <SellIcon />,
              subTabs: [],
            },
          ],
        })}
      </>
    );
  }

  const navigationGatePassTabs = [
    {
      id: 13,
      name: 'Gate Pass',
      active: false,
      icon: <img src={f4} alt="f4" style={{ width: '25px' }} />,
      subTabs: [
        {
          id: 13.1,
          name: 'Vehicle Pass',
          link: 'vehiclepass',
          active: false,
          icon: <StorefrontIcon />,
          subTabs: [],
        },
        {
          id: 13.2,
          name: 'Gate Out',
          link: 'vehicle/GateOut1',
          active: false,
          icon: <StorefrontIcon />,
          subTabs: [],
        },
        {
          id: 13.3,
          name: 'Gate Pass History',
          link: 'vehicle/GateoutHistory',
          active: false,
          icon: <StorefrontIcon />,
          subTabs: [],
        },
        {
          id: 13.4,
          name: 'Material Gate Pass',
          link: 'materialpass',
          active: false,
          icon: <SellIcon />,
          subTabs: [],
        },
      ],
    },
  ];

  useEffect(() => {
    setuserrole(Number(sessionStorage.getItem('userrole')));
    setemproleid(Number(sessionStorage.getItem('empRoleid')));
    setempid(Number(sessionStorage.getItem('empRoleid')));
  }, []);

  return (
    <Drawer
      variant="permanent"
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#F1DAC6',
        },
      }}
      onMouseMove={() => handleDrawerOpen()}
      onMouseOut={() => handleDrawerClose()}
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
          {open ? (
            <>
              <img
                src={croppedlogo}
                style={{
                  width: '180px',
                  height: '50px',
                  borderRadius: '50%',
                  marginRight: '20%',
                }}
                alt="Logo"
              />
              <IconButton onClick={handleDrawerClose}>
                <CloseIcon
                  style={{ width: '30px', height: '30px' }}
                  htmlColor="#8e94a9"
                />
              </IconButton>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                <img
                  src={logo1}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                  }}
                  alt="Logo"
                />
                <IconButton onClick={handleDrawerOpen}>
                  <ArrowForwardIosIcon htmlColor="#8e94a9" />
                </IconButton>
              </div>
            </>
          )}
        </Box>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          {emproleid === 3 ? (
            <></>
          ) : (
            <>
              <Tooltip title="Dashbord" placement="left-end">
                <StyledListItemButton
                  selected={activeTabId === 0}
                  onClick={() => {
                    setActiveTabId(0);
                    handleDrawerClose();
                    navigate('/admin-panel/dashboard');
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <img src={f6} alt="f6" style={{ width: '25px' }} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: stylesag.ListText }}
                    primary="Dashboard"
                    sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                  />
                </StyledListItemButton>
              </Tooltip>
            </>
          )}

          {userrole === 1 && (
            <>
              <Tooltip title="System" placement="left-end">
                <StyledListItemButton
                  selected={activeTabId === 20}
                  onClick={() => {
                    setActiveTabId(20);
                    handleDrawerClose();
                    navigate('/admin-panel/usermanagement');
                    // window.open('/admin-panel/usermanagement', '_blank');
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <img src={f3} alt="f6" style={{ width: '25px' }} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: stylesag.ListText }}
                    primary="System"
                    sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                  />
                </StyledListItemButton>
              </Tooltip>
            </>
          )}

          {userrole === 3 && emproleid === 0 && (
            <>
              <Tooltip title="System" placement="left-end">
                <StyledListItemButton
                  selected={activeTabId === 20}
                  onClick={() => {
                    setActiveTabId(20);
                    handleDrawerClose();
                    navigate('/admin-panel/usermanagement');
                    // window.open('/admin-panel/usermanagement', '_blank');
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <img src={f3} alt="f6" style={{ width: '25px' }} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: stylesag.ListText }}
                    primary="System"
                    sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                  />
                </StyledListItemButton>
              </Tooltip>
            </>
          )}
        </ListItem>
        <Divider style={{ padding: '5px 0px' }} />

        {/* Admin Navigation Tabs */}

        {userrole === 1 || (userrole === 3 && emproleid === 0)
          ? navigationTabs.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              navigate('/admin-panel/' + subTab.link);
                              // window.open(
                              //   '/admin-panel/' + subTab.link,
                              //   '_blank',
                              // );
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          : navigationEmpTabs.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab?.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              navigate('/admin-panel/' + subTab.link);
                              // window.open(
                              //   '/admin-panel/' + subTab.link,
                              //   '_blank',
                              // );
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}

        {/* {userrole === 1 && (
          <>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Tooltip title="Masters" placement="left-end">
                <StyledListItemButton
                  selected={activeTabId === 9}
                  onClick={() => {
                    setActiveTabId(9);
                    handleDrawerClose();
                    navigate('/admin-panel/masters');
                    // window.open('/admin-panel/masters', '_blank');
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <img src={f5} alt="f5" style={{ width: '25px' }} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: stylesag.ListText }}
                    primary="Masters"
                    sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                  />
                </StyledListItemButton>
              </Tooltip>
            </ListItem>
          </>
        )}


        {userrole === 3 && emproleid === 0 && (
          <>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Tooltip title="Masters" placement="left-end">
                <StyledListItemButton
                  selected={activeTabId === 9}
                  onClick={() => {
                    setActiveTabId(9);
                    handleDrawerClose();
                    navigate('/admin-panel/masters');
                    // window.open('/admin-panel/masters', '_blank');
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <img src={f5} alt="f5" style={{ width: '25px' }} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: stylesag.ListText }}
                    primary="Masters"
                    sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                  />
                </StyledListItemButton>
              </Tooltip>
            </ListItem>
          </>
        )} */}

        <List>
          {userrole === 1 || (userrole === 3 && emproleid === 0)
            ? navigationMasterDirTabs.map((Tab, i) => (
                <React.Fragment key={i}>
                  <Tooltip title={Tab?.name} placement="left-end">
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
                  </Tooltip>

                  <Collapse
                    in={Tab.id === openedTab}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {Tab.subTabs.map((subTab, index) => (
                        <React.Fragment key={index}>
                          <Tooltip title={subTab?.name} placement="left-end">
                            <StyledListItemButton
                              selected={subTab.id === activeTabId}
                              onClick={() => {
                                navigate('/admin-panel/' + subTab.link);
                                // window.open(
                                //   '/admin-panel/' + subTab.link,
                                //   '_blank',
                                // );
                                setActiveTabId(subTab.id);
                                handleDrawerClose();
                              }}
                              sx={{ pl: 4 }}
                            >
                              <ListItemIcon>{subTab.icon}</ListItemIcon>
                              <ListItemText primary={subTab.name} />
                            </StyledListItemButton>
                          </Tooltip>
                        </React.Fragment>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))
            : navigationMasterTabs.map((Tab, i) => (
                <React.Fragment key={i}>
                  <Tooltip title={Tab?.name} placement="left-end">
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
                  </Tooltip>

                  <Collapse
                    in={Tab.id === openedTab}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {Tab.subTabs.map((subTab, index) => (
                        <React.Fragment key={index}>
                          <Tooltip title={subTab?.name} placement="left-end">
                            <StyledListItemButton
                              selected={subTab.id === activeTabId}
                              onClick={() => {
                                navigate('/admin-panel/' + subTab.link);
                                // window.open(
                                //   '/admin-panel/' + subTab.link,
                                //   '_blank',
                                // );
                                setActiveTabId(subTab.id);
                                handleDrawerClose();
                              }}
                              sx={{ pl: 4 }}
                            >
                              <ListItemIcon>{subTab.icon}</ListItemIcon>
                              <ListItemText primary={subTab.name} />
                            </StyledListItemButton>
                          </Tooltip>
                        </React.Fragment>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
        </List>

        {userrole === 1 && (
          <>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Tooltip title="Dharamshala" placement="left-end">
                <StyledListItemButton
                  selected={activeTabId === 10}
                  onClick={() => {
                    setActiveTabId(10);
                    handleDrawerClose();
                    navigate('/admin-panel/Dharamshala');
                    // window.open('/admin-panel/Dharamshala', '_blank');
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <img src={f1} alt="f5" style={{ width: '25px' }} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: stylesag.ListText }}
                    primary="Dharamshala"
                    sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                  />
                </StyledListItemButton>
              </Tooltip>
            </ListItem>
          </>
        )}

        {userrole === 3 && emproleid === 0 && (
          <>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <Tooltip title="Masters" placement="left-end">
                <StyledListItemButton
                  selected={activeTabId === 10}
                  onClick={() => {
                    setActiveTabId(10);
                    handleDrawerClose();
                    navigate('/admin-panel/Dharamshala');
                    // window.open('/admin-panel/Dharamshala', '_blank');
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <img src={f1} alt="f5" style={{ width: '25px' }} />
                  </ListItemIcon>
                  <ListItemText
                    classes={{ root: stylesag.ListText }}
                    primary="Dharamshala"
                    sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                  />
                </StyledListItemButton>
              </Tooltip>
            </ListItem>
          </>
        )}

        {userrole === 1 || (userrole === 3 && emproleid === 0) ? (
          navigationTabs1.map((Tab, i) => (
            <React.Fragment key={i}>
              <Tooltip title={Tab?.name} placement="left-end">
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
              </Tooltip>

              <Collapse in={Tab.id === openedTab} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {Tab.subTabs.map((subTab, index) => (
                    <React.Fragment key={index}>
                      <Tooltip title={subTab?.name} placement="left-end">
                        <StyledListItemButton
                          selected={subTab.id === activeTabId}
                          onClick={() => {
                            navigate('/admin-panel/' + subTab.link);
                            // window.open(
                            //   '/admin-panel/' + subTab.link,
                            //   '_blank',
                            // );
                            setActiveTabId(subTab.id);
                            handleDrawerClose();
                          }}
                          sx={{ pl: 4 }}
                        >
                          <ListItemIcon>{subTab.icon}</ListItemIcon>
                          <ListItemText primary={subTab.name} />
                        </StyledListItemButton>
                      </Tooltip>
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))
        ) : (
          <>
            {emproleid === 8 ? (
              <></>
            ) : (
              <>
                {navigationEmpTabs1.map((Tab, i) => (
                  <React.Fragment key={i}>
                    <Tooltip title={Tab?.name} placement="left-end">
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
                    </Tooltip>

                    <Collapse
                      in={Tab.id === openedTab}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {Tab.subTabs.map((subTab, index) => (
                          <React.Fragment key={index}>
                            <Tooltip title={subTab?.name} placement="left-end">
                              <StyledListItemButton
                                selected={subTab.id === activeTabId}
                                onClick={() => {
                                  // navigate('/admin-panel/' + subTab.link);
                                  window.open(
                                    '/admin-panel/' + subTab.link,
                                    '_blank',
                                  );
                                  setActiveTabId(subTab.id);
                                  handleDrawerClose();
                                }}
                                sx={{ pl: 4 }}
                              >
                                <ListItemIcon>{subTab.icon}</ListItemIcon>
                                <ListItemText primary={subTab.name} />
                              </StyledListItemButton>
                            </Tooltip>
                          </React.Fragment>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                ))}
              </>
            )}
          </>
        )}
      </List>

      {userrole === 3 && emproleid === 0 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Room Booking" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 11}
                onClick={() => {
                  setActiveTabId(11);
                  handleDrawerClose();
                  navigate('/admin-panel/room/nowdashboard');
                  // window.open('/admin-panel/room/Dashboard', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f1} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Room Booking"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Room Booking" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 55}
                onClick={() => {
                  setActiveTabId(55);
                  handleDrawerClose();
                  navigate('/admin-panel/Room/checkinreports');
                  // window.open('/admin-panel/Room/checkinreports', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f1} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Room Booking Reports"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      {userrole === 3 && emproleid === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Room Booking" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 11}
                onClick={() => {
                  setActiveTabId(11);
                  handleDrawerClose();
                  navigate('/admin-panel/room/nowdashboard');
                  // window.open('/admin-panel/room/Dashboard', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f1} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Room Booking"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Room Booking" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 55}
                onClick={() => {
                  setActiveTabId(55);
                  handleDrawerClose();
                  navigate('/admin-panel/Room/checkinreports');
                  // window.open('/admin-panel/Room/checkinreports', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f1} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Room Booking Report"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      {userrole === 3 && emproleid === 2 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Room Booking" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 11}
                onClick={() => {
                  setActiveTabId(11);
                  handleDrawerClose();
                  navigate('/admin-panel/room/nowdashboard');
                  // window.open('/admin-panel/room/Dashboard', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f1} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Room Booking"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Room Booking" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 55}
                onClick={() => {
                  setActiveTabId(55);
                  handleDrawerClose();
                  navigate('/admin-panel/Room/checkinreports');
                  // window.open('/admin-panel/Room/checkinreports', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f1} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Room Booking Report"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      {userrole === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Room Booking" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 11}
                onClick={() => {
                  setActiveTabId(11);
                  handleDrawerClose();
                  navigate('/admin-panel/room/nowdashboard');
                  // window.open('/admin-panel/room/Dashboard', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f1} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Room Booking"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Room Booking Reports" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 55}
                onClick={() => {
                  setActiveTabId(55);
                  handleDrawerClose();
                  navigate('/admin-panel/Room/checkinreports');
                  // window.open('/admin-panel/Room/checkinreports', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f1} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Room Booking Reports"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      <List>
        {userrole === 1 ||
        (userrole === 3 && emproleid === 0) ||
        (userrole === 3 && emproleid === 9)
          ? navigationreportTabs.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab?.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab?.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              // navigate('/admin-panel/' + subTab.link);
                              window.open(
                                '/admin-panel/' + subTab.link,
                                '_blank',
                              );
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          : ''}
      </List>
      <List>
        {userrole === 1 ||
        (userrole === 3 && emproleid === 0) ||
        (userrole === 3 && emproleid === 9)
          ? navigationboliTabs.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab?.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab?.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              navigate('/admin-panel/' + subTab.link);
                              // window.open(
                              //   '/admin-panel/' + subTab.link,
                              //   '_blank',
                              // );
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          : ''}
      </List>

      {/* {userrole === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Vehicle Pass" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 7}
                onClick={() => {
                  setActiveTabId(7);
                  handleDrawerClose();
                  navigate('/admin-panel/vehiclepass');
                  // window.open('/admin-panel/masters', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f5} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Vehicle Pass"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}


      {userrole === 3 && emproleid === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Vehicle Pass" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 7}
                onClick={() => {
                  setActiveTabId(7);
                  handleDrawerClose();
                  navigate('/admin-panel/vehiclepass');
                  // window.open('/admin-panel/masters', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2, expenseorder
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f5} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Vehicle Pass"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )} */}

      {/* gatepass */}

      <List sx={{ marginTop: userrole === 1 ? '0rem' : '-3rem' }}>
        {userrole === 1 || (userrole === 3 && emproleid === 8)
          ? navigationGatePassTabs.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab?.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab?.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              navigate('/admin-panel/' + subTab.link);
                              // window.open(
                              //   '/admin-panel/' + subTab.link,
                              //   '_blank',
                              // );
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          : navigationGPTabs.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab?.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab?.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              navigate('/admin-panel/' + subTab.link);
                              // window.open(
                              //   '/admin-panel/' + subTab.link,
                              //   '_blank',
                              // );
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
      </List>

      {userrole === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Expenses" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 9}
                onClick={() => {
                  setActiveTabId(9);
                  handleDrawerClose();
                  navigate('/admin-panel/expense/group');
                  // window.open('/admin-panel/masters', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f5} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Expenses"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      {userrole === 3 && emproleid === 0 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Expenses" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 9}
                onClick={() => {
                  setActiveTabId(9);
                  handleDrawerClose();
                  navigate('/admin-panel/expenseorder');
                  // window.open('/admin-panel/masters', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f5} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Expenses"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      {userrole === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Trust Registration" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 1}
                onClick={() => {
                  setActiveTabId(1);
                  handleDrawerClose();
                  navigate('/admin-panel/trustregistration');
                  // window.open('/admin-panel/masters', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f5} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Trust Registration"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      {userrole === 3 && emproleid === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Trust Registration" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 1}
                onClick={() => {
                  setActiveTabId(1);
                  handleDrawerClose();
                  navigate('/admin-panel/trustregistration');
                  // window.open('/admin-panel/masters', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f5} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Trust Registration"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      {userrole === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Store" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 5}
                onClick={() => {
                  setActiveTabId(5);
                  handleDrawerClose();
                  navigate('/admin-panel/store');
                  // window.open('/admin-panel/masters', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <StorefrontIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Store"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      {userrole === 3 && emproleid === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Store" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 5}
                onClick={() => {
                  setActiveTabId(5);
                  handleDrawerClose();
                  navigate('/admin-panel/store');
                  // window.open('/admin-panel/masters', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f5} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Store"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      {userrole === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="HR" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 6}
                onClick={() => {
                  setActiveTabId(6);
                  handleDrawerClose();
                  navigate('/admin-panel/hr');
                  // window.open('/admin-panel/masters', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f5} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="HR"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      {userrole === 3 && emproleid === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="HR" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 6}
                onClick={() => {
                  setActiveTabId(6);
                  handleDrawerClose();
                  navigate('/admin-panel/hr');
                  // window.open('/admin-panel/masters', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                  // expenseorder,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f5} alt="f5" style={{ width: '25px' }} />
                </ListItemIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="hr"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      <List>
        {userrole === 1 || (userrole === 3 && emproleid === 10)
          ? navigationComDirTabs.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab?.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab?.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              navigate('/admin-panel/' + subTab.link);
                              // window.open(
                              //   '/admin-panel/' + subTab.link,
                              //   '_blank',
                              // );
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          : navigationComDirectoryTabs.map((Tab, i) => (
              <React.Fragment key={i}>
                <Tooltip title={Tab?.name} placement="left-end">
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
                </Tooltip>

                <Collapse
                  in={Tab.id === openedTab}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {Tab.subTabs.map((subTab, index) => (
                      <React.Fragment key={index}>
                        <Tooltip title={subTab?.name} placement="left-end">
                          <StyledListItemButton
                            selected={subTab.id === activeTabId}
                            onClick={() => {
                              navigate('/admin-panel/' + subTab.link);
                              // window.open(
                              //   '/admin-panel/' + subTab.link,
                              //   '_blank',
                              // );
                              setActiveTabId(subTab.id);
                              handleDrawerClose();
                            }}
                            sx={{ pl: 4 }}
                          >
                            <ListItemIcon>{subTab.icon}</ListItemIcon>
                            <ListItemText primary={subTab.name} />
                          </StyledListItemButton>
                        </Tooltip>
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
      </List>

      {userrole === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Whatsapp Notification" placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 16}
                onClick={() => {
                  setActiveTabId(16);
                  handleDrawerClose();
                  navigate('/admin-panel/whatsappnotification');
                  // window.open('/admin-panel/masters', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                }}
              >
                <WhatsAppIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f5} alt="f5" style={{ width: '25px' }} />
                </WhatsAppIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Whatsapp Notification"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}

      {userrole === 3 && emproleid === 1 && (
        <>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Whatsapp Notification " placement="left-end">
              <StyledListItemButton
                selected={activeTabId === 16}
                onClick={() => {
                  setActiveTabId(16);
                  handleDrawerClose();
                  navigate('/admin-panel/whatsappnotification');
                  // window.open('/admin-panel/masters', '_blank');
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.2,
                  // expenseorder,
                }}
              >
                <WhatsAppIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <img src={f5} alt="f5" style={{ width: '25px' }} />
                </WhatsAppIcon>
                <ListItemText
                  classes={{ root: stylesag.ListText }}
                  primary="Whatsapp Notification"
                  sx={{ opacity: open ? 1 : 0, ml: 0.8 }}
                />
              </StyledListItemButton>
            </Tooltip>
          </ListItem>
        </>
      )}
    </Drawer>
  );
};

export default DesktopDrawar;
