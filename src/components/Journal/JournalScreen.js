import React from 'react'
import { SideBar } from './SideBar'
import { NothingSelected } from './NothingSelected'
import { NoteScreen } from '../notes/NoteScreen'
import { useSelector } from 'react-redux'


export const JournalScreen= () =>{

     const {active} = useSelector(state => state.notes)
  
       return(
           <div className="journal__main-content ">

               <SideBar/>

               <main>

                   {
                       (active)
                           ?  (<NoteScreen/>)
                           : (<NothingSelected/>)
                   }
                     

               </main>
           </div>
       )


}