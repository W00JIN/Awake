import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Tabs } from 'antd';
import UploadPage from '../UploadPage/UploadPage'
import Axios from 'axios';

const { TabPane } = Tabs;


function UserMenu(props) {

  var fallower = [];
  const [FallowingList, setFallowingList] = React.useState([])
  const [FallowerList, setFallowerList] = React.useState([])

  useEffect(() => { //돔이 로드되면 수행


    if (props.userid) {
      //setTimeout(() => {
        const variable = {
          userID: props.userid
        }

        Axios.post('/api/fallow/getFallowingList', variable)
          .then(response => {
            if (response.data.success) {
              console.log(response.data)
              setFallowingList(response.data.fallowing)
            }
            else {
              alert('fail to load fallowing list')
            }
          })

        Axios.post('/api/fallow/getFallowerList', variable)
          .then(response => {
            if (response.data.success) {
              console.log(response.data)
              setFallowerList(response.data.fallower)
            }
            else {
              alert('fail to load fallower list')
            }
          })
     // }, 50)
    }
  }, [props.userid])
  

  useEffect(() => { //돔이 로드되면 수행


    if (props.userid) {
      setTimeout(() => {
        const variable = {
          userID: props.userid
        }

        Axios.post('/api/fallow/getFallowingList', variable)
          .then(response => {
            if (response.data.success) {
              console.log(response.data)
              setFallowingList(response.data.fallowing)
            }
            else {
              alert('fail to load fallowing list')
            }
          })

        Axios.post('/api/fallow/getFallowerList', variable)
          .then(response => {
            if (response.data.success) {
              console.log(response.data)
              setFallowerList(response.data.fallower)
            }
            else {
              alert('fail to load fallower list')
            }
          })
      }, 60)
    }
  }, [props.change])


  const fallowinglist = FallowingList.map((item, index) => {

    let categoryName = ""
    item.userTo.category.forEach(element => {
      if (element._id == item.category) {
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

  const fallowerlist = FallowerList.map((item, index) => {

    if (fallower.indexOf(item.userFrom.name) == -1) {
      fallower.push(item.userFrom.name);
      return <div key={index} style={{ borderBottom: "1px solid #f0f0f0", padding: "10px 20px 10px 20px" }}>
        <img alt="" src={item.userFrom.image} style={{ borderRadius: "50%", display: "inline" }} width="25px" height="25px" />

        <p style={{ display: "inline", marginLeft: "10px", fontSize: "14px" }}>
          <a href={`/user/${item.userFrom._id}`} style={{ color: "black" }}>
            {item.userFrom.name}
          </a>
        </p>

      </div>
    }
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
          <TabPane tab="FALLOWING" key="1">
            {fallowinglist}
          </TabPane>
          <TabPane tab="FALLOWER" key="2">
            {fallowerlist}
          </TabPane>
        </Tabs>
      </div>

    </div>
  )
}

export default withRouter(UserMenu)