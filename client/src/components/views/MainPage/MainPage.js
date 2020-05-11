import React from 'react'
import { withRouter } from 'react-router-dom';
import { Layout, Card,Button, Input } from 'antd';
import NavBar from '../NavBar/NavBar'
import UserMenu from '../Menu/UserInfo'
import sample1 from '../../../img/sample1.jpg'
import sample2 from '../../../img/sample2.jpg'
import sample3 from '../../../img/sample3.jpg'
import image from '../../../img/default.png';
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Search } = Input;

function MainPage(props) {
  const [isLiked, setisLiked] = React.useState(false)

  const likeIconHandler = () =>{
    setisLiked(prevState =>{
      return !prevState
    })
  }

  const userHandler = () => {
    props.history.push('/user');
  }

  return (
    <Layout style={{height:"100vh"}}>
      <NavBar />
      <Content style={{ padding: '20px 35px 20px 35px', margin: '16px' }}>
        <Layout className="site-layout-background" style={{ padding: '0' }}>
          <Content style={{ backgroundColor: 'white',  paddingRight: '24px',maxHeight: '81vh', minHeight: 280, padding: '0', marginRight: '20px', border: "1px solid", borderRadius: "5px" }}>
            <div style={{ borderRadius: "8px"  }}>
              <div style={{ width: '100%', height: '100%' }}>


                <Card style={{ width: "85%", margin: 'auto', marginTop: "10px", marginBottom: "10px" }}>

                  <div style={{ width: "100%", paddingBottom: "15px", borderBottom:"1px solid #f0f0f0", marginBottom: "10px" }}>
                    <img alt="" src={image} style={{ borderRadius: "50%", display: "inline",marginLeft:"10px" }} width="25px" height="25px" />
                    <p style={{ display: "inline", marginLeft: "15px", fontSize: "14px" }} onClick={userHandler}>USER NAME</p>

                    <div style={{ float: "right" }}>
                      <Button style={{ fontSize: "x-small" }}>
                        FALLOWING
                      </Button>
                    </div>
                  </div>

                  <img alt="" src={sample1} style={{ width: "50%", height: "300px",marginLeft:"10px", marginTop: "15px" }} />
                  <p style={{ margin: "20px 0px 5px 10px" }} >description</p>

                  <div style={{ width: "100%", height:"30px", paddingBottom: "5px", marginTop: "20px",marginBottom: "10px",  paddingTop: "35px", display: "flex", alignItems: "center", borderTop:"1px solid #f0f0f0" }}>
                    <span onClick={likeIconHandler} style={{marginLeft:"10px",marginRight:"15px" }}>
                      {isLiked? <SmileTwoTone  style={{fontSize:"25px"}} /> : <SmileOutlined  style={{fontSize:"25px"}} />}
                    </span>

                    <Search
                        placeholder="Comment on your friend's pic"
                        onSearch={value => console.log(value)}
                        style={{ width: "92%" }}
                        enterButton="comment"
                    />
                  </div>

                </Card>


                <Card style={{ width: "85%", margin: 'auto', marginTop: "10px", marginBottom: "10px" }}>

                  <div style={{ width: "100%", paddingBottom: "15px", borderBottom:"1px solid #f0f0f0", marginBottom: "10px" }}>
                    <img alt="" src={image} style={{ borderRadius: "50%", display: "inline",marginLeft:"10px" }} width="25px" height="25px" />
                    <p style={{ display: "inline", marginLeft: "15px", fontSize: "14px" }} onClick={userHandler}>USER NAME</p>

                    <div style={{ float: "right" }}>
                      <Button style={{ fontSize: "x-small" }}>
                        FALLOWING
                      </Button>
                    </div>
                  </div>

                  <img alt="" src={sample2} style={{ width: "50%", height: "300px",marginLeft:"10px", marginTop: "15px" }} />
                  <p style={{ margin: "20px 0px 5px 10px" }} >description</p>

                  <div style={{ width: "100%", height:"30px", paddingBottom: "5px", marginTop: "20px",marginBottom: "10px",  paddingTop: "35px", display: "flex", alignItems: "center", borderTop:"1px solid #f0f0f0" }}>
                    <span onClick={likeIconHandler} style={{marginLeft:"10px",marginRight:"15px" }}>
                      {isLiked? <SmileTwoTone  style={{fontSize:"25px"}} /> : <SmileOutlined  style={{fontSize:"25px"}} />}
                    </span>

                    <Search
                        placeholder="Comment on your friend's pic"
                        onSearch={value => console.log(value)}
                        style={{ width: "92%" }}
                        enterButton="comment"
                    />
                  </div>

                </Card>



                <Card style={{ width: "85%", margin: 'auto', marginTop: "10px", marginBottom: "10px" }}>

                  <div style={{ width: "100%", paddingBottom: "15px", borderBottom:"1px solid #f0f0f0", marginBottom: "10px" }}>
                    <img alt="" src={image} style={{ borderRadius: "50%", display: "inline",marginLeft:"10px" }} width="25px" height="25px" />
                    <p style={{ display: "inline", marginLeft: "15px", fontSize: "14px" }} onClick={userHandler}>USER NAME</p>

                    <div style={{ float: "right" }}>
                      <Button style={{ fontSize: "x-small" }}>
                        FALLOWING
                      </Button>
                    </div>
                  </div>

                  <img alt="" src={sample3} style={{ width: "50%", height: "300px",marginLeft:"10px", marginTop: "15px" }} />
                  <p style={{ margin: "20px 0px 5px 10px" }} >description</p>

                  <div style={{ width: "100%", height:"30px", paddingBottom: "5px", marginTop: "20px",marginBottom: "10px",  paddingTop: "35px", display: "flex", alignItems: "center", borderTop:"1px solid #f0f0f0" }}>
                    <span onClick={likeIconHandler} style={{marginLeft:"10px",marginRight:"15px" }}>
                      {isLiked? <SmileTwoTone  style={{fontSize:"25px"}} /> : <SmileOutlined  style={{fontSize:"25px"}} />}
                    </span>

                    <Search
                        placeholder="Comment on your friend's pic"
                        onSearch={value => console.log(value)}
                        style={{ width: "92%" }}
                        enterButton="comment"
                    />
                  </div>

                </Card>


              </div>
            </div>
          </Content>
          <Sider className="site-layout-background" theme="light" width={300} style={{ borderRadius: "5px", margin: "0", padding: "0" }}>
            <UserMenu  />
          </Sider>
        </Layout>
      </Content>
    </Layout>
  )
}

export default withRouter(MainPage)