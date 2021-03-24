import { useSelector } from "react-redux";
import { notesReducer } from "../../reducers/notesReducer";
import { types } from "../../types/types";


describe('Pruebas en Notes Reducer', () => {
   


   test('debe activarse la nota al seleccionarla',()=>{
                
     
      const initialState = {
          notes: [],
          active: null
      }

       const action = {
           type:types.notesActive,
           payload:{
               id:'dadadsedesds',
               note:{}
           }
       }
      
        
        
       const returnState = notesReducer(initialState,action)             
 
       const returned = {
        active:{
          id:'dadadsedesds',
          note:{}
        },
        notes:[]
        
    }

      expect(returnState).toEqual(returned)
     

   });
   
   
   test('que se actualizen las notas con el types.notesUpdated',(props)=>{

     
    const initialState = {
        notes: [],
        active: null
    }

     const action = {
         type: types.notesUpdated,
         payload:{
           
         }
     }


     const returnState = notesReducer( initialState, action)

     const returned = {
            active:null,
            notes:[]  
     }


       expect(returnState).toEqual(returned)


   });
     

});