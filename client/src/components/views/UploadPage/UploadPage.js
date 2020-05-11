import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Modal, Button, message } from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import {useSelector} from 'react-redux';

const TextArea = Input;
const OptionValue = [
    { value: "0", label: "category1" },
    { value: "1", label: "category2" },
    { value: "2", label: "category3" }
]
function UploadPage(props) {
    const user = useSelector(state => state.user);

    const [visible, setOpen] = React.useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            writer: user.userData._id,
            description: Description,
            filePath: FilePath,
            Category: Category
        }
        Axios.post('api/posts/uploadPost', variables)
            .then(response=>{
                if(response.data.success){

                    message.success('successfully uploaded your post')
                    setTimeout(()=>{
                        props.history.push('/');
                    },1000)
                }else{
                    alert('fail to upload your content');
                }
            })
        setOpen(false);
    }

    const categoryInit = OptionValue[0].value;
    const [Description, setDescription] = useState("");
    const [Category, setCategory] = useState(categoryInit);
    const [FilePath, setFilePath] = useState("");

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value);
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'const-type': 'multipart/form-data' }
        }
        formData.append("file", files[0]);
        console.log(formData);

        Axios.post('api/posts/uploadFile', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);

                    setFilePath(response.data.url)

                } else {
                    alert('업로드를 실패했습니다.');
                }
            })
    }

    console.log(categoryInit);
    return (
        <div>
        <Button type="default" style={{ fontSize: "x-small" }} onClick={() => setOpen(true)}>
            UPLOAD
        <PlusCircleOutlined style={{ marginLeft: "5px" }} />
        </Button>

        <Modal
            title="Upload your photo"
            visible={visible}
            onOk={onSubmit}
            onCancel={() => setOpen(false)}
            centered
            width="55%"

        >
            <div style={{ width: "100%", height: "380px" , paddingRight:"20px", paddingLeft:"20px"}} >
                <Form onSubmit={onSubmit}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={10000000000}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div style={{
                                    width: '300px', height: '240px', border: '1px solid lightgray',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <span style={{ fontSize: "2.5rem" }} >+</span>
                                </div>

                            )}
                        </Dropzone>
                        {FilePath &&
                            <div>
                                <img style={{ marginLeft: "10px", width: '45wh', height: '240px' }} src={`http://localhost:5000/${FilePath}`} alt="" />
                            </div>
                        }
                    </div>
                    <br />
                    <label>Description</label>
                    <TextArea
                        onChange={onDescriptionChange}
                        value={Description}
                    />
                    <br />
                    <br />
                    <select onChange={onCategoryChange}>
                        {OptionValue.map((item, index) => {
                            return <option key={index} value={item.value}>{item.label}</option>
                        })}
                    </select>

                </Form>
            </div>
        </Modal>
        </div>
    )
}

export default withRouter(UploadPage);
