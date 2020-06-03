import React, { useEffect } from 'react'
import { Button } from 'antd';
import Axios from 'axios';

function Subscribe(props) {

    let variable = {
        userTo: props.userTo,
        userFrom: props.userFrom
    }

    const [Type, setType] = React.useState("default")

    useEffect(() => { //돔이 로드되면 수행


        Axios.get('/api/subscribe/subscribeInfo', variable)
            .then(response => {
                if (response.data.success) {
                    setType("primary")
                }
                else {
                    alert('fail to loading posts')
                }
            })
    }, [])

    const fallowHandler = () => {
        if (Type == "primary") {
            Axios.get('/api/subscribe/subscribe', variable)
                .then(response => {
                    if (response.data.success) {
                        setType("primary")
                    }
                    else {
                        alert('fail to loading posts')
                    }
                })
        }
        else setType("default")
    }

    return (
        <div>

            <Button style={{ fontSize: "x-small" }} type={Type} onClick={fallowHandler}>
                FALLOWING
            </Button>
        </div>
    )
}

export default Subscribe
