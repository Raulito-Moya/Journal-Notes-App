import { types } from "../types/types";

/*

 {
     uid:'fjjgorjrgj'
     name:'Raul'
 }

 //esto es lo que mandara este rducer cuando este autenticado
*/ 



export const authReducer = (state={},action) =>{

  switch (action.type) {
      case types.login:
            return{
                uid: action.payload.uid,
                name:action.payload.displayName
            }

      case types.logout:
         return{ }
  
      default: return state
  }

}