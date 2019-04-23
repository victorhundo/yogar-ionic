import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage} from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'register',
        children: [
          {
            path: '',
            loadChildren: '..home/register/register.module#RegisterPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: './home/register/register.module#RegisterPageModule',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home.module#HomePageModule',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
