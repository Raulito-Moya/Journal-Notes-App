import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { AuthRouter } from './AuthRouter'
import {JournalScreen} from '../components/Journal/JournalScreen'
import {firebase} from '../firebase/firebase-config'
import { login } from '../actions/auth'
import { PrivateRoute } from './PrivateRoute'
import {PublicRoute} from './PublicRoute'
import { startLoadingNotes } from '../actions/notes'



export const AppRouter = () => {
    
  const dispatch = useDispatch();
    
      const [checking, setChecking] = useState(true)   //para saber si ya tengo el usuario
      const [isLoggedIn, setIsLoggedIn] = useState(false) 
       //console.log(checking);
     
    useEffect(()=>{
      firebase.auth().onAuthStateChanged( async(user) => {  //este metodo lo que hace es que cada vez que el usuario se autentique se va a disparar

          //console.log(user);

          if( user?.uid ) {
            dispatch( login(user.uid, user.displayName) )
            setIsLoggedIn(true);

         
           dispatch(startLoadingNotes(user.uid)) //hago el dispatch de las notas 

          } else {
             setIsLoggedIn(false);
          }
 
        setChecking(false)

      }); 
  
    },[dispatch, setChecking, setIsLoggedIn]) //esto solo se va a ejecutar una vez lo pongo aqui para que react no me lo warnie


    if ( checking ){
       return (
          <h1>Loading...</h1>
       )
    }



   return(
      
         <Router>
          <div>
              
           <PublicRoute
              path="/auth"
              isAuthenticated={isLoggedIn}
              component={AuthRouter}
              />

           <PrivateRoute
             exact path='/' 
             isAuthenticated={isLoggedIn}
             component={JournalScreen}
             /> 

           

          </div>
      
        </Router>  
     
   )

}