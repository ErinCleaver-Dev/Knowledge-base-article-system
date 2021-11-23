import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import {Container, Grid, Alert} from '@mui/material';
import {withStyles} from '@mui/styles';
import {Redirect} from 'react-router-dom';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { WithContext as KeyWordTags  } from 'react-tag-input';
import {useHistory, useParams} from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";

import '../../.././../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import _ from 'lodash';
import axios from 'axios';
import config from '../../../config/index';
import tagStyles from './tags.css';



const OuterContainer = styled(Container)({
    width:'100%',
    maxWidth:'1440px !important',
    border: '3px solid #28666E',
    borderRadius: '5px',
    paddingTop: '24px',
    paddingBottom:'24px',
    ['@media (max-width:1150px)']:{
        width:'100%',
    },
    // '.ReactTags__tags':{
    //     border:'red solid 1px'
    // } <- test
})

const ContainerGrid = styled(Grid)({
    marginTop:'12px',
})


const styles = {
    title:{
        color: '#033F63',
        textAlign: 'center',
        fontSize:'1.8em'
    },
    subTitle:{
        color: '#033F63',
        fontSize: '1.8em'
    },
    titleAndYTInput:{
        display:'block',
        width: '100%',
        height: '50px',
        fontSize:'1.5em',
        border: '#033F63 solid 3px',
        borderRadius: '3px',
        boxSizing:'border-box',
        paddingLeft:'10px',
        '&:focus':{
            border: '#06283C solid 5px',
        }
    },
    editorContainer:{
        border: '#033F63 solid 3px',
        width:'100%',
        padding:'10px',
        borderRadius: '3px',
        boxSizing:'border-box',
        '&:focus-within':{
            border: '#06283C solid 5px',
        },
    },
    editorContainerError:{
        border: 'red solid 3px',
        marginTop: '10px',
    },
    demoEditor:{
        border: '#033F63 solid 3px',
        borderRadius: '3px',
        margin:'10px',
        paddingLeft:'10px',
        paddingRight:'10px',
        maxHeight:'500px',
        minHeight:'500px',
        overflowY:'auto',
        fontSize:'20px'
    },
    demoWrapper:{
        boxSizing:'border-box',
        margin:'auto',
        ['@media (max-width:1300px)']:{
            maxWidth:'1100px',
        },
        ['@media (max-width:1200px)']:{
            maxWidth:'900px',
        },
        ['@media (max-width:900px)']:{
            maxWidth:'750px',
        },
        ['@media (max-width:780px)']:{
            maxWidth:'650px',
        },
        ['@media (max-width:680px)']:{
            maxWidth:'500px',
        },
        ['@media (max-width:500px)']:{
            maxWidth:'400px',
        },
        ['@media (max-width:400px)']:{
            maxWidth:'294px',
        },
    },
    toolBar:{
        border: '#033F63 solid 2px',
        margin:'10px',
        backgroundColor: '#033F63',
    },
    categorySelect:{
        border: '#033F63 solid 3px',
        appearance:'none',
        display:'block',
        padding:'10px',
        height:'80%',
        paddingRight:'60px',
        fontSize:'1.3em',
        color: '#033F63',
        textAlign: 'center',
        fontWeight: 'bold',
        '&:focus-within':{
            border: '#06283C solid 5px',
        },
        backgroundImage:'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZxWreCXesUjtFcPqlnZoOV-ynv6BtB_NirA&usqp=CAU)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '40px',
        backgroundPosition: '98% 50%',
        cursor:'pointer',
        ['@media (max-width:900px)']:{
        height:'100%',
        },
        borderRadius: '3px',
    },
    categoryOption:{
        fontSize:'1.3em',
        color: '#033F63',
        fontWeight: 'bold',
        padding:'0px',
        width:'100%'
    },
    clearTags:{
        border:'none',
        cursor: 'pointer',
        backgroundColor: '#033F63',
        fontSize:'1em',
        padding:'5px',
        fontFamily: 'Acme, sans-serif',
        marginBottom:'1px',
        color:'white',
        '&:hover':{
            backgroundColor:'#021a29'
        }
    },
    decisionArticleButton:{
        display:'block',
        backgroundColor: '#033F63',
        cursor:'pointer',
        padding:'10px 30px',
        fontFamily: 'Acme, sans-serif',
        fontSize: '2em',
        color:'white',
        marginTop:'10px',
        marginLeft:'15px',
        marginBottom:'10px',
        ['@media (max-width:500px)']:{
            fontSize:'1em'
        },
    }
    
}


