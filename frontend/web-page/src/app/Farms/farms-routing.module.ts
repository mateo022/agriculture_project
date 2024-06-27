import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    // path: 'farms',
    // children: [
    //   {path: '', component:  , title: 'Payment'},
    // { path: '', redirectTo: '', pathMatch: 'full' },

    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
