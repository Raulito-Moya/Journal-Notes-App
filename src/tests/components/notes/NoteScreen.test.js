import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {MemoryRouter} from 'react-router-dom';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';

jest.mock('../../../actions/notes',()=>({
   activeNote: jest.fn()
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
            id: 1234,
            title: 'Hola',
            body: 'Mundo',
            date: 0
            
        },
        notes: []
    }
 }
 
    let store = mockStore(initialstate) 
     store.dispatch = jest.fn() //vamos aremplazar la funcionalidad que tenga el store por una funcion
 
   
 const wrapper = mount(
         <Provider store={store}>
           <NoteScreen/>
         </Provider>
     )

describe('Preubas en el <NoteScreen/>', () => {


  test('debe de mostararse correctamente',() => { 
  
    expect( wrapper ).toMatchSnapshot()
  
  })


  test('debe de disparar el activeNotes',()=>{

    wrapper.find('input[name="title"]').simulate('change', {
        target: {
            name: 'title',
            value: 'Hola de nuevo'
        }
    });
         
    expect( activeNote ).toHaveBeenLastCalledWith(
        1234,
        {
            body: 'Mundo',
            title: 'Hola de nuevo',
            id: 1234,
            date: 0
        }
    )

  })

});