import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Lot } from '../../models/lot.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LotService } from '../../services/lots.service';
import { LotCreateComponent } from '../lot-create/lot-create.component';
import { FarmService } from '../../../Farms/services/farms.service';
import { LotEditComponent } from '../lot-edit/lot-edit.component';
import { SnackBarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-lot-main-view',
  templateUrl: './lot-main-view.component.html',
  styleUrl: './lot-main-view.component.css'
})
export class LotMainViewComponent {
  lots: Lot[] = [];
  farms: any[] = [];
  selectedLot: Lot | null = null;
  private modalRef: NgbModalRef | null = null;
  
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  images = [
    { path: 'assets/img/lot/lot_1.jpg', alt: 'Image 1' },
    { path: 'assets/img/lot/lot_2.jpg', alt: 'Image 2' },
    { path: 'assets/img/lot/lot_3.jpg', alt: 'Image 3' },
    { path: 'assets/img/lot/lot_4.jpg', alt: 'Image 4' }
  ];

  constructor(
    private modalService: NgbModal,
    private lotService: LotService,
    private farmService: FarmService,
    private snackbarService: SnackBarService
  ) {
    this.loadLots();
    this.fetchFarms();
  }

  loadLots(): void {
    this.lotService.getAllLots().subscribe(lots => {
      this.lots = lots;
    });
  }

  fetchFarms() {
    this.farmService.getFarms().subscribe(
      (data: any) => {
        this.farms = data.data; // Asignar el array de fincas del servicio
      },
      error => {
        this.snackbarService.openSnackBar(`Error cargando fincas: ${error}`);
      }
    );
  }

  getFarmName(farmId: number): string {
    const farm = this.farms.find(f => f.id === farmId);
    return farm ? farm.name : 'Finca Desconocida'; // Si no encuentra la finca, devuelve un valor por defecto
  }

  openAddLotModal(): void {
    const modalRef = this.modalService.open(LotCreateComponent, { centered: true });
    modalRef.result.then(
      (result) => {
        this.snackbarService.openSnackBar(`Lote creado con éxito`);
        // Recargar los lotes después de agregar uno nuevo
        this.loadLots();
      },
      (reason) => {
        this.snackbarService.openSnackBar(`Error cargando el modal: ${reason}`);
      }
    );
  }
editLot(lot: any): void {
    const modalRef = this.modalService.open(LotEditComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: false
    });
    modalRef.componentInstance.lot = lot; // Pasar el lote seleccionado al modal

    modalRef.result.then(
      (result) => {
        if (result) {
          // Manejar la respuesta si es necesario
          this.snackbarService.openSnackBar(`Lote actualizado`);
          this.loadLots();
          // Actualizar el array de lotes o realizar alguna acción de actualización
        }
      },
      (reason) => {
        this.snackbarService.openSnackBar(`Modal cerrado sin cambios`);
      }
    );
  }
  openDeleteModal(lot: Lot): void {
    this.selectedLot = lot;
    this.modalRef = this.modalService.open(this.deleteModal, { size: 'lg' });
  }

  confirmDelete(modal: any): void {
    if (this.selectedLot) {
      this.lotService.deleteLot(this.selectedLot.id).subscribe(
        () => {
          this.loadLots();
          this.snackbarService.openSnackBar(`Lote eliminado con éxito`);
          modal.close('deleted');
        },
        error => {
          this.snackbarService.openSnackBar(`Error al eliminar la lote: ${error}`);
          modal.dismiss('error');
        }
      );
    }
  }
}