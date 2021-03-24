import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { SideBar } from '../../../components/Journal/SideBar';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {MemoryRouter} from 'react-router-dom';
import { startLogout } from '../../../actions/auth';
import { noteLogout, startNewNote } from '../../../actions/notes';


jest.mock('../../../actions/auth',()=>({
    startLogout: jest.fn()
    
}))


jest.mock('../../../actions/notes',()=>({
    startNewNote: jest.fn(),
    noteLogout: jest.fn()
}))



const middlewares = [thunk]
const mockStore = configureStore(middlewares)


const initialstate = {
    auth: {
        uid: '1',
        name: 'Fernando'
    },
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
 


describe('Pruebas en el <sideBar/>', () => {
    

    const wrapper = mount(
        <Provider store={store}>
         <MemoryRouter>
           <SideBar/>
          </MemoryRouter>
        </Provider>)


    test('debe mostararse correctamente',()=>{

     expect(wrapper).toMatchSnapshot()
    })


    test('debe de llamar el startlogout',()=>{
       
      wrapper.find('button').simulate('click')
      
      expect(startLogout).toHaveBeenCalled()
     
    })


    test('debe de llamar el startNewNote',() => {
        
       wrapper.find('.journal__new-entry').simulate('click')
    
       expect(startNewNote).toHaveBeenCalled()

     })


});