import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'aluno', pathMatch:'full' },
  { path: 'aluno', loadChildren: './pages/aluno/aluno.module#AlunoPageModule' },
  { path: 'logar', loadChildren: './pages/logar/logar.module#LogarPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
