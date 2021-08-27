//I. en este paso creamoas la collection donde se guardaran las images en la base de datos de firebase
const addDoc = async ({ collection, data}) =>{
  let document = {
    ...data,

    createdAt:  firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }

  //I. El primer paso es crear un coleccion en firebase
  let collectionRef = firebase.firestore().collection(collection);

  //II. se guarda el documento
  return collectionRef.add(document);
}

//en esta linea se subira el archivo al servidor
const upload = async ({ file }) => {
  //I.este comando se asignara el espacio el bucket de fire donde se guardara la imagen
  let storageRef = firebase.storage().ref().child(`images/${file.name}`);
  await storageRef.put(file);
  return storageRef;
}

const publish = async ({ file }) => {
  
  let storageRef = await upload({file});
  return upload({ file }).then(storageRef =>{

    addDoc({collection: 'files', data: { path: storageRef.fullPath}})
  })

}

//api de firebase
async function main() {
  // Your web app's Firebase configuration
   var firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxx-xxxxxx-xxxx.firebaseapp.com",
    projectId: "xxxx-xxxxx-xxxxxx",
    storageBucket: "xxxx-xxxx-xxxxx.xxxxxxxcom",
    messagingSenderId: "xxxxxxxxxxxxxxx",
    appId: "1:xxxxxxxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxxxxxx",
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let form = document.querySelector("#uploader");

  form.addEventListener("submit", (ev) => {
    alert("archivo agregado con exito");

    ev.preventDefault();

    let fileInput = form.querySelector("#file");
    let file = fileInput.files[0];

   publish({ file });
  });
}

main();
