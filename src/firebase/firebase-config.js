import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


console.log(process.env);

  // Your web app's Firebase configuration
  const firebaseConfig = {    //Le agregamos  los valores mediante las variables de entorno que es donde puedo guardar valores dependiendo de elentorno que me encuentre y en este caso si me encuentro en developement coge la config de env.develop y si mi encuentro en test coge la config de el env.test 
    apiKey: process.env.REACT_APP_APIKEY,                  //de momemto este codigo de el entorno esta desactivado poirque me daba error en las variables
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID , 
    storageBucket: process.env.REACT_APP_STORAGEBUCKET ,
    messagingSenderId: process.env.REACT_APP_MESSAGINSENDERID ,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASURMENTID
  };
 //measurementId: process.test.REACT_APP_MEASURMINGID esta prop es para el entorno de test

   //console.log(process.env);  //devuelve un objeto en el cual hay muchas propiedades y la que nos inetreas es el ver en env que en este caso esta en dev si estuviera en tesst vamos a usar la configuracion de abajo
 
 /*  const firebaseConfig = {    //Le agregamos  los valores mediante las variables de entorno que es donde puedo guardar valores dependiendo de elentorno que me encuentre y en este caso si me encuentro en developement coge la config de env.develop y si mi encuentro en test coge la config de el env.test 
    apiKey: "AIzaSyCdCAuGoaBir1WIBrmbzT6-cEBVo_LeBdg",
    authDomain: "react-app-cursos-f534a.firebaseapp.com",
    projectId: "react-app-cursos-f534a",
    storageBucket: "react-app-cursos-f534a.appspot.com",
    messagingSenderId: "721778328428",
    appId: "1:721778328428:web:71dccec539126fb2a2e949"
   
  }




  const firebaseConfigTesting = {  //esta es la config para la base de datos de testing  //YA ESTA CONFIG AQUI NO VA A FUNCIONAR PORQUE VAMOS A USAR LAS VARIABLES DE ENTORNO PARA HACERLO DE FORMA QUE SIRVE UNA SOLA CONFIG PARA EN CASO DE QUE ESTE EN DEVELOVMENT Y TEST
    apiKey: "AIzaSyAraguhpnLMxUNEF-5wRekja8KLS00VWTc",
    authDomain: "redux-demo-2a681.firebaseapp.com",
    projectId: "redux-demo-2a681",
    storageBucket: "redux-demo-2a681.appspot.com",
    messagingSenderId: "255072285137",
    appId: "1:255072285137:web:8d81c3f2e73b863f8df0f0",
    measurementId: "G-J67CLDKEF0"
  };


 if (process.env.NODE_ENV === 'test') { //esto tambien era parte de la configuracion para si estaba en entorno de testque apliacara la siguiente y si no estaba en Dev

  firebase.initializeApp(firebaseConfigTesting);

 } else {

      // Initialize Firebase
 
firebase.initializeApp(firebaseConfig);

 } */

 firebase.initializeApp(firebaseConfig);

  
  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{
    db,
    googleAuthProvider,
    firebase
}
