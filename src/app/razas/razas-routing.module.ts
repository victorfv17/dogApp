import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorRazasComponent } from './components/buscador-razas/buscador-razas.component';

const routes: Routes = [
  {
    path: '',
    component: BuscadorRazasComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RazasRoutingModule { }
