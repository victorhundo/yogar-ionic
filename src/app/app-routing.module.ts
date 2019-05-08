import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 't/tabs', pathMatch:'full' },
  {path: 't',  redirectTo: 't/tabs', pathMatch:'full' },
  { path: 'aluno', loadChildren: './pages/aluno/aluno.module#AlunoPageModule' },
  { path: 'logar', loadChildren: './pages/logar/logar.module#LogarPageModule' },
  { path: 't', loadChildren: './pages/tabsController/tabs/tabs.module#TabsPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
