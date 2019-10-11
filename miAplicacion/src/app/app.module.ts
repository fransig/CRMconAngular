
//modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ListTaskComponent } from './list-task/list-task.component';
import  {HttpClientModule} from '@angular/common/http';
import { MisDatosComponent } from './mis-datos/mis-datos.component';
import { DetailTaskComponent } from './detail-task/detail-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
//servicio
import {UserService} from './services/user.service';
import {TaskService} from './services/task.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ListTaskComponent,
    MisDatosComponent,
    DetailTaskComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
