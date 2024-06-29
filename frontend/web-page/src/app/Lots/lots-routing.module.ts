import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LotMainViewComponent } from './components/lot-main-view/lot-main-view.component';




const routes: Routes = [
  {
    path: 'Lots',
    children: [
      {path: '', component:  LotMainViewComponent, title: 'Lotes'},
    { path: '', redirectTo: '', pathMatch: 'full' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotsRoutingModule { }
