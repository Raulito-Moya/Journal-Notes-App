import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator  from 'validator'; //Aqui implemento validator paa validar los campos
import {setError,removeError} from '../../actions/ui'
import { startRegisterRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen =()=>{

  const dispatch = useDispatch();
  const { msgError } = useSelector( state => state.ui) //el useSelector es para seleccionar el estado actual y usarlo en la vista

  console.log(msgError);

  const [formValues, handleInputChange, reset] = useForm({
     name:'Nando',
     email:'nando8moya@gmail.com',
     password:'123456',
     password2:'123456'
   })

 const {name,email,password,password2} =formValues;

  
 const handleRegister = (e) => {
    e.preventDefault()
   
    if (isFormValid()) {
      dispatch(startRegisterRegisterWithEmailPasswordName(email, password, name));
    }

 }

 const isFormValid = () => {

   if(name.trim().length === 0 ) {
      dispatch(setError('name is required'))
      console.log('name is required')
      return false;

   } else if( !validator.isEmail(email)){
      dispatch(setError('email is not valid'))
       console.log('email is not valid')
       return false;

   } else if( password !== password2 || password.length < 5){
      dispatch(setError('Password should be at least 6 charecters and match each other'))
     console.log('Password should be at least 6 charecters and match each other');
     return false
   }
    
   dispatch(removeError())
   return true 
  
 }







   return(
    <div>
         
      <h3 className="auth__title">Register</h3>

       <form 
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn animate__faster">

       { 
         msgError && 
        ( 
          <div className="auth__alert-error">
             {msgError}
          </div>
         )
        }

           <input 
           type="text" 
           placeholder="name"
           name="name" 
           value={name}
           onChange={handleInputChange}
           className="auth__input"
           autoComplete="off"/>
     
          <input 
           type="text" 
           placeholder="email"
           name="email" 
           value={email}
           onChange={handleInputChange}
           className="auth__input"
           autoComplete="off"/>
  

      
          <input 
              type="password" 
              placeholder="password"
              name="password" 
              value={password}
              onChange={handleInputChange}
               className="auth__input"/>
          

             <input 
              type="password" 
              placeholder="Confirm Password" 
              name="password2" 
              value={password2}
              onChange={handleInputChange}
              className="auth__input"/>
          
              <button 
                type="submit"
                className="btn btn-primary btn-block mb-5"
                disabled={false}
                >
              Register
             </button>
          
          
          
            <Link 
            to='/auth/login'
            className="link"
            >
              Alredy Registered
            </Link>
             
          </form>
                 </div>
             )
  
  
}