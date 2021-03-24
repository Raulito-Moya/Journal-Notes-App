import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";


cloudinary.config ({ 
    cloud_name : 'dx33ki9ul' , 
    api_key :  '147738185934232'  , 
    api_secret : 'mKHh8F3h5f1DXFVbiteGJnOe_Qs'   
 });



describe('Preubas en FileUpload',() => {

  test('debe de cargar un archivo y retornar un URL',async () => { 
    

    const resp = await fetch('https://images-na.ssl-images-amazon.com/images/I/61CI2BW3JLL._AC_UL210_SR210,210_.jpg');
    const blob = await resp.blob(); //crea el la informcacion 

     const file = new File([blob], 'foto.jpg') //informacion sobre el file
     const url = await fileUpload( file )
     //console.log(url);
     expect(typeof url).toBe('string')


      //Borrar imagen por id
      const segments = url.split('/');
      const imageID =segments[ segments.length - 1].replace('.jpg','') //extraigo el url
       console.log(imageID);
    //  console.log(segments);


  await cloudinary.v2.api.delete_resources(imageID, {}, ()=>{
      console.log('');
     });
    
  })


  test('debe de retornar un error',async ()=>{

    
     const file = new File([], 'foto.png');
     const url = await fileUpload(file );
      //console.log(url);
     expect( url ).toBe( undefined);
    
  })

})