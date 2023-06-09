import React, { useCallback } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Stack } from "@mui/material";

import RHFTextField from '../../components/hook-form/RHFTextField';
import FormProvider from '../../components/hook-form/FormProvider';

const ProfileForm = () => {

    const profileSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        about: Yup.string().required("About is required"),
        avatarUrl: Yup.string().required("Avatar is required").nullable(true),
    });

    const defaultValues = {
        name: '',
        about: '',
    };

    const methods = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setError,
        setValue,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isSubmitSuccessful,
        }
    } = methods;

    const values = watch();

    const handleDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];

        const newFile = Object.assign(file, {
            preview: URL.createObjectURL(file),
        });

        if (file) {
            setValue(
                'avatarUrl',
                newFile,
                {
                    shouldValidate: true,
                }
            );
        }
    }, [setValue]);

    const onSubmit = async data => {
        try {
            // call api
            console.log('data', data);
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
            <Stack direction={'column'} spacing={3}>
                <Stack spacing={3}>
                    {!!errors.afterSubmit && 
                        <Alert severity='Error'>{errors.afterSubmit.message}</Alert>
                    }
                    <RHFTextField
                        name='name'
                        label='Name'
                        helperText={'This name is visible to your contacts'}
                    />
                    <RHFTextField
                        name='about'
                        label='About'
                        multiline
                        rows={4}
                        maxRows={5}
                    />
                </Stack>
                <Stack direction={'row'} justifyContent={'flex-end'}>
                    <Button
                        color='primary'
                        size='large'
                        type='submit'
                        variant='outlined'
                    >
                        Save
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    )
};

export default ProfileForm;