import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database'
import { ShoppingCart } from '../../app/shopping-cart';
import { ToastController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router } from '@angular/router';


const STORAGE_KEY = 'Catalogo_Productos';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  shoppingList$: Observable<any>;
  shoppingCartRef$: AngularFireList<any>;


  constructor(
    private afdatabase: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastController: ToastController,
    private firebaseService: ProductsService,
    private router: Router
  ) {
    this.shoppingCartRef$ = this.afdatabase.list('Catalogo_Productos');
    this.shoppingList$ = this.shoppingCartRef$.valueChanges();
  }

  ngOnInit() {
    this.firebaseService.getProducts();
  }

  
  deleteProduct(shoppingCart:ShoppingCart) {

    this.firebaseService.deleteProducts(this.shoppingList$).then(async () => {
        const toast = await this.toastController.create({
          message: 'Datos del producto borrados',
          showCloseButton: true,
          position: 'bottom',
          color: 'light',
          closeButtonText: 'Ok',
          mode: 'ios'
        })
        toast.present();
      });

  }

  productPage(){

    this.router.navigateByUrl('/tabs/tab2/product-page');

  }

}





