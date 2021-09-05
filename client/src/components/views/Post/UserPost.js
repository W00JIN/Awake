import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Row, Col, Modal } from 'antd';
import Axios from 'axios';

import CommentView from './CommentView'
import CommentSave from './CommentSave';
import Like from '../Like/Like';

function UserPost(props) {

    const [PostID, setPostID] = React.useState("")
    const [CommentTo, setCommentTo] = React.useState("")
    const [Title, setTitle] = React.useState("")
    const [visible, setOpen] = React.useState(false);
    const [Post, setPost] = React.useState([])
    const [Description, setDescription] = React.useState("")
    const [ImgPath, setImgPath] = React.useState("")


    const [Likes, setLikes] = React.useState(0)
    const [ChangeLike, setChangeLike] = React.useState(false)

    const closed = () => {
        setOpen(false);
    }

    useEffect(() => { //돔이 로드되면 처음 하는 일, 두번째 파라미터가 []이면 한번만 수행, 없으면 계속 수행
        Axios.get('/api/posts/getPost')
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data)
                    setPost(response.data.posts)
                }
                else {
                    alert('fail to loading posts')
                }
            })
        if (PostID) {

            setTimeout(() => {
                Axios.post('/api/like/getlikes', { postID: PostID })
                    .then(response => {
                        if (response.data.success) {
                            //console.log(response.data.likes)
                            setLikes(response.data.likes.length)
                        }
                        else {
                            alert('fail to get likes')
                        }
                    })

            }, 60)
        }

    }, [PostID, ChangeLike])

    const likeHandler = (value) => {
        setChangeLike(value)
    }

    const modalHandler = (e) => {
        //console.log(e.currentTarget.src);
        setImgPath(e.currentTarget.src);
        const variable = { postId: e.currentTarget.id }
        setPostID(e.currentTarget.id)
        Axios.post('/api/posts/getPostDetail', variable)

            .then(response => {
                if (response.data.success) {
                    if (response.data && response.data.postDetail) {
                        //console.log(response.data.postDetail)
                        setDescription(response.data.postDetail.description)
                        setCommentTo(response.data.postDetail.writer._id)
                        setTitle(response.data.postDetail.writer.name + "'s Post")
                    }
                } else {
                    alert('fail to load post');
                }
            })

        setOpen(true);
    }

    const renderPosts = Post.map((post, index) => {
        if (post.writer._id === props.userid) {
            if (props.category === 0) {
                return <Col key={index} lg={8} md={12} xs={24} >
                    <div style={{ padding: "20px" }}>
                        <img id={post._id} alt="" src={`http://localhost:5000/${post.filePath}`} style={{ width: "17vw", height: "17vw" }} onClick={modalHandler} />
                    </div>
                </Col>
            } else if (props.category === post.category + 1) {
                return <Col key={index} lg={8} md={12} xs={24} >
                    <div style={{ padding: "20px" }}>
                        <img id={post._id} alt="" src={`http://localhost:5000/${post.filePath}`} style={{ width: "17vw", height: "17vw" }} onClick={modalHandler} />
                    </div>
                </Col>
            }
        }
        return <div key={index}></div>
    })

    return (
        <div>
            <Row gutter={[16, 24]} style={{ minHeight: "63vh" }}>
                {renderPosts}
            </Row>

            <Modal
                title={Title}
                visible={visible}
                onOk={closed}
                onCancel={closed}
                centered
                width="65%"
                footer={[
                    <CommentSave key="0" postID={PostID} commentTo={CommentTo} writer={props.userid} />
                ]}
            >
                <div style={{ width: "100%", height: "380px", paddingRight: "20px", paddingLeft: "20px", paddingTop: "20px" }} >
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
                                <CommentView />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    )
}

export default withRouter(UserPost);