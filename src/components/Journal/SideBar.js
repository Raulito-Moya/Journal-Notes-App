import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { startLogout } from '../../actions/auth';
import { noteLogout, startNewNote } from '../../actions/notes';
import {JournalEntries} from './JournalEntries';


export const SideBar = () =>{
      
     const dispatch = useDispatch();
     const {name} = useSelector(state => state.auth)


     const handleLogout = () => {
        //console.log('click');
        
      dispatch( startLogout() )
      dispatch( noteLogout() )   

     }

     const handleAddNew =() =>{
         dispatch( startNewNote(dispatch) )
     }

     return(
        <aside className="journal__sidebar">
             
          <div className="journal__sidebar-navbar">
              <h3 className="mt-5">
                  <i className="far fa-moon"/>
                  <span>{name}</span>
              </h3>

              <button 
               type="click" 
               className="btn"
               onClick={handleLogout}
                >
                 Logout
               </button>
          </div>

          <div 
              className="journal__new-entry"
              onClick={handleAddNew}>
              <i className="far fa-calendar-plus fa-5x"/>
              <p className="mt-5">
                  New Entry
              </p>
          </div>
          
          <JournalEntries/>
    
        </aside>
     )


}