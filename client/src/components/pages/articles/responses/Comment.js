import React, {useContext} from 'react'
import styled from "styled-components"
import Reply from './Reply'
import Gravatar from 'react-gravatar';
import {UserContext} from '../../../../App';
import Moment from 'react-moment';


const ListItem = styled.li`
    margin: 10px 0px 10px 10px;
    list-style-type: none;
    padding: 5px 5px 5px 0px;
    display:flex;
    @media (max-width:500px){
        img{
            width:25px;
            height:25px;
        }
    }
`


const UserInfo = styled.div`
    display: flex;
    text-transform: lowercase;
    align-items: center;
    justify-content: space-between;
    @media (max-width:500px){
        span time {
            font-size: 0.8em;
        }
    };
    span {
        padding-right: 10px;
        text-transform: capitalize;
        color:#033F63;
        font-size:1.2em;
    };
`

const ReplySection =styled.div`
    
`

const RightContainer = styled.div`
    display:flex;
    flex-direction:column;
    flex:1;
`
const FormattedComment = styled.div`
    margin-top:5px;
    border-left:5px solid #28666E;
    border-bottom:5px solid #28666E;
    padding:10px;
    overflow-wrap:anywhere;
    margin-bottom:10px;
    min-Height:20px;
    border-radius:10px;
    font-size: 1em;
    box-shadow: -10px 10px 10px #0000004d;
`

const Comment = ({key, comment}) => {
    //console.log(comment)
    const [user, setUser] = useContext(UserContext);
        
    let post_date = "";
    
    if(comment.post_date) {
        post_date = new Date(comment.post_date)
        //console.log(post_date)
    }

    return (
        <>
       
        {comment ? (
                <ListItem id={comment._id}>
                    <Gravatar
                className='profileImage'
	            email={'xxxx@gmail.com'}
	            size={300}
	            rating="pg"
	            default="mp"
	            style={{margin: '0 10px 0 0', borderRadius:'50%', display:'block', border:'2px solid #033F63', boxShadow:'1px 1px 5px black',}}
            />
                <RightContainer>
                <UserInfo>
                    
                    <span>
                    {comment.user_id ? (<>{comment.user_id.firstName? (
                        <>{(comment.user_id.firstName)} &nbsp; {(comment.user_id.lastName)}</>
                    ):(
                        <>{(comment.user_id.displayName)}</>
                    )}</>)
                    
                    :(null)}
                    </span>

                    <span style={{color:'gray'}}>
                        {
                        comment.post_date ? (
                            <Moment interval={1000} fromNow>{post_date}</Moment>
                        ) : 
                        (null)
                        }
                    </span>
                </UserInfo>

                <ReplySection>
                <FormattedComment>
                {comment.post_content}
                </FormattedComment>
                <Reply article_id={comment.article_id} parentId={comment._id} post_date={post_date} />
                </ReplySection>
                </RightContainer>
                </ListItem> 

            ) : (null)}
        </>
    )
}

export default Comment;
