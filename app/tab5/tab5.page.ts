import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../catalogo.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  public loginForm: FormGroup;

  constructor( 
    public loadingController: LoadingController,
    public alertController: AlertController,
    public catalogoService: CatalogoService,
    public router: Router,
    public formBuilder: FormBuilder)
    {
     this.loginForm = formBuilder.group({
        email: new FormControl ('', Validators.compose([Validators.required, Validators.email])),
        password: new FormControl ('', Validators.compose([Validators.required, Validators.minLength(6)]),
        )
      });
    }


  ngOnInit() {
  }

async loginUser(loginForm: FormGroup): Promise<void>{

  if(!loginForm.valid){
    const loading = await this.loadingController.create();
    await loading.present();
    loading.dismiss().then(async() => {

      const alert = await this.alertController.create({
        header: 'Ups!',
        subHeader: 'Ha habido un error :(',
        message: 'Ingrese un usuario o contraseña validos',
        buttons: ['OK']
      });
      await alert.present();
    });

  }
  else{
    const loading = await this.loadingController.create();
    await loading.present();

    const email = loginForm.value.email;
    const password = loginForm.value.password;

    this.catalogoService.loginUser(email, password).then(
      () => {
        loading.dismiss().then (() => {
          this.router.navigateByUrl('/tabs/tab5/user-profile');
        });
      },

      error => {
      loading.dismiss().then(async() => {

          const alert = await this.alertController.create({
            header: 'Ups!',
            subHeader: 'Ha habido un error :(',
            message: 'Ingrese un usuario o contraseña validos',
            buttons: ['OK']
          });
          await alert.present();
        });
      }
    );
  }
}

register() {

  this.router.navigateByUrl('/tabs/tab5/signup');

}

PassRecovery() {

  this.router.navigateByUrl('/tabs/tab5/password-recovery');

}

}
