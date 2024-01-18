import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';

export const CustomInputLabel = styled(InputLabel)(() => ({
  fontSize: 14,
  lineHeight: '24px',
  color: '#000',
}));

export const CustomInput = styled(InputBase)(({ theme }) => ({
  width: '100%',

  '& .MuiInputBase-input': {
    width: '100%',
    borderRadius: 6,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #C8C6D3',
    fontSize: 14,
    padding: 8,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const CustomTableInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  border: '1px solid #C8C6D3',
  '& .MuiInputBase-input': {
    padding: "8px 4px",
    // width: '100%',
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    fontSize: 14,
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));
