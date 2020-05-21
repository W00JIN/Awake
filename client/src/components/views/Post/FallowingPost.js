import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Button, Input } from 'antd';
import image from '../../../img/default.png';
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons';
import Axios from 'axios';

const { Search } = Input;


function FallowingPost(props) {


    const [isLiked, setisLiked] = React.useState(false)
    const [Post, setPost] = React.useState([])


    useEffect(() => { //돔이 로드되면 처음 하는 일, 두번째 파라미터가 []이면 한번만 수행, 없으면 계속 수행

        Axios.get('/api/posts/getPost')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setPost(response.data.posts)
                }
                else {
                    alert('fail to loading posts')
                }
            })



    }, [])


    const likeIconHandler = () => {
        setisLiked(prevState => {
            return !prevState
        })
    }

    const userHandler = () => {
        props.history.push('/user');
    }

    const renderPosts = Post.map((post, index) => {
        return <Card style={{ width: "85%", margin: 'auto', marginTop: "10px", marginBottom: "10px" }}>

            <div style={{ width: "100%", paddingBottom: "15px", borderBottom: "1px solid #f0f0f0", marginBottom: "10px" }}>
                <img alt="" src={image} style={{ borderRadius: "50%", display: "inline", marginLeft: "10px" }} width="25px" height="25px" />
                <p style={{ display: "inline", marginLeft: "15px", fontSize: "14px" }} onClick={userHandler}>{post.writer.name}</p>

                <div style={{ float: "right" }}>
                    <Button style={{ fontSize: "x-small" }}>
                        FALLOWING
          </Button>
                </div>
            </div>

            <img alt="" src={`http://localhost:5000/${post.filePath}`} style={{ width: "35vw", marginLeft: "10px", marginTop: "15px" }} />
            <p style={{ margin: "20px 0px 5px 10px" }} >{post.description}</p>

            <div style={{ width: "100%", height: "30px", paddingBottom: "5px", marginTop: "20px", marginBottom: "10px", paddingTop: "35px", display: "flex", alignItems: "center", borderTop: "1px solid #f0f0f0" }}>
                <span onClick={likeIconHandler} style={{ marginLeft: "10px", marginRight: "15px" }}>
                    {isLiked ? <SmileTwoTone style={{ fontSize: "25px" }} /> : <SmileOutlined style={{ fontSize: "25px" }} />}
                </span>

                <Search
                    placeholder="Comment on your friend's pic"
                    onSearch={value => console.log(value)}
                    style={{ width: "92%" }}
                    enterButton="comment"
                />
            </div>

        </Card>

    })

    return (
        <div style={{ width: '100%', height: '100%' }}>

            {renderPosts}

        </div>
    )

}

export default withRouter(FallowingPost);