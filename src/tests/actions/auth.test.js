import thunk from "redux-thunk";
import { login, logout, startLoginEmailPassword, startLogout, startRegisterRegisterWithEmailPasswordName } from "../../actions/auth";
import { types } from "../../types/types";
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom'
import { store } from "../../store/store";
import { getDefaultNormalizer } from "@testing-library/dom";




const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialstate = {}


describe('Pruebas con las acciones de auth', () => {
    let store = mockStore(initialstate) 
     beforeEach(()=>{
         store = mockStore(initialstate)
     })
   


  test('login y logout deben crear la accion respectiva ',()=>{

     const uid = 'UID234567'
     const displayName = 'Raul'

    const loginAction = login(uid, displayName)
    const logoutAction = logout()

    expect(loginAction).toEqual({
        type: types.login,
        payload: {
          uid,
          displayName
        }
    })

    expect(logoutAction).toEqual({
        type: types.logout
    })
  });



   test('debe de realizar el logout', async()=>{
 
   

    const actions = store.getActions()
    console.log(actions);
    
    expect(actions[0] ).toEqual({
        type: types.logout
    })

    expect(actions[1] ).toEqual({
        type: types.notesLogoutCleaning,
        payload:[]
    })
    

   })


   test('debe de iniciar el startLoginWithEmailandPassword', async()=>{

     await store.dispatch(startLoginEmailPassword('test@testing.com','123456') );

     const actions = store.getActions();
     console.log(actions);

     expect( actions[1]).toEqual({
         type: types.login,
         payload: {
             uid: 'DAZkREuRKihs9K4X8IBA8Z8cyWI2',
             displayName: null
         }
     })

   })

  /* test('debe registrar un nuevo usuario',async()=>{

      await store.dispatch(startRegisterRegisterWithEmailPasswordName('manuel@gmail.com', '1234564','Manuel'))
      
      const actions = store.getActions();
      console.log(actions);


   })*/

});