import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatalogoService } from '../catalogo.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {

  public resetPasswordForm: FormGroup;
  constructor (private catalogoService: CatalogoService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    public formBuilder: FormBuilder,
    public router: Router)
     {
       this.resetPasswordForm = formBuilder.group({
         email: ['',
         Validators.compose([Validators.required, Validators.email]),
       ],
       });
      }

  ngOnInit() {
  }

  async resetPassword(resetPasswordForm: FormGroup):Promise<void> {
    if(!resetPasswordForm.valid){

      const loading = await this.loadingController.create();
    await loading.present();
    loading.dismiss().then(async() => {

      const alert = await this.alertController.create({
        header: 'Ups!',
        subHeader: 'Ha habido un error :(',
        message: 'Ingresa una direccion de correo valida',
        buttons: ['OK']
      });

      await alert.present();
    });

    } else {   

      const email: string = resetPasswordForm.value.email;
      this.catalogoService.resetPassword(email).then(
        async() => {
          const alert = await this.alertController.create({
            
            header: '',
            subHeader: 'Revisa tu correo',
            message: 'Un mensaje con las instrucciones para restablecer tu contraseña sera enviado en breve',

          buttons: [
            {
              text: 'Ok',
              handler:() =>{
                this.router.navigateByUrl('/tabs/tab5')
              },
            },
          ],
          });
          await alert.present();
        },

        async error => {
          const loading = await this.loadingController.create();
          loading.dismiss().then(async() => {
          const errorAlert = await this.alertController.create({
            header: 'Ups!',
            subHeader: 'Ha habido un error :(',
            message: 'No encontramos ninguna cuenta asociada a ese correo',
            buttons: ['Ok']
          });
          await errorAlert.present();
        });
    }
      );
  }
  }
}


