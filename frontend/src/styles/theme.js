import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#800080",  
    },
    secondary: {
      main: "#a040a0", 
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: '#800080', 
          },
          '& label.Mui-focused': {
            color: '#800080', 
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#800080' },
            '&:hover fieldset': { borderColor: '#a040a0' },
            '&.Mui-focused fieldset': { borderColor: '#800080' },
          },
        },
      },
    },
  },
});

export default theme;
