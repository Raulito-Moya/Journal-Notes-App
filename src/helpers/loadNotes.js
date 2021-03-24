import { db } from "../firebase/firebase-config";



export const loadNotes = async( uid ) => {  //para cargar las notas

 const notesSnap = await db.collection(`${uid}/journal/notes`).get();
 const notes = [];
  
 // console.log(notesSnap);
  
 notesSnap.forEach(snapHijo => {
      notes.push({
          id: snapHijo.id,
          ...snapHijo.data()
      })
 })

 console.log(notes);

 return notes;
}