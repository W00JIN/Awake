import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Button, Input, Modal } from 'antd';
import image from '../../../img/default.png';
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons';
import Axios from 'axios';

import { Row, Col } from 'antd';

import { useSelector } from "react-redux";

const { Search } = Input;


function FallowingPost(props) {

    const [Title, setTitle] = React.useState("")
    const [visible, setOpen] = React.useState(false);
    const [isLiked, setisLiked] = React.useState(false)
    const [Post, setPost] = React.useState([])
    const [Description, setDescription] = React.useState("")
    const [ImgPath, setImgPath] = React.useState("http://localhost:5000/uploads/default.jpg")
    const closed = () => {
        setOpen(false);
    }

    useEffect(() => { //돔이 로드되면 수행

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

    const modalHandler = (e) => {

        console.log(e.currentTarget.src);
        setImgPath(e.currentTarget.src);

        const variable = { postId: e.currentTarget.id }

        Axios.post('/api/posts/getPostDetail', variable)
            .then(response => {
                if (response.data.success) {
                    if (response.data && response.data.postDetail) {
                        console.log(response.data.postDetail)
                        setDescription(response.data.postDetail.description)
                        setTitle(response.data.postDetail.writer.name + "'s Post")
                    }
                } else {
                    alert('fail to load post');
                }
            })

        setOpen(true);
    }

    const renderPosts = Post.map((post, index) => {

        return <Card style={{ width: "85%", margin: 'auto', marginTop: "10px", marginBottom: "10px" }} >

            <div style={{ width: "100%", paddingBottom: "15px", borderBottom: "1px solid #f0f0f0", marginBottom: "10px" }}>
                <img alt="" src={image} style={{ borderRadius: "50%", display: "inline", marginLeft: "10px" }} width="25px" height="25px" />
                <p style={{ display: "inline", marginLeft: "15px", fontSize: "14px" }} onClick={userHandler}>{post.writer.name}</p>

                <div style={{ float: "right" }}>
                    <Button style={{ fontSize: "x-small" }}>
                        FALLOWING
          </Button>
                </div>
            </div>

            <img id={post._id} alt="" src={`http://localhost:5000/${post.filePath}`} style={{ width: "35vw", marginLeft: "10px", marginTop: "15px" }} onClick={modalHandler} />
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


            <Modal
                title={Title}
                visible={visible}
                onOk={closed}
                onCancel={closed}
                centered
                width="65%"

            >
                <div style={{ width: "100%", height: "380px", paddingRight: "20px", paddingLeft: "20px" }} >
                    <Row>
                        <Col span={13} style={{ height: "100%", borderRight: "1px solid" }}>
                            <div style={{}}>

                                <img alt="" src={ImgPath} style={{ width: "30vw" }} />
                                <br />
                                <p style={{ marginTop: "30px", float: "left" }}>{Description}</p>
                            </div>
                        </Col>

                        <Col span={11} style={{ height: "100%" }}>
                            <div style={{ marginLeft: "20px"}}>
                                <span onClick={likeIconHandler} style={{  marginRight: "15px", paddingTop: "30px" }}>
                                    {isLiked ? <SmileTwoTone style={{ fontSize: "25px" }} /> : <SmileOutlined style={{ fontSize: "25px" }} />}
                                </span>
                                <span>100 People Like This Post</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>

    )

}

export default withRouter(FallowingPost);