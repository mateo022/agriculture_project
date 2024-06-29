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
import { FarmMainViewComponent } from './components/farm-main-view/farm-main-view.component';
import { FarmsRoutingModule } from './farms-routing.module';
import { FarmCreateComponent } from './components/farm-create/farm-create.component';
import { FarmEditComponent } from './components/farm-edit/farm-edit.component';




@NgModule({
  declarations: [
    FarmMainViewComponent,
    FarmCreateComponent,
    FarmEditComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    FarmsRoutingModule,
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
export class FarmsModule { }
