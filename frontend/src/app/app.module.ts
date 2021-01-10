import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './_components/login/login.component';
import { JwtInterceptorService } from './_services/jwt-interceptor.service';
import { RegisterComponent } from './_components/register/register.component';
import { AlertComponent } from './_components/alert/alert.component';
import { HomeComponent } from './_components/home/home.component';
import { SettingsComponent } from './_components/settings/settings.component';
import { WelcomeComponent } from './_components/welcome/welcome.component';
import { ShareComponent } from './_components/share/share.component';
import { ActivateAccountComponent } from './_components/activate-account/activate-account.component';
import { CopyClipboardDirective } from './_directives/copy-clipboard.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    HomeComponent,
    SettingsComponent,
    WelcomeComponent,
    ShareComponent,
    ActivateAccountComponent,
    CopyClipboardDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
