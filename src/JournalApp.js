import React from 'react'
import {Provider} from 'react-redux'  //el provider va a tener la informacion
import { store } from './store/store'
import { AppRouter } from './routers/AppRouter'




export const JournalApp = () => {
    
   return(
       <>  
         <Provider store={store}>     
             <AppRouter/>
         </Provider>
         
       </>
   )


}