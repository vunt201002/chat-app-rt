import React, { useState } from 'react';
import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MagnifyingGlass, Plus } from 'phosphor-react';

import { SimpleBarStyle } from '../../components/Scrollbar';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { Callogs } from '../../data';
import { CalllogElement } from '../../components/CallElement';
import StartCall from '../../sections/main/StartCall';

const Call = () => {
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
                                Calls log
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
                                Start conversation
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
                            <SimpleBarStyle>
                                <Stack spacing={2.5}>
                                    {/* calls log */}
                                    {Callogs.map(el => (
                                        <CalllogElement key={el.id} {...el}/>
                                    ))}
                                </Stack>
                            </SimpleBarStyle>
                        </Stack>
                    </Stack>
                </Box>
                {/* right */}
                {/* reuse conversation component */}
            </Stack>
            {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog}/>}
        </>
    )
};

export default Call;