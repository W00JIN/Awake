import React,{useEffect} from 'react'
import axios from 'axios'

function MainPage(){

    useEffect(()=>{
        axios.get('/api/hello')
        .then(response => {console.log(response)})
      },[])

    return(
        <dev style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100%', height:'100vh'}}>
            <h2>MainPage</h2>
        </dev>
    )
}

export default MainPage