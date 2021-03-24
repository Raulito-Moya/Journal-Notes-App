import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import {firebase, googleAuthProvider} from '../firebase/firebase-config';
import { types } from "../types/types";
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';
 
const MySwal = withReactContent(Swal) //para los efectos de aniamacion en el form

export const startLoginEmailPassword = (email,password) => { //aqui voy a simular una accion asincrona
     return (dispatch) => {
        
       dispatch(startLoading())
     return  firebase.auth().signInWithEmailAndPassword(email,password) //esta instruccion es para logear al usuario
              .then( ({user}) => {
                 // console.log(user)
               dispatch( login(user.uid, user.displayName))  
               dispatch(finishLoading())
            })
            .catch(e => {
               console.log(e); 
               dispatch(finishLoading()) //por si hay un error
               MySwal.fire( 'Error', e.message , 'error')
              })

     }

};

export const startRegisterRegisterWithEmailPasswordName = ( email, password, name) => {

   return( dispatch ) => {

      firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({user}) =>{

            await user.updateProfile({ displayName: name }) //update user profile data, se espera que se actualize el objeto para despues hacr el dispatch

            //  console.log(user);
                  dispatch( 
                       login(user.uid, user.displayName) 
                      ) 
             })
             .catch(e =>{
               console.log(e);
               MySwal.fire( 'Error', e.message , 'error')
             })
   }



};

export const startGoogleLogin = () => {  //aqui hago un sign in con google
   return (dispatch) => {
  
     firebase.auth().signInWithPopup(googleAuthProvider)
           .then( ({user}) =>{
             dispatch( login(user.uid, user.displayName) ) 
           })
   }


};

export const login = (uid, displayName) => ({
       type: types.login,
       payload: {
         uid,
         displayName
       }
});


export const startLogout = () => {
     return async( dispatch ) => {

      await firebase.auth().signOut();
      dispatch(logout())
      dispatch(noteLogout()) //
     }

}


export const logout = () => ({
   type: types.logout

})