import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Farm } from '../../models/farm.model';
import { FarmService } from '../../services/farms.service';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FarmCreateComponent } from '../farm-create/farm-create.component';
import { FarmEditComponent } from '../farm-edit/farm-edit.component';
import { SnackBarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-farm-main-view',
  templateUrl: './farm-main-view.component.html',
  styleUrl: './farm-main-view.component.css'
})
export class FarmMainViewComponent {

  farms: any[] = [];
  selectedFarm: Farm | null = null;
  private modalRef: NgbModalRef | null = null;

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  images = [
    { path: 'assets/img/farm/farm_1.jpg', alt: 'Image 1' },
    { path: 'assets/img/farm/farm_2.jpg', alt: 'Image 2' },
    { path: 'assets/img/farm/farm_3.jpg', alt: 'Image 3' },
    { path: 'assets/img/farm/farm_4.jpg', alt: 'Image 4' }
  ];
  constructor(private farmService: FarmService, private modalService: NgbModal, private snackbarService: SnackBarService) { }

  ngOnInit(): void {
    this.loadFarms();
  }

  loadFarms(): void {
    this.farmService.getFarms().subscribe({
      next: (response: any) => {
        const data = response.data;
        if (data) {
          this.farms = data;
        }
      },
      error: (error: any) => {
        this.snackbarService.openSnackBar('Error en la solicitud');
      },
  
    });
  }

  editFarm(farm: Farm): void {
    const modalRef = this.modalService.open(FarmEditComponent, { size: 'lg' });
    modalRef.componentInstance.farm = farm;

    modalRef.result.then(
      (result) => {
        if (result === 'updated') {
          this.snackbarService.openSnackBar('Finca actualizada con éxito.');
          this.loadFarms();
        }
      },
    ).catch((error) => {
      this.snackbarService.openSnackBar('Modal cerrado sin cambios');
    });
  }

  openDeleteModal(farm: Farm): void {
    this.selectedFarm = farm;
    this.modalRef = this.modalService.open(this.deleteModal, { size: 'lg' });
  }

  confirmDelete(modal: any): void {
    if (this.selectedFarm) {
      this.farmService.deleteFarm(this.selectedFarm.id).subscribe(
        () => {
          this.loadFarms();
          this.snackbarService.openSnackBar('Finca eliminada con éxito');
          modal.close('deleted');
        },
        error => {
          this.snackbarService.openSnackBar('Error al eliminar la finca:');
          modal.dismiss('error');
        }
      );
    }
  }

  addFarm(): void {
    const modalRef = this.modalService.open(FarmCreateComponent, { size: 'lg' });

    modalRef.result.then(result => {
      if (result === 'saved') {
        this.snackbarService.openSnackBar('Finca creada con éxito.');
        this.loadFarms();
      }
    }).catch((error) => {
      this.snackbarService.openSnackBar('Error al abrir el modal');
    });
  }
}
