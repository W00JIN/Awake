import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { Input, Layout, Menu, Button, Typography } from 'antd';
import { BellOutlined, CommentOutlined, SettingOutlined } from '@ant-design/icons';
const { Text } = Typography;

const { Header } = Layout;
const { Search } = Input;


function NavBar(props) {

    const logoutHandler = () => {
        axios.get(`api/users/logout`)
            .then(response => {
                if (response.data.success) {
                    props.history.push('/login');
                }
            })
    }
    const homeHandler = () => {
        props.history.push('/');
    }

    return (

        <Header style={{ height: '65px' }} className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" style={{ fontSize: 'small', position: 'relative', left: '20px', height: "65px" }} onClick={homeHandler}>
                    <Text style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginRight: '10dp' }}>Awake</Text>
                </Menu.Item>
                <Menu.Item key="2" style={{ fontSize: 'small', position: 'relative', left: '20px' }}><BellOutlined style={{ fontSize: "16px" }} /></Menu.Item>
                <Menu.Item key="3" style={{ fontSize: 'small', position: 'relative', left: '20px' }}><CommentOutlined style={{ fontSize: "16px" }} /></Menu.Item>
                <Menu.Item key="4" style={{ fontSize: 'small', position: 'relative', left: '20px' }}><SettingOutlined style={{ fontSize: "16px" }} /></Menu.Item>


                <div style={{ display: "inline", float: "right", marginRight: "5px" }}>

                    <Search
                        placeholder="Search your friends"
                        onSearch={value => console.log(value)}
                        style={{ width: 250 }}
                    />

                    <Button
                        style={{ marginLeft: "225px" }}
                        type="primary" onClick={logoutHandler}
                    >
                        <p style={{ fontSize: "12px", margin: "0" }}>LOG OUT</p>
                    </Button>


                </div>
            </Menu>
        </Header>

    )
}

export default withRouter(NavBar)
