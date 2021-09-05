import React, { useEffect } from 'react'
import Axios from 'axios';
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons';

function Like(props) {

    let variables = {
        userID: props.userID,
        postID: props.postID
    }

    const [isLiked, setisLiked] = React.useState(false)

    useEffect(() => {
        Axios.post('/api/like/likeInfo', variables)
            .then(response => {
                if (response.data.success) {
                    setisLiked(true)
                } else {
                    setisLiked(false)
                }
            })
    }, [props.change, variables])
    

    const likeHandler = () => {
        props.onClick(!props.change);
        if(isLiked){
            Axios.post('/api/like/unlike', variables)
            .then(response => {
                if (response.data.success) {
                    setisLiked(false)
                } else {
                }
            })
        }else{
            Axios.post('/api/like/like', variables)
            .then(response => {
                if (response.data.success) {
                    setisLiked(true)
                } else {
                }
            })
        }
    }

    return (
        <span onClick={likeHandler} style={{ marginRight: "15px" }}>
            {isLiked ? <SmileTwoTone style={{ fontSize: "25px" }} /> : <SmileOutlined style={{ fontSize: "25px" }} />}
        </span>
    )
}

export default Like
