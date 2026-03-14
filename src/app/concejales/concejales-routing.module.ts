import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConcejalesPage } from './concejales.page';

const routes: Routes = [
  {
    path: '',
    component: ConcejalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConcejalesPageRoutingModule {}
