import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { GroupMainViewComponent } from './components/group-main-view/group-main-view.component';




const routes: Routes = [
  {
    path: 'Groups',
    children: [
      {path: '', component:  GroupMainViewComponent, title: 'Grupos'},
    { path: '', redirectTo: '', pathMatch: 'full' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
