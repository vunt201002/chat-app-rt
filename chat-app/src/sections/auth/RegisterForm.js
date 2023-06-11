import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
import { useDispatch } from 'react-redux'

import RHFTextField from '../../components/hook-form/RHFTextField';
import FormProvider from '../../components/hook-form/FormProvider';
import { registerUser } from '../../redux/slices/auth';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const registerSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().required('Email is required').email("Email mus be valid"),
        password: Yup.string().required("Password is required"),
    });

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    const methods = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: {
            errors
        }
    } = methods;

    const onSubmit = async data => {
        try {
            // call api
            dispatch(registerUser(data));
        } catch (err) {
            console.log(err);
            reset();
            setError("afterSubmit", {
                ...err,
                message: err.message,
            });
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ my: 2 }}>
                {!!errors.afterSubmit && 
                    <Alert severity='Error'>{errors.afterSubmit.message}</Alert>
                }

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <RHFTextField name='firstName' label='First name'/>
                    <RHFTextField name='lastName' label='Last name'/>
                </Stack>

                <RHFTextField name='email' label='Email address'/>
                <RHFTextField
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    />

                <Button
                    fullWidth
                    color='inherit'
                    size='large'
                    type='submit'
                    variant='contained'
                    sx={{
                        bgcolor: 'text.primary',
                        color: theme => theme.palette.mode === 'light'
                                ? 'common.white'
                                : 'grey.800',
                        '&:hover': {
                            bgcolor: 'text.primary',
                            color: theme => theme.palette.mode === 'light'
                                ? 'common.white'
                                : 'grey.800',
                        },
                    }}
                >
                    Create account
                </Button>
                
            </Stack>

        </FormProvider>
    )
};

export default RegisterForm;