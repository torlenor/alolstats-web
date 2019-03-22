import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme( 
    {
        typography: {
            fontSize: 12,
            useNextVariants: true,
        },

        "palette":{
            "common":{
                "black":"#000",
                "white":"rgba(255, 255, 255, 1)"
            },
            "background":{
                "paper":"rgba(55, 55, 64, 1)",
                "default":"rgba(51, 51, 61, 1)"
            },
            "primary":{
                "light":"rgba(99, 0, 1, 1)",
                "main":"rgba(45, 10, 10, 1)",
                "dark":"rgba(84, 0, 0, 1)",
                "contrastText":"rgba(255, 255, 255, 1)"
            },
            "secondary":{
                "light":"rgba(11, 125, 1, 1)",
                "main":"rgba(10, 116, 0, 1)",
                "dark":"rgba(8, 86, 0, 1)",
                "contrastText":"#fff"
            },
            "error":{
                "light":"rgba(166, 0, 1, 1)",
                "main":"rgba(103, 0, 1, 1)",
                "dark":"rgba(83, 0, 0, 1)",
                "contrastText":"#fff"
            },
            "text":{
                "primary":"rgba(255, 255, 255, 0.87)",
                "secondary":"rgba(255, 255, 255, 1)",
                "disabled":"rgba(182, 182, 182, 0.38)",
                "hint":"rgba(146, 146, 146, 0.38)"
            }
        }
        
    }
);

export default theme;
