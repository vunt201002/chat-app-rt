import React, { useState } from 'react';
import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import { MagnifyingGlass, Plus } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';

import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search/index'; 
// import { SimpleBarStyle } from '../../components/Scrollbar';
import { ChatList } from '../../data/index';
import ChatElement from '../../components/ChatElement';
import CreateGroup from '../../sections/main/CreateGroup';

const Group = () => {
    const theme = useTheme();

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Stack direction={'row'} sx={{ width: '100%', }}>
                {/* left */}
                <Box
                    sx={{
                        height: '100vh',
                        backgroundColor: theme => theme.palette.mode === 'light'
                                            ? '#f8faff'
                                            : theme.palette.background,
                        width: 320,
                        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    <Stack p={3} spacing={2} sx={{ maxHeight: '100vh', }}>
                        <Stack>
                            <Typography variant='h5'>
                                Groups
                            </Typography>
                        </Stack>
                        <Stack sx={{ width: '100%', }}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color='#709ce6'/>
                                </SearchIconWrapper>
                                <StyledInputBase placeholder='Search'/>
                            </Search>
                        </Stack>
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography variant='subtitle2' component={Link}>
                                Create new group
                            </Typography>
                            <IconButton onClick={handleOpenDialog}>
                                <Plus style={{ color: theme.palette.primary.main }}/>
                            </IconButton>
                        </Stack>
                        <Divider />
                        <Stack
                            spacing={3}
                            sx={{
                                flexGrow: 1,
                                overflow: 'auto',
                                height: '100%',
                            }}
                        >
                            <Stack spacing={2.5}>
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
                                    All groups
                                </Typography>
                                {ChatList.filter(el => !el.pinned).map(el => (                    
                                    <ChatElement key={el.id} {...el}/>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
                {/* right */}
                {/* reuse conversation component */}
            </Stack>
            {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog}/>}
        </>
    )
};

export default Group;