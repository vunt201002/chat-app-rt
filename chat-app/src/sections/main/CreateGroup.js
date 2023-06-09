import React from 'react';
import {
    Alert,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    Stack
} from '@mui/material';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import RHFTextField from '../../components/hook-form/RHFTextField';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFAutocomplete from '../../components/hook-form/RHFAutocomplete';

const MEMBERS = ['Name 1', 'Name 2', 'Name 3'];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGroupForm = ({ handleClose }) => {
    const newGroupSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        members: Yup.array().min(2, "Must have at least 2 members"),
    });

    const defaultValues = {
        title: '',
        members: [],
    };

    const methods = useForm({
        resolver: yupResolver(newGroupSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setError,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
            isSubmitSuccessful,
            isValid,
        }
    } = methods;

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
            <Stack spacing={3} my={3}>
                {!!errors.afterSubmit && 
                    <Alert severity='Error'>{errors.afterSubmit.message}</Alert>
                }
                <RHFTextField name='title' label='Group name'/>
                <RHFAutocomplete
                    name='members'
                    label='Members'
                    multiple
                    freeSolo
                    options={MEMBERS.map(option => option)}
                    ChipProps={{
                        size: 'medium'
                    }}
                />
                <Stack
                    spacing={2}
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                >   
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type='submit' variant='contained'>
                        Create
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    )
};

const CreateGroup = ({ open, handleClose }) => {
    return (
        <Dialog
            fullWidth
            maxWidth='xs'
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            sx={{
                p: 4,
            }}
        >
            <DialogTitle>Create group</DialogTitle>
            <DialogContent>
                {/* form */}
                <CreateGroupForm handleClose={handleClose}/>
            </DialogContent>
      </Dialog>
    )
};

export default CreateGroup;