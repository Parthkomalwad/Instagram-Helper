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
        axios.get(process.env.REACT_APP_BACKEND_URL, {
            headers: {
                'X-Download-URL': inputUrl // Replace 'X-Download-URL' with your desired header key
            }
        })
            .then(response => {
                // Handle the response data as needed
                const responseData = response.data;
                setDownloadText(`${responseData}`);
                setIsDownloadLinkVisible(true); // Show the download link
            })
            .catch(error => {
                console.error('Error calling API:', error);
            });


        axios.get(process.env.REACT_APP_BACKEND_URL + '/caption', {
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

    const removeHashtags = () => {
        // Remove #tags using regular expression
        const updatedText = outputText.replace(/#\w+/g, '');
        setOutputText(updatedText);
    };

    const removeAtSymbols = () => {
        // Remove both @username and standalone @ symbols using regular expression
        const updatedText = outputText.replace(/@\w+|\B@/g, '');
        setOutputText(updatedText);
    };

    const downloadAllImages = () => {

        axios.get(process.env.REACT_APP_BACKEND_URL + '/post', {
            headers: {
                'X-Download-URL': inputUrl // Replace 'X-Download-URL' with your desired header key
            }
        })
            .then(response => {
                // Handle the response data as needed
                const responseData = response.data;

                const downloadImage = (link) => {
                    const anchor = document.createElement('a');
                    anchor.href = link;
                    anchor.target = '_blank';
                    anchor.download = 'image.jpg'; // Change the file name as needed
                    anchor.click();
                };

                Object.values(responseData).forEach((link) => {
                    downloadImage(link);
                });
                setIsDownloadLinkVisible(true); // Show the download link
            })
            .catch(error => {
                console.error('Error calling API:', error);
            });

        axios.get(process.env.REACT_APP_BACKEND_URL + '/caption', {
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
                                    style={{ marginTop: '10px', marginRight: '20 px' }}
                                >
                                    Download
                                </Button>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={downloadAllImages}
                                disabled={!isDownloadLinkVisible}
                                style={{ marginTop: '10px' }}
                            >
                                Download All Images
                            </Button>
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
                                    style={{ marginRight: '10px' }}
                                >
                                    Copy to Clipboard
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={removeHashtags}
                                    disabled={!isDownloadLinkVisible}
                                    style={{ marginRight: '10px' }}
                                >
                                    Remove Hashtags
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={removeAtSymbols}
                                    disabled={!isDownloadLinkVisible}
                                >
                                    Remove @
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