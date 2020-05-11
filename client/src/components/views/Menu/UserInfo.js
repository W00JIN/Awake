import React from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import image from '../../../img/default.png';
import UploadPage from '../UploadPage/UploadPage'


import { useSelector } from "react-redux";

function UserMenu(props) {
  let username = "";
  const user = useSelector(state => state.user);
  if (user.userData && user.userData.name) {
    username = user.userData.name;
  }
  //console.log(username);

  const userHandler = () => {
    props.history.push('/user');
  }

  return (
    <div style={{ width: 300, height: "100%", margin: "0", padding: "0" }} className="site-card-border-less-wrapper">
      <Card bordered={false} style={{ width: 300, height: "100%", borderRadius: "5px", border: "1px solid" }}>

        <div>
          <img alt="" src={image} style={{ borderRadius: "50%", display: "inline" }} width="30px" height="30px" />
          <p style={{ display: "inline", marginLeft: "15px", fontSize: "16px" }} onClick={userHandler}>
            {username}
          </p>
          <div style={{ float: "right" }}>

            <UploadPage />
          </div>
        </div>

        <br />
        <br />
        <p>User Info 1</p>
        <p>User Info 2</p>
        <p>User Info 3</p>

      </Card>
    </div>
  )
}

export default withRouter(UserMenu)