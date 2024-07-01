import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GroupService } from '../../services/groups.service';
import { LotService } from '../../../Lots/services/lots.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Group } from '../../models/group.model';
import { Lot } from '../../../Lots/models/lot.model';
import { GroupCreateComponent } from '../group-create/group-create.component';
import { GroupEditComponent } from '../group-edit/group-edit.component';
import { SnackBarService } from '../../../shared/services/snackbar.service';

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

  images = [
    { path: 'assets/img/group/group_1.jpg', alt: 'Image 1' },
    { path: 'assets/img/group/group_2.jpg', alt: 'Image 2' },
    { path: 'assets/img/group/group_3.jpg', alt: 'Image 3' },
    { path: 'assets/img/group/group_4.jpg', alt: 'Image 4' }
  ];

  constructor(
    private groupService: GroupService,
    private lotService: LotService,
    private modalService: NgbModal,
    private snackbarService: SnackBarService
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
        this.snackbarService.openSnackBar('Grupo creado con éxito.');
        this.loadGroups();
      },
      (reason) => {
        this.snackbarService.openSnackBar('Modal cerrado sin cambios');
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

          this.snackbarService.openSnackBar(`Grupo actualizado con éxito.`);
          this.loadGroups();
          // Actualizar el array de lotes o realizar alguna acción de actualización
        }
      },
      (reason) => {
        this.snackbarService.openSnackBar(`Modal cerrado sin cambios`);
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
        this.snackbarService.openSnackBar('Grupo eliminado con éxito');
        modal.close();
      });
    }
  }
}
