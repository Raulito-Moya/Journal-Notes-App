

import {createStore ,combineReducers,applyMiddleware, compose} from 'redux' //aqui en el store guardare mis reducers //el combiane reducers es para guardar varios reducerd ya que el freate reducer solo guarda uno
import thunk from 'redux-thunk'; 

import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; //ls config de la extension de devtools                                                


const reducers = combineReducers({
  auth:authReducer,
  ui:uiReducer,
  notes:notesReducer

})


 export const store = createStore(
      reducers,
      composeEnhancers( //esta es la extension para react redux devtools
        applyMiddleware(thunk)
      ) 
   );

   