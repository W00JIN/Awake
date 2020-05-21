import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'antd';
import Axios from 'axios';


function UserPost(props) {


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


    const renderPosts = Post.map((post, index) => {
        return <Col className="gutter-row" span={8}>
            <div style={{ padding: "20px" }}>

                <img alt="" src={`http://localhost:5000/${post.filePath}`} style={{ width: "260px", height: "260px" }} />

            </div>
        </Col>
    })
    return (
        <Row gutter={[16, 24]} style={{ minHeight: "100vh" }}>
            {renderPosts}
        </Row>
    )
}

export default withRouter(UserPost);