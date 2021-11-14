import {OutlinedInput, InputAdornment} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import React, {useState, useEffect} from 'react'
import Cookies from 'universal-cookie';
import { useHistory , withRouter} from 'react-router-dom';
import _ from 'lodash';

const useOutlinedInputStyles = makeStyles(theme => ({
    root: {
      "& $notchedOutline": {
        borderColor:'transparent'
      },
      "&:hover $notchedOutline": {
        borderColor: "black"
      },
      "&$focused $notchedOutline": {
        borderColor: "black"
      }
    },
    focused: {},
    notchedOutline: {}
  }));



const SearchBoxInput = styled(OutlinedInput) ({
    alignSelf: 'center',
    marginTop:'8px',
    marginBottom: '20px',
    width: '100%',
    fontSize:'1.6em',
    boxShadow:'1px 1px 3px black inset',
    
})

const SearchBox = ({location}) => {
    const cookie = new Cookies();

    const outlinedInputClasses = useOutlinedInputStyles();

    const [search, setSearch] = useState(cookie.get('search')|| '')
    const history = useHistory();
    const inputRef = useRef(null);

    //console.log('test searchBox 1');
    //console.log(search)
    useEffect(()=>{
        //console('test searchBox 2')
        inputRef.current.focus();
        if(location.pathname === "/EjKBA/search" && location.search.startsWith('?q=')){
            let searchTerm = location.search.replace('?q=', '');
            searchTerm = searchTerm.replace('%20', ' ')
            //console.log(searchTerm)
            setSearch(searchTerm);
        }
    },[location.search])



    const handleKeyPress = (event) => {
        //console.log(event)
        
        if(event.key == 'Enter') {
            //console.log("Search term entered ", event.target.value)
            let d = new Date();
            d.setTime(d.getTime() + (60*60*1000));
            cookie.set("search", event.target.value, {path: '/', expires: d});
            if(event.target.value === ''){
                return;
            }

            //change every word to lowercase;
            let searchTerm = _.lowerCase(event.target.value);
            setSearch(searchTerm)
            history.push(`/EjKBA/search?q=${searchTerm}`)
            //window.location.reload(); 
        }
    }



    const handleInputChange = (event) =>{
        setSearch(event.target.value);
    }

    return (
        <>
            <SearchBoxInput
                classes={outlinedInputClasses}
                id="outlined-adornment-amount"
                onKeyUp={handleKeyPress}
                ref={inputRef}
                value={search}
                onChange={handleInputChange}
                startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
            />
        </>
    )
}

export default withRouter(SearchBox);
