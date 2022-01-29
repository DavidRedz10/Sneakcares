import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../app/shopping-cart';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {

  shoppingCart = {} as ShoppingCart;

  shoppingCartRef$: AngularFireList<any>

  bestSellerRef$: AngularFireList<any>;

  Image: any;

  constructor(private database: AngularFireDatabase,
    private router: Router,

    private productProvider: ProductsService,
    private imagePicker: ImagePicker,
    public toastController: ToastController,
    private camera: Camera
   ) {
    this.shoppingCartRef$ = this.database.list('Catalogo_Productos');
  }

  addImage(img) {

    const options: CameraOptions = {
      
      quality:70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

  this.camera.getPicture(options).then((imageData)=>{
    this.Image = 'data:image/jpeg;base64,'+ imageData;
  })

  }

   async addShoppingItem() {

    this.shoppingCartRef$.push(
      {

        ProductName: this.shoppingCart.ProductName,
        ProductNumber: Number(this.shoppingCart.ProductNumber),
        ProductPrice: Number(this.shoppingCart.ProductPrice),
        ProductBrand: this.shoppingCart.ProductBrand,
        ProductImage: this.shoppingCart.ProductImage

      })

    this.shoppingCart = {} as ShoppingCart;

    const toast = await this.toastController.create({
      message: 'Datos del producto subidos correctamente',
      showCloseButton: true,
      position: 'bottom',
      color: 'light',
      closeButtonText: 'Ok',
      mode: 'ios'

    });
    toast.present();

    this.router.navigateByUrl('/tabs/tab2');

  }

}
