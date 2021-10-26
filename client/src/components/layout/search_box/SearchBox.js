import {OutlinedInput, InputAdornment} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import React from 'react'


const SearchBoxInput = styled(OutlinedInput) ({
    alignSelf: 'center',
    width: '600px',
    ['@media (max-width:1024px)']: {
        width: '100%'
    }
})

const SearchBox = () => {
    return (
        <>
            <SearchBoxInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            />
        </>
    )
}

export default SearchBox
