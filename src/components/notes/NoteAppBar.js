import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUpLoading } from '../../actions/notes'

export const NoteAppBar = () => {
  
  const dispatch = useDispatch();
  const {active} = useSelector(state => state.notes)


  const handleSave = () => {
              console.log(active);
    dispatch(startSaveNote(active))
  }

  const handlePictureClick = () =>{
      console.log('picture');
      document.querySelector('#fileSelector').click()
 
  }


  const handleFileChange = (e) => {
     // console.log(e.target.files);
      const file = e.target.files[0]
    if( file ){
       dispatch(startUpLoading(file))
    }
  }

  return(
       <div className="notes__appbar">
            <span>28 de agosto 2000</span>

          <input
             id="fileSelector" 
             type="file" 
             style={{display:'none'}}
             name="file" 
             onChange={handleFileChange}/>
     
            <div>
               <button 
                  type="click" 
                   className="btn"
                   onClick={handlePictureClick}>
                   picture
                </button>

                <button 
                    type="click" 
                     className="btn"
                      onClick={handleSave}
                      >
                    save
                </button>
            </div>
       </div>
  )
 
}