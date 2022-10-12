import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrontComponent } from './front/front.component';

const routes: Routes = [
  {path:"",component:FrontComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"front",component:FrontComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
