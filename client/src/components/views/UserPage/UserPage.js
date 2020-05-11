import React from 'react'
import { withRouter } from 'react-router-dom';

import { Layout } from 'antd';

import NavBar from '../NavBar/NavBar'
import UserMenu from '../Menu/Category'
const { Content, Sider } = Layout;


function UserPage(props) {

  return (

    <Layout style={{height:"100vh"}}>
      <NavBar />
      <Content style={{ padding: '20px 35px 20px 35px', margin: '16px' }}>
        <Layout className="site-layout-background" style={{ padding: '0' }}>
          <Content style={{ paddingRight: '24px',maxHeight: '81vh', minHeight: 280, padding: '0', marginRight: '20px', border: "1px solid", borderRadius: "5px" }}>
            <div style={{ backgroundColor: 'white', overflow: "auto" , borderRadius: "8px" }}>
              <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h2>UserPage</h2>

                <div style={{ height: "3000px" }} >
                </div>
              </div>

            </div>
          </Content>
          <Sider className="site-layout-background" theme="light" width={300} style={{ borderRadius: "5px", border: "1px solid" }}>
            <UserMenu />
          </Sider>
        </Layout>
      </Content>
    </Layout>
  )
}

export default withRouter(UserPage)