import React from 'react';
import { Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import RegisterForm from '../../sections/auth/RegisterForm';
import AuthSocial from '../../sections/auth/AuthSocial';

const Register = () => {
    return (
        <>
            <Stack
                spacing={2}
                sx={{
                    mb: 5,
                    position: 'relative'
                }}
            >
                <Typography variant='h4'>Get started to chat</Typography>
                <Stack direction={'row'} spacing={0.5}>
                    <Typography variant='body2'>Already have ac account?</Typography>
                    <Link component={RouterLink} to={'/auth/login'} variant='subtitle2'>
                        Sign in
                    </Link>
                </Stack>
                {/* Register form */}
                <RegisterForm />

                <Typography
                    component={'div'}
                    sx={{
                        color: 'text.secondary',
                        mt: 3,
                        typography: 'caption',
                        textAlign: 'center',
                    }}
                >
                    {'By signing up, I agree to  '}
                    <Link underline='always' color={'text.primary'}>
                        Term of service
                    </Link>
                    {'  and  '}
                    <Link underline='always' color={'text.primary'}>
                        Privacy policy
                    </Link>
                </Typography>
                <AuthSocial />
            </Stack>
        </>
    )
};

export default Register;