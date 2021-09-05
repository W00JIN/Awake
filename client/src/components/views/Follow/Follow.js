import React, { useEffect } from 'react'
import { Switch } from 'antd';
import Axios from 'axios';

function Follow(props) {

    let variable = {
        userTo: props.userTo,
        userFrom: props.userFrom,
        category: props.userToCategory
    }

    const [Type, setType] = React.useState(false)

    useEffect(() => { //돔이 로드되면 수행
        setTimeout(() => {
            Axios.post('/api/follow/FollowInfo', variable)
                .then(response => {
                    if (response.data.success) {
                        setType(true)
                    } else {
                        setType(false)
                    }
                })
        }, 60)
    }, [props.change, variable])


    const FollowHandler = () => {

        props.onClick(!props.change);

        if (Type === false) {
            Axios.post('/api/follow/Follow', variable)
                .then(response => {
                    if (response.data.success) {
                        setType(true)
                    }
                    else {
                        alert('fail to Follow')
                    }
                })
        }
        else {
            Axios.post('/api/follow/unFollow', variable)
                .then(response => {
                    if (response.data.success) {
                        setType(false)
                    }
                    else {
                        alert('fail to unFollow')
                    }
                })
        }
    }

    return (
        <Switch checked={Type} onChange={FollowHandler} />
    )
}

export default Follow
