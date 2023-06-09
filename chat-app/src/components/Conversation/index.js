import React from 'react';
import {
    Box,
    Stack,
} from '@mui/material';

import Header from './Header';
import Footer from './Footer';
import Message from './Message';

const Conversation = () => {    

    return (
        <Stack
            sx={{
                height: '100%',
                maxHeight: '100vh',
                width: 'auto',
            }}
        >
            {/* header */}
            <Header />

            {/* msg */}
            <Box
                sx={{
                    width: '100%',
                    flexGrow: 1,
                    height: '100%',
                    overflowY: 'auto'
                }}
            >
                <Message menu={true}/>
            </Box>

            {/* footer */}
            <Footer />
        </Stack>
    )
};

export default Conversation;