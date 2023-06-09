import React from 'react';
import { Box, Stack } from '@mui/material';

import { Chat_History } from '../../data/index';
import { DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, Timeline } from './MsgTypes';

const Message = ({ menu }) => {

    return (
        <Box p={3}>
            <Stack spacing={3}>
                {Chat_History.map((el, index) => {
                    switch (el.type) {
                        case 'divider':
                            // timeline
                            return <Timeline key={index} el={el}/>

                        case 'msg':
                            switch (el.subtype) {
                                case 'img':
                                    // img
                                    return <MediaMsg key={index} el={el} menu={menu}/>
                                case 'doc':
                                    // doc
                                    return <DocMsg key={index} el={el} menu={menu}/>
                                case 'link':
                                    // link
                                    return <LinkMsg key={index} el={el} menu={menu}/>
                                case 'reply':
                                    // reply
                                    return <ReplyMsg key={index} el={el} menu={menu}/>

                                default:
                                    // text msg
                                    return <TextMsg key={index} el={el} menu={menu}/>
                            }
                        default:
                            return <div key={index}></div>
                    }
                })}
            </Stack>
        </Box>
    )
};

export default Message;