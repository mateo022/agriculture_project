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

import { LotsRoutingModule } from './lots-routing.module';
import { LotMainViewComponent } from './components/lot-main-view/lot-main-view.component';
import { LotCreateComponent } from './components/lot-create/lot-create.component';
import { LotEditComponent } from './components/lot-edit/lot-edit.component';





@NgModule({
  declarations: [
    LotMainViewComponent,
    LotCreateComponent,
    LotEditComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    LotsRoutingModule,
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
export class LotsModule { }
