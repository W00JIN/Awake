import React from 'react'
import { withRouter } from 'react-router-dom';
import { Card } from 'antd';
import UploadPage from '../UploadPage/UploadPage'



function UserMenu(props) {
  console.log("props: " + props.username);

  return (
    <div>
      <Card bordered={false} style={{ width: "100%", height: "100%", borderRadius: "10px" }}>

        <div>

          <img alt="" src={props.userimg} style={{ borderRadius: "50%", display: "inline" }} width="30px" height="30px" />
          <a href={`/user/${props.userid}`} style={{color:"black"}}>
            <p style={{ display: "inline", marginLeft: "15px", fontSize: "16px" }}>
              {props.username}
            </p>
          </a>
          <div style={{ float: "right" }}>

            <UploadPage userid={props.userid} username={props.username} userimg={props.userimg} />

          </div>

        </div>

        <br />
        <p>user message</p>

      </Card>


      <div style={{ borderTop: "1px solid #f0f0f0" }}>
      </div>

    </div>
  )
}

export default withRouter(UserMenu)