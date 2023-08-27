import React, { useContext, useEffect, useState } from 'react'
import "./CommentCard.css"
import Avatar from '../avatar/Avatar'
import axios from 'axios'
import { API, COMMENTS_API } from '../../routes'
import Rating from '@mui/material/Rating'
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../../App'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ratingStyle } from '../../styles'
function CommentCard({ comment, commentList, setCommentList }) {
    const { user, setUser } = useContext(AuthContext)
    const [author, setAuthor] = useState(null)
    useEffect(() => {
        getAuthor()

    }, [])
    const getAuthor = () => {
        axios.get(API + 'users/' + comment.userId)
            .then(res => setAuthor(res.data[0]))
            .catch(err => console.log(err))
    }
    const deleteComment = () => {
        axios.delete(COMMENTS_API + comment._id)
        const dummyCommentList = commentList.filter((c) => {
            return c._id != comment._id
        })
        setCommentList(dummyCommentList)
    }
    return (
        <div className='comment-card'>
            {comment.userId == user._id ? (


                <DeleteIcon
                    onClick={() => deleteComment()}
                    sx={{
                        position: 'absolute',
                        right: '1em',
                        top: '1em',
                        cursor: 'pointer'

                    }}

                />

            ) : ('')}
            <Avatar
                width='3em'
                height='3em'
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000"
                borderRadius='50%'
            />
            <div className='comment-detail'>
                <div className='comment-auth'>
                    <span>{author?.username}</span>
                    <span>{new Date(comment?.created_at).toLocaleString()}</span>
                </div>
                <div className='comment-content'>
                    <span>{comment.content}</span>
                    <Rating name="read-only"
                        value={comment.rating}
                        precision={0.1}
                        readOnly
                        sx={{color:ratingStyle[comment.rating]}}
                        emptyIcon={
                            <StarBorderIcon fontSize="inherit" style={{ color: 'white' }} />
                        }
                    />

                </div>
            </div>
        </div>
    )
}

export default CommentCard