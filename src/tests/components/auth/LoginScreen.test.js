import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux'
import { MemoryRouter } from 'react-router-dom' //me va a permitir fingir las rutas
import { LoginScreen } from "../../../components/auth/LoginScreen";
import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';


jest.mock('../../../actions/auth',()=>({
   startGoogleLogin: jest.fn(),
   startLoginEmailPassword: jest.fn()
}))


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialstate = {
   auth: {},
   ui: {
      loading: false,
      msgError: null
   }
}

   let store = mockStore(initialstate) 
    store.dispatch = jest.fn() //vamos aremplazar la funcionalidad que tenga el store por una funcion

describe('Pruebas en el LoginScreen', () => {
   
   beforeEach(()=>{
      store = mockStore(initialstate);
      jest.clearAllMocks();  //limpiar los mocks
  })

  const wrapper = mount(  //aqui e proveo el redux con el provider
   <Provider store={store}> 
   <MemoryRouter>
    <LoginScreen/>
   </MemoryRouter>
   </Provider>
  )



   test('Pruebas en el <loginScreen/>',()=>{

   

    expect(wrapper).toMatchSnapshot();

   })

   test('debe de disparar la accion de <startLoginScreen/>',()=>{
    
    
      wrapper.find('.google-btn').prop('onClick')();
 
      expect( startGoogleLogin ).toHaveBeenCalled()
   })


   test('debe de disparar el startLoading con sus respectivos argumentos',()=>{
      

    wrapper.find('form').prop('onSubmit')(
       { preventDefault(){} }
    );
     
    
     expect( startLoginEmailPassword).toHaveBeenLastCalledWith('nando8moya@gmail.com','123456')
   })

});