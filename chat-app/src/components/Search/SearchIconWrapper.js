import { styled } from '@mui/material/styles';

const SearchIconWrapper = styled("div")(({ theme }) => ({
    position: 'absolute',
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export default SearchIconWrapper;
