import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { login, startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'; //aqui traigo la accion
import {setError, removeError} from '../../actions/ui'
import validator from 'validator';
import { useForm } from '../../hooks/useForm';


export const LoginScreen = () => {

     const dispacth = useDispatch()   //el useDispatch es para hacer el dispatch de acciones
     const {msgError, loading} = useSelector(state=> state.ui)
    
    // console.log(state);


     const [formValues, handleInputChange, reset] = useForm({
       email: 'nando8moya@gmail.com',
       password: '123456'
     });

    const {email,password} = formValues;



    const handleLogin = (e) =>{
      e.preventDefault()

      
         dispacth(startLoginEmailPassword(email,password)) //aqui va a disparar la accion asincrona
         //console.log(email, password);
      
    };


    const handleGoogleLogin = () => {
    
    if(isFormValid()){ 
       dispacth(startGoogleLogin()) 
      }  
      console.log('hey!!');
    };




    const isFormValid = () => {

        if( !validator.isEmail(email)){
         dispacth(setError('email is not valid'))
          console.log('email is not valid')
          return false;
   
      } else if( password.length < 6  ){
         dispacth(setError('wrong password'))
        console.log('Password should be at least 6 charecters and match each other');
        return false
      }
       
      dispacth(removeError())
      return true 
     
    }
   

 return(
     <>
         <h3 className="auth__title">Login</h3>

         <form 
         onSubmit={handleLogin}
        className="animate__animated animate__fadeIn animate__faster"  >

           { 
            msgError && ( 
             <div className="auth__alert-error">
               {msgError}
           </div>)
           
           }  

             <input 
             type="text" 
             placeholder="Email"
             name="email" 
             value={email}
             className="auth__input"
             autoComplete="off"
             onChange={handleInputChange}/>

            <input 
             type="password" 
             placeholder="password"
             name="password" 
             value={password}
              className="auth__input"
              onChange={handleInputChange}/>

         
             <button 
               type="submit"
               className="btn btn-primary btn-block"
               disabled={loading}
               >
                Login
            </button>

            <hr/>
            
           <div className="auth_social-networks">
               <p>Login with social networks</p>

               <div 
                  className="google-btn"
                  onClick={handleGoogleLogin}
                 >
               <div className="google-icon-wrapper">
                  <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
               </div>
                 <p className="btn-text">
                   <b>Sign in with google</b>
                </p>
               </div>
           </div>
   
           <Link 
           to='/auth/register'
           className="link"
           >
             Create New Acount  
           </Link>
            
         </form>
     </>
 )



}