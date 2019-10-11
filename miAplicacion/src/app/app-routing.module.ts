import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//servicios
import { AuthGuard } from './services/auth.guard';
//componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {ListTaskComponent} from './list-task/list-task.component';
import {MisDatosComponent} from './mis-datos/mis-datos.component';
import { DetailTaskComponent } from './detail-task/detail-task.component';
import { AddTaskComponent } from './add-task/add-task.component';

const routes: Routes = [
  {path:'', component:HomeComponent, canActivate:[AuthGuard] },
  {path:'home', component:HomeComponent ,canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent },
  {path:'register', component: RegisterComponent },
  {path:'mis-datos', component: MisDatosComponent, canActivate:[AuthGuard] },
  {path:'listado-tareas', component: ListTaskComponent, canActivate:[AuthGuard] },
  {path:'tarea/:id', component: DetailTaskComponent, canActivate:[AuthGuard] },
  {path:'nueva-tarea', component:AddTaskComponent, canActivate:[AuthGuard] },
  {path:'**', component: HomeComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
