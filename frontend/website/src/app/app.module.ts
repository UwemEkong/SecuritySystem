import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { FaqComponent } from './components/faq/faq.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpErrorInterceptor} from "./services/http-interceptor.service";
import { CameraComponent} from "./components/camera/camera.component";
import { RecordsComponent } from './components/records/records.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { EnterTokenComponent } from './components/enter-token/enter-token.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { NeighborsComponent } from './components/neighbors/neighbors.component';
import { SharedMediaComponent } from './components/shared-media/shared-media.component';
import { LocationPipe } from './pipes/location.pipe';
import { MediaInfoComponent } from './components/media-info/media-info.component';
import { CommentsComponent } from './components/comments/comments.component';
import { UserCommentComponent } from './components/user-comment/user-comment.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MyDevicesComponent } from './components/my-devices/my-devices.component';
import { DeviceComponent } from './components/device/device.component';
import { RecordComponent } from './components/record/record.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    FaqComponent,
    AboutUsComponent,
    CameraComponent,
    LoginComponent,
    RegisterComponent,
    RecordsComponent,
    ProfileComponent,
    PasswordResetComponent,
    ChangePasswordComponent,
    AuthPageComponent,
    EnterTokenComponent,
    PreferencesComponent,
    NeighborsComponent,
    SharedMediaComponent,
    LocationPipe,
    MediaInfoComponent,
    CommentsComponent,
    UserCommentComponent,
    MyDevicesComponent,
    DeviceComponent,
    RecordComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
