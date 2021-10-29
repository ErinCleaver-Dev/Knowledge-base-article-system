import React from 'react';
import {Container, Alert, Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import {withStyles} from '@mui/styles';
import {Redirect} from 'react-router-dom';
import {useContext, useState, useEffect} from 'react';
import { UserContext } from '../../../App';
import Gravatar from 'react-gravatar';
import GoogleIcon from '@mui/icons-material/Google';
import {sendResetPasswordEmailFunc, linkWithGoogleFunc} from '../../../firebase/firebase.config';
import axios from 'axios';
import config from '../../../config';

//convert date function
const dateFunc = (timestamp) =>{
    var date = new Date(timestamp);
    return (`${date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()+
        ":"+date.getSeconds()}`);
}

const ProfileContainer = styled(Container)({
    width:'80%',
    maxWidth:'800px',
    margin:'30px auto',
    border: '2px solid #033F63',
    paddingLeft:'0px !important',
    ['@media (max-width:1150px)']:{
        width:'100%',
        paddingLeft:'10px !important',
    }
})

const ProfileInsideContainer = styled(ProfileContainer)({
    margin: '20px auto',
    width:'100%',
    display:'flex',
    border:'none',
    padding:'0px !important',
    ['@media (max-width:1100px)']:{
        flexDirection:'column'
    }

   
})

const LeftContainer = styled(Container)({
    flexBasis:'50%',
    width:'100%',
    height:'100%',
    ['@media (max-width:1100px)']:{
        flexBasis:'100%'
    }
})

const RightContainer = styled(Container)({
    flexBasis:'50%',
    width:'100%',
    backgroundColor:'#7c9885c7',
    height:'100%',
    border: '2px solid #033F63',
    ['@media (max-width:1100px)']:{
        flexBasis:'100%',
        marginTop:'20px',
        marginBottom: '5px'
    }
})


const Google = styled(GoogleIcon)({
    verticalAlign:'middle',
    padding:'20px 0 4px 0px',
    position: 'relative',
    color:'white',
    bottom:'12px'
})


const GoogleButton = styled(Button)({
    marginTop:'40px',
    paddingTop:'10px',
    backgroundColor:'#033F63',
    fontWeight:'bold',
    fontSize:'20px',
    color:'white',
    display:'block',
    marginBottom:'20px',
    width:'100%',
    '&:hover':{
        backgroundColor:'#ff5722',
    },
    '&:disabled':{
        color:'white',
        opacity:'0.6',   
    }
})

const ResetButton = styled(Button) ({
    backgroundColor: '#033F63',
    width:'100%',
    fontSize:'1.3em',
    fontWeight: 'bold',
    color: 'white',
    margin: '22px -3px',
    padding: '15px',
    '&:hover' : {
        backgroundColor: '#06283C',
    },
    '&:disabled':{
        color:'white',
        opacity:'0.6',   
    }
})


const styles = {
    h1: {
        color: 'black',
        fontSize: '1.6em',
        marginTop: '20px'
    },
    p:{
        color: '#033F63',
        marginTop: '10px',
        fontWeight:'bold',
        paddingLeft: '20px',
        fontSize:'18px'
    },
    label:{
        color: 'black',
        fontSize: '1.6em',
        marginTop: '20px',
        marginTop: '20px',
        display: 'block',
        fontWeight: 'bold'
    },
    gravatar:{
        ['@media (max-width:500px)']:{
            width:'200px',
            height:'200px'
        }
    }
}

const Profile = ({classes}) =>{
    const [user, setUser] = useContext(UserContext);
    const [SendSuccessfulMessage,setSendSuccessfulMessage] = useState(false);
    const [googleButtonDisabled, setGoogleButtonDisabled] = useState(false);
    const [resetPasswordButtonDisabled, setResetPasswordButtonDisabled]=useState(true);
    const [GoogleLinkMessage,setGoogleLinkMessage] = useState(false);
    const [name, setName] = useState(false);


    useEffect(()=>{
        if(user){
            axios.post(`${config.URL}api/getUserByUid`, {uid:user.uid}).then(result=>{
                    if(result.data.displayName){
                        setName(result.data.displayName);
                        return
                    }
                    let firstName = result.data.firstName;
                    let lastName =  result.data.lastName;
                    setName(firstName + " " + lastName);
                }).catch(e=>{
                    console.log(e)
                }) 
            
            user.providerData.map(item=>{
                if (item.providerId === 'password'){
                    setResetPasswordButtonDisabled(false)
                }
            })    

            user.providerData.map(item=>{
                if (item.providerId === 'google.com'){
                    setGoogleButtonDisabled(true)
                }
            })
        }
    },[user])

   
    const ResetPasswordEmailHandler =(e)=>{
        setGoogleLinkMessage(false);
        sendResetPasswordEmailFunc(user.email).then(()=>{
            setSendSuccessfulMessage('Email sent, please check your email!');
        })
        .catch(e=>{
            setSendSuccessfulMessage('Sever down, please try later!')
        })
    }

    const linkWithGoogleHandler = (e) =>{
        setSendSuccessfulMessage(false);
        linkWithGoogleFunc().then(result=>{
            console.log(result.user)
            setGoogleLinkMessage('Success - Your account is linked with Google!')
        }).catch(e=>{
            setGoogleLinkMessage(
            `Error - Link not successfully or reason you see error messages
            1. Your G-mail account has already linked and in use.
            2. Do not overClick button and please wait for processing!
            3. Something went wrong, please try later.`)
        })
    }

    return(
        <React.Fragment>
        {localStorage.getItem('isLoggedIn')? (
        <>  
        <h1>User Profile</h1>
        <Container>
        <ProfileContainer>
        <ProfileInsideContainer>
            <LeftContainer>
            <Gravatar
                className={classes.gravatar}
	            email={user.email}
	            size={300}
	            rating="pg"
	            default="wavatar"
	            style={{margin: '20px auto', borderRadius:'50%', display:'block', border:'4px solid #033F63'}}
            />
            <div>
                <GoogleButton component='button' type='button' onClick={linkWithGoogleHandler} disabled={googleButtonDisabled || GoogleLinkMessage==='Success - Your account is linked with Google!'}>Link with <Google/></GoogleButton>
            </div>
            {SendSuccessfulMessage? 
            <Alert variant="filled" severity={SendSuccessfulMessage==='Email sent, please check your email!'? 'success':'error'}>
                {SendSuccessfulMessage}
              </Alert>
                :null}
            {GoogleLinkMessage? 
            <Alert variant="filled" severity={GoogleLinkMessage==='Success - Your account is linked with Google!'?'success':'error'}>
                {GoogleLinkMessage}
              </Alert>
                :null}
            </LeftContainer>
            <RightContainer>
                <h1 className={classes.h1}>Display Name</h1>
                <p className={classes.p}>{name? (name):(null)}</p>
                <h1 className={classes.h1}>Email</h1>
                <p className={classes.p}>{user.email}</p>
                <h1 className={classes.h1}>Registered Date</h1>
                <p className={classes.p}>{user? dateFunc(Number(user.metadata.createdAt)):null}</p>
                <h1 className={classes.h1}>Last login At</h1>
                <p className={classes.p}>{user? dateFunc(Number(user.metadata.lastLoginAt)):null}</p>
                <label className={classes.label}>Reset Password</label>
                <ResetButton component='button' type='button' onClick={ResetPasswordEmailHandler} disabled={resetPasswordButtonDisabled}>ResetPassEmail</ResetButton>
                
            </RightContainer>
        </ProfileInsideContainer>
        </ProfileContainer>
        </Container>
        
        </>):(
            <Redirect to='/'/>
        )}
        </React.Fragment>
        
    )
}


export default withStyles(styles)(Profile);