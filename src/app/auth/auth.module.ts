import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularMateialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import {  FormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../auth/auth-routing.module';

@NgModule({
    declarations: [
        LoginComponent, SignupComponent, 
    ],
    imports: [
       AngularMateialModule,
       CommonModule,
       FormsModule,
       AuthRoutingModule
    ]
})
export class AuthModule{} 
