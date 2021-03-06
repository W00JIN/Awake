import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Button, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import NavBar from '../NavBar/LogOutNavBar'

const { Content } = Layout;


function LoginPage(props) {

    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log('Email', Email);
        console.log('Password', Password);

        let body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/');
                } else {
                    alert(response.payload.message);
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

                            <div style={{ display: 'block', textAlign: 'center', fontSize: '23pt', fontWeight: 'bold', color: 'black', paddingTop: '130px', width: '95%', height: '79vh' }} >
                                <p style={{ marginTop: "40px" }}>LOGIN</p>
                                <div style={{
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',

                                }}>

                                    <div>
                                        <form id='loginForm' style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                                            <Input placeholder="Email" prefix={<UserOutlined />} type="email" value={Email} onChange={onEmailHandler}
                                                style={{ marginBottom: '10px' }}
                                            />

                                            <Input placeholder="Password" prefix={<LockOutlined />} type="password" value={Password} onChange={onPasswordHandler}
                                                style={{ marginBottom: '20px' }}
                                            />

                                            <Button type="primary" htmlType="submit" >
                                                Login
                                            </Button>
                                            <a href='/register'>
                                                <p style={{ fontSize: "13px", float: "left", marginTop: "12px" }}>
                                                    아직 회원이 아니신가요?
                                                </p>
                                            </a>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}

export default withRouter(LoginPage)