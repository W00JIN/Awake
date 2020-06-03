import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import NavBar from '../NavBar/NavBar'
import UserPost from '../Post/UserPost'
import { Menu, Card, Button } from 'antd';
import Axios from 'axios';
import AddCagetory from '../Category/AddCategory'
import { useSelector } from "react-redux";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function UserPage(props) {

  const pageID = props.match.params.userID;

  let currentID = "";
  const user = useSelector(state => state.user);
  if (user.userData && user.userData._id) {
    currentID = user.userData._id;
  }
  const [PageUser, setPageUser] = React.useState([])
  const [CategoryArr, setCategoryArr] = React.useState([])
  const [CurrentCategory, setCurrentCategory] = React.useState("0")


  useEffect(() => { //props.userid가 바뀌면 수행
    const variables = {
      userID: pageID
    }
    console.log(variables);

    Axios.post('/api/users/getUserDetail', variables)
      .then(response => {
        if (response.data.success) {
          console.log(response.data.userDetail[0])

          setCategoryArr(response.data.userDetail[0].category)
          setPageUser(response.data.userDetail[0])
        }
        else {
          alert('fail to loading categories')
        }
      })


  }, [])

  const category = CategoryArr.map((category, index) => {
    return <Menu.Item key={index + 1}>{category.name}</Menu.Item>
  })


  const MenuHandler = (e) => {
    console.log(e.key);
    setCurrentCategory(e.key)
  }

  return (

    <Layout style={{ height: "100vh" }}>
      <NavBar />
      <Content style={{ padding: '20px 35px 20px 35px', margin: '16px' }}>
        <Layout className="site-layout-background" style={{ padding: '0' }}>
          <Content style={{ paddingRight: '24px', maxHeight: '81vh', minHeight: 280, padding: '0', marginRight: '20px', border: "1px solid", borderRadius: "5px" }}>
            <div style={{ backgroundColor: 'white', overflow: "auto", borderRadius: "8px" }}>
              <div style={{ textAlign: 'center', width: '100%', height: '100%', padding: "70px" }}>
                <UserPost userid={pageID} category={CurrentCategory} />
              </div>

            </div>
          </Content>
          <Sider className="site-layout-background" theme="light" width={300} style={{ borderRadius: "5px", border: "1px solid" }}>

            <div>
              <Card bordered={false} style={{ width: "100%", height: "100%", borderRadius: "10px" }}>

                <div>
                  <img alt="" src={PageUser.image} style={{ borderRadius: "50%", display: "inline" }} width="30px" height="30px" />
                  <p style={{ display: "inline", marginLeft: "15px", fontSize: "16px" }} >
                    {PageUser.name}
                  </p>
                  <div style={{ float: "right" }}>

                    {(pageID == currentID) &&  <AddCagetory />}
                    
                  </div>

                </div>

                <br />
                <p>user message</p>
              </Card>
              <Menu
                mode="inline"
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['sub1']}
                style={{ borderTop: "1px solid #f0f0f0" }}
                onClick={MenuHandler}
              >
                <Menu.Item key="0">전체 보기</Menu.Item>
                {category}
              </Menu>
            </div>
          </Sider>
        </Layout>
      </Content>
    </Layout>
  )
}

export default withRouter(UserPage)