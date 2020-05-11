import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';

import { Layout, Menu, Typography } from 'antd';

const { Text } = Typography;

const { Header } = Layout;


function NavBar(props) {

    const logoutHandler = () =>{
        axios.get(`api/users/logout`)
            .then(response=>{
                if(response.data.success){
                    props.history.push('/login');
                }
            })
    }

    return (

        <Header style={{ height:'65px'}} className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Text style={{ fontSize:'15px', fontWeight: 'bold', color: 'white', marginRight:'10dp'}} onClick={logoutHandler}>Awake</Text>
          </Menu>
        </Header>
        
    )
}

export default withRouter(NavBar)
