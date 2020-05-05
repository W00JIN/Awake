import React,{useState} from 'react'
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';
import { Button } from 'antd';

function LoginPage(props){
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event)=>{
        event.preventDefault();
        console.log('Email', Email);
        console.log('Password', Password);

        let body ={
            email: Email,
            password : Password
        }
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/');
                }else{
                    alert(response.payload.message);
                }
            })
    }
    return(
        <div style={{
            display: 'flex', justifyContent:'center', alignItems: 'center',
            width:'100%', height:'100vh'
        }}>
            <form id='loginForm' style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <Button type="primary" htmlType="submit" >
                    Login
                </Button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)