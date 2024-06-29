import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FarmMainViewComponent } from './components/farm-main-view/farm-main-view.component';



const routes: Routes = [
  {
    path: 'farms',
    children: [
      {path: '', component:  FarmMainViewComponent, title: 'Fincas'},
    { path: '', redirectTo: '', pathMatch: 'full' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmsRoutingModule { }
