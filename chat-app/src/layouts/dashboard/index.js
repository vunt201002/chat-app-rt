import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    let isAuthenticated = true;
    if (!isAuthenticated) {
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
