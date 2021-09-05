import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Modal } from 'antd';
import image from '../../../img/default.png';
import Axios from 'axios';

import { Row, Col } from 'antd';

import Follow from '../Follow/Follow';

import CommentView from './CommentView';
import CommentSave from './CommentSave';
import Like from '../Like/Like';

function FollowingPost(props) {

    const [PostID, setPostID] = React.useState("");
    const [CommentTo, setCommentTo] = React.useState("");
    const [Title, setTitle] = React.useState("");
    const [visible, setOpen] = React.useState(false);
    const [Post, setPost] = React.useState([])
    const [Description, setDescription] = React.useState("")
    const [ImgPath, setImgPath] = React.useState("")
    const [Likes, setLikes] = React.useState(0)


    const [FollowCliked, setFollowCliked] = React.useState(props.change)
    const [ChangeCommentView, setChangeCommentView] = React.useState(false)
    const [ChangeLike, setChangeLike] = React.useState(false)

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
                    alert('fail to get posts')
                }
            })
        if (PostID) {

            setTimeout(() => {
                Axios.post('/api/like/getlikes', { postID: PostID })
                    .then(response => {
                        if (response.data.success) {
                            setLikes(response.data.likes.length)
                        }
                        else {
                            alert('fail to get likes')
                        }
                    })

            }, 60)
        }
    }, [PostID, ChangeLike])

    const FollowClikedHandler = (value) => {
        setFollowCliked(value);
        props.FollowClikedHandler(value);
    }
    const commentHandler = (value) => {
        setChangeCommentView(value);
    }

    const likeHandler = (value) => {
        setChangeLike(value)
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
                    {post.writer._id && props.userid && post.writer._id !== props.userid && <Follow userTo={post.writer._id} userFrom={props.userid} userToCategory={post.writer.category[post.category]._id} onClick={FollowClikedHandler} change={FollowCliked} />}
                </div>
            </div>

            <img id={post._id} alt="" src={`http://localhost:5000/${post.filePath}`} style={{ width: "35vw", marginLeft: "10px", marginTop: "15px" }} onClick={modalHandler} />
            <p style={{ margin: "20px 0px 5px 10px" }} >{post.description}</p>

            <div style={{ width: "100%", height: "30px", paddingBottom: "5px", marginTop: "20px", marginBottom: "10px", paddingTop: "35px", display: "flex", alignItems: "center", borderTop: "1px solid #f0f0f0" }}>
                <Like userID={props.userid} postID={post._id} onClick={likeHandler} change={ChangeLike} />
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

                                <Like userID={props.userid} postID={PostID} onClick={likeHandler} change={ChangeLike} />
                                <span>{Likes} People Like This Post</span>
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

export default withRouter(FollowingPost);