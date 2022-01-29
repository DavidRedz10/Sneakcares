import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
constructor(){}

loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

signupUser(email: string, password: string): Promise<any> {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((newUserCredential: firebase.auth.UserCredential) => {
      firebase
        .firestore()
        .doc(`/userProfile/${newUserCredential.user.uid}`)
        .set({ email });
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
}

resetPassword(email:string): Promise<void> {
  return firebase.auth().sendPasswordResetEmail(email);
}

logoutUser():Promise<void> {
  return firebase.auth().signOut();
}

uploadImage(imageURI){
  return new Promise<any>((resolve, reject) => {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child('Catalogo_Productos').child('ProductImage');
    this.encodeImageUrl(imageURI, function(image64){
      imageRef.putString(image64, 'data_url')
      .then(snapshot => {
        resolve(snapshot.downloadURL)
      }, err => {
        reject(err);
      })
    })
  })
}

encodeImageUrl(imageURI, callback) {
  var c = document.createElement('canvas');
  var ctx = c.getContext("2d");
  var img = new Image();
  img.onload = function () {
    var aux:any = this;
    c.width = aux.width;
    c.height = aux.height;
    ctx.drawImage(img, 0, 0);
    var dataURL = c.toDataURL("image/jpeg");
    callback(dataURL);
  };
  img.src = imageURI;
};

}
