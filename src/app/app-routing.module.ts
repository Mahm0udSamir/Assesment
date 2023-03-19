import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/nome.module').then((m) => m.HomeModule),
  },
  {
    path: 'training-development',
    loadChildren: () =>
      import('./training-development/training-development.module').then(
        (m) => m.TrainingDevelopmentModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
