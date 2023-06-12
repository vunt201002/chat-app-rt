import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from "./Sidebar";
import { connectSocket, socket } from "../../socket";
import { showSnackbar } from "../../redux/slices/app";

const DashboardLayout = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const user_id = window.localStorage.getItem("user_id");

    useEffect(() => {

        if (isLoggedIn) {
            window.onload = function () {
                if (!window.location.hash) {
                    window.location = window.location + "#loaded";
                    window.location.reload();
                }
            };

            window.onload();

            if (!socket) {
                connectSocket(user_id);
            }

            // "new_friend_request"
            socket.on(
                "new_friend_request",
                (data) => {
                    dispatch(showSnackbar({ severity: "success", message: data.message }));
                }
            );

            // "request_accepted"
            socket.on(
                "request_accepted",
                (data) => {
                    dispatch(showSnackbar({ severity: "success", message: data.message }));
                }
            );

            // "request_sent"
            socket.on(
                "request_sent",
                (data) => {
                    dispatch(showSnackbar({ severity: "success", message: data.message }));
                }
            );
        }

        return () => {
            socket.off("new_friend_request");
            socket.off("request_accepted");
            socket.off("request_sent");
        };

    }, [isLoggedIn]);

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
