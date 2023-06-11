import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, IconButton, InputAdornment, Stack } from "@mui/material";
import { Eye, EyeSlash } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import RHFTextField from '../../components/hook-form/RHFTextField';
import FormProvider from '../../components/hook-form/FormProvider';
import { newPassword } from '../../redux/slices/auth';

const NewPasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const dispatch = useDispatch();
    const [queryParameters] = useSearchParams();

    const newPasswordSchema = Yup.object().shape({
        password: Yup
                    .string()
                    .min(6, "Password at least 6 characters")
                    .required("New password is required"),
        passwordConfirm: Yup
                    .string()
                    .required("Confirm password is required")
                    .oneOf([Yup.ref('password'), null], 'Confirm password does not match'),
    });

    const defaultValues = {
        password: '',
        passwordConfirm: '',
    };

    const methods = useForm({
        resolver: yupResolver(newPasswordSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isSubmitSuccessful,
        }
    } = methods;

    const onSubmit = async data => {
        try {
            // call api
            dispatch(newPassword(
                {
                    ...data,
                    token: queryParameters.get('token')
                }
            ));            
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
            <Stack spacing={3}>
                {!!errors.afterSubmit && 
                    <Alert severity='Error'>{errors.afterSubmit.message}</Alert>
                }
                <RHFTextField
                    name='password'
                    label='New password'
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
                <RHFTextField
                    name='passwordConfirm'
                    label='Confirm password'
                    type={showCPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton onClick={() => setShowCPassword(!showCPassword)}>
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
                    Submit
                </Button>
            </Stack>
        </FormProvider>
    )
};

export default NewPasswordForm;