import React, { useEffect } from 'react'
import { Switch } from 'antd';
import Axios from 'axios';

function Fallow(props) {

    let variable = {
        userTo: props.userTo,
        userFrom: props.userFrom,
        category: props.userToCategory
    }

    const [Type, setType] = React.useState(false)

    useEffect(() => { //돔이 로드되면 수행
        setTimeout(() => {
            Axios.post('/api/fallow/fallowInfo', variable)
                .then(response => {
                    if (response.data.success) {
                        setType(true)
                    } else {
                        setType(false)
                    }
                })
        }, 60)
    }, [props.change, variable])


    const fallowHandler = () => {

        props.onClick(!props.change);

        if (Type === false) {
            Axios.post('/api/fallow/fallow', variable)
                .then(response => {
                    if (response.data.success) {
                        setType(true)
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
                        setType(false)
                    }
                    else {
                        alert('fail to unfallow')
                    }
                })
        }
    }

    return (
        <Switch checked={Type} onChange={fallowHandler} />
    )
}

export default Fallow
