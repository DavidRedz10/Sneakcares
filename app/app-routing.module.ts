import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule', canActivate: [AuthGuard],  },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule',  },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule',  },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule', canActivate: [AuthGuard], },
  { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule', canActivate: [AuthGuard], },
  { path: 'tab5/:id', loadChildren: './tab5/tab5.module#Tab5PageModule',  },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule', },
  { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule',},
  { path: 'password-recovery', loadChildren: './password-recovery/password-recovery.module#PasswordRecoveryPageModule' },
  { path: 'add', loadChildren: './add/add.module#AddPageModule' },
  { path: 'product-page', loadChildren: './product-page/product-page.module#ProductPagePageModule', },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
