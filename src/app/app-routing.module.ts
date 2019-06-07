import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/logar', pathMatch:'full' },
  {path: 't',  redirectTo: 't/tabs', pathMatch:'full' },
  { path: 'aluno', loadChildren: './pages/aluno/aluno.module#AlunoPageModule' },
  { path: 'logar', loadChildren: './pages/logar/logar.module#LogarPageModule' },
  { path: 't', loadChildren: './pages/tabsController/tabs/tabs.module#TabsPageModule' },
  { path: 'licoes/:id', loadChildren: './pages/tabsController/tab2/licoes/licoes.module#LicoesPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
