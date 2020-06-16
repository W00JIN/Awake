import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import { Input, Layout, Menu, Button, Typography, Dropdown } from 'antd';
import { BellOutlined, CommentOutlined, SettingOutlined } from '@ant-design/icons';
const { Text } = Typography;

const { Header } = Layout;
const { Search } = Input;



function NavBar(props) {
    const [ColorType, setColorType] = React.useState([ "#1890ff", "transparent","transparent","transparent"])
    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    1st menu item
            </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                    2nd menu item
            </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                    3rd menu item
            </a>
            </Menu.Item>
        </Menu>
    );

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
        window.location.reload();
    }

    return (

        <Header style={{ height: '65px' }} className="header">

            <div theme="dark" mode="horizontal" style={{padding:"0"}}>
                <div key="1" style={{ fontSize: 'small',display:"inline-block", textAlign:"center", position: 'relative', left: '20px', width:"95px", height: "65px", margin:"0px", border:"none", backgroundColor:ColorType[0]}} onClick={homeHandler}>
                    <Text style={{ fontSize: '17px', fontWeight: 'bold', color: 'white', marginRight: '10dp' }}>Awake</Text>
                </div>
                <div key="2" style={{ fontSize: 'small',display:"inline-block", textAlign:"center", position: 'relative', left: '20px', width:"55px",height: "64px", margin:"0px", border:"none" , backgroundColor:ColorType[1] }} onClick={() => setColorType([ "transparent", "#1890ff","transparent","transparent"])}>
                    <BellOutlined style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }} />
                </div>
                <div key="3" style={{ fontSize: 'small',display:"inline-block", textAlign:"center", position: 'relative', left: '20px' , width:"55px",height: "64px", margin:"0px", border:"none" , backgroundColor:ColorType[2]}} onClick={() => setColorType([ "transparent","transparent", "#1890ff","transparent"])}>
                    <CommentOutlined style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }} />
                </div>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <div key="4" style={{ fontSize: 'small',display:"inline-block", textAlign:"center", position: 'relative', left: '20px',width:"55px", height: "64px", margin:"0px", border:"none", backgroundColor:ColorType[3] }} onClick={() => setColorType([ "transparent", "transparent","transparent","#1890ff"])}>
                        <SettingOutlined style={{ fontSize: '17px', fontWeight: 'bold', color: 'white' }} />
                    </div>
                </Dropdown>


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
            </div>
        </Header>

    )
}

export default withRouter(NavBar)
