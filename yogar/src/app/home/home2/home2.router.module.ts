import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home2Page } from './home2.page';

const routes: Routes = [
  {
    path: 'home2',
    component: Home2Page,
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: '../login/login.module#LoginPageModule'
          }
        ]
      },
      {
        path: 'register',
        children: [
          {
            path: '',
            loadChildren: '../register/register.module#RegisterPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home2/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home2/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class Home2PageRoutingModule {}
