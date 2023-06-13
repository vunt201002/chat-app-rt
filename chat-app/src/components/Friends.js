import React from 'react';
import { Avatar, Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { Chat } from 'phosphor-react';

import StyledBadge from './StyledBadge';
import { socket } from '../socket';

const StyledChatBox = styled(Box)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
    },
}));

const UserComponent = ({ firstName, lastName, _id, online, img }) => {
    const theme = useTheme();

    const name = `${firstName} ${lastName}`;

    const user_id = window.localStorage.getItem("user_id");

    return (
        <StyledChatBox
            sx={{
                width: '100%',
                borderRadius: 1,
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    {" "}
                    {
                        online ?
                            (
                                <StyledBadge
                                    overlap='circular'
                                    anchorOrigin={{ vertical: 'bottom', horizontal: "right" }}
                                    variant='dot'
                                >
                                    <Avatar alt={name} src={img}/>
                                </StyledBadge>
                            )
                        :
                            (
                                <Avatar alt={name} src={img}/>
                            )
                    }
                    <Stack spacing={0.3}>
                        <Typography variant='subtitle2'>{name}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Button
                        onClick={() => {
                            socket.emit(
                                "friend_request",
                                {
                                    to: _id,
                                    from: user_id,
                                },
                                () => {
                                    alert("request sent");
                                },
                            );
                        }}
                    >
                        Send request
                    </Button>
                </Stack>
            </Stack>
        </StyledChatBox>
    )
};

const FriendRequestComponent = ({ firstName, lastName, _id, online, img, id }) => {
    const theme = useTheme();

    const name = `${firstName} ${lastName}`;

    return (
        <StyledChatBox
            sx={{
                width: '100%',
                borderRadius: 1,
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    {" "}
                    {
                        online ?
                            (
                                <StyledBadge
                                    overlap='circular'
                                    anchorOrigin={{ vertical: 'bottom', horizontal: "right" }}
                                    variant='dot'
                                >
                                    <Avatar alt={name} src={img}/>
                                </StyledBadge>
                            )
                        :
                            (
                                <Avatar alt={name} src={img}/>
                            )
                    }
                    <Stack spacing={0.3}>
                        <Typography variant='subtitle2'>{name}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Button
                        onClick={() => {
                            socket.emit(
                                "accept_request",
                                {
                                    request_id: id,
                                },
                                () => {
                                    alert("request sent");
                                },
                            );
                        }}
                    >
                        Accept request
                    </Button>
                </Stack>
            </Stack>
        </StyledChatBox>
    )
};

const FriendComponent = ({ firstName, lastName, _id, online, img }) => {
    const theme = useTheme();

    const name = `${firstName} ${lastName}`;

    const user_id = window.localStorage.getItem("user_id");

    return (
        <StyledChatBox
            sx={{
                width: '100%',
                borderRadius: 1,
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    {" "}
                    {
                        online ?
                            (
                                <StyledBadge
                                    overlap='circular'
                                    anchorOrigin={{ vertical: 'bottom', horizontal: "right" }}
                                    variant='dot'
                                >
                                    <Avatar alt={name} src={img}/>
                                </StyledBadge>
                            )
                        :
                            (
                                <Avatar alt={name} src={img}/>
                            )
                    }
                    <Stack spacing={0.3}>
                        <Typography variant='subtitle2'>{name}</Typography>
                    </Stack>
                </Stack>
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <IconButton onClick={() => {
                        // start a new conversation
                        socket.emit(
                            "start_conversation",
                            {
                                to: _id,
                                from: user_id
                            }
                        );
                    }}>
                        <Chat />
                    </IconButton>
                </Stack>
            </Stack>
        </StyledChatBox>
    )
};

export { UserComponent, FriendRequestComponent, FriendComponent };