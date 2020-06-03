import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import NavBar from '../NavBar/NavBar'
import UserMenu from '../SideMenu/UserInfo'
import FallowingPost from '../Post/FallowingPost'

import { useSelector } from "react-redux";

const { Content, Sider } = Layout;

function MainPage(props) {

  let userid = "";
  let username = "";
  let userimg = "";
  const user = useSelector(state => state.user);
  if (user.userData && user.userData._id && user.userData.name && user.userData.image) {
    userid = user.userData._id;
    username = user.userData.name;
    userimg = user.userData.image;
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <NavBar />
      <Content style={{ padding: '20px 35px 20px 35px', margin: '16px' }}>
        <Layout className="site-layout-background" style={{ padding: '0' }}>
          <Content style={{ backgroundColor: 'white', paddingRight: '24px', minHeight: '81vh',maxHeight: '81vh', minHeight: 280, padding: '0', marginRight: '20px', border: "1px solid", borderRadius: "5px" }}>
            <div style={{ borderRadius: "8px" }}>
              <FallowingPost userid={userid} username={username} userimg={userimg}/>
            </div>
          </Content>
          <Sider className="site-layout-background" theme="light" width={300} style={{ borderRadius: "5px", border: "1px solid" }}>
            <UserMenu userid={userid} username={username} userimg={userimg}/>
          </Sider>
        </Layout>
      </Content>
    </Layout>
  )
}

export default withRouter(MainPage)