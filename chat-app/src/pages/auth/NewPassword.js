import React from 'react';
import { Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { CaretLeft } from 'phosphor-react';

import NewPasswordForm from '../../sections/auth/NewPasswordForm';

const NewPassword = () => {
    return (
        <>
            <Stack
                spacing={2}
                sx={{
                    mb: 5,
                    position: 'relative'
                }}
            >
                <Typography variant='h3' paragraph>
                    Reset password
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5, }}>
                    Please set your new password
                </Typography>
            </Stack>
            {/* new password form */}
            <NewPasswordForm />
        </>
    )
};

export default NewPassword;