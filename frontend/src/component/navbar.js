import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundImage: "linear-gradient(#5851DB,#5851DB)" }}>
                <Toolbar>
                    <img
                        src='../../assets/Instagram-logo.png'
                        alt='Logo'
                        style={{
                            width: '30px',
                            height: '30px',
                        }}
                    />
                    <Avatar style={{ marginLeft: 'auto' }} alt="Roshan Khan" src="../../assets/roshan_khan.jpg" />
                </Toolbar>
            </AppBar>
        </Box>
    );
}