// Component
const EditArticle = ({classes}) => {

    const initialFieldsState = {
        fields:{
            title: '',
            VideoLink: '',
            category: '',  
        }
    }
   
    const initialEditorState = EditorState.createEmpty();

    const [fieldValues,setFieldValues] = useState(initialFieldsState);
    const [editorState,setEditorState] = useState(initialEditorState);
    const [keyWords,setKeyWords] = useState([]);
    const [errors, setError] = useState({title:'', editorState:'', category:''});
    const [submitError, setSubmitError] = useState(false);
    const [loadingError, setLoadingError] = useState(false);
    let history = useHistory();
    const [successMessage, setSuccessMessage] = useState('');


    const {user_id, article_id} = useParams();
    //console.log(user_id, article_id);
    //loading Data
    useEffect(()=>{
        axios.post(`${config.URL}api/getUserSpecificArticle`, {user_id, article_id}).then(result=>{
            if(result.data){
                //console.log(result.data);
                setFieldValues({
                    fields:{
                        title: result.data.title,
                        videoLink: result.data.video,
                        category: result.data.category,
                    }
                });
                // convert editorState string to Raw Object -> and then convertFromRow
                setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(result.data.post_content))));
                
                let keyTerms = result.data.key_terms;
                let keyWordTagsArray = [];
                keyTerms.map(keyTerm=>{
                    keyWordTagsArray.push({id: keyTerm, text: keyTerm})
                })
                console.log(keyWordTagsArray)
                setKeyWords(keyWordTagsArray);
            }
        }).catch(e=>{
            setLoadingError('Error - Server down, please bear with us and try again later or refresh!');
        })
    },[])


    //handleUserInputState
    const handleUserInputState = (e)=>{
        setFieldValues({
            fields:{
                ...fieldValues.fields,
                [e.target.name]: e.target.value,
           }})
        setError({title:'', editorState:'', category:''});
    }


    //handleEditorChange
    const handleEditorChange = (editorState) =>{
        setEditorState(editorState);
        setError({title:'', editorState:'', category:''});
    }

    /*--------------------------------------------------------handle keyWords ---------------------------------------------------*/

    const KeyCodes = {
        comma: 188,
        enter: 13,
      };
      
      const delimiters = [KeyCodes.comma, KeyCodes.enter];

      const handleDelete = (i) => {
        setKeyWords(keyWords.filter((tag, index) => index !== i));
      };
    
      const handleAddition = (tag) => {
        setKeyWords([...keyWords, tag]);
      };
    
      const handleDrag = (tag, currPos, newPos) => {
        const newTags = [...keyWords].slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        setKeyWords(newTags);
      };

      const onClearAll = () => {
        setKeyWords([]);
      };
    


    //handleSubmitChange
    const handleSubmitChange = (e) =>{
        e.preventDefault();

        //this would be used to submit to server
        let finalData = {};
        let allError = {};

        //check fieldsVale error and add value
        if(fieldValues.fields.title===''){
            allError = {...allError, title: 'Title should be required!'}
        }else{
            finalData = {...finalData, title: fieldValues.fields.title}
        }

        finalData = {...finalData, video: fieldValues.fields.VideoLink}

        if(fieldValues.fields.category === ''){
            allError = {...allError, category: 'Category should be required!'}
        }else{
            finalData = {...finalData, category: fieldValues.fields.category}
        }

       
        //load keyWords data
        let key_terms = [];
        keyWords.map(keyWord=>{
            key_terms.push(_.lowerCase(keyWord.text));
        })

        finalData = {...finalData, key_terms};



        //check error convert Raw editorState content to string for saving 
        if(!editorState.getCurrentContent().hasText()){
            allError = {...allError, editorState: 'The content should not be empty!'}
        }else{
            const rawContentState = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
            finalData = {...finalData, post_content: rawContentState};
        }

        //Check all errors, if error exists, return
        if(Object.keys(allError).length > 0){
            setError(allError);
            return;
        }

        // all values are all perfect, so we can go ahead to process API

        //add user's doc id from Mongoose
        finalData = {...finalData, article_id:article_id};
        //console.log(finalData)

        //api 
        axios.post(`${config.URL}api/updateArticle`, finalData,{
            headers:{
                secret:'dataSent',
            }
        }).then(result=>{
            //console.log(result.data)
            setSuccessMessage('You Successfully update your article!');
            setTimeout(()=>{
                history.goBack();
            },1200)
        }).catch(e=>{
            //console.log(e)
            setSubmitError('Error - Server down, please bear with us, and try later, thanks!');
        })

    }


    return (
        <React.Fragment>
        {localStorage.getItem('isLoggedIn') && localStorage.getItem('userSecret') === user_id ?(
        <OuterContainer component='form' onSubmit={handleSubmitChange}>
            {/* {test?<div dangerouslySetInnerHTML={{ __html: test }}></div>:null} */}
            {loadingError?
                <Alert variant="filled" severity='error'>
                {submitError}
                </Alert>
                :null}
            {submitError?
                <Alert variant="filled" severity='error'>
                {submitError}
                </Alert>
                :null}
            <h2 className={classes.title}>Create Article</h2>
            <ContainerGrid container alignItems={'center'} spacing={1}>
                
                <Grid item xs={12} md={12} >
                {errors.title ? (
                    <Grid item xs={12} md={12}>
                        <span style={{color:'red'}}>{errors.title}</span>
                    </Grid> 
                ):null}
                <input className={classes.titleAndYTInput} type='text' placeholder='Title *(required)*' style={errors.title?({border:'red solid 3px', marginTop:'10px'}):null} name='title' value={fieldValues.fields.title} onChange={handleUserInputState}/>
                </Grid>
            </ContainerGrid>
            <ContainerGrid container spacing={2}>
                
                <Grid item xs={12} md={12} >
                <input className={classes.titleAndYTInput} type='text' placeholder='Video Link' name='VideoLink' value={fieldValues.fields.videoLink} onChange={handleUserInputState}/>
                </Grid>
            </ContainerGrid>
            <ContainerGrid container spacing={2}>
                
                <Grid item xs={12} md={12} >
                {errors.editorState ? (
                    <Grid item xs={12} md={12}>
                        <span style={{color:'red'}}>{errors.editorState}</span>
                    </Grid>
                ):null}
                <div className={errors.editorState ? `${classes.editorContainer} ${classes.editorContainerError}` : classes.editorContainer}>
                <Editor
                    editorState={editorState}
                    placeholder='     Enter your content to here *(required)*'
                    onEditorStateChange={handleEditorChange}
                    wrapperClassName={classes.demoWrapper}
                    editorClassName={classes.demoEditor}
                    toolbarClassName={classes.toolBar}
                />
                </div>
                </Grid>
            </ContainerGrid>
            <ContainerGrid container spacing={2}>
                <Grid item xs={12} md={3} >
                <h2 className={classes.subTitle}>Category<span style={{display:'block', fontSize:'0.8em'}}>*(Required)*</span></h2>
                </Grid>
                <Grid container alignItems={'center'} item xs={12} md={9} >
                {errors.category?(
                    <Grid xs={12} md={12}>
                        <span style={{color:'red'}}>{errors.category}</span>
                    </Grid>
                ):null}
                <select className={classes.categorySelect} style={errors.category? ({border:'3px red solid', marginTop:'10px', height:'70%'}):(null)} name='category' value={fieldValues.fields.category} onChange={handleUserInputState}>
                    <option className={classes.categoryOption} value=''>Choose one category</option>
                    <option className={classes.categoryOption} value='react'>React</option>
                    <option className={classes.categoryOption} value='javascript'>Javascript</option>
                    <option className={classes.categoryOption} value='database'>Database</option>
                    <option className={classes.categoryOption} value='frontend'>Frontend</option>
                    <option className={classes.categoryOption} value='backend'>Backend</option>
                    <option className={classes.categoryOption} value='deployment'>Deployment</option>
                </select>
                </Grid>
            </ContainerGrid>
            <ContainerGrid container spacing={2}>
                <Grid item xs={12} md={3} >
                <h2 className={classes.subTitle}>KeyWords</h2>
            
                </Grid>
                <Grid item container spacing={2} xs={12} md={9} justifyContent={'center'} flexDirection='column' >
                    <div className={tagStyles.ReactTags} style={{width:'100%', padding:'16px', boxSizing:'border-box', position:'relative'}} >
                    {keyWords.length > 0 ? (
                        <button className={classes.clearTags} type='button' onClick={onClearAll}>Clear All</button>
                    ):(null)}
                    <KeyWordTags
                        tags={keyWords}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        delimiters={delimiters}
                        placeholder='Please add your keywords'
                        inputFieldPosition="top"
                        autofocus={false}
                        allowUnique={true}
                        allowDeleteFromEmptyInput={false}
                    />
                    </div>
              </Grid>
            </ContainerGrid>
            <ContainerGrid container spacing={2} justifyContent={'space-between'}>
            {successMessage?
                <Grid item xs={12} md={12}>
                <Alert variant="filled" severity='success'>
                {successMessage}
                </Alert>
                </Grid>
                :null}
                {/* <Grid item item xs={12} md={3}></Grid> */}
                <Grid container item xs={12} md={12} spacing={2} justifyContent={'space-between'}>
                
                    <button className={classes.decisionArticleButton} disabled={successMessage?true:false} type='submit'>Submit Change</button>
                
                
                    <button className={classes.decisionArticleButton} type='button' onClick={()=>{history.goBack()}}>Cancel</button>
                
                </Grid>
            </ContainerGrid>

        </OuterContainer>):(
              <Redirect to='/'/>
        )}
    </React.Fragment>
    )
}

export default withStyles(styles)(EditArticle); 