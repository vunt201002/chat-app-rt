import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Container, Stack } from '@mui/material';
import { useSelector } from "react-redux";

import Logo from '../../assets/Images/logo.ico';

const MainLayout = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (isLoggedIn) {
        return <Navigate to={'/app'}/>
    }

    return (
        <>
            <Container
                sx={{ mt: 5 }}
                maxWidth='sm'
            >
                <Stack spacing={5}>
                    <Stack sx={{ width: '100%' }} direction={'column'} alignItems={'center'}>
                        <img
                            style={{
                                height: 120,
                                width: 120,
                            }}
                            src={Logo}
                            alt='logo'
                        />
                    </Stack>
                </Stack>
    
                <Outlet />
            </Container>
        </>
    );
};

export default MainLayout;
