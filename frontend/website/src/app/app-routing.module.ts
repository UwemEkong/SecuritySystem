import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FaqComponent } from './components/faq/faq.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CameraComponent } from './components/camera/camera.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent},
  {path: 'camera', component: CameraComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'login', component:  LoginComponent},
  {path:'register', component: RegisterComponent},
  {path: 'auth', component: AuthPageComponent},
  {path: '**', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
