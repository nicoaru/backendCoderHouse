import firebase from "firebase-admin";
import {serviceAccountFirebase} from '../config.js';


class ContenedorFirebase {
    constructor(collection) {
        this.collectionNameString = collection
        this.db
        this.collectionRef
    }  

    // connect to DB
    connect() {
        try{
            const firebaseApp = firebase.initializeApp({
                credential: firebase.credential.cert(serviceAccountFirebase),
                databaseURL: "https://proyecto-Backend-Coderhouse.firebaseio.com"
            })
            console.log(`Respuesta conexión DB => conectado a`, firebaseApp.options_.credential.projectId)            
        }
        catch(error){
            console.log(`Respuesta conexión DB => ${error.message}`,)
        }


    }
    //initialize firestore and get DB reference
    initFirestore() {
        try{
            this.db = firebase.firestore()
        }
        catch(error){
        console.log("Error dbRef => ", error.message)            
        } 
    } 
    //get collection reference
    getCollectionRef() {
        try{
            this.collectionRef = this.db.collection(this.collectionNameString);
        }
        catch(error){
        console.log("Error collectionRef => ", error.message)            
        }
    }
    

    // devuelve la lista de objetos almacenados
    getAll() {
        return this.collectionRef.get()
    }
    //Guarda un nuevo producto en el archivo
    save(object) {
        return this.collectionRef.add(object)
    }
    // Devuelve el objeto con el id indicado
    getById(docRef) {
        return docRef.get()
    }
    // elimina el objeto con el id indicado
    deleteById(docRef) {
        return docRef.delete()
    }
    // actualiza el objeto con el id indicado
    updateById(updatedObject, docRef) {
        return docRef.update(updatedObject)
    }
}
export {ContenedorFirebase}