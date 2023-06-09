import React from 'react';
import { Box, Grid, IconButton, Stack, Tab, Tabs } from '@mui/material';
import {} from '@mui/material/styles';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { CaretLeft } from 'phosphor-react';
import { faker } from '@faker-js/faker';

import { UpdateSidebarType } from '../redux/slices/app';
import { SHARED_LINKS, SHARED_DOCS } from "../data/index";
import { LinkMsg, DocMsg } from '../components/Conversation/MsgTypes';

const SharedMessages = () => {
    const theme = useTheme();

    const dispatch = useDispatch();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

                <Tabs sx={{ px: 2, pt: 2, }} value={value} onChange={handleChange} centered>
                    <Tab label="Media" />
                    <Tab label="Links" />
                    <Tab label="Docs" />
                </Tabs>

                {/* Body */}
                <Stack
                    sx={{
                        height: '100%',
                        position: 'relative',
                        flexGrow: 1,
                        overflowY: 'auto',
                    }}
                    p={3}
                    spacing={value === 1 ? 1 : 3}
                >
                    {(() => {
                        switch (value) {
                            case 0:
                                // images
                                return <Grid container spacing={2}>
                                    {
                                        [0, 1, 2, 3, 4, 5, 6].map(el => (
                                            <Grid key={el} item xs={4}>
                                                <img
                                                    src={faker.image.avatar()}
                                                    alt={faker.name.fullName()}
                                                />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            case 1:
                                // links
                                return SHARED_LINKS.map((el, index) => <LinkMsg key={index} el={el} />)

                            case 2:
                                // docs
                                return SHARED_DOCS.map((el, index) => <DocMsg key={index} el={el} />)

                            default:
                                break;
                        }
                    })()}
                </Stack>
            </Stack>
        </Box>
    )
};

export default SharedMessages;