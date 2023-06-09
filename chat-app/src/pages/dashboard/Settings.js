import React, { useState } from 'react';
import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Bell, CaretLeft, Image, Info, Key, Keyboard, Lock, Note, PencilCircle } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import Shortcuts from '../../sections/settings/Shortcuts';

const Settings = () => {
    const theme = useTheme();

    const [openShortcut, setOpenShortcut] = useState(false);
    
    const handleOpenShortcut = () => {
        setOpenShortcut(true);
    };

    const handleCloseShortcut = () => {
        setOpenShortcut(false);
    };

    const list = [
        {
            key: 0,
            icon: <Bell size={20}/>,
            title: 'Notificatons',
            onclick: () => {},
        },
        {
            key: 1,
            icon: <Lock size={20}/>,
            title: 'Privacy',
            onclick: () => {},
        },
        {
            key: 2,
            icon: <Key size={20}/>,
            title: 'Security',
            onclick: () => {},
        },
        {
            key: 3,
            icon: <PencilCircle size={20}/>,
            title: 'Theme',
            onclick: () => {},
        },
        {
            key: 4,
            icon: <Image size={20}/>,
            title: 'Chat wallpaper',
            onclick: () => {},
        },
        {
            key: 5,
            icon: <Note size={20}/>,
            title: 'Request account info',
            onclick: () => {},
        },
        {
            key: 6,
            icon: <Keyboard size={20}/>,
            title: 'Keyboard shortcuts',
            onclick: handleOpenShortcut,
        },
        {
            key: 7,
            icon: <Info size={20}/>,
            title: 'Help',
            onclick: () => {},
        },
    ];

    return (
        <>
            <Stack direction={'row'} sx={{ width: '100%' }}>
                {/* left */}
                <Box
                    sx={{
                        overflowY: 'auto',
                        height: '100vh',
                        width: 320,
                        backgroundColor: theme.palette.mode === 'light'
                            ? '#f8faff'
                            : theme.palette.background,
                        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <Stack p={4} spacing={5}>
                        {/* header */}
                        <Stack direction={'row'} alignItems={'center'} spacing={3}>
                            <IconButton>
                                <CaretLeft size={24} color='#4b4b4b'/>
                            </IconButton>
                            <Typography variant='h6'>Settings</Typography>
                        </Stack>
                        {/* profile */}
                        <Stack direction={'row'} spacing={3}>
                            <Avatar
                                src={faker.image.avatar()}
                                alt={faker.name.fullName()}
                                sx={{
                                    width: 56,
                                    height: 56,
                                }}
                            />
                            <Stack spacing={0.5} >
                                <Typography variant='article'>
                                    {faker.name.fullName()}
                                </Typography>
                                <Typography variant='body2'>
                                    {faker.random.words()}
                                </Typography>
                            </Stack>
                        </Stack>
                        {/* options */}
                        <Stack spacing={4}>
                            {list.map(el => (
                                <Stack
                                    key={el.key}
                                    onClick={el.onclick}
                                    sx={{
                                        cursor: 'pointer',
                                    }}
                                    spacing={2}
                                >
                                    <Stack alignItems={'center'} direction={'row'} spacing={2}>
                                        {el.icon}
                                        <Typography variant='body'>
                                            {el.title}
                                        </Typography>
                                    </Stack>
                                    {el.key !== 7 && <Divider />}
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </Box>
                {/* right */}
            </Stack>
            {openShortcut && <Shortcuts open={openShortcut} handleClose={handleCloseShortcut}/>}
        </>
    )
};

export default Settings;