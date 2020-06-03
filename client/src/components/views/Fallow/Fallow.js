import React, { useEffect } from 'react'
import { Button } from 'antd';
import Axios from 'axios';

function Fallow(props) {

    let variable = {
        userTo: props.userTo,
        userFrom: props.userFrom,
        category: props.userToCategory
    }

    const [Type, setType] = React.useState("default")

    useEffect(() => { //돔이 로드되면 수행
        setTimeout(() => {

            Axios.post('/api/fallow/fallowInfo', variable)
                .then(response => {
                    if (response.data.success) {
                        setType("primary")
                    } else {
                        setType("default")
                    }
                })
        }, 50)
    }, [props.change])

    const fallowHandler = () => {

        props.onClick(!props.change);

        if (Type == "default") {
            Axios.post('/api/fallow/fallow', variable)
                .then(response => {
                    if (response.data.success) {
                        setType("primary")
                    }
                    else {
                        alert('fail to fallow')
                    }
                })
        }
        else {
            Axios.post('/api/fallow/unFallow', variable)
                .then(response => {
                    if (response.data.success) {
                        setType("default")
                    }
                    else {
                        alert('fail to unfallow')
                    }
                })
        }
    }

    return (
        <div>

            <Button style={{ fontSize: "x-small" }} type={Type} onClick={fallowHandler}>
                FALLOWING
            </Button>
        </div>
    )
}

export default Fallow
