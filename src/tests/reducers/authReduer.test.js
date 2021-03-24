import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


describe('Pruebas en authReducer', () => {
     
     

    test('debe de retornar el uid y el name',()=>{

        const action = {
            type: types.login,
            payload:{
                uid:'32634',
                displayName:'Raul'
            }
        }


    const state =  authReducer({},action)       
      
      expect(state).toEqual({uid:'32634',name:'Raul'})

    })


    test('debe de de dar una state en {}',()=>{

        const action = {
            type: types.logout,
          
        }

      const state = authReducer({}, action)
         
      expect(state).toEqual({})

    })

});