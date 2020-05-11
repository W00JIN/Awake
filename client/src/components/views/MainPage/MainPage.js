import React,{useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';

import { Layout } from 'antd';

import NavBar from '../NavBar/NavBar'
import UserMenu from '../Sider/Sider'

const { Content, Sider } = Layout;


function MainPage(props){

    useEffect(()=>{
        axios.get('/api/hello')
        .then(response => {console.log(response)})
    },[])
    
    return(

        <Layout>
        <NavBar/>
        <Content style={{ padding: '35px' , margin: '16px' }}>
        <Layout className="site-layout-background" style={{ padding: '0' }}>
          
          <Content style={{ paddingRight: '24px', minHeight: 280 }}>
            <div style={{backgroundColor:'white'}}>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width:'95%', height:'77vh'}}>
            <h2>MainPage</h2>
        </div>

        </div>
          </Content>
          <Sider className="site-layout-background"  theme="light" width={300}>
            <UserMenu/>
          </Sider>
        </Layout>
      </Content>
      </Layout>
    )
}

export default withRouter(MainPage)