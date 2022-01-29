import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatalogoService } from '../catalogo.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupForm: FormGroup;
  public loading: any;

  constructor(private catalogoService: CatalogoService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.formbuilder.group({
      email:[
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
   }

  ngOnInit() {
  }

  async signupUser(signupForm: FormGroup): Promise<void> {
    if(!signupForm.valid) {

    }
   else {
    const email: string = signupForm.value.email;
    const password: string = signupForm.value.password;

    this.catalogoService.signupUser(email, password).then(
      () =>{
    
    this.loading.dismiss().then(() => {
      this.router.navigateByUrl('/tabs/tab5/user-profile');
    });
  },

  error => {

    this.loading.dismiss().then(async() => {
      const alert = await this.alertController.create({
        message: error.message,
        buttons:['Ok'],
      });
      await alert.present();
    }); 
  }
    );
  this.loading = await this.loadingController.create();
  await this.loading.present();
  }
}
}
