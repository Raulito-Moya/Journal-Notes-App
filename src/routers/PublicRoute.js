import React from 'react'
import {Redirect, Route} from 'react-router-dom'

export const PublicRoute = ( {component:Component,isAuthenticated,...rest} ) =>{

return(

 <Route {...rest}
    component={(props) => ( 
                         (!isAuthenticated) 
                         ? (<Component {...props}/>)   //si no hay path el Route lo que hace es mandar el componente
                         : (<Redirect to='/'/>) )}/>

)
 
}