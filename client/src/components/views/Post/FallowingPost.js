import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Modal } from 'antd';
import image from '../../../img/default.png';
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons';
import Axios from 'axios';

import { Row, Col } from 'antd';

import Fallow from '../Fallow/Fallow';

import CommentView from './CommentView';
import CommentSave from './CommentSave';

function FallowingPost(props) {

    const [PostID, setPostID] = React.useState("");
    const [CommentTo, setCommentTo] = React.useState("");
    const [Title, setTitle] = React.useState("");
    const [visible, setOpen] = React.useState(false);
    const [isLiked, setisLiked] = React.useState(false)
    const [Post, setPost] = React.useState([])
    const [Description, setDescription] = React.useState("")
    const [ImgPath, setImgPath] = React.useState("")

    const [FallowCliked, setFallowCliked] = React.useState(props.change)
    const [ChangeCommentView, setChangeCommentView] = React.useState(false)
    const closed = () => {
        setOpen(false);
    }

    useEffect(() => { //돔이 로드되면 수행

        Axios.get('/api/posts/getPost')
            .then(response => {
                if (response.data.success) {
                    setPost(response.data.posts)
                }
                else {
                    alert('fail to load posts')
                }
            })
    }, [])

    const likeIconHandler = () => {
        setisLiked(prevState => {
            return !prevState
        })
    }

    const FallowClikedHandler = (value) => {
        setFallowCliked(value);
        props.FallowClikedHandler(value);
    }
    const commentHandler = (value) => {
        setChangeCommentView(value);
    }

    const modalHandler = (e) => {

        setImgPath(e.currentTarget.src);
        const variable = { postId: e.currentTarget.id }

        setPostID(e.currentTarget.id)

        Axios.post('/api/posts/getPostDetail', variable)
            .then(response => {
                if (response.data.success) {
                    if (response.data && response.data.postDetail) {
                        setCommentTo(response.data.postDetail.writer._id)
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

        return <Card key={index} style={{ width: "85%", margin: 'auto', marginTop: "10px", marginBottom: "10px" }} >

            <div style={{ width: "100%", paddingBottom: "15px", borderBottom: "1px solid #f0f0f0", marginBottom: "10px" }}>
                <img alt="" src={image} style={{ borderRadius: "50%", display: "inline", marginLeft: "10px" }} width="25px" height="25px" />

                <p style={{ display: "inline", marginLeft: "15px", fontSize: "14px" }} >
                    <a href={`/user/${post.writer._id}`} style={{ color: "black" }}>
                        {post.writer.name}
                    </a>
                    &nbsp;/ {post.writer.category[post.category].name}</p>

                <div style={{ float: "right" }}>
                    {post.writer._id && props.userid && post.writer._id !== props.userid && <Fallow userTo={post.writer._id} userFrom={props.userid} userToCategory={post.writer.category[post.category]._id} onClick={FallowClikedHandler} change={FallowCliked} />}
                </div>
            </div>

            <img id={post._id} alt="" src={`http://localhost:5000/${post.filePath}`} style={{ width: "35vw", marginLeft: "10px", marginTop: "15px" }} onClick={modalHandler} />
            <p style={{ margin: "20px 0px 5px 10px" }} >{post.description}</p>

            <div style={{ width: "100%", height: "30px", paddingBottom: "5px", marginTop: "20px", marginBottom: "10px", paddingTop: "35px", display: "flex", alignItems: "center", borderTop: "1px solid #f0f0f0" }}>
                <span onClick={likeIconHandler} style={{ marginLeft: "10px", marginRight: "15px" }}>
                    {isLiked ? <SmileTwoTone style={{ fontSize: "25px" }} /> : <SmileOutlined style={{ fontSize: "25px" }} />}
                </span>
                <CommentSave postID={post._id} commentTo={post.writer._id} writer={props.userid} AddCommentHandler={commentHandler} value={ChangeCommentView} />
            </div>

        </Card>

    })

    return (
        <div style={{ width: '100%', height: '80vh' }}>

            {renderPosts}

            <Modal
                title={Title}
                visible={visible}
                onOk={closed}
                onCancel={closed}
                centered
                width="65%"
                footer={[
                    <CommentSave key="0" postID={PostID} commentTo={CommentTo} writer={props.userid} AddCommentHandler={commentHandler} value={ChangeCommentView} />
                ]}
            >

                <div style={{ width: "100%", minHeight: "380px", paddingRight: "20px", paddingLeft: "20px", paddingTop: "20px" }} >
                    <Row>
                        <Col span={13} style={{ height: "100%", borderRight: "1px solid" }}>
                            <div style={{}}>

                                <img alt="" src={ImgPath} style={{ width: "30vw" }} />
                                <br />
                                <p style={{ marginTop: "30px", float: "left" }}>{Description}</p>
                            </div>
                        </Col>

                        <Col span={11} style={{ height: "100%" }}>
                            <div style={{ marginLeft: "20px", display: "flex", alignItems: "center" }}>
                                <span onClick={likeIconHandler} style={{ marginRight: "15px" }}>
                                    {isLiked ? <SmileTwoTone style={{ fontSize: "25px" }} /> : <SmileOutlined style={{ fontSize: "25px" }} />}
                                </span>
                                <span>100 People Like This Post</span>
                            </div>

                            <div>
                                <CommentView postID={PostID} value={ChangeCommentView} />
                            </div>

                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>

    )
}

export default withRouter(FallowingPost);