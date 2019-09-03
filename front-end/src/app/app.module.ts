import { ProfileService } from './services/common/profile.service';
import { reducers } from './index-reducer';
import { RouterModule, Routes } from '@angular/router';
import { LoginEffects } from './components/common/login/login.effects';
import { RoleGuardService } from './AuthGuard/role-guard.service';
import { LoginService } from './services/common/login.service';
import { LoginComponent } from './components/common/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './components/Doctor/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './components/Patient/patient-dashboard/patient-dashboard.component';
import { RegisterComponent } from './components/common/register/register.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProfileComponent } from './components/common/profile/profile.component';
import { ProfileEffects } from './components/common/profile/profile.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    RegisterComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([ProfileEffects, LoginEffects]),
  ],
  providers: [
    LoginService, RoleGuardService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
