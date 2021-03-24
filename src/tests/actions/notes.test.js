/*import { types } from "../../types/types"
import configureStore from 'redux-mock-store'
import { startLoadingNotes, startNewNote, startSaveNote, startUpLoading } from "../../actions/notes"
import thunk from 'redux-thunk'
import { db } from "../../firebase/firebase-config"
import { fileUpload } from "../../helpers/fileUpload"

//Estas pruebas no se hicieron bien ya que el profe creo que trabajo con verisones mas antiguas 

jest.mock('../../helpers/fileUpload',() => ({
  fileUpload: jest.fn( ()=>{
     return 'https://hola-mundo.com/cosa.jpg'
  })
}))

const middlewares = [thunk] 
const mockStore = configureStore(middlewares)
 


const initialState = {
    auth: {
        uid:'TESTING'
    },
    notes: {
       active: {
         id: '1wcPTQY3miEbxJJ99JCg',
         title: 'Hola',
         body: 'Mundo'
       }
    }
}

let store = mockStore(initialState)  // este mockStore es para hacer pruebas con el store y que este me devuelva las acciones



describe('Pruebas en las acciones notes', () => {

    beforeEach( () => {
        store = mockStore(initialState)
    })
    
   test('debe de crear una nueva nota startNewNote',  ()=>{
    

     store.dispatch(startNewNote())

      const actions = store.getActions();
     // console.log(process.env);
     // console.log(actions);

      expect(actions[0]).toEqual({
          type: types.notesActive,
          payload: {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number)
          }
      })

     expect(actions[1]).toEqual({
        type: types.notesAddNew,
        payload: {
          id: expect.any(String),
          title: '',
          body: '',
          date: expect.any(Number)
        }
     })


     const {id} = actions[0].payload
    
     db.doc(`${'TESTING'}/journal/notes/${id}`).delete()
      

   })

   test('startLoadingNotes ,debe cargar las notas', ()=>{  //esta prueba me d el error de que el tiempo es demasiado
   


    store.dispatch( startLoadingNotes('TESTING'));
   const actions =  store.getActions();

    expect( actions[0] ).toEqual({
      type: types.notesLogoutCleaning,
      payload:expect.any(Array)
    });

    console.log(actions);


    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number)
    }

    expect( actions[0].payload[0] ).toMatchObject( expected ) //que sea igaul al objeto

   })


   test('startSaveNote debe de actualizar la nota',()=>{
    


    const note = {
       id: '1wcPTQY3miEbxJJ99JCg',
       title: 'titulo',
       body: 'body'
       
    }

     store.dispatch(startSaveNote(note))
     
    const actions = store.getActions();
    //console.log(actions);

    expect( actions[0].type ).toBe( types.notesUpdated);

    const docRef = db.doc(`/TESTING/journal/notes/${note.id}`).get();

    expect( docRef.data().title ).toBe( note.title )

   })


   test('startUploading debe de actualizar el url del entrie',()=>{

    const file = new File([], 'foto.jpg')
     store.dispatch( startUpLoading(file) )
    
    const docRef =  db.doc('/TESTING/journal/notes/1wcPTQY3miEbxJJ99JCg')
    expect( docRef.data().url ).toBe('https://hola-mundo.com/cosa.jpg')

   })



   
});

*/



