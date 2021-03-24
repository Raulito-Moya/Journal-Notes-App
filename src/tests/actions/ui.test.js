import { setError,removeError,startLoading,finishLoading} from "../../actions/ui";
import { types } from "../../types/types";



describe('Pruebas en el ui action', () => {
    
   test('deben funcionar todas las acciones',()=>{

      const action = setError('HELP!!!')

     expect(action).toEqual({
         type: types.uiSetError,
         payload: 'HELP!!!'
     })
  

    
  const action2 = removeError('HELP!!!')
  const action3 = startLoading()
  const action4 = finishLoading()
  
   expect(action2).toEqual({
       type: types.uiRemoveError,
       payload:'HELP!!!'
   })
 
   expect(action3).toEqual({
    type: types.uiStartLoading
})

expect(action4).toEqual({
    type: types.uiFinishLoading
})


   })

});