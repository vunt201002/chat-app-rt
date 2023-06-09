import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import { Gear } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';

import Logo from "../../assets/Images/logo.ico";
import { Profile_Menu, Nav_Buttons } from "../../data/index";
import useSettings from "../../hooks/useSettings";
import AntSwitch from '../../components/AntSwitch';

const Sidebar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { onToggleMode } = useSettings();

    const [selected, setSelected] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getPath = index => {
        switch (index) {
            case 0:
                return '/app';
            case 1:
                return '/group';
            case 2:
                return '/call';
            case 3:
                return '/settings';
            default:
                break;
        }
    };

    const getMenuPath = index => {
        switch (index) {
            case 0:
                return '/profile';
            case 1:
                return '/settings';
            case 2:
                // logout logic
                return '/auth/login';
            default:
                break;
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                height: '100vh',
                width: 100
            }}
            p={2}
        >
            {/* Stack ôm tất cả các nút */}
            <Stack
                direction='column'
                alignItems='center'
                sx={{
                    width: '100%',
                    height: '100%',
                }}
                spacing={3}
                justifyContent={'space-between'}
            >
                {/* stack ôm tất cả các nút ở trên */}
                <Stack
                    alignItems={'center'}
                    spacing={4}
                >
                    {/* logo */}
                    <Box
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            height: 64,
                            width: 64,
                            borderRadius: 1.5,
                        }}
                    >
                        <img src={Logo} alt="logo"/>
                    </Box>
                    
                    {/* Các nút chức năng và setting */}
                    <Stack
                        sx={{
                            width: 'max-content',
                        }}
                        direction='column'
                        // thêm alignItems bị mất divider ở dưới, phải thêm width
                        alignItems={"center"}
                        spacing={3}
                    >
                        {Nav_Buttons.map(el => (
                            // xử lý sự kiện khi click vào nút, đổi màu nền
                            // và màu icon
                            el.index === selected ?
                            (
                                // khi được select, dùng box component ở ngoài
                                // để đổi màu nền và màu icon
                                <Box
                                    key={el.index}
                                    p={1}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: 1.5,
                                    }}
                                >
                                    <IconButton
                                        key={el.index}
                                        sx={{
                                            width: 'max-content',
                                            color: '#fff',
                                        }}
                                    >
                                        {el.icon}
                                    </IconButton>
                                </Box>
                            )
                                :
                            (
                                // khi không được chọn thì render bình thường
                                <IconButton
                                    key={el.index}
                                    sx={{
                                        width: 'max-content',
                                        color: theme.palette.mode === "light" ?
                                            "#000" :
                                            theme.palette.text.primary,
                                    }}
                                    onClick={() => {
                                        setSelected(el.index);
                                        navigate(getPath(el.index));
                                    }}
                                >
                                    {el.icon}
                                </IconButton>
                            )
                            
                        ))}
                        
                        <Divider sx={{ width: '48px' }}/>
                        {/* Xử lý khi chọn và không chọn cho nút setting như ở trên */}
                        {
                            selected === 3 ?
                            (
                                <Box
                                    p={1}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        borderRadius: 1.5,
                                    }}
                                >
                                    <IconButton
                                        sx={{
                                            width: 'max-content',
                                            color: '#fff',
                                        }}
                                    >
                                        <Gear/>
                                    </IconButton>
                                </Box>
                            )
                                :
                            (
                                <IconButton
                                    sx={{
                                        width: 'max-content',
                                        color: theme.palette.mode === "light" ?
                                            "#000" :
                                            theme.palette.text.primary,
                                    }}
                                    onClick={() => {
                                        setSelected(3);
                                        navigate(getPath(3));
                                    }}
                                >
                                    <Gear />
                                </IconButton>
                            )
                        }
                    </Stack>
                </Stack>

                {/* Các nút ở dưới */}
                <Stack spacing={4} alignItems={'center'}>
                    {/* Switch */}
                    <AntSwitch onChange={() => onToggleMode()} defaultChecked/>
                    {/* Render avatar */}
                    <Avatar
                        src={faker.image.avatar()}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right'
                        }}
                    >
                        <Stack spacing={1} px={1}>
                            {Profile_Menu.map((el, index) => (
                                <MenuItem
                                    key={el.title}
                                    onClick={() => {
                                        handleClick();
                                    }}
                                >
                                    <Stack
                                        onClick={() => navigate(getMenuPath(index))}
                                        sx={{ width: 100 }}
                                        direction={'row'}
                                        alignItems={'center'}
                                        justifyContent={'start'}
                                        spacing={1}
                                    >
                                        {el.icon}
                                        <span>{el.title}</span>
                                    </Stack>
                                </MenuItem>
                            ))}
                        </Stack>
                    </Menu>
                </Stack>
            </Stack>
        </Box>
    )
};

export default Sidebar;