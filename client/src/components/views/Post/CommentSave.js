import React from 'react'
import { withRouter } from 'react-router-dom';
import { Input } from 'antd';
import Axios from 'axios';
const { Search } = Input;

function CommentSave(props) {


    const [Value, setValue] = React.useState("");

    const changeHandler = (e) =>{
        e.preventDefault();
        setValue(e.currentTarget.value);
    }

    const searchHandler = (value) =>{

        props.AddCommentHandler(!props.value)

        let variable={
            writer: props.writer,
            commentTo: props.commentTo,
            postID: props.postID,
            content: value
        }

        Axios.post('/api/comments/saveComment', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                }
                else {
                    alert('fill the comment')
                }
            })

        setValue("");

    }

    return (
        <div style={{ width: "100%" }}>

            <Search
                key="0"
                placeholder="Comment on your friend's pic"
                onChange={changeHandler}
                onSearch={searchHandler}
                value={Value}
                style={{ width: "98%", marginRight:"8px", marginTop: "10px", marginBottom: "10px" }}
                enterButton="comment"
            />

        </div>
    )
}

export default withRouter(CommentSave);