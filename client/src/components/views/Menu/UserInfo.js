import React from 'react'
import { withRouter } from 'react-router-dom';
import { Card } from 'antd';
import UploadPage from '../UploadPage/UploadPage'



function UserMenu(props) {
  console.log("props: "+props.username);

  const userHandler = () => {
    props.history.push('/user');
  }

  return (
    <div style={{ width: 300, height: "100%", margin: "0", padding: "0" }} className="site-card-border-less-wrapper">
      <Card bordered={false} style={{ width: 300, height: "100%", borderRadius: "5px", border: "1px solid" }}>

        <div>
          <img alt="" src={props.userimg} style={{ borderRadius: "50%", display: "inline" }} width="30px" height="30px" />
          <p style={{ display: "inline", marginLeft: "15px", fontSize: "16px" }} onClick={userHandler}>
            {props.username}
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