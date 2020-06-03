import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';
import { Button, Input } from 'antd';

import { Layout } from 'antd';
import NavBar from '../NavBar/LogOutNavBar'
const { Content } = Layout;

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPW, setConfirmPW] = useState("");


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPWHandler = (event) => {
        setConfirmPW(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPW) {
            return alert("비밀번호를 확인해주세요.");
        }

        let body = {
            email: Email,
            name: Name,
            password: Password,
            category:{"name": "default category" }
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login');
                }
            })

    }
    return (

        <Layout style={{ height: "100vh" }}>
            <NavBar />
            <Content style={{ padding: '35px', margin: '16px' }}>
                <Layout className="site-layout-background" style={{ padding: '0' }}>

                    <Content style={{ minHeight: 280, border: "1px solid", borderRadius: "5px" }}>
                        <div style={{ backgroundColor: 'white', borderRadius: "10px" }}>



                            <div style={{ display: 'block', textAlign: 'center', color: 'black', paddingTop: '130px', width: '95%', height: '79vh' }} >
                                <p style={{ marginTop: "30px", fontSize: '21pt', fontWeight: 'bold' }}>REGISTER</p>
                                <div style={{
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',

                                }}>
                                    <form onSubmit={onSubmitHandler}>
                                        <div style={{ textAlign: 'right', marginRight: '50px' }} >
                                            <label>Email : </label>
                                            <Input style={{ width: '230px', marginBottom: '5px' }} type="email" value={Email} onChange={onEmailHandler} />
                                            <br />
                                            <label>Name : </label>
                                            <Input style={{ width: '230px', marginBottom: '5px' }} type="text" value={Name} onChange={onNameHandler} />
                                            <br />
                                            <label>Password : </label>
                                            <Input style={{ width: '230px', marginBottom: '5px' }} type="password" value={Password} onChange={onPasswordHandler} />
                                            <br />
                                            <label>Confirm Password : </label>
                                            <Input style={{ width: '230px', marginBottom: '15px' }} type="password" value={ConfirmPW} onChange={onConfirmPWHandler} />
                                        </div>
                                        <br />
                                        <Button style={{ width: '150px' }} type="primary" htmlType="submit">
                                            Register
                                        </Button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}

export default withRouter(RegisterPage)