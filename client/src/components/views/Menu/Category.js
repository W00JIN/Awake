import React from 'react'
import { withRouter } from 'react-router-dom';
import { Menu, Card, Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, PlusCircleOutlined } from '@ant-design/icons';
import image from '../../../img/default.png';

import UploadPage from '../UploadPage/UploadPage'

import { useSelector } from "react-redux";
const { SubMenu } = Menu;


function UserMenu(props) {

  let username = "";
  const user = useSelector(state => state.user);
  if (user.userData && user.userData.name) {
    username = user.userData.name;
  }


  return (
    <div>
      <Card bordered={false} style={{ width: "100%", height: "100%", borderRadius: "10px" }}>

        <div>
          <img alt="" src={image} style={{ borderRadius: "50%", display: "inline" }} width="30px" height="30px" />
          <p style={{ display: "inline", marginLeft: "15px", fontSize: "16px" }} >{username}</p>
          <div style={{ float: "right" }}>

            <UploadPage />

          </div>

        </div>

        <br />
        <p>user message</p>
      </Card>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ borderTop: "1px solid #f0f0f0" }}
      >
        <SubMenu key="sub1" icon={<UserOutlined />} title="Category 1">
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Category 2">
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<NotificationOutlined />} title="Category 3">
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

export default withRouter(UserMenu)