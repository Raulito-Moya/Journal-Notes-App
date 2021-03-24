import Swal from 'sweetalert2';

import { db } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";




export const startNewNote =() => {
    return async (dispatch, getState) =>{  //getState es una funcione para obtener el sstate

        const uid = getState().auth.uid //obtnego el uid
       // console.log(uid);

       const newNote = {
           title: '',
           body: '',
           date: new Date().getTime() //me va adar el momento exacto en que la persona crea esta nota
       }


    const doc = await db.collection(`${ uid }/journal/notes`).add(newNote);
  
    // console.log(doc);

     dispatch( activeNote( doc.id, newNote) )
     dispatch( addNewNote( doc.id, newNote) )

    }


};


export const activeNote = (id, note) => ({ //para marcar la nota activa
      type: types.notesActive,
      payload: {
          id,
          ...note
      }
 
});

export const addNewNote = ( id, note ) => ({ //agregar la nueva nota al sidebar
     type: types.notesAddNew,
     payload:{
      id,
      ...note
     }

})


export const startLoadingNotes = ( uid ) => {
     return async(dispatch) =>{
 
        const notes = await loadNotes(uid)  //vamos a cargar las notas  de la base de datos
        dispatch(setNotes(notes))
     }
  

}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})



export const startSaveNote = (note) => { //para guardar en la base de datos
   return async(dispatch,getState) => {
        //console.log(note);
        const {uid} = getState().auth;

       if( !note.url ){
           delete note.url; //borro la propiedad url
       }

        const noteToFirestore = {...note};
        delete noteToFirestore.id;
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore) //se guarda la nota
     
   
        dispatch(refreshNote( note.id, noteToFirestore ));
         Swal.fire('Saved', note.title, 'success');
       }

}

export const refreshNote = ( id, note ) => ({  //para cargar la accion especifica en el menu ya que si se hace con startLoadingNotes se estarian cargando todas
  type: types.notesUpdated,
  payload:{
     id, 
     note: {
         id,
         ...note
     }
   }
})



export const startUpLoading = ( file ) => {
  return async( dispatch, getState ) =>{
     
     const {active:activeNote} = getState().notes;
 
    // console.log(file);
   //  console.log(activeNote);

    Swal.fire({  //va a disparar el cartel de cargando
        title:'Uploading...',
        text:'Please wait...',
        allowOutsideClick: false,
        onBeforeOpen: ()=> {
            Swal.showLoading();
        }
    });

     const fileUrl = await fileUpload(file)
     activeNote.url = fileUrl //le actualizo la url

     console.log(fileUrl);

     dispatch(startSaveNote(activeNote))

     Swal.close();
  }

}


export const startDeleting = (id) => {
     return async(dispatch, getState) =>{

        const uid = getState().auth.uid
        await db.doc(`${uid}/journal/notes/${id}`).delete()
  
      dispatch(deleteNote(id))

     }


}

export const deleteNote =(id) =>({
    type: types.notesDelete,
    payload: id

})

export const noteLogout = () => ({ //borrar las notas de memoria cuando el usuario se desloguee
     type: types.notesLogoutCleaning,
     payload: []
})