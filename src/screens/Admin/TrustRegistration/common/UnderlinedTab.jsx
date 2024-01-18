import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function a11yProps(index) {
  return {
    id: `tab-name-${index}`,
    'aria-controls': `tab-name-${index}`,
  };
}

const TabPanel= React.memo((props)=> {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
})

const UnderlinedTab = ({ tabs, themeColor, handleClose }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const defaultColor = '#e96d00';

  function getTabColor(val) {
    if (val === 0) return themeColor?.cash || defaultColor;
    if (val === 1) return themeColor?.electronic || defaultColor;
    if (val === 2) return themeColor?.cheque || defaultColor;
    return themeColor?.item || defaultColor;
  }
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Tabs
          value={value}
          variant="scrollable"
          onChange={handleChange}
          aria-label="tabs"
          sx={{
            minHeight: 'auto',
            '.MuiTab-textColorPrimary.Mui-selected': {
              color: getTabColor(value),
            },
          }}
          TabIndicatorProps={{
            style: {
              backgroundColor: getTabColor(value),
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              sx={{
                textTransform: 'capitalize',
                minHeight: '35px',
                fontSize: 14,
              }}
              label={<Box px={1}>{tab.label}</Box>}
              {...a11yProps(tab.label.split(' ').join('-').toLowerCase())}
            />
          ))}
        </Tabs>

        <IconButton
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel key={tab.label} value={value} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </div>
  );
};

export default UnderlinedTab;
