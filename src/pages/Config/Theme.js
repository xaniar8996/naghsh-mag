
    
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    direction: "rtl",

    typography: {
        fontFamily: 'Vazirmatn, sans-serif',
    },

    palette:{
      primary:{
        main:"#000"
      },
      secondary:{
        main:"#fff",
      },
      success:{
        main:"#00FF00"
      },
      error:{
        main:"#ff0000"
      },
      warning:{
        main:"#FFD580"
      },
    }
  },
);

export default theme