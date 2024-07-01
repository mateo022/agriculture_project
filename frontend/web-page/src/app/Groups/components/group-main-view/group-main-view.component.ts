import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GroupService } from '../../services/groups.service';
import { LotService } from '../../../Lots/services/lots.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Group } from '../../models/group.model';
import { Lot } from '../../../Lots/models/lot.model';
import { GroupCreateComponent } from '../group-create/group-create.component';
import { GroupEditComponent } from '../group-edit/group-edit.component';

@Component({
  selector: 'app-group-main-view',
  templateUrl: './group-main-view.component.html',
  styleUrl: './group-main-view.component.css'
})
export class GroupMainViewComponent implements OnInit {
  groups: Group[] = [];
  lots: Lot[] = [];
  selectedGroup: Group | null = null;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  constructor(
    private groupService: GroupService,
    private lotService: LotService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadGroups();
    this.loadLots();
  }

  loadGroups(): void {
    this.groupService.getAllGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  loadLots(): void {
    this.lotService.getAllLots().subscribe(lots => {
      this.lots = lots;
    });
  }

  getLotName(lotId: number): string {
    const lot = this.lots.find(l => l.id === lotId);
    return lot ? lot.name : 'Lote no encontrado';
  }

  openAddGroupModal(): void {
    const modalRef = this.modalService.open(GroupCreateComponent, { centered: true });
    modalRef.result.then(
      (result) => {
        console.log(`Modal result: ${result}`);
        this.loadGroups();
      },
      (reason) => {
        console.log(`Modal dismissed: ${reason}`);
      }
    );
  }

  editGroup(group: Group): void {
    const modalRef = this.modalService.open(GroupEditComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.group = group; // Pasar el lote seleccionado al modal

    modalRef.result.then(
      (result) => {
        if (result) {
          // Manejar la respuesta si es necesario
          console.log('Grupo actualizado:', result);
          this.loadGroups();
          // Actualizar el array de lotes o realizar alguna acción de actualización
        }
      },
      (reason) => {
        console.log('Modal cerrado sin cambios:', reason);
      }
    );
  }

  openDeleteModal(group: Group): void {
    this.selectedGroup = group;
    this.modalService.open(this.deleteModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  confirmDelete(modal: any): void {
    if (this.selectedGroup) {
      this.groupService.deleteGroup(this.selectedGroup.id).subscribe(() => {
        this.loadGroups();
        modal.close();
      });
    }
  }
}
