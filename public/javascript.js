//en esta linea se subira el archivo al servidor 
const upload = async ({ file })=>{
//I.este comando se asignara el espacio el bucket de fire donde se guardara la imagen
let storageRef = firebase.storage().ref().child(`images/${file.name}`);
await storageRef.put(file);
return storageRef;

}
//api de firebase
async function main(){
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBsrMANgJF6FK5BYjTLAw5nFN4XyT0AtvM",
    authDomain: "subir-archivo-ec861.firebaseapp.com",
    projectId: "subir-archivo-ec861",
    storageBucket: "subir-archivo-ec861.appspot.com",
    messagingSenderId: "499320589541",
    appId: "1:499320589541:web:a20b9ddfea101476a8980c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let form = document.querySelector("#uploader");

  form.addEventListener("submit",(ev)=>{
    alert('archivo agregado con exito');

    ev.preventDefault();

    let fileInput = form.querySelector("#file");
    let file = fileInput.files[0];

    upload({

      file:file
    });
  });
  
}


 main();