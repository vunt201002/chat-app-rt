import { Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material';
import React from 'react';
import { MagnifyingGlass } from 'phosphor-react';

import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { CallElement } from '../../components/CallElement';
import { memberList } from '../../data';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
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
            <DialogTitle sx={{ mb: 3, }}>Start call</DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    {/* search */}
                    <Stack sx={{ width: '100%' }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color='#709ce6'/>
                            </SearchIconWrapper>
                            <StyledInputBase placeholder='Search'/>
                        </Search>
                    </Stack>
                    {/* list call */}
                    {memberList.map(el => (
                        <CallElement key={el.id} {...el}/>
                    ))}
                </Stack>
            </DialogContent>
      </Dialog>
    )
};

export default StartCall;