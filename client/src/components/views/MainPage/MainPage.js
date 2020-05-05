import React,{useEffect} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom';

function MainPage(props){

    useEffect(()=>{
        axios.get('/api/hello')
        .then(response => {console.log(response)})
    },[])
    
    const logoutHandler = () =>{
        axios.get(`api/users/logout`)
            .then(response=>{
                if(response.data.success){
                    props.history.push('/login');
                }
            })
    }
    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%', height:'100vh'}}>
            <h2>MainPage</h2>
            <br/>
            <button onClick={logoutHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(MainPage)