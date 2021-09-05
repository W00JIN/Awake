import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

function CommentView(props) {

    const [Comments, setComments] = React.useState([])

    useEffect(() => {
        setTimeout(() => {
            let variable = { postID: props.postID }

            Axios.post('/api/comments/getComments', variable)
                .then(response => {
                    if (response.data.success) {
                        setComments(response.data.comments)
                    }
                    else {
                        alert('fail to get comments')
                    }
                })
        }, 60)
    }, [props.postID, props.value])

    const comment = Comments.map((comment, index) => {

        return <div key={index} style={{ borderBottom: "1px solid #f0f0f0", paddingTop: "5px", paddingBottom: "5px" }}>
            <img alt="" src={comment.writer.image} style={{ borderRadius: "50%", display: "inline" }} width="20px" height="20px" />

            <p style={{ display: "inline", marginLeft: "10px", fontSize: "14px" }}>
                <a href={`/user/${comment.writer._id}`} style={{ color: "black" }}>
                    {comment.writer.name}
                </a>
                &nbsp;&nbsp;&nbsp;{comment.content}
            </p>

            <span style={{ float: 'right', marginLeft: "10px", fontSize: "12px" ,color:"LightGrey"}}>
                {comment.updatedAt.substring(5, 10)}&nbsp;{/*comment.updatedAt.substring(11, 16)*/}
            </span>


        </div>
    })

    return (
        <div style={{ maxHeight: "36vh", marginLeft: "20px", marginTop: "13px", marginBottom: "5px", overflow: "auto" }}>
            {comment}
        </div>
    )
}

export default withRouter(CommentView);