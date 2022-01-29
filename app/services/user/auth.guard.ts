import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private router: Router, public alertController: AlertController){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {

      firebase.auth().onAuthStateChanged(async (user: firebase.User) => {
        if (user) {
          resolve(true);
        } else {
          const alert = await this.alertController.create({
            header: 'Ups!',
            subHeader: 'Ha habido un error :(',
            message: 'Ingrese un usuario o contraseña validos',
            buttons: ['OK']
          });
          await alert.present();;
          this.router.navigateByUrl('/tabs/tab5');
          resolve(false);
        }
      });
    });
  }
}
