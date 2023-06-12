import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Stack, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { FetchFriendRequests, FetchFriends, FetchUsers } from '../../redux/slices/app';

const UserList = () => {
    const dispatch = useDispatch();    

    useEffect(() => {
        dispatch(FetchUsers());
    }, []);

    const { user } = useSelector(state => state.app);

    return (
        <>
            {user && user.map((el, index) => (
                // render user component
                <div key={index}></div>
            ))}
        </>
    )
};

const FriendsList = () => {
    const dispatch = useDispatch();    

    useEffect(() => {
        dispatch(FetchFriends());
    }, []);

    const { friends } = useSelector(state => state.app);

    return (
        <>
            {friends && friends.map((el, index) => (
                // render friends component
                <div key={index}></div>
            ))}
        </>
    )
};

const FriendRequestList = () => {
    const dispatch = useDispatch();    

    useEffect(() => {
        dispatch(FetchFriendRequests());
    }, []);

    const { friendRequests } = useSelector(state => state.app);

    return (
        <>
            {friendRequests && friendRequests.map((el, index) => (
                // render friend request component
                <div key={index}></div>
            ))}
        </>
    )
};

const Friends = ({ open, handleClose }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog
            fullWidth
            maxWidth='xs'
            open={open}
            keepMounted
            onClose={handleClose}
            sx={{
                p: 4,
            }}
        >
            <Stack p={2} sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                >
                    <Tab label='Explore'></Tab>
                    <Tab label='Friends'></Tab>
                    <Tab label='Requests'></Tab>
                </Tabs>
            </Stack>
            {/* Dialog content */}
            <DialogContent>
                <Stack sx={{ height: '100%',  }}>
                    <Stack spacing={2.5}>
                        {(() => {
                            switch (value) {
                                case 0: // all user
                                    return <UserList />
                                case 1: // all friends
                                    return <FriendsList />
                                case 2: // all friend request
                                    return <FriendRequestList />
                                default:
                                    break;
                            }
                        })()}
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
};

export default Friends;