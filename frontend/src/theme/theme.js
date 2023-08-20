import {
    createTheme
}

    from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF', // Your primary color
        }

        ,
        secondary: {
            main: '#5851DB', // Your secondary color
        }

        ,
        // Other palette colors...
    }

    ,
    typography: {
        fontFamily: 'Roboto, sans-serif', // Use a suitable font
    }

    ,
});

export default theme;