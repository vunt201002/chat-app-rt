import React from "react";
import { Box, Stack } from "@mui/material";
import { useTheme } from '@mui/material/styles'
import { useSelector } from "react-redux";

import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";

const GeneralApp = () => {
    const theme = useTheme();

    const { sidebar } = useSelector(store => store.app);

    return (
        <Stack direction={'row'} sx={{ width: '100%' }}>
            {/* danh sách chat */}
            <Chats />

            {/* chi tiết chat */}
            <Box
                sx={{
                    height: '100%',
                    width: sidebar.open ? 'calc(100vw - 740px)' : 'calc(100vw - 420px)',
                    backgroundColor: theme.palette.mode === 'light' ?
                                    '#f0f4fa' : theme.palette.background.default,
                }}
            >
                <Conversation />
            </Box>

            {/* Contact */}
            {sidebar.open && (() => {
                switch (sidebar.type) {
                    case 'CONTACT':
                        return <Contact />

                    case 'STARRED':
                        return <StarredMessages />

                    case 'SHARED':
                        return <SharedMessages /> 

                    default:
                        break;
                }
            })()}
        </Stack>
    );
};

export default GeneralApp;
