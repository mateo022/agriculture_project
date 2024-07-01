import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmService } from '../../services/farms.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackBarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-farm-create',
  templateUrl: './farm-create.component.html',
  styleUrl: './farm-create.component.css'
})
export class FarmCreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private farmService: FarmService,
    private snackbarService: SnackBarService,
    public activeModal: NgbActiveModal,
  ) {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      hectares: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.createForm.valid) {
      this.farmService.createFarm(this.createForm.value).subscribe(
        () => {
          this.activeModal.close('saved');
        },
        error => {
          this.snackbarService.openSnackBar('Error al crear la finca');
        }
      );
    }
  }

  cancel(): void {
    this.activeModal.close('close');
  }
}
