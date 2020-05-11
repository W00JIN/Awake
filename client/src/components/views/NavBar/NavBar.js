import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import { Input } from 'antd';


import { Layout, Menu, Button, Typography } from 'antd';

const { Text } = Typography;

const { Header } = Layout;
const { Search } = Input;


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
                <Menu.Item key="1" style={{ fontSize:'small', position: 'relative', left: '20px'}}>TAG 1</Menu.Item>
                <Menu.Item key="2" style={{ fontSize:'small', position: 'relative', left: '20px'}}> TAG 2</Menu.Item>
                <Menu.Item key="3" style={{ fontSize:'small', position: 'relative', left: '20px'}}>TAG 3</Menu.Item>


                <div style={{ display:"inline", position: 'relative', left: '485px'}}>

                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 250 }}
                />

                <Button  
                    style={{ marginLeft:"230px"}}
                    type="primary" onClick={logoutHandler}
                >
                    LOG OUT
                </Button>


                </div>
          </Menu>
        </Header>
        
    )
}

export default withRouter(NavBar)
