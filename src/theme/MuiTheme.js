import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#ffffff',
    },
    secondary: {
        light: '#f9683a',
        main: '#bf360c',
        dark: '#870000',
        contrastText: '#ffffff',
      },
  },
});

export default theme;
