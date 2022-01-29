import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '../catalogo.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  constructor(public catalogoService: CatalogoService,
    public loadingController: LoadingController,
    public router: Router) { }

  ngOnInit() {
  }

  async LogOut() {

    const loading = await this.loadingController.create();
    await loading.present();
    this.catalogoService.logoutUser().then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('/tabs/tab5');
        });
      }
    );
  }

}
