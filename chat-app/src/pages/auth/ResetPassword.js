import React from 'react';
import { Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { CaretLeft } from 'phosphor-react';

import ResetPasswordForm from '../../sections/auth/ResetPasswordForm';

const ResetPassword = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
                <Typography variant='h3' paragraph>
                    Forgot your password?
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5, }}>
                    Please enter your email address associated with
                    your account. We will email your a link to reset
                    your password.
                </Typography>
                {/* Reset password form */}
                <ResetPasswordForm />
                <Link
                    component={RouterLink}
                    to='/auth/login'
                    color='inherit'
                    variant='sutitle2'
                    sx={{
                        mt: 3,
                        mx: 'auto',
                        alignItems: 'center',
                        display: 'inline-flex',
                    }}>
                        <CaretLeft />
                        Return to sign in
                </Link>
            </Stack>
        </>
    )
};

export default ResetPassword;