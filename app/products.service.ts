import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Events } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { map } from 'rxjs/operators';
import { ShoppingCart } from './shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  items: Array<any>;

  constructor(private db: AngularFirestore,
    private storage: AngularFireStorage){
  }

  getProducts(){
    return new Promise<any>((resolve, reject)=>{
      this.db.collection('Catalogo_Productos').snapshotChanges().subscribe(snapshots =>{
        resolve(snapshots)
      })
    })
  }

  deleteProducts(userKey){
  return this.db.collection('Catalogo_Productos').doc(userKey).delete()
  }

}




