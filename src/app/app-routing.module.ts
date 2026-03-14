import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

{
path:'',
redirectTo:'login',
pathMatch:'full'
},

{
path:'login',
loadComponent:()=>import('./login/login.page').then(m=>m.LoginPage)
},

{
path:'mesa',
loadComponent:()=>import('./mesa/mesa.page').then(m=>m.MesaPage)
},

{
path:'alcalde',
loadComponent:()=>import('./alcalde/alcalde.page').then(m=>m.AlcaldePage)
},

{
path:'concejales',
loadComponent:()=>import('./concejales/concejales.page').then(m=>m.ConcejalesPage)
},

{
path:'resumen',
loadComponent:()=>import('./resumen/resumen.page').then(m=>m.ResumenPage)
}

];

@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
})

export class AppRoutingModule{}
