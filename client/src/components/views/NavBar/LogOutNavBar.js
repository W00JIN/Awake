import React from 'react'
import {withRouter} from 'react-router-dom';

import { Layout, Menu } from 'antd';

const { Header } = Layout;


function NavBar(props) {

    const loginHandler = () =>{
        props.history.push('/login');
    }

    return (

        <Header style={{ height:'65px'}} className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" style={{ position: 'relative', left: '20px',height:"65px"}} onClick={loginHandler}>
                    <span style={{ fontSize:'19px', fontWeight: 'bold', color: 'white', marginRight:'10dp'}}>Awake</span>
                </Menu.Item>
            </Menu>
        </Header>
        
    )
}

export default withRouter(NavBar)
