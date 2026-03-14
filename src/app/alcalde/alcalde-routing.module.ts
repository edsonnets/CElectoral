import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlcaldePage } from './alcalde.page';

const routes: Routes = [
  {
    path: '',
    component: AlcaldePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlcaldePageRoutingModule {}
