import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

RHFTextField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.node,
};

export default function RHFTextField({ name, helperText, ...ohter }) {
    const { control } = useFormContext();

    return (
        <Controller name={name} control={control} render={({ field, fieldState: { error } }) => (
            <TextField
                {...field}
                fullWidth
                error={!!error}
                helperText={error ? error.message : helperText}
                {...ohter}
                value={
                    typeof field.value === 'number' && field.value === 0
                        ? ""
                        : field.value
                }
            />
        )}/>
    )
};