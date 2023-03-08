import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { AgendaFormComponent } from './home/agenda/agenda-form/agenda-form.component';
import { AgendaListComponent } from './home/agenda/agenda-list/agenda-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:HomeComponent, canActivate:[LoginGuard]},
  {path:"home",component:HomeComponent, canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"agenda",component:AgendaListComponent, canActivate:[LoginGuard]},
  {path:"agenda/:mode/:id",component:AgendaFormComponent, canActivate:[LoginGuard]},
  {path:"agenda/:mode",component:AgendaFormComponent, canActivate:[LoginGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
