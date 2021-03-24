import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NoteAppBar } from './NoteAppBar'



export const NoteScreen = () => {

  const {active:note} = useSelector( state => state.notes)

   const [ formValues, handleInputchange ,reset] =  useForm( note );
   const {body, title, id} = formValues;
 
   const activeId = useRef( note.id ) //guarda la referencia de note.id
  
   const dispatch = useDispatch();

      useEffect(()=>{

         if(note.id !== activeId.current){
           reset(note);
          activeId.current = note.id
         }
      
      },[note,reset])
  

      useEffect(()=>{ //actualizar la nota activa

        dispatch(activeNote(formValues.id, {...formValues}))


      },[formValues, dispatch])




   const handleDelete = () => {
     dispatch(startDeleting( id ))
   }


  return(
      <div className="notes__main-content">
          
         <NoteAppBar/>
   
       <div className="notes__content">
           
           <input 
             type="text"
             className="notes__title-input"
              autoComplete="off" 
              placeholder='Some awesome title'
              name="title"
               value={title}
               onChange={handleInputchange}
              />

              <textarea 
                placeholder="Whats happends today?"
                 className="notes__textarea" 
                 name="body"
                 value={body}
                 onChange={handleInputchange}>
               
            </textarea>

           {
             (note.url) 
               &&  (
                <div className="notes__image">
                   <img src={ note.url }
                      alt="imagen"
                   />
                </div>
                )
           } 

            
       </div>

     <button 
       type="click"
       className="btn btn-danger"
       onClick={handleDelete}
       >
        Delete
       </button>

      </div>
  )
 


}