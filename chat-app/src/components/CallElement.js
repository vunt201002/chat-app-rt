import React from 'react';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { faker } from '@faker-js/faker';

import StyledBadge from '../components/StyledBadge';
import { ArrowDownLeft, ArrowUpRight, Phone, VideoCamera } from 'phosphor-react';

const CalllogElement = ({ online, incoming, missed }) => {
    const theme = useTheme();

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    borderRadius: 1,
                    backgroundColor: theme.palette.mode === 'light' ?
                                    '#fff' : theme.palette.background.default,
                }}
                p={2}
            >
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        {
                            online ?
                            (
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar src={faker.image.avatar()}/>
                                </StyledBadge>
                            )
                                :
                            (
                                <Avatar src={faker.image.avatar()}/>
                            )
                        }
    
                        <Stack spacing={0.3}>
                            <Typography
                                variant='subtitle2'
                            >
                                {faker.name.fullName()}
                            </Typography>
                            
                            <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                {
                                    incoming ?
                                    <ArrowDownLeft
                                        color={
                                            missed ? 'red' : 'green'
                                        }
                                    />
                                        :
                                    <ArrowUpRight
                                        color={
                                            missed ? 'red' : 'green'
                                        }
                                    />
                                }
                                <Typography
                                    variant='caption'
                                >
                                    Yesterday 21:24
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>

                    <IconButton>
                        <Phone  color='green'/>
                    </IconButton>
                </Stack>
            </Box>
        </>
    )
};

const CallElement = ({ online }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: 1,
                backgroundColor: theme.palette.mode === 'light' ?
                                '#fff' : theme.palette.background.default,
            }}
            p={2}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    {
                        online ?
                        (
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar src={faker.image.avatar()}/>
                            </StyledBadge>
                        )
                            :
                        (
                            <Avatar src={faker.image.avatar()}/>
                        )
                    }

                    <Stack spacing={0.3}>
                        <Typography
                            variant='subtitle2'
                        >
                            {faker.name.fullName()}
                        </Typography>
                        
                    </Stack>
                </Stack>

                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    <IconButton>
                        <Phone  color='green'/>
                    </IconButton>
                    <IconButton>
                        <VideoCamera color='green'/>
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    )
};

export { CalllogElement, CallElement };