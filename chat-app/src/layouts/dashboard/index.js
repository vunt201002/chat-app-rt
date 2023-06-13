import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from "./Sidebar";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, showSnackbar } from "../../redux/slices/app";
import { AddDirectConversation, UpdateDirectConversation } from "../../redux/slices/conversation";

const DashboardLayout = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const { conversations } = useSelector(state => state.conversation.direct_chat);

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

            socket.on(
                "start_chat",
                (data) => {
                    console.log(data);
                    const existing_conversation = conversations.find(el => el.id === data._id);
                    if (existing_conversation) {
                        dispatch(UpdateDirectConversation({ conversation: data }));
                    } else {
                        // add direct conversation
                        dispatch(AddDirectConversation({ conversation: data }));
                    }

                    dispatch(SelectConversation({ room_id: data._id }));
                }
            );
        }

        return () => {
            socket?.off("new_friend_request");
            socket?.off("request_accepted");
            socket?.off("request_sent");
            socket?.off("start_chat");
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
