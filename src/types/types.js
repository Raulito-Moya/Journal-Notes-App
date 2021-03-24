
export const types = {
  
  //estas son el tipo de accion para el login
  login: '[Auth] login',
  logout: '[Auth] logout',  

  // estas son el tipo de accion para el error del form
  uiSetError: '[UI] Set Error',
  uiRemoveError: '[UI] Remove Error',

  uiStartLoading: '[UI] Start loading',
  uiFinishLoading: '[UI] Finish loading',


  notesAddNew: '[Notes] New note',
  notesActive: '[Notes] Set active note',
  notesLoad: '[Notes] Load Note',
  notesUpdated: '[Notes] Updated note saved',
  notesFileUrl: '[Notes] Updated image url',
  notesDelete: '[Notes] Delete note',
  notesLogoutCleaning: '[Notes] Logout Cleaning'
}