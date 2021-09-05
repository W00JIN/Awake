import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Tabs } from 'antd';
import UploadPage from '../UploadPage/UploadPage'
import Axios from 'axios';

const { TabPane } = Tabs;


function UserMenu(props) {

  var Follower = [];
  const [FollowingList, setFollowingList] = React.useState([])
  const [FollowerList, setFollowerList] = React.useState([])

  useEffect(() => { //돔이 로드되면 수행

    const variable = {
      userID: props.userid
    }

    if (props.userid) {
      setTimeout(() => {
        Axios.post('/api/follow/getFollowingList', variable)
          .then(response => {
            if (response.data.success) {
              setFollowingList(response.data.Following)
            }
            else {
              alert('fail to load Following list')
            }
          })

        Axios.post('/api/follow/getFollowerList', variable)
          .then(response => {
            if (response.data.success) {
              setFollowerList(response.data.Follower)
            }
            else {
              alert('fail to load Follower list')
            }
          })
      }, 60)
    }
  }, [props.change, props.userid])


  const Followinglist = FollowingList.map((item, index) => {

    let categoryName = ""
    item.userTo.category.forEach(element => {
      if (element._id === item.category) {
        categoryName = element.name;
      }
    });

    return <div key={index} style={{ borderBottom: "1px solid #f0f0f0", padding: "10px 20px 10px 20px" }}>
      <img alt="" src={item.userTo.image} style={{ borderRadius: "50%", display: "inline" }} width="25px" height="25px" />

      <p style={{ display: "inline", marginLeft: "10px", fontSize: "14px" }}>
        <a href={`/user/${item.userTo._id}`} style={{ color: "black" }}>
          {item.userTo.name}
        </a>
        &nbsp;/ {categoryName}</p>

    </div>
  })

  const Followerlist = FollowerList.map((item, index) => {

    if (Follower.indexOf(item.userFrom.name) === -1) {
      Follower.push(item.userFrom.name);
      return <div key={index} style={{ borderBottom: "1px solid #f0f0f0", padding: "10px 20px 10px 20px" }}>
        <img alt="" src={item.userFrom.image} style={{ borderRadius: "50%", display: "inline" }} width="25px" height="25px" />

        <p style={{ display: "inline", marginLeft: "10px", fontSize: "14px" }}>
          <a href={`/user/${item.userFrom._id}`} style={{ color: "black" }}>
            {item.userFrom.name}
          </a>
        </p>

      </div>
    }
    else return <div key={index}></div>
  })



  return (
    <div>
      <Card bordered={false} style={{ width: "100%", height: "100%", borderRadius: "10px" }}>

        <div>

          <img alt="" src={props.userimg} style={{ borderRadius: "50%", display: "inline" }} width="30px" height="30px" />
          <a href={`/user/${props.userid}`} style={{ color: "black" }}>
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

        <Tabs defaultActiveKey="1">
          <TabPane disabled tab="&emsp;&ensp;" key="0" >
          </TabPane>
          <TabPane tab="FOLLOWING" key="1">
            {Followinglist}
          </TabPane>
          <TabPane tab="FOLLOWER" key="2">
            {Followerlist}
          </TabPane>
        </Tabs>
      </div>

    </div>
  )
}

export default withRouter(UserMenu)