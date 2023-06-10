import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { useSelector } from 'react-redux';

import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Navigate to={'/auth/login'}/>
    }

    return (
        <Stack direction={'row'}>
            {/* Sidebar */}
            <Sidebar />
            <Outlet />
        </Stack>
    );
};

export default DashboardLayout;
