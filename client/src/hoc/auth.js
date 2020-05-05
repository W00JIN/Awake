import React, {useEffect} from 'react';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {auth} from '../_actions/user_action';


export default function (SpecificComponent, option, adminRoute = null){

    //option => null: 아무나 출입 가능한 페이지 / true: 로그인 한 유저만 출입 가능한 페이지 / false: 로그인 하지 않은 유저만 출입 가능한 페이지

    const dispatch = useDispatch();

    function AthenticationCheck(props){
        useEffect(() => {

            dispatch(auth()).then(response =>{
                console.log(response);

                if(!response.payload.isAuth){
                    // login X
                    if(option === true){
                        props.history.push('/login');
                    }

                }else{
                    // login O

                    if(adminRoute===true && response.payload.isAdmin ===false){
                        props.history.push('/');
                    }else{
                        if(option ===false){
                            props.history.push('/');
                        }
                    }

                }
            })

            

        }, [])
        return (
            <SpecificComponent />
        )
    }




    return AthenticationCheck
}