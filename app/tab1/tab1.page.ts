import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../services/user/auth.guard';
import {Router } from '@angular/router';
import {AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AlertController, IonSlides, ToastController,LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
    
  slides = [
    
    {
      img: 'assets/bannerjordan.png',

    },
    {
      img: 'assets/bannernite.png',

    }

  ];

  bestSellerList$: Observable<any>;
  bestSellerRef$: AngularFireList<any>;

  constructor(
    public loadingController: LoadingController,
    public database: AngularFireDatabase,
    public toastController: ToastController, private auth: AuthGuard, 
    public alertController: AlertController, private router: Router,)
     {
      this.bestSellerRef$ = this.database.list('Best_Sellers');
      this.bestSellerList$ = this.bestSellerRef$.valueChanges();
      }

  ngOnInit() {
  }
  
  Compra() {

    return new Promise((resolve, reject) => {

      firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
        if (user) {
          resolve(true);
        } else {
          const toast = await this.toastController.create({
            message: 'Debes iniciar sesion para acceder a esta funcion',
            showCloseButton: true,
            position: 'bottom',
            color: 'light',
            closeButtonText: 'Ok',
            mode: 'ios'
            

          });
          toast.present();
          this.router.navigateByUrl('/tabs/tab5');
          resolve(false);
        }
      });
    });
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }


};




