import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import NavBar from '../NavBar/NavBar'
import UserMenu from '../Menu/UserInfo'
import FallowingPost from '../Post/FallowingPost'

const { Content, Sider } = Layout;

function MainPage(props) {

  return (
    <Layout style={{ height: "100vh" }}>
      <NavBar />
      <Content style={{ padding: '20px 35px 20px 35px', margin: '16px' }}>
        <Layout className="site-layout-background" style={{ padding: '0' }}>
          <Content style={{ backgroundColor: 'white', paddingRight: '24px', maxHeight: '81vh', minHeight: 280, padding: '0', marginRight: '20px', border: "1px solid", borderRadius: "5px" }}>
            <div style={{ borderRadius: "8px" }}>
              <FallowingPost/>
            </div>
          </Content>
          <Sider className="site-layout-background" theme="light" width={300} style={{ borderRadius: "5px", margin: "0", padding: "0" }}>
            <UserMenu />
          </Sider>
        </Layout>
      </Content>
    </Layout>
  )
}

export default withRouter(MainPage)