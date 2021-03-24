
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {MemoryRouter} from 'react-router-dom';
import { JournalEntry } from '../../../components/Journal/JournalEntry';
import { activeNote } from '../../../actions/notes';






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
 
     const nota = {
         id: 10,
         date: 0,
         title: 'Hola',
         body: 'Mundo',
         url: 'https://algunlugar.com/foto.jpg'
     }

   




describe('Pruebas en el <JournalEntry/>', () => {

      const wrapper = mount(
        <Provider store={store}>
         <MemoryRouter>
            <JournalEntry {...nota}/>
          </MemoryRouter>
        </Provider>)

  test('debe de mostrarse correctamente',()=>{

      expect(wrapper).toMatchSnapshot();

  })
 
  test("debe de activar la nota",()=>{

     wrapper.find('.Journal__entry') .prop('onClick')();

    expect(store.dispatch).toHaveBeenCalledWith(
        activeNote( nota.id , {...nota})
    );

  })

});