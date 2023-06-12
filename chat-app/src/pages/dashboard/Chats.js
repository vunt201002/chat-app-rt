import React, { useState } from 'react';
import {
    Box,
    Button,
    Divider,
    IconButton,
    Stack,
    Typography
} from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users } from 'phosphor-react';
import { useTheme } from '@emotion/react';

import { ChatList } from '../../data/index';
import { SimpleBarStyle } from '../../components/Scrollbar';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search/index'; 

import ChatElement from '../../components/ChatElement';
import Friends from '../../sections/main/Friends';

const Chats = () => {
    const theme = useTheme();

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: 320,
                    backgroundColor: theme.palette.mode === 'light' ?
                                    '#F8FAFF' : theme.palette.background.paper,
                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                }}
            >
                <Stack p={2} spacing={2} sx={{ height: '100vh', }}>
                    {/* chữ chat và nút refresh */}
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Typography variant='h5'>Chats</Typography>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'}>
                            <IconButton onClick={() => {
                                handleOpenDialog();
                            }}>
                                <Users />
                            </IconButton>
                            <IconButton>
                                <CircleDashed />
                            </IconButton>
                        </Stack>
                    </Stack>

                    {/* thanh search */}
                    <Stack
                        sx={{
                            width: '100%',
                        }}
                    >
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color='#709ce6'/>
                            </SearchIconWrapper>
                            <StyledInputBase placeholder='Search'/>
                        </Search>
                    </Stack>

                    <Stack spacing={1}>
                        {/* nut archived */}
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            spacing={1.5}
                        >
                            <ArchiveBox />
                            <Button>
                                Archive
                            </Button>
                        </Stack>
                        <Divider />
                    </Stack>

                    <Stack
                        direction={'column'}
                        sx={{
                            flexGrow: 1,
                            overflow: 'auto',
                            height: '100%',
                        }}
                    >
                        <SimpleBarStyle timeout={500}>
                            <Stack spacing={2.4}>
                                <Typography
                                    variant='subtitle2'
                                    sx={{
                                        color: "#676767"
                                    }}
                                >
                                    Pinned
                                </Typography>
                                {ChatList.filter(el => el.pinned).map(el => (                    
                                    <ChatElement key={el.id} {...el}/>
                                ))}
                            </Stack>
                            <Stack spacing={2.4}>
                                <Typography
                                    variant='subtitle2'
                                    sx={{
                                        color: "#676767"
                                    }}
                                >
                                    All chats
                                </Typography>
                                {ChatList.filter(el => !el.pinned).map(el => (                    
                                    <ChatElement key={el.id} {...el}/>
                                ))}
                            </Stack>
                        </SimpleBarStyle>
                    </Stack>
                </Stack>
            </Box>
            {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog}/>}
        </>
    )
};

export default Chats;