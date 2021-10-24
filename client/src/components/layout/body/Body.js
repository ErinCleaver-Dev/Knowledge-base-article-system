import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'



const Body = (props) => {
    return (
        <div>
        <Navbar loggedIn={props.loggedIn}/>
        {props.loggedIn ? (<Sidebar/>) : (null)} 
        {props.children}
        </div>
    )
}

export default Body
