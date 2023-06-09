import React from 'react';
import { Divider, IconButton, Stack } from '@mui/material';
import { GithubLogo, GoogleLogo, TwitterLogo } from 'phosphor-react';

const AuthSocial = () => {
    return (
        <div>
            <Divider
                sx={{
                    my: 2.5,
                    typography: 'overline',
                    color: 'text.disabled',
                    '&:before, ::after': {
                        borderTopStyle: 'dashed',
                    }
                }}>
                Or
            </Divider>
            <Stack direction={'row'} justifyContent={'center'} spacing={2}>
                <IconButton>
                    <GoogleLogo color='#df3e30'/>
                </IconButton>
                <IconButton>
                    <GithubLogo />
                </IconButton>
                <IconButton>
                    <TwitterLogo color='#1c9cea'/>
                </IconButton>
            </Stack>
        </div>
    )
};

export default AuthSocial;