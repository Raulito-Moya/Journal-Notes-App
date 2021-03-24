import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router-dom' //me va a permitir fingir las rutas
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import {firebase} from '../../firebase/firebase-config'


import { AppRouter } from '../../routers/AppRouter';
import '@testing-library/jest-dom'
import { login } from '../../actions/auth';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import Swal from 'sweetalert2';

jest.mock('sweetalert2',()=>({
    fire: jest.fn()
   
 }))

jest.mock('../../actions/auth',()=>({
    login: jest.fn()
   
 }))


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialstate = {
   auth: {},
   ui: {
      loading: false,
      msgError: null
   },
   notes: {
       active: {
           id: 'Abc',
           
       },
       notes: []
   }

}

   let store = mockStore(initialstate) 
    store.dispatch = jest.fn() //vamos aremplazar la funcionalidad que tenga el store por una funcion



describe('Pruebas en el <AppRouter/>', () => {
    
   test('debe de llamar el login si estoy autenticado',async()=>{

     let user;

  await act( async()=>{

     const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456')
      user = userCred.user;

     console.log(userCred);

     const wrapper = mount( 
        <Provider store={store}> 
         <MemoryRouter>
           <AppRouter/>
         </MemoryRouter>
        </Provider>
       )

    })

    expect(login).toHaveBeenCalled()
    
     

   })


});