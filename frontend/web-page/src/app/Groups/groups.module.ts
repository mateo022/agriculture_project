import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupMainViewComponent } from './components/group-main-view/group-main-view.component';
import { GroupEditComponent } from './components/group-edit/group-edit.component';
import { GroupCreateComponent } from './components/group-create/group-create.component';








@NgModule({
  declarations: [
    GroupMainViewComponent,
    GroupEditComponent,
    GroupCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GroupsRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule
  ]
})
export class GroupsModule { }
