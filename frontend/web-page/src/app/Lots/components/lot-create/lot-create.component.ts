import { Component, OnInit } from '@angular/core';
import { Farm } from '../../../Farms/models/farm.model';
import { Lot } from '../../models/lot.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FarmService } from '../../../Farms/services/farms.service';
import { LotService } from '../../services/lots.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lot-create',
  templateUrl: './lot-create.component.html',
  styleUrl: './lot-create.component.css'
})
export class LotCreateComponent implements OnInit {
  lotForm: FormGroup; // Definir el FormGroup para el formulario

  farms: any[] = []; // Array para almacenar las fincas obtenidas del servicio

  constructor(
    private fb: FormBuilder,
    private farmService: FarmService,
    private lotService: LotService,
    private router: Router,
    public activeModal: NgbActiveModal,
  ) {
    this.lotForm = this.fb.group({
      farmId: [null, Validators.required], // Campo para seleccionar la finca
      name: ['', Validators.required],     // Nombre del lote
      trees: [0, Validators.required],      // Número de árboles
      stage: ['', Validators.required]     // Etapa del lote
    });
  }

  ngOnInit(): void {
    this.fetchFarms(); // Obtener las fincas al inicializar el componente
  }

  fetchFarms() {
    this.farmService.getFarms().subscribe(
      (data: any) => {
        this.farms = data.data; // Asignar el array de fincas del servicio
      },
      error => {
        console.error('Error fetching farms:', error);
      }
    );
  }

  // Método para enviar el formulario de lote
  onSubmit() {
    if (this.lotForm.valid) {
      this.lotService.createLot(this.lotForm.value).subscribe(
        () => {
          this.activeModal.close('saved');
        },
        error => {
          console.error('Error al crear el lote:', error);
        }
      );
    }
  }
}