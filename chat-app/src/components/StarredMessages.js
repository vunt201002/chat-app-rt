import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { CaretLeft } from 'phosphor-react';

import { UpdateSidebarType } from '../redux/slices/app';
import Message from '../components/Conversation/Message';

const StarredMessages = () => {
    const theme = useTheme();

    const dispatch = useDispatch();

    return (
        <Box
            sx={{
                width: 320,
                height: '100vh',
            }}
        >
            <Stack sx={{ height: '100%' }}>
                {/* header */}
                <Box
                    sx={{
                        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                        width: '100%',
                        backgroundColor: theme.palette.mode === 'light'
                            ? '#f8faff'
                            : theme.palette.background,
                    }}
                >
                    <Stack
                        direction={'row'}
                        p={2}
                        sx={{ height: '100%' }}
                        alignItems={'center'}
                        spacing={3}
                    >
                        <IconButton onClick={() => {
                            dispatch(UpdateSidebarType('CONTACT'));
                        }}>
                            <CaretLeft />
                        </IconButton>
                    </Stack>
                </Box>

                {/* Body */}
                <Stack
                    sx={{
                        height: '100%',
                        position: 'relative',
                        flexGrow: 1,
                        overflowY: 'auto',
                    }}
                    p={3}
                    spacing={3}
                >
                    <Message menu={false}/>
                </Stack>
            </Stack>
        </Box>
    )
};

export default StarredMessages;