import { Component, Input, OnInit } from '@angular/core';
import { Group } from '../../models/group.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lot } from '../../../Lots/models/lot.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from '../../services/groups.service';
import { LotService } from '../../../Lots/services/lots.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrl: './group-edit.component.css'
})
export class GroupEditComponent implements OnInit {
  editForm: FormGroup;
  @Input() group: any;
  lots: any[] = []; // Array para almacenar los lotes disponibles

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private lotService: LotService,
    private groupService: GroupService,

  ) {
    this.editForm = this.fb.group({
      lotId: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadGroupData();
    this.loadLots();
  }

  loadLots(): void {
    // Obtener todos los lotes disponibles
    this.lotService.getAllLots().subscribe(lots => {
      this.lots = lots
      console.log(lots);
      
    }
    );
  }
  loadGroupData(): void {
    // Cargar los datos del lote actual en el formulario
    this.editForm.patchValue({
      lotId: this.group.lotId,
      name: this.group.name,
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const id = this.group.id;
      const updatedGroup = this.editForm.value;
      this.groupService.updateGroup(id, updatedGroup).subscribe(
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
    this.activeModal.dismiss(); // Cerrar el modal sin guardar cambios
  }
}