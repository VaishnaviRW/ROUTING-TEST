import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './shared/users/user-dashboard/user-dashboard.component';
import { UserFormComponent } from './shared/users/user-dashboard/user-form/user-form.component';
import { UserCardsComponent } from './shared/users/user-dashboard/user-cards/user-cards.component';

const routes: Routes = [
  {
    path : 'users',
    component : UserDashboardComponent
  },
  {
    path : '',
    redirectTo : 'users',
    pathMatch : 'full'
  },
  {
    path : 'users/addUser',
    component : UserFormComponent
  },
  {
    path : 'users/:userId',
    component : UserCardsComponent
  },
  {
    path : 'users/:userId/edit',
    component : UserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
