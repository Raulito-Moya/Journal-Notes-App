import React from 'react'
import {useState, useEffect} from 'react'

export const useForm = ( initialState = {} ) => {
 
  const [formValues, setValues] = useState(initialState)

    const reset = ( newFormState = initialState) => {  //esto es para resetearlo con los valores que le mande
       setValues( newFormState )
    }

  const handleInputChange = ({target}) => {
     
    setValues({
      
       ...formValues,
       [target.name]: target.value //aqui digo que el target.name es igual al target.value y se lo almacenocomo valor

     })
    
  }

  return [formValues, handleInputChange, reset]

}
