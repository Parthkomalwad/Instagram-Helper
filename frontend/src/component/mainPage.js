import * as React from 'react';
import { Typography, Button, ThemeProvider, TextField, TextareaAutosize, Grid, Divider, Snackbar } from '@mui/material';
import axios from 'axios'
import theme from '../theme/theme';
import Navbar from './navbar';

export default function MainPage() {
    const [inputUrl, setInputUrl] = React.useState('');
    const [outputText, setOutputText] = React.useState('');
    const [downloadText, setDownloadText] = React.useState('');
    const [isDownloadLinkVisible, setIsDownloadLinkVisible] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const downloadReel = () => {
        // const headers = {
        //     'X-Download-URL': inputUrl,
        // }
        axios.get('http://localhost:4000', {
            headers: {
                'X-Download-URL': inputUrl // Replace 'X-Download-URL' with your desired header key
            }
        })
            .then(response => {
                // Handle the response data as needed
                const responseData = response.data;
                console.log('responseData', responseData)
                setDownloadText(`${responseData}`);
                setIsDownloadLinkVisible(true); // Show the download link
            })
            .catch(error => {
                console.error('Error calling API:', error);
            });


        axios.get('http://localhost:4000/caption', {
            headers: {
                'X-Download-URL': inputUrl // Replace 'X-Download-URL' with your desired header key
            }
        })
            .then(response => {
                // Handle the response data as needed
                const responseData = response.data;
                setOutputText(`${responseData}`);
            })
            .catch(error => {
                console.error('Error calling API:', error);
            });



    };

    const handleInputChange = (event) => {
        setInputUrl(event.target.value);
    };

    const handleButtonClick = () => {
        setOutputText('');
        setIsDownloadLinkVisible(false);
        downloadReel();
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(outputText)
            .then(() => {
                console.log('Text copied to clipboard');
                handleSnackbarOpen(); // Show snackbar
            })
            .catch(error => {
                console.error('Error copying to clipboard:', error);
            });
    };

    const handleSnackbarOpen = () => {
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Navbar />
            <div>
                <ThemeProvider theme={theme}>
                    <Grid container>
                        <Grid item xs={12} p={2}>
                            <div style={{ padding: '20px' }}>
                                <Typography variant="h5" color="textSecondary">
                                    Provide Post/Reel URL
                                </Typography>
                                <TextField
                                    label="URL"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Insert your URL"
                                    value={inputUrl}
                                    onChange={handleInputChange}
                                    margin="normal"
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleButtonClick}
                                    style={{ marginTop: '10px' }}
                                >
                                    Submit
                                </Button>
                            </div>
                            <Divider style={{ margin: '10px 0' }} />
                            <div style={{ padding: '20px' }}>
                                <Typography variant="h5" color="textSecondary">
                                    Download URL
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={downloadText}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    disabled={!isDownloadLinkVisible}
                                >
                                    Download
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} p={2}>
                            <Typography variant="h5" color="textSecondary" style={{ marginBottom: '10px' }}>
                                Caption
                            </Typography>
                            <TextareaAutosize
                                rows={10}
                                placeholder="Caption will appear here"
                                value={outputText}
                                onChange={(event) => setOutputText(event.target.value)}
                                style={{ width: '100%', resize: 'none' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={copyToClipboard}
                                    disabled={!isDownloadLinkVisible}
                                >
                                    Copy to Clipboard
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                message="Copied to clipboard"
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            />
        </>
    );
}
