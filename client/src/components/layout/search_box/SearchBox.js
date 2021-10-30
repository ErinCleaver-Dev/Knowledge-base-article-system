import {OutlinedInput, InputAdornment} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';



const SearchBoxInput = styled(OutlinedInput) ({
    alignSelf: 'center',
    marginBottom: '20px',
    width: '600px',
    ['@media (max-width:1024px)']: {
        width: '100%'
    }
})

const SearchBox = () => {
    const cookie = new Cookies();

    const [search, setSearch] = useState(cookie.get('search') || '')
    const history = useHistory();
    const handleKeyPress = (event) => {
        console.log(event)
        
        if(event.key == 'Enter') {
            console.log("Search term entered ", event.target.value)
            let d = new Date();
            d.setTime(d.getTime() + (60*60*1000));
            cookie.set("search", event.target.value, {path: '/', expires: d})
            setSearch(event.target.value)
            history.push(`/search?q=${event.target.value}`)
        }
    }

    return (
        <>
            <SearchBoxInput
                id="outlined-adornment-amount"
                onKeyUp={handleKeyPress}
                defaultValue={search}
                startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            />
        </>
    )
}

export default SearchBox
