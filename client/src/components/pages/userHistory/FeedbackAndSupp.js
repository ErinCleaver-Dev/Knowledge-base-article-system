import React, {useState}from 'react';
import {Container, Grid, Divider, Button, Alert} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';
import Config from '../../../config/index';


const FeedBackContainer = styled(Container) ({
    border: '#28666E solid 3px',
    minHeight:'500px',
    margin: '0',
    marginTop:'10px',
    padding:'12px !important',
    boxSizing:'border-box',
    paddingRight:'30px !important',
    display:'flex',
    alignSelf:'center',
    flexDirection:'column',
    position:'relative',
    paddingBottom:'30px !important',
    'h1':{
        fontSize:'1.6em',
        textAlign:'center'
    }
    
})

const FeedBackContentGrid = styled(Grid)({
    justifyContent:'center',
    'label':{
        display:'block',
        width:'60%',
        margin:'auto',
        fontWeight:'bold',
        fontSize:'1.4em',
        marginTop:'15px',
        ['@media (max-width:900px)']: { 
            width:'90%'
        }
    },
    'input':{
        display:'block',
        backgroundColor:'#FFEEDD',
        width:'60%',
        margin:'auto',
        padding:'10px',
        boxSizing:'border-box',
        fontSize:'1.2em',
        border:'black solid 1px',
        boxShadow:'inset 1px 1px 1px black, -2px -2px 1px white inset',
        ['@media (max-width:900px)']: { 
            width:'90%'
        }
    },
    'textarea':{
        display:'block',
        backgroundColor:'#FFEEDD',
        margin:'auto',
        width:'60%',
        fontSize:'1.2em',
        padding:'10px',
        boxSizing:'border-box',
        minHeight:'150px',
        border:'black solid 1px',
        boxShadow:'inset 1px 1px 1px black, -2px -2px 1px white inset',
        ['@media (max-width:900px)']: { 
            width:'90%'
        }
    },
    'Button':{
        display:'block',
        margin:'auto',
        marginTop:'20px',
        color:'white',
        backgroundColor:'#28666E',
        width:'60%',
        padding:'10px',
        boxSizing:'border-box',
        fontSize:'1.4em',
        '&:hover':{
            backgroundColor:'#06283C',
        },['@media (max-width:900px)']: { 
            width:'90%'
        }
    }
})

const Line = styled(Divider)({
    color:'black',
    verticalAlign:'center',
    fontSize:'1.5em',
    marginBottom:'-8px',
    "&::before":{
        borderTop:'1.5px solid black'
    },
    "&::after":{
        borderTop:'1.5px solid black'
    },
    'span':{
        position:'relative',
        top:'7px'
    }
})

const ContactGrid = styled(Grid)({
    marginTop:'20px',
    'h1':{
        textAlign:'left !important',
        margin:'auto',
        width:'60%',
        marginTop:'10px',
        ['@media (max-width:900px)']: { 
            width:'90%'
        }
    }
})


const FeedbackAndSupp = () => {

    const [fields, setFields] = useState({
        fields:{
            reason:'',
            postContent:'',
        },
        errors:{
            reason:'',
            postContent:'',
        }
    })
    const history = useHistory(); 
    const [errorMessage, setErrorMessage] = useState(false);

    //validate
    const validate = (name, value) => {
        switch (name) {
            case 'reason':
                if (!value) {
                    return '*Reason is Required*';
                } else {
                    return '';
                }
            case 'postContent':
                if (!value) {
                    return '*Content is Required*';
                } else {
                    return '';
                }
            default:
                {
                    return '';
                }
        }
    };

    const handleUserInput = (e) =>{
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
    };

    const handleSubmit = (e) =>{
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
            userId: localStorage.getItem('userSecret')
          };
          //console.log(data)
          axios.post(`${Config.URL}api/createFeedback`, data).then(result=>{
              if (result.data.message === 'feedback created successfully'){
                  history.push('/?message=feedback_sent_successfully')
              }else{
                  setErrorMessage('Server down, please bear with us and try later, thanks!')
              }
          })

        }  
    }

    return(
        <>
        {localStorage.getItem('isLoggedIn')? (
        <React.Fragment>
        {errorMessage ? (
        <Alert variant="filled" severity="error">
        {errorMessage}
      </Alert>)
        :null}
        <h1>FeedBack Form</h1>
        <FeedBackContainer>
            <h1>Give us a feedback, We could have better service for you.</h1>
            <FeedBackContentGrid component='form' container xs={12} onSubmit={handleSubmit}>
                <Grid item xs={12}>
                    <label>Reason <span style={{color:'red'}}>{fields.errors.reason? fields.errors.reason : null}</span></label>
                    <input type='text' name='reason' style={fields.errors.reason?{border:'red solid 3px', boxShadow:'none'}:null} value={fields.fields.reason} onChange={handleUserInput}/>
                </Grid>
                <Grid item xs={12}>
                    <label>Content <span style={{color:'red'}}>{fields.errors.content? fields.errors.postContent : null}</span></label>
                    <textarea name='postContent'content style={fields.errors.reason?{border:'red solid 3px', boxShadow:'none'}:null} value={fields.fields.content} onChange={handleUserInput}/>
                </Grid>
                <Grid item xs={12}>
                    <Button type='submit'>Submit</Button>
                </Grid>
            </FeedBackContentGrid>
            <Line><span>or</span></Line>
            <ContactGrid container xs={12}>
                <Grid item xs={12}>
                <h1>Contact Us</h1>
                </Grid>
                <Grid item xs={12}>
                    <h1>Email: EjkbaCorp@gmail.com</h1>
                    <h1>Phone: +1 (510) 783-6666</h1>
                </Grid>
            </ContactGrid>
        </FeedBackContainer>
        </React.Fragment>
        ):(<Redirect to='/'/>)}
        </>
    )
}

export default FeedbackAndSupp;