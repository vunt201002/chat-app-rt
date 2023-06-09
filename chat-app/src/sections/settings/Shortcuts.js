import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, Stack, Typography } from '@mui/material';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const Shortcuts = ({ open, handleClose }) => {
    const list = [
        {
            key: 0,
            title: 'Mark as unread',
            combination: ['Ctrl', "Shirt", 'U'],
        },
        {
            key: 1,
            title: 'Mute',
            combination: ['Ctrl', "Shirt", 'M'],
        },
        {
            key: 2,
            title: 'Archive chat',
            combination: ['Ctrl', "Shirt", 'E'],
        },
        {
            key: 3,
            title: 'Delete chat',
            combination: ['Ctrl', "Shirt", 'D'],
        },
        {
            key: 4,
            title: 'Pin chat',
            combination: ['Ctrl', "Shirt", 'P'],
        },
        {
            key: 5,
            title: 'Search',
            combination: ['Ctrl', "F"],
        },
        {
            key: 6,
            title: 'Search chat',
            combination: ['Ctrl', "Shirt", 'F'],
        },
        {
            key: 7,
            title: 'Next chat',
            combination: ['Ctrl', 'N'],
        },
        {
            key: 8,
            title: 'Next step',
            combination: ['Ctrl', 'Tab'],
        },
        {
            key: 9,
            title: 'Previous step',
            combination: ['Ctrl', "Shirt", 'Tab'],
        },
        {
            key: 10,
            title: 'New group',
            combination: ['Ctrl', "Shirt", 'N'],
        },
        {
            key: 11,
            title: 'Profile & about',
            combination: ['Ctrl', 'P'],
        },
        {
            key: 12,
            title: 'Increase speed of voice message',
            combination: ["Shirt", '.'],
        },
        {
            key: 13,
            title: 'Decrease speed of voice message',
            combination: ["Shirt", ','],
        },
        {
            key: 14,
            title: 'Settings',
            combination: ["Shirt", 'S'],
        },
        {
            key: 15,
            title: 'Emoji panel',
            combination: ['Ctrl', 'E'],
        },
        {
            key: 16,
            title: 'Sticker panel',
            combination: ['Ctrl', 'S'],
        },
    ];

    return (
        <>
            <Dialog
                fullWidth
                maxWidth='md'
                open={open}
                onClose={handleClose}
                keepMounted
                TransitionComponent={Transition}
                sx={{
                    p: 4,
                }}
            >
                <DialogTitle>Keyboard shortcuts</DialogTitle>
                <DialogContent
                    sx={{
                        mt: 4,
                    }}
                >
                    <Grid container spacing={3}>
                        {list.map(el => (
                            <Grid key={el.key} container item xs={6}>
                                <Stack
                                    sx={{ width: '100%' }}
                                    justifyContent={'space-between'}
                                    spacing={3}
                                    direction={'row'}
                                    alignItems={'center'}
                                >
                                    <Typography
                                        variant='caption'
                                        sx={{
                                            fontSize: 14,
                                        }}
                                    >
                                        {el.title}
                                    </Typography>
                                    <Stack spacing={2} direction={'row'}>
                                        {el.combination.map(el => (
                                            <Button
                                                key={el}
                                                disabled
                                                variant='contained'
                                                sx={{
                                                    color: '#212121',
                                                }}
                                            >
                                                {el}
                                            </Button>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' onClick={handleClose}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default Shortcuts;