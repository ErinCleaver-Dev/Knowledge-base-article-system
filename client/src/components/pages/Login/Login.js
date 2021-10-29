import React from 'react';
import { Container, Box, Alert, Divider, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {styled} from '@mui/material/styles';
import {withStyles} from '@mui/styles';
import img from '../../../images/bg.png';
import {Link, useHistory, Redirect} from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GoogleIcon from '@mui/icons-material/Google';
import {useState, useRef} from 'react';
import {sendResetPasswordEmailFunc, signInWithEmailAndPasswordFunc, googleLogin} from '../../../firebase/firebase.config';
import axios from 'axios';
import config from '../../../config/index';



const LoginContainer = styled(Container) ({
    width:'100%',
    height:'600px',
    backgroundImage: `url(${img})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    ['@media (max-width:1024px)']: {
        marginTop:'40px', 
    }
})

const ForgotPasswordContainer = styled(LoginContainer)({
    paddingTop:'50px',
    position:'relative',
})

const FormBox = styled(Box) ({
    margin:'auto',
    width:'80%',
    maxWidth:'600px',
    padding:'25px',
    backgroundColor:'#28666E',
    marginTop:'10px'
})

const ForgotPasswordBox = styled(FormBox)({
    position:'relative',
    top:'80px',
    
    
})

const Mail = styled(MailIcon)({
    position:'absolute',
    top:'25px',
    left: '5px'
})

const Key = styled(VpnKeyIcon)({
    position:'absolute',
    top:'25px',
    left: '5px'
})

const Google = styled(GoogleIcon)({
    verticalAlign:'middle',
    padding:'8px 5px'
})

const Line = styled(Divider)({
    color:'white',
    fontSize:'1.5em',
    marginBottom:'-8px',
    "&::before":{
        borderTop:'1.5px solid black'
    },
    "&::after":{
        borderTop:'1.5px solid black'
    }
})

const Button1 = styled(Button)({
    color:'#FEDC97',
    border:'#FEDC97 1px solid',
    flexBasis:'49%',
    '&:hover':{
        border:'#FEDC97 3px solid'
    },
    marginBottom: '10px',
    ['@media (max-width:640px)']: { 
        flexBasis:'100%'
    }
})

const Button2 = styled(Button)({
    backgroundColor:'#FEDC97',
    color:'#28666E',
    flexBasis:'49%',
    border:'#FEDC97 1px solid',
    '&:hover':{
        border:'#FEDC97 3px solid',
        backgroundColor:'#FEDC97'
    },
    marginBottom: '10px',
    ['@media (max-width:640px)']: { 
        flexBasis:'100%'
    }
})



const Styles = {
    h1:{
        fontSize:'1.5em', margin:'auto', textAlign:'center', paddingTop:'50px'
    },
    h11:{
        fontSize:'1.2em', color:'white', textAlign:'center', letterSpacing:'1px', marginBottom:'20px'
    },
    span:{
        borderLeft:'2px solid black', paddingLeft:'10px', marginLeft:'5px'
    },
    label:{
        display:'block', color:'white', fontSize:'0.9em'
    },
    input:{
        display:'block', width:'100%', outline:'none', padding:'8px', boxSizing:'border-box', paddingLeft: '30px'
    },
    inputError:{
        display:'block', width:'100%', outline:'none', padding:'8px', boxSizing:'border-box', paddingLeft: '30px', border:'3px red solid'
    },
    spanError:{
        color:'#ffe81b'
    },
    containerOther:{
        marginBottom:'10px', position:'relative'
    },
    checkBox:{
        filter: 'invert(100%) hue-rotate(18deg) brightness(1.7)', cursor: 'pointer',transform: 'scale(2)', margin: '10px'
    },
    button:{
        display:'block', width:'100%', fontWeight:'900', padding: '6px 0', marginTop: '15px', fontSize:'1.2em', backgroundColor:'#FEDC97', cursor:'pointer'
    },
    forgotPassword:{
        fontSize:'14px', marginTop:'8px', color:'#FEDC97', letterSpacing:'1px', textShadow:'3px 3px 3px black', cursor:'pointer', display:'inline-block', '&:hover':{
            boxShadow: '1px 1px 1px black, -1px -1px 1px white'
        }, '&:active':{
            boxShadow: '1px 1px 3px black inset, -1px -1px 3px white inset'
        }
    },
    googleButton:{
        backgroundColor:'#FF5C00', display:'block', width:'100%', fontWeight:'900', marginTop: '15px', fontSize:'0.8em', cursor:'pointer', color:'white', '&:disabled':{
            cursor: 'wait'
        }
    },
    twoButtons:{
        display:'flex', justifyContent:'space-between', ['@media (max-width:640px)']: { 
            flexDirection:'column'
        }
    }
}



const Login = ({classes}) => {

    const originalValue = {
        fields:{
            email:'',
            password:'',
        },
        errors:{
            email:'',
            password:'',
        }
    }

    const [fields, setFields] = useState(originalValue);
    const [passwordForget, setPasswordForget] = useState(false);
    const [ErrorResetEmail, setErrorResetEmail] = useState(false);
    const [disable, setDisabled] = useState(false);
    const forgotPasswordEmailRef = useRef();
    const [loginError, setLoginError] = useState({emailLoginError:'',googleLoginError:'' });
    let history = useHistory();

    //validate
    const validate = (name, value) => {
        switch (name) {
            case 'email':
                if (!value) {
                    return '*Email is Required*';
                } else if (!value.match(
                        /^[a-z0-9]([a-z0-9_\-\.]*)@([a-z0-9_\-\.]*)(\.[a-z]{2,4}(\.[a-z]{2}){0,2})$/i
                    )) {
                    return '*Enter a valid email address*';
                } else {
                    return '';
                }
            case 'password':
                if (!value) {
                    return '*Password is Required*';
                }else {
                    return '';
                }
            default:
                {
                    return '';
                }
        }
    };

    //ForgotPasswordButton
    const handleForgotPasswordButton = (e) =>{
        setPasswordForget(true);
        setLoginError({emailLoginError:'',googleLoginError:'' });
    }

    //sendPasswordResetEmailHandlerButton
    const sendPasswordResetEmailHandler = (e)=>{
        if(fields.errors.email){
            return;
        }
        let value = forgotPasswordEmailRef.current.value
        sendResetPasswordEmailFunc(value).then(()=>{
            setErrorResetEmail('Success - Check your email to reset your password!')
        })
        .catch(e=>{
            setErrorResetEmail('Error - Email was not found in our system');
        })
    }

    //handleInputs
    const handleUserInput = (e)=>{
        setFields({
            fields:{
                ...fields.fields,
                [e.target.name]: e.target.value,
           },
           errors:{
                ...fields.errors,
                [e.target.name]: validate(e.target.name, e.target.value),
           }
           })
        setLoginError({emailLoginError:'',googleLoginError:'' });
        };

    //googleLogin
   const googleLoginHandler = async(e) =>{
    setLoginError({emailLoginError:'',googleLoginError: ''});
    setDisabled(true)
       await googleLogin().then(async(result)=>{
        let user = result.user;
        let uid = result.user.uid;
        await axios.post(`${config.URL}api/getUserByUid`, {uid:uid}).then(result=>{
            if(result.data){
                //console.log(result.data)
                //console.log('test 1')
                window.localStorage.setItem('isLoggedIn', 'true');
                history.push('/?message=loginSuccessfully');
                return;
            }else{
            //Store user data in Mongoose
            //console.log('test 2')
           const body = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid
            }
           axios.post(`${config.URL}api/addUser`, body).then((result)=>{
               if(result.data.result === 'true'){
               setDisabled(false);
               //console.log('test 3')
               window.localStorage.setItem('isLoggedIn', 'true');
               history.push('/?message=loginSuccessfully');
               }
           })
           .catch(e=>{
            setDisabled(false);
               setLoginError({emailLoginError:'',googleLoginError: 'Sever Down, please bear with us!' });
           })
            }
        })
        .catch(e=>{
            setDisabled(false);
            setLoginError({emailLoginError:'',googleLoginError: 'Sever Down, please bear with us!' });
        })
   }).catch(e=>{
    setDisabled(false);
    setLoginError({emailLoginError:'',googleLoginError: 'Login is not successfully, please wait and try later, thanks!' });
   })
}

   //handleSubmit
   const handleSubmit = async(e) =>{
        e.preventDefault();
        
        let errorMessages = {};
        
        Object.keys(fields.fields).forEach((name)=>{
          let message = validate(name, fields.fields[name]);
          if (message && message.length > 0){
            errorMessages[name] = message;
          }
        });

        if (Object.keys(errorMessages).length > 0){
          setFields({
            fields:{
              ...fields.fields,
            },
            errors:{
              ...errorMessages,
            }
          })
        }else{
          const data = {
            ...fields.fields,
          }

          //loginWithFirebase
          signInWithEmailAndPasswordFunc(data.email, data.password).then(credential=>{
             window.localStorage.setItem('isLoggedIn', 'true');
              history.push('/?message=loggedInSuccessfully');    
          }).catch(e=>{
              setLoginError({emailLoginError:'Error - Credential Error, please type correct Email or Password! or try Google Login',googleLoginError:'' })
          })
        }
    };
   
    return (
        <React.Fragment>
        {!localStorage.getItem('isLoggedIn')? (
            <React.Fragment>
                {passwordForget?
        (<ForgotPasswordContainer>
            {ErrorResetEmail?
            <Alert variant="filled" severity={ErrorResetEmail==='Success - Check your email to reset your password!'?'success':'error'}>
                {ErrorResetEmail}
              </Alert>
                :null}
            <ForgotPasswordBox>
            <h1 className={classes.h11}>Type your email to receive Password Reset Email !</h1>
                <div className={classes.containerOther}>
                    <label className={classes.label}>Put Email here {fields.errors.email? <span className={classes.spanError}>{fields.errors.email}</span>: null}</label>
                    <input  ref={forgotPasswordEmailRef} className={fields.errors.email? classes.inputError: classes.input} type='text' name='email' value={fields.fields.email} onChange={handleUserInput} placeholder='Email'/>
                    <Mail/>
                </div>
                <div className={classes.twoButtons}>
                <Button2 variant="contained" onClick={sendPasswordResetEmailHandler} endIcon={<SendIcon />}>
                        Send
                </Button2>
                <Button1 component='button' type='button' onClick={()=>{setPasswordForget(false);setErrorResetEmail(false)}} variant="outlined" startIcon={<DeleteIcon />}>
                        Cancel
                </Button1>
                </div>
            </ForgotPasswordBox>
        </ForgotPasswordContainer>)
        :
        (
            <LoginContainer>
                {loginError.emailLoginError?
                <Alert variant="filled" severity='error'>
                {loginError.emailLoginError}
                </Alert>
                :null}
                {loginError.googleLoginError?
                <Alert variant="filled" severity='error'>
                {loginError.googleLoginError}
                </Alert>
                :null}
                <h1 className={classes.h1}>Login <span className={classes.span}><Link to='/EjKBA/signUp'>Need an account</Link></span></h1>
                <FormBox component='form' onSubmit={handleSubmit}>
                
                <div className={classes.containerOther}>
                    <label className={classes.label}>Email {fields.errors.email? <span className={classes.spanError}>{fields.errors.email}</span>: null}</label>
                    <input className={fields.errors.email? classes.inputError: classes.input} type='text' name='email' value={fields.fields.email} onChange={handleUserInput} placeholder='Email'/>
                    <Mail/>
                </div>
                <div className={classes.containerOther}>
                    <label className={classes.label}>Password {fields.errors.password? <span className={classes.spanError}>{fields.errors.password}</span>: null}</label>
                    <input className={fields.errors.password? classes.inputError: classes.input} type='password' name='password' value={fields.fields.password} onChange={handleUserInput} placeholder='Password'/>
                    <Key/>
                </div>
                <div>
                <button className={classes.button} disabled={disable} type='submit'>Login</button>
                </div>
                <h1 className={classes.forgotPassword} onClick={handleForgotPasswordButton}>Forgot Password?</h1>
                <Line textAlign="center">or</Line>
                <button className={classes.googleButton} disabled={disable} onClick={googleLoginHandler} type='button'>Google<Google/>Login</button>
                
                </FormBox>
            </LoginContainer>
            ) }
            </React.Fragment>
        ):(
            <Redirect to='/'/>
        )}
        
            </React.Fragment>
    )
}

export default withStyles(Styles)(Login);
