import { Component, Input } from '@angular/core';
import { Farm } from '../../models/farm.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FarmService } from '../../services/farms.service';
import { SnackBarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-farm-edit',
  templateUrl: './farm-edit.component.html',
  styleUrl: './farm-edit.component.css'
})
export class FarmEditComponent {
  @Input() farm!: Farm;
  editForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private farmService: FarmService,
    private snackbarService: SnackBarService
  ) {}
  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.farm.name, Validators.required],
      location: [this.farm.location, Validators.required],
      hectares: [this.farm.hectares, [Validators.required, Validators.min(0)]],
      description: [this.farm.description]
    });
  }

  save(): void {
    if (this.editForm.valid) {
      const updatedFarm = { ...this.farm, ...this.editForm.value };
      this.farmService.updateFarm(this.farm.id, updatedFarm).subscribe(
        () => this.activeModal.close('updated'),
        (error) => this.snackbarService.openSnackBar('Error actualizando finca')
      );
    }
  }

  close(): void {
    this.activeModal.dismiss('cancel');
  }
}
