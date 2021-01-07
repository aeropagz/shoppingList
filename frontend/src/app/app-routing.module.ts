import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './_services/auth-guard.service';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { HomeComponent } from './_components/home/home.component';
import { SettingsComponent } from './_components/settings/settings.component';
import { WelcomeComponent } from './_components/welcome/welcome.component';
import { ShareComponent } from './_components/share/share.component';
import { ActivateAccountComponent } from './_components/activate-account/activate-account.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'share/:id',
    component: ShareComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'activate/:id', component: ActivateAccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
