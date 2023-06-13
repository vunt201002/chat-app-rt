import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles'
import { useSelector } from "react-redux";

import Chats from "./Chats";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import NoChatSVG from "../../assets/Illustration/NoChat";

const GeneralApp = () => {
    const theme = useTheme();

    const { sidebar, room_id, chat_type } = useSelector(store => store.app);

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
                {
                    room_id !== null && chat_type === "individual"
                    ?
                        (
                            <Conversation />
                        )
                    :
                        (
                            <Stack
                                spacing={2}
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <NoChatSVG />
                                <Typography variant="subtitle2">Select  a conversation or start a new one</Typography>
                            </Stack>
                        )
                }
                
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
