import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Stack } from "@mui/material";
import { useDispatch } from 'react-redux';

import RHFTextField from '../../components/hook-form/RHFTextField';
import FormProvider from '../../components/hook-form/FormProvider';
import { forgotPassword } from '../../redux/slices/auth';

const ResetPasswordForm = () => {
    const dispatch = useDispatch();

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email("Email mus be valid"),
    });

    const defaultValues = {
        email: '@gmail.com',
    };

    const methods = useForm({
        resolver: yupResolver(ResetPasswordSchema),
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
            dispatch(forgotPassword(data));
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
                <RHFTextField name='email' label='Email address'/>
                
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
                    Send request
                </Button>
            </Stack>
        </FormProvider>
    )
};

export default ResetPasswordForm;