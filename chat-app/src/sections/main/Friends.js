import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Stack, Tab, Tabs } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { FetchFriendRequests, FetchFriends, FetchUsers } from '../../redux/slices/app';
import { FriendComponent, FriendRequestComponent, UserComponent } from '../../components/Friends';

const UserList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchUsers());
    }, []);

    const { users } = useSelector(state => state.app);

    return (
        <>
            {users && users.map((el, index) => (
                // render user component
                <UserComponent
                    key={el._id}
                    {...el}
                />
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
                <FriendComponent
                    key={el.id}
                    {...el}
                />
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
                // el: { _id, sender: { _id, firstName, lastName, img, online }, receipient }
                // render friend request component
                <FriendRequestComponent
                    key={el._id}
                    id={el._id}
                    {...el.sender}
                />
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