import { types } from "../types/types"


const initialState = {
    notes: [],
    active: null
}


export const notesReducer = (state = initialState, action) => {
   
     switch (action.type) {
     
        case types.notesActive:
            return{
                ...state,
                active:{
                    ...action.payload
                }
            };       
            
         case types.notesAddNew:
             return{
                 ...state,
                 notes: [ action.payload, ...state.notes] //agrego la nota al sidebar y mando una copia de las notas
             }   
            
         case types.notesLoad:
             return{
                 ...state,
                 notes:[
                     ...action.payload
                 ]
             };    

          case types.notesUpdated:
              return{
                  ...state,
                  notes: state.notes.map(
                      note => note.id === action.payload.id // si se cumple regresa el payload en la nota especifica sino regresa la nota
                        ? action.payload.note
                        : note
                  ) //regreso la nota actualizada para mostrarla en el menu
              };   

           case types.notesDelete:
               return{
                   ...state,
                   active: null,
                   notes: state.notes.filter( note => note.id !== action.payload ) //las notas distintas a esa condicion
               }   

            case types.notesLogoutCleaning:
                return{
                    ...state,
                    active: null,
                    notes: action.payload
                }   
      
         default:
             return state
           
     }



}