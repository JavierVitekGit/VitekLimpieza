import React from 'react'
import {Spinner} from 'reactstrap'
import './Loading.css'

function Loading() {

return(
 
        <div className='loadingC'>
            <div className='centerLoading'>
        <Spinner color='info'/>
        <p>Cargando...</p>
            </div>
        </div>
)



}



export default Loading;