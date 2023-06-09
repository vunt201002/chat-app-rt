import React, { useState } from 'react';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Slide, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { faker } from '@faker-js/faker';

import { ToggleSidebar, UpdateSidebarType } from '../redux/slices/app';
import AntSwitch from './AntSwitch';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Block this contact</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure to block this contact?
                    </DialogContentText>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Yes</Button>
            </DialogActions>
      </Dialog>
    )
};

const DeleteDialog = ({ open, handleClose }) => {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Delete this chat</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure to delete this chat?
                    </DialogContentText>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Yes</Button>
            </DialogActions>
      </Dialog>
    )
};

const Contact = () => {
    const theme = useTheme();

    const dispatch = useDispatch();

    const [openBlock, setOpenBlock] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
  
    const handleCloseBlock = () => {
        setOpenBlock(false);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    return (
        <Box
            sx={{
                width: 320,
                height: '100vh',
            }}
        >
            <Stack
                sx={{
                    height: '100%',
                }}
            >
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
                        justifyContent={'space-between'}
                        spacing={3}
                    >
                        <Typography variant='subtitle2'>Contact info</Typography>
                        <IconButton onClick={() => {
                            dispatch(ToggleSidebar());
                        }}>
                            <X />
                        </IconButton>
                    </Stack>
                </Box>
                {/* body */}
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
                    {/* avatar, tên, sdt */}
                    <Stack alignItems={'center'} direction={'row'} spacing={2}>
                        <Avatar
                            src={faker.image.avatar()}
                            alt={faker.name.firstName()}
                            sx={{
                                height: 64,
                                width: 64,
                            }}
                        />
                        <Stack spacing={0.5}>
                            <Typography
                                fontWeight={600}
                                variant='article'
                            >
                                {faker.name.fullName()}
                            </Typography>
                            <Typography
                                fontWeight={500}
                                variant='article'
                            >
                                {'+123456789'}
                            </Typography>
                        </Stack>
                    </Stack>
                    {/* nút voice và video */}
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'space-evenly'}
                    >
                        <Stack alignItems={'center'} spacing={1}>
                            <IconButton>
                                <Phone />
                            </IconButton>
                            <Typography variant='overline'>Voice</Typography>
                        </Stack>
                        <Stack alignItems={'center'} spacing={1}>
                            <IconButton>
                                <VideoCamera />
                            </IconButton>
                            <Typography variant='overline'>Video</Typography>
                        </Stack>
                    </Stack>

                    <Divider />

                    {/* phần mô tả */}
                    <Stack spacing={0.5}>
                        <Typography variant='article'>About</Typography>
                        <Typography variant='body2'>Hi there, I am using</Typography>
                    </Stack>

                    <Divider />

                    {/* phần link ảnh */}
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant='subtitle2'>Media, Link & Docs</Typography>
                        <Button
                            onClick={() => dispatch(UpdateSidebarType('SHARED'))}
                            endIcon={<CaretRight />}
                        >
                            401
                        </Button>
                    </Stack>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        {[1, 2, 3].map(el => (
                            <Box key={el}>
                                <img
                                    src={faker.image.food()}
                                    alt={faker.name.fullName()}
                                />
                            </Box>
                        ))}
                    </Stack>

                    <Divider />

                    {/* phần nút chức năng */}
                    <Stack alignItems={'center'} direction={'row'} justifyContent={'space-between'}>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <Star size={21}/>
                            <Typography variant='subtitle2'>Starred message</Typography>
                        </Stack>
                        <IconButton onClick={() => dispatch(UpdateSidebarType('STARRED'))}>
                            <CaretRight size={21}/>
                        </IconButton>
                    </Stack>
                    <Divider />
                    <Stack alignItems={'center'} direction={'row'} justifyContent={'space-between'}>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <Bell size={21}/>
                            <Typography variant='subtitle2'>Mute notifications</Typography>
                        </Stack>
                        <AntSwitch />
                    </Stack>

                    <Divider />

                    {/* phần thông tin group */}
                    <Typography>1 group common</Typography>
                    <Stack alignItems={'center'} direction={'row'} spacing={2}>
                        <Avatar
                            src={faker.image.avatar()}
                            alt={faker.name.firstName()}
                        />
                        <Stack spacing={0.5}>
                            <Typography
                                fontWeight={600}
                                variant='subtitle2'
                            >
                                Group name
                            </Typography>
                            <Typography
                                fontWeight={500}
                                variant='caption'
                            >
                                Members
                            </Typography>
                        </Stack>
                    </Stack>

                    {/* nút block và nút xóa */}
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <Button
                            startIcon={<Prohibit />}
                            fullWidth
                            variant='outlined'
                            onClick={() => setOpenBlock(true)}
                        >
                            Block
                        </Button>
                        <Button
                            startIcon={<Trash />}
                            fullWidth
                            variant='outlined'
                            onClick={() => setOpenDelete(true)}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            {openBlock && <BlockDialog open={openBlock} handleClose={handleCloseBlock}/>}
            {openDelete && <DeleteDialog open={openDelete} handleClose={handleCloseDelete}/>}
        </Box>
    )
};

export default Contact;