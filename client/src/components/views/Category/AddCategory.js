import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Modal, Button } from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';
import Axios from 'axios';

const TextArea = Input;

function AddCategory(props) {

    const [visible, setOpen] = React.useState(false);
    const [CategoryName, setCategoryName] = useState("");

    const onSubmit = (e) => {

        e.preventDefault();

        const variables = {
            user: props.userid,
            categoryName: CategoryName,
        }

        Axios.post('/api/users/addCategory', variables)
            .then(response => {
                if (response.data.success) {
                    window.location.reload();
                } else {
                    alert('fail to add your category');
                }
            })

        setCategoryName("");
        setOpen(false);
    }

    const closed = () => {
        setCategoryName("");
        setOpen(false);
    }

    const onCategoryNameChange = (e) => {
        setCategoryName(e.currentTarget.value);
    }

    return (
        <div>
            <Button type="default" style={{ fontSize: "x-small" }} onClick={(e) => setOpen(true)}>
                New Category
        <PlusCircleOutlined style={{ marginLeft: "5px" }} />
            </Button>

            <Modal
                title="Add New Category"
                visible={visible}
                onOk={onSubmit}
                onCancel={closed}
                centered
                width="55%"

            >
                <div style={{ width: "100%", height: "80px", paddingRight: "20px", paddingLeft: "20px" }} >
                    <Form onSubmit={onSubmit}>

                        <label>Category Name</label>
                        <TextArea
                            style={{ marginTop: "10px" }}
                            onChange={onCategoryNameChange}
                            value={CategoryName}
                        />

                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default withRouter(AddCategory);
