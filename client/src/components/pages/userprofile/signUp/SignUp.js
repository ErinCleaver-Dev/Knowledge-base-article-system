import React from 'react';
import { Container, Box, Alert} from '@mui/material';
import {styled} from '@mui/material/styles';
import {withStyles} from '@mui/styles'
import img from '../../../../images/bg.png';
import {Link, Redirect} from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useState, useRef, useContext} from 'react';
import {signUpFunc, signOutFunc} from '../../../../firebase/firebase.config';
import config from '../../../../config/index';
import axios from 'axios';



const SignUpContainer = styled(Container) ({
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

const FormBox = styled(Box) ({
    margin:'auto',
    width:'80%',
    maxWidth:'600px',
    padding:'25px',
    backgroundColor:'#28666E',
    marginTop:'10px'
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

const Account = styled(AccountCircleIcon)({
    position:'absolute',
    top:'25px',
    left: '5px'
})


const Styles = {
    h1:{
        fontSize:'1.5em', margin:'auto', textAlign:'center', paddingTop:'50px'
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
    containerFirstLast:{
        display:'flex', flexWrap:'wrap', justifyContent:'space-between', boxSizing:'border-box', marginBottom:'5px'
    },
    containerSingle:{
        flexBasis:'49%', boxSizing:'border-box', position: 'relative',['@media (max-width:600px)']: {
            flexBasis:'100%'
        }
    },
    containerOther:{
        marginBottom:'5px', position:'relative'
    },
    checkBox:{
        filter: 'invert(100%) hue-rotate(18deg) brightness(1.7)', cursor: 'pointer',transform: 'scale(2)', margin: '10px'
    },
    button:{
        display:'block', width:'100%', fontWeight:'900', padding: '6px 0', marginTop: '5px', fontSize:'1.2em', backgroundColor:'#FEDC97', cursor:'pointer'
    }
}






const SignUp = ({classes}) => {


    const originalValue = {
        fields:{
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            rePassword:''
        },
        errors:{
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            rePassword:'',
        }
    }

    const [fields, setFields] = useState(originalValue);
    const checkBoxRef = useRef();
    const [error, setError] = useState('');
   


    //validate
    const validate = (name, value) => {
        switch (name) {
            case 'firstName':
                if (!value) {
                    return '*First name is Required*';
                } else if (!value.match(/^[a-z A-Z]+$/g)) {
                    return '*Please enter valid first name*';
                } else {
                    return '';
                }
            case 'lastName':
                if (!value) {
                    return '*Last name is Required*';
                } else if (!value.match(/^[a-z A-Z]+$/g)) {
                    return '*Please enter valid last name*';
                } else {
                    return '';
                }
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
                } else if (value.length < 8 || value.length > 15) {
                    return '*Please fill at least 8 character and not over 15*';
                } else if (!value.match(/[a-z]/g)) {
                    return '*Please enter at least lower character*';
                } else if (!value.match(/[A-Z]/g)) {
                    return '*Please enter at least upper character*';
                } else if (!value.match(/[0-9]/g)) {
                    return '*Please enter at least one digit*';
                } else if (!value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)) {
                    return '*Please enter at least one symbol(@!?-_=+*&%*/';
                } else {
                    return '';
                }
            case 'rePassword':
                if (!value) {
                    return '*Renter your password is Required*';
                } else if (value !== fields.fields.password) {
                    return '*Please match your password*'
    
                } else {
                    return '';
                }
            default:
                {
                    return '';
                }
        }
    };

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
        setError(false)
        };

        const checkBoxHandler = (e) =>{
            setFields({
                fields:{
                    ...fields.fields,
                    [e.target.name]: e.target.value,
               },
               errors:{
                    ...fields.errors,
                    [e.target.name]: validate(e.target.name, e.target.value),
                    ['checkBox']: ''
               }
               })
            setError(false)
            };
        

   const handleSubmit = async(e) =>{
        e.preventDefault();
        setError(false);
        
        let errorMessages = {};
        // console.log(checkBoxRef.current.checked)
        if (!checkBoxRef.current.checked){
            errorMessages['checkBox'] = '*Please click the checkBox before Register*'
        }

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
          //register in firebase
          await signUpFunc(data.email,data.password).then(userCredential=>{
            //   console.log(userCredential);
            //   console.log(userCredential.user.uid)
            const body = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                uid: userCredential.user.uid
            }
            const headers ={
                'Content-Type': 'application/json',
            }
            //Store user data in Mongoose
            axios.post(`${config.URL}api/addUser`, body, headers)
            .catch(e=>{
                setError('Sever Down, please bear with us!')
            })
            setError('Account was registered successfully, now you can login!')

          }).catch(e=>{
            const errorMessage = 'Error - Email has already in use!'
            setError(errorMessage);
          })
            signOutFunc();
        }

    };
   
    return (
        <React.Fragment>
        {!localStorage.getItem('isLoggedIn')? (
        <SignUpContainer>
        {error ? (
        <Alert variant="filled" severity={error==='Account was registered successfully, now you can login!'?"success" :"error"}>
        {error}
      </Alert>)
        :null}
        <h1 className={classes.h1}>SignUp <span className={classes.span}><Link to='/EjKBA/login'>Had an account</Link></span></h1>
        <FormBox component='form' onSubmit={handleSubmit}>
        <div className={classes.containerFirstLast}>
            <div className={classes.containerSingle}>
            <label className={classes.label}>First Name {fields.errors.firstName? <span className={classes.spanError}>{fields.errors.firstName}</span>: null}</label>
            <input className={fields.errors.firstName? classes.inputError: classes.input} type='text' name="firstName" value={fields.fields.firstName} onChange={handleUserInput}  placeholder='First Name'/>
            <Account/>
            </div>
            <div className={classes.containerSingle}>
            <label className={classes.label}>Last Name {fields.errors.lastName? <span className={classes.spanError}>{fields.errors.lastName}</span>: null}</label>
            <input className={fields.errors.lastName? classes.inputError: classes.input} type='text'name='lastName' value={fields.fields.lastName} onChange={handleUserInput} placeholder='Last Name'/>
            <Account/>
            </div>
        </div>
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
        <div className={classes.containerOther}>
            <label className={classes.label}>Re-Password {fields.errors.rePassword? <span className={classes.spanError}>{fields.errors.rePassword}</span>: null}</label>
            <input className={fields.errors.rePassword? classes.inputError: classes.input} type='password' name='rePassword' value={fields.fields.rePassword} onChange={handleUserInput} placeholder='Re-Password'/>
            <Key/>
        </div>
        <input ref={checkBoxRef} className={classes.checkBox} name='policy' onClick={checkBoxHandler} type='checkbox'/><label>I agree <span style={{color:'#FEDC97', textDecoration:'underline', letterSpacing:'1px'}}>Terms of Use</span> and <span style={{color:'#FEDC97', textDecoration:'underline', letterSpacing:'1px'}}>Privacy Policy</span>{fields.errors.checkBox? <span className={classes.spanError}>{fields.errors.checkBox}</span>:null}</label>
        <div>
        <button className={classes.button} type='submit'>Register</button>
        </div>
        </FormBox>
    </SignUpContainer>
    ):(<Redirect to='/'/>)}
           </React.Fragment>
    )
}

export default withStyles(Styles)(SignUp);


