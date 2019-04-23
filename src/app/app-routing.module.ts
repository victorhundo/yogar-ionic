import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
//  { path: '', loadChildren: './home/register/register.module#RegisterPageModule' },
 { path: '', loadChildren: './home/home2/home2.module#Home2PageModule' },
//  { path: '', loadChildren: './tabsController/tabs/tabs.module#TabsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
