
export const fileUpload = async (file) => {
   
 const CloudUrl = 'https://api.cloudinary.com/v1_1/dx33ki9ul/upload' ;

 const formData = new FormData(); //permite opilar un conjunto  de clave valor para enviar
 formData.append('upload_preset','react-journal');
 formData.append('file', file);


 try{

   const resp = await fetch( CloudUrl, {
       method:'POST',
       body:formData
   } /*aca le cambio el metodo y le agrago el body a la peticion*/ );

   if(resp.ok){
       const cloudResp = await resp.json();
        
       return cloudResp.secure_url
   }else{
      throw await resp.json();
   }

 } catch(error){
     console.log(error);
     //throw error
 }
}