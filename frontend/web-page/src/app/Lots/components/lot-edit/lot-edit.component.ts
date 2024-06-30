import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LotService } from '../../services/lots.service';
import { FarmService } from '../../../Farms/services/farms.service';

@Component({
  selector: 'app-lot-edit',
  templateUrl: './lot-edit.component.html',
  styleUrl: './lot-edit.component.css'
})
export class LotEditComponent implements OnInit {
  @Input() lot: any; // Input para recibir el lote desde el componente padre
  editForm: FormGroup;
  farms: any[] = []; // Array para almacenar las fincas

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private farmService: FarmService, // Servicio de fincas
    private lotService: LotService
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      trees: [0, Validators.required],
      stage: ['', Validators.required],
      farmId: ['', Validators.required] // Agregar campo farmId al formulario
    });
  }

  ngOnInit(): void {
    // Cargar las fincas disponibles y los datos del lote actual en el formulario
    this.loadFarms();
    this.loadLotData();
  }

  loadFarms(): void {
    // Obtener todas las fincas disponibles
    this.farmService.getFarms().subscribe(
      (data: any) => {
        this.farms = data.data; // Asignar el array de fincas del servicio
      },
      error => {
        console.error('Error fetching farms:', error);
      }
    );
  }

  loadLotData(): void {
    // Cargar los datos del lote actual en el formulario
    this.editForm.patchValue({
      name: this.lot.name,
      trees: this.lot.trees,
      stage: this.lot.stage,
      farmId: this.lot.farmId // Asignar el id de la finca asociada al lote
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const id = this.lot.id;
      const updatedLot = this.editForm.value;
      this.lotService.updateLot(id, updatedLot).subscribe(
        (response) => {
          this.activeModal.close(response); // Cerrar el modal y pasar la respuesta
        },
        (error) => {
          console.error('Error updating lot:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.activeModal.dismiss(); // Cerrar el modal sin realizar cambios
  }
}