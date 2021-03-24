import React from 'react'
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import {RegisterScreen} from '../../../components/auth/RegisterScreen'
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { types } from '../../../types/types';



const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
    auth: {},
    ui: {
       loading: false,
       msgError: null
    }
}

let store = mockStore(initialState)
//store.dispatch =jest.fn()


describe('Pruebas en el <RegisterScreen/>', () => {
      
  /*  beforeEach(()=>{
        store= mockStore(initialState)
    })*/


    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
           <RegisterScreen/>
        </MemoryRouter>
      </Provider>
    )



  test('debe mostrarse correctamente',()=>{

     
     expect(wrapper).toMatchSnapshot()

  })


  test('debe hacer el dispatch de la accion respectiva', ()=>{

      const emailField = wrapper.find('input[name="email"]')
   
     // console.log(emailField.exists());
   
      emailField.simulate('change',{
          target: {
              value: '',
              name: 'email'
          }
      });
   
      wrapper.find('form').simulate('submit',{
          preventDefault(){}
      });
   
      const actions = store.getActions();
     // console.log(actions);
   
        expect(actions[0]).toEqual({
            type: types.uiSetError,
            payload: 'email is not valid'
        }); 
       
  })


  test('debe de mostrar la caja de alerta con el error',() => {
     
    const initialState = {
      auth: {},
      ui: {
         loading: false,
         msgError: 'Email no es correcto'
      }
    }
    
    let store = mockStore(initialState)

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
           <RegisterScreen/>
        </MemoryRouter>
      </Provider>
     )

       expect(wrapper.find('.auth__alert-error').exists()).toBe(true)
       expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initialState.ui.msgError)
  })


